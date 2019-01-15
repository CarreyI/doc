
var totalRows = 0;
var currPage = 0;
var pageSize =14;
var tipDel;
var docid;
var docstatus="1&f=audit";

        function loadData(pageindex) {
            $("#tblist-body").children().remove();

            var data = GAL_URL+'phoibe/document/list/user/'+pageindex+'/'+pageSize+'?1=1';

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
            data = data + "&auditStatus=2&isstock=" + docstatus;
           // alert(data);
            $.ajax({
                type: 'GET',
                url: data,
                async: false,
                dataType: 'json',
                success: function (result) {
                    var total_rows = result.data.totalCount;
                    totalRows = total_rows;

                    if (total_rows < 1) currPage = 1;
                    $.each(result.data.dataList, function (i, val) {

                        //alert(JSON.stringify(val))
                        var title = val["name"];
                        var id = val["id"];
                        var pagecount = val["pagecount"];
                        var filesize = val["fileSize"];
                        var isstock = val["isstock"];
                        var owner = val["nickname"];
                        var auditTime = val["auditTime"];
                        var auditor = val["auditor"];
                        var stockTime = val["stockTime"];
                        var stocker = val["stocker"];
                        var auditstatustyle = "f-blue";
						if(val["stockTime"]=='undefined' || val['stockTime']==null){
						   stockTime = '';
						}
						if(val["stocker"]==null){
						    stocker = "";
                        }

                        var docstockstyle="";
						var docstockstatus="";
                        var docstockBtnHtml="";
                        var docdelBtnHtml="";
                        if (isstock == 2) {
                            docstockstatus = "已入库";
                            docstockstyle = "f-blue";
                            docdelBtnHtml="<a  class='list-del doc-del' tid='"+id+"'>删除</a>";
                        }
                        else if(isstock == 1){
                            docstockstatus= "未入库";
                            docstockstyle = "f-red";
                            docstockBtnHtml = "<a class='list-del doc-add' tid='"+id+"'>入库</a>&nbsp;&nbsp;";
                        }//<input type='radio' name='chksel' data-value='" + id + "'/>
                        var row = "<tr><td><input type='checkbox' name='chksel' data-value='" + id + "'/></td><td class='row-id'>" + id + "</td><td class='d-title' title='"
                            + title + "'><a href='docdetail.html?tid=" + id + "'>" + title + "</a></td><td>" + filesize + "</td><td>"
                            +owner+"</td><td>" + auditTime  + "</td><td>"+auditor+"</td><td>"
                            + stockTime+ "</td><td>"+stocker+"</td><td  class='" + docstockstyle + "' docstockstatus="+isstock+">" + docstockstatus + "</td>" +
                            "<td><a class='list-del doc-detail' tid='"+id+"'>详细</a>&nbsp;&nbsp;"+docstockBtnHtml+docdelBtnHtml+"</td></tr>";
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
                    $(".doc-detail").click(function () {
                        var tid = $(this).attr("tid");
                        parent.docDetailOpenController(tid);
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
             ,limit:pageSize
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
    var data = 'phoibe/document/instorage';// + rowid;
    $.ajax({
        type: 'POST',
        url: data,
        data: {"idstr": rowid},
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
function cancelmsg()
{
    layer.close(tipDel);
}
function okmsg(){

    layer.close(tipDel);
    var url = GAL_URL + 'phoibe/document/outstorage';// + docid;
    $.ajax({
        type: 'post',
        url:url,
        data: {"idstr": docid},
        dataType: 'json',
        async: false,
        success: function (result) {
            if (result.code == "SUCCESS") ;
            {
                alert("删除入库文档");
                docid="";
                loadData(0);
            }
        }
    });
}
function docDelAjax(rowid){
    docid = rowid;
    tipDel = showmsg("delmsg","系统提示","确认删除入库文档吗？请注意删除后将无法恢复！");
}
        $(function () {

            loadData(currPage);

            $("#btnaddstock").click(function () {
                var sel = $("#tblist-body input[type=checkbox]:checked");

                var Id = $(sel).attr("data-value");
                if(sel==null){
                    alert("请选中要入库的文档");
                    return
                }
                var idstr = "";
                $.each(sel,function (index,obj) {
                    idstr += $(obj).attr("data-value")+",";
                })
                idstr = idstr.substring(0,idstr.length-1)
                docAddAjax(idstr);
            });
            $("#btndelstock").click(function () {
                var sel = $("#tblist-body input[type=checkbox]:checked");
                /*if(sel.length > 1){
                    alert("只能选中一条");
                    return;
                }*/
                var Id = $(sel).attr("data-value");
                if(sel==null){
                    alert("请选中要删除的文档");
                    return
                }
                var idstr = "";
                $.each(sel,function (index,obj) {
                    idstr += $(obj).attr("data-value")+",";
                })
                idstr = idstr.substring(0,idstr.length-1);
                //alert(idstr);
                    docDelAjax(idstr)
            });

            $("#btnSearch").click(function () {
                currPage = 0;
                totalRows = 0;
                loadData(0);
            });

            $("#docCheck").click(function () {
                $("#btnaudit").show();
                $("#btnreback").show();
                docstatus="1&f=audit";
                loadData(0);
                parent.iframeLoad();
                $("#btndelstock").hide();
            });

            $("#docDone").click(function () {
                $("#btnaudit").hide();
                $("#btnreback").hide();
                docstatus="2&f=storage";
                loadData(0);
                parent.iframeLoad();
                $("#btndelstock").show();
            });
        });