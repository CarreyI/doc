var totalRows = 0;
var currPage = 0;
var docstatus =  1;
var pageSize=20;
    function loadData(pageindex) {

        $("#tblist-body").children().remove();    
        var data = GAL_URL+'phoibe/document/list/user/'+pageindex+'/'+pageSize+'?1=1';


        var docname = $("#docname").val();

        if (docname != ""&&docname != null){
            data = data + "&name=" + docname;
        }
        var owner = $("#owner").val();
        if (owner != ""&&owner != null) {
            data = data + "&userRealName=" + owner;
        }
        var auditTimeBegin =$("#waitstartdate").val();
        if (auditTimeBegin != ""&&auditTimeBegin != null) {
            data = data + "&auditTimeBegin=" + auditTimeBegin;
        }
        var auditTimeEnd = $("#waitenddate").val();
        if (auditTimeEnd != ""&&auditTimeEnd != null) {
            data = data + "&auditTimeEnd=" + auditTimeEnd;
        }

        data = data + "isstock=0&auditStatus=" + docstatus;
        $.ajax({
            type: 'GET',
            url: data,
            dataType: 'json',
            async:false,
            success: function (result) {
                var total_rows = result.data.totalCount;
                totalRows = total_rows;

                if (total_rows < 1) currPage = 1;
                $.each(result.data.dataList, function (i, val) {
                    var title = val["name"];
                    var id = val["id"];
                    var pagecount = val["pagecount"];
                    var filesize = val["fileSize"];
                    var auditstatus = val["auditStatus"];
                    var owner = val["nickname"];
                    var auditdate = val["auditTime"];

                    if(val["auditTime"]=='undefined' || val['auditTime']==null){
                        auditdate = '';
                    }
                    var auditstatustyle = "f-blue";
                    var opertionHtml="<a class='list-del doc-add' tid='"+id+"'>审核</a>&nbsp;&nbsp;<a class='list-del doc-del' tid='"+id+"'>驳回</a>";

                    if (auditstatus == 1) {
                        auditstatustyle = "f-red";
                        auditstatus="待审核";
                    }
                    else if(auditstatus==2){
                        auditstatus="审核通过";
                        opertionHtml="<a class='list-del doc-del' tid='"+id+"'>驳回</a>";
                    }
                    else if(auditstatus==3){
                        auditstatus = "审核不通过";
                        auditstatustyle = "f-red";
                    }
                    var row = "<tr><td class='row-id'>" + id + "</td><td><input type='radio' name='chksel' data-value='" + id
                        + "'/></td><td title='" + title + "'><a href='docdetail.html?tid="+id+"'>" + title + "</a></td><td>"
                        + filesize + "</td><td>" + owner + "</td><td>" + auditdate
                        + "</td><td class='"+auditstatustyle + "'>" + auditstatus + "</td><td>"+opertionHtml+"</td></tr>";

                    //alert(row);
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
                ,limit:pageSize
              , first: '首页'
              , last: '尾页'
              , prev: '<em>←</em>'
              , next: '<em>→</em>'
               , jump: function (obj, first) { //触发分页后的回调
                   if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                       currPage = obj.curr;
                       loadData(obj.curr-1);
                   }
               }
            });
        });
    }

function docAddAjax(rowid){
    var data = 'phoibe/document/update/checkpass/' + rowid;
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'json',
        async: false,
        success: function (result) {
            if (result.code == "SUCCESS");
            {
                alert("文档审批通过");
                loadData(currPage);
            }
        }
    });
}
function docDelAjax(rowid){

    var data = GAL_URL+'/phoibe/document/update/checkrefuse/' + rowid;
    //alert(data);
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'json',
        async: false,
        success: function (result) {
            if (result.code == "SUCCESS");
            {
                alert("驳回文档");
                loadData(0);
            }
        }
    });
}
    $(function () {

        laydate.render({
            elem: '#auditstartdate'
         , done: function (value, date, endDate) {
             $("#auditstartdate").attr("data-value", value);
         }
        });
        laydate.render({
            elem: '#auditenddate'
             , done: function (value, date, endDate) {
                 $("#auditenddate").attr("data-value", value);
             }
        });

        laydate.render({
            elem: '#waitstartdate'
             , done: function (value, date, endDate) {
                 $("#waitstartdate").attr("data-value", value);
             }
        });
        laydate.render({
            elem: '#waitenddate'
              , done: function (value, date, endDate) {
                  $("#waitenddate").attr("data-value", value);
              }
        });

        loadData(0);
        $("#btnaudit").click(function () {
            var sel = $("#tblist-body tr td input[type='radio']:checked");
            if(sel==null){
                alert("请选中要审核的文章");
                return
            }
            var rowid = $(sel).attr("data-value");
          docAddAjax(rowid);
        });

        $("#btnreback").click(function () {
            var sel = $("#tblist-body tr td input[type='radio']:checked");

            if(sel==null){
                alert("请选中要驳回的文章");
                return
            }
            var rowid = $(sel).attr("data-value");
            docDelAjax(rowid);
        });

        $(".btnSearch").click(function () {
            loadData(0);
            parent.iframeLoad();
        });

        $("#docCheck").click(function () {
            $("#btnaudit").show();
            $("#btnreback").show();
            docstatus=1;
            loadData(0);
            parent.iframeLoad();
        });

        $("#docDone").click(function () {
            $("#btnaudit").hide();
            $("#btnreback").hide();
            docstatus="2&f=audit";
            loadData(0);
             parent.iframeLoad();
        });

    });