
var totalRows = 0;
var currPage = 0;
var docstatus=0;

        function loadData(pageindex) {
            currPage = pageindex;
            $("#tblist-body").children().remove();

            var data = GAL_URL+'phoibe/document/list/'+pageindex+'/10?f=audit';

            var docname = $("#docname").val();
            if (docname!=""&&docname != null){
                data = data + "&name=" + docname;
            }
            var owner = $("#owner").val();
            if (owner != "") {
                data = data + "&userRealName=" + owner;
            }

            var chkValue = $("#con-value li[checked='checked']");
            var doctypevalue = chkValue.html();

            if (doctypevalue != "undefined" && doctypevalue != null) {
                data = data + "&format=" + doctypevalue.toLowerCase();
            }

            var stockTimeBegin = startdate.value ;
            if (stockTimeBegin != "" && stockTimeBegin != null) {
                data = data + "&stockTimeBegin=" + stockTimeBegin;
            }
            var stockTimeEnd = enddate.value;
            if (stockTimeEnd != "" && stockTimeEnd != null) {
                data = data + "&stockTimeEnd=" + stockTimeEnd;
            }
            data = data + "&auditStatus=2&&isstock=" + docstatus;
            $.ajax({
                type: 'GET',
                url: data,
                async: false,
                dataType: 'json',
                success: function (result) {
                    var total_rows = result.data.totalCount;
                    totalRows = total_rows;
                    var step = 0;
                    var row = "";
                    $.each(result.data.dataList, function (i, val) {
                        var title = val["name"];
                        var id = val["id"];
                        var pagecount = val["pagecount"];
                        var filesize = val["fileSize"];
                        var status = val["status"];
                        var stockTime = val["stockTime"];
                        var isstock = val["isstock"];
                        var owner = "admin";
                        var auditdate = "2018-08-26";
                        var auditor = "admin";
                        var tag = "";
                        var docstatus = "";
                        var auditstatustyle = "f-blue";
                        if (status == 1) {
                            docstatus = "上传中";
                        }
                        else if (status == 2) {
                            docstatus = "上传完成";
                        }
						if(val["stockTime"]=='undefined' || val['stockTime']==null){
						   stockTime = '';
						}

                        var docstockstyle="";
						var docstockstatus="";
                        if (isstock == 1) {
                            docstockstatus = "已入库";
                            docstockstyle = "f-blue";
                        }
                        else if(isstock == 0){
                            docstockstatus= "未入库";
                            docstockstyle = "f-red";
                        }
                        var row = "<tr><td class='row-id'>" + id + "</td><td><input type='radio' name='chksel' data-value='" + id + "'/></td><td title='" + title + "'><a href='docdetail.html?tid=" + id + "'>" + title + "</a></td><td>" + filesize + "</td><td>" + owner + "</td><td>" + auditdate + "</td><td class='" + auditstatustyle + "'>" + stockTime + "</td><td class='" + docstockstyle + "' docstockstatus="+isstock+">" + docstockstatus + "</td><td>" + auditor + "</td>" +

                            "<td><a class='list-del doc-add' tid='"+id+"'>入库</a>&nbsp;&nbsp;<a  class='list-del doc-del' tid='"+id+"'>删除</a></td></tr>";
                        $("#tblist-body").append(row);
                        parent.iframeLoad();
                    });
                    $(".doc-add").click(function () {
                        var tid = $(this).attr("tid");
                        docAddAjax(tid);

                    });
                    $(".doc-del").click(function () {
                        var tid = $(this).attr("tid");
                        docDelAjax(tid);

                    });
                }
            });

             layui.use(['laypage', 'layer'], function () {
         var laypage = layui.laypage
         , layer = layui.layer;

         laypage.render({
             elem: 'notice_pages'
           , count: totalRows
           ,curr:currPage
           , first: '首页'
           , last: '尾页'
           , prev: '<em>←</em>'
           , next: '<em>→</em>'
            , jump: function (obj, first) { 
                if (!first) { 
                    currPage = obj.curr;
                    loadData(obj.curr-1);
                }
            }
         });
     });
        }

function docAddAjax(rowid){
    var data = 'phoibe/document/update/instorage/' + rowid;
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'json',
        async: false,
        success: function (result) {
            if (result.code == "SUCCESS");
            {
                alert("文档入库成功");
                loadData(0);
            }
        }
    });
}
function docDelAjax(rowid){

    if (confirm("确认删除选中文章吗？")) {
        var data = GAL_URL + 'phoibe/document/update/outstorage/' + rowid;
        $.ajax({
            type: 'GET',
            url: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                if (result.code == "SUCCESS") ;
                {
                    alert("删除入库文档");
                    loadData(0);
                }
            }
        });
    }
}
        $(function () {
            laydate.render({
                elem: '#startdate'
                    , done: function (value, date, endDate) {
                        $("#startdate").attr("date-value", value);
                    }

            });
            laydate.render({
                elem: '#enddate'
                        , done: function (value, date, endDate) {
                            $("#enddate").attr("date-value", value);
                        }
            });

            loadData(0);

            $("#btnaddstock").click(function () {
                var sel = $("#tblist-body tr td input[type='radio']:checked");
                if(sel==null){
                    alert("请选中要入库的文章");
                    return
                }
                var rowid = $(sel).attr("data-value");
                docAddAjax(rowid);
            });
            $("#btndelstock").click(function () {
                var sel = $("#tblist-body tr td input[type='radio']:checked");
                if(sel==null){
                    alert("请选中要删除的文章");
                    return
                }
                var rowid = $(sel).attr("data-value");
                    docDelAjax(rowid)
            });

            $("#btnSearch").click(function () {
                currPage = 1;
                totalRows = 0;
                loadData(0);
            });

            $("#docCheck").click(function () {
                $("#btnaudit").show();
                $("#btnreback").show();
                docstatus=0;
                loadData(0);
                parent.iframeLoad();
            });

            $("#docDone").click(function () {
                $("#btnaudit").hide();
                $("#btnreback").hide();
                docstatus="1&f=storage";
                loadData(0);
                parent.iframeLoad();
            });
        });