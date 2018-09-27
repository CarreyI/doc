
var totalRows = 0;
var currPage = 0;


        function loadData(pageindex) {
            $("#tblist-body").children().remove();

            var data = GAL_URL+'phoibe/document/list/'+pageindex+'/10?1=1&f=storage';



            var chkValue = $("#con-value li[checked='checked']");
            var doctypestatus = $("#doctype option:selected").val();
            if (doctypestatus!=""&&doctypestatus != null) {
                data = data + "&isstock=" + doctypestatus.toLowerCase();
            }
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
                        var row = "<tr><td class='row-id'>" + id + "</td><td><input type='radio' name='chksel' data-value='" + id + "'/></td><td title='" + title + "'><a href='docdetail.html?tid=" + id + "'>" + title + "</a></td><td>" + filesize + "</td><td>" + owner + "</td><td>" + auditdate + "</td><td class='" + auditstatustyle + "'>" + stockTime + "</td><td class='" + docstockstyle + "' docstockstatus="+isstock+">" + docstockstatus + "</td><td>" + auditor + "</td></tr>";
                        $("#tblist-body").append(row);
                        parent.iframeLoad();
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
                var rowid = $(sel).attr("data-value");
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

                
            });
            $("#btndelstock").click(function () {
                var sel = $("#tblist-body tr td input[type='radio']:checked");
                var rowid = $(sel).attr("data-value");

                var data = GAL_URL+'phoibe/document/update/outstorage/' + rowid;
                $.ajax({
                    type: 'GET',
                    url: data,
                    dataType: 'json',
                    async: false,
                    success: function (result) {
                        if (result.code == "SUCCESS");
                        {
                            alert("删除入库文档");
                            loadData(0);
                        }
                    }
                });
            });

            $("#btnSearch").click(function () {
                currPage = 1;
                totalRows = 0;
                loadData(0);
            });
        });