var totalRows = 0;
var currPage = 0;
var docstatus =  1;
var pageSize=14;
    function loadData(pageindex) {

        $("#tblist-body").children().remove();    
        var data = GAL_URL+'phoibe/document/list/user/'+pageindex+'/'+pageSize+'?status=100';
        var docname = $("#docname").val();

        if (docname != ""&&docname != null){
            data = data + "&name=" + docname;
        }
        var owner = $("#owner").val();
        if (owner != ""&&owner != null) {
            data = data + "&userRealName=" + owner;
        }
        var auditTimeBegin =$("#auditstartdate").val();
        if (auditTimeBegin != ""&&auditTimeBegin != null) {
            data = data + "&auditTimeBegin=" + auditTimeBegin;
        }
        var auditTimeEnd = $("#auditenddate").val();
        if (auditTimeEnd != ""&&auditTimeEnd != null) {
            data = data + "&auditTimeEnd=" + auditTimeEnd;
        }

        data = data + "&auditStatus=" + docstatus;
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
                    var auditor = val["auditor"];
                    var auditdesc = val["auditDesc"];
                    if(auditdesc==null){
                        auditdesc="";
                    }
                    if(auditor==null){
                        auditor="";
                    }

                    if(val["auditTime"]=='undefined' || val['auditTime']==null){
                        auditdate = '';
                    }
                    var auditstatustyle = "f-blue";
                    var opertionHtml="<a class='list-del doc-add' title='"+title+"' tid='"+id+"'>审核</a>&nbsp;&nbsp;";//<a class='list-del doc-del' tid='"+id+"'>驳回</a>

                    if (auditstatus == 1) {
                        auditstatustyle = "f-red";
                        auditstatus="待审核";
                    }
                    else if(auditstatus==2){
                        auditstatus="初审通过";
                        //opertionHtml="<a class='list-del doc-del' tid='"+id+"'>驳回</a>";
                    }
                    else if(auditstatus==3){
                        auditstatus = "驳回";
                        auditstatustyle = "f-red";
                    }//<input type='radio' name='chksel' data-value='" + id+ "'/>
                    var row = "<tr><td><input type='checkbox' name='chksel' data-title='"+title+"' data-value='" + id + "'/></td><td class='row-id'>" + id + "</td><td class='d-title' title='" + title + "'><a href='docdetail.html?tid="+id+"'>" + title + "</a></td><td>"
                        + filesize + "</td><td>" + owner + "</td><td>" + auditdate
                        + "</td><td>"+auditor+"</td><td class='"+auditstatustyle + "'>" + auditstatus + "</td><td class='d-title' title='"+auditdesc+"'>"+cutString(auditdesc,30)+"</td><td><a class='list-del doc-detail' title='"+title+"' tid='"+id+"'>详细</a>&nbsp;&nbsp;"+opertionHtml+"</td></tr>";

                    //alert(row);
                    $("#tblist-body").append(row);
                    parent.iframeLoad();
                });
                $(".doc-add").click(function () {
                    var tid = $(this).attr("tid");
                    var title = $(this).attr("title");
                    docAddAjax(tid,title);

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
               , jump: function (obj, first) { //触发分页后的回调
                   if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                       currPage = obj.curr;
                       loadData(obj.curr-1);
                   }
               }
            });
        });
    }

function docAddAjax(rowid,doctile){
    $("#docid").val(rowid);
    $("#doc-name").html(doctile);
    $(".bodyMask").fadeIn();
}
function docDelAjax(rowid){

    var data = GAL_URL+'/phoibe/document/update/checkrefuse/' + rowid;
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
        $(".closed").click(function(){
            $(".bodyMask").fadeOut();
        });
        loadData(0);

        $("#docview").click(function(){
            var tid=$("#docid").val();
            var hrefUrl= "checkdetail.html?tid=" + tid;
            window.open(hrefUrl);
        });

        $("#submit").click(function(){

            var form = $("#ajaxform");
            var formdata ={};
            for (var i = 0; i < form.serializeArray().length; i++) {
                var key = form.serializeArray()[i].name;
                var value = form.serializeArray()[i].value;
                formdata[key] = value;
            }
            formdata.docid=$("#docid").val();
            $.ajax({
                url: GAL_URL + $("#ajaxform").attr("action"),
                type: form.attr("method"),
                data: JSON.stringify(formdata),
                dataType: "json",
                async:false,
                contentType:"application/json;charset=UTF-8",
                success: function (data)
                {
                    if (data.code == "SUCCESS"){
                        alert("提交成功");
                        $(".bodyMask").fadeOut();
                        loadData(0);
                    }else {
                        alert("提交失败");
                    }
                }
            });
        });

        $("#btnaudit").click(function () {

            var sel = $("#tblist-body tr td input[type='checkbox']:checked");
            if(sel==null){
                alert("请选中要审核的文档");
                return
            }
            var idstr = "";
            var doctitle="";
            $.each(sel,function (index,obj) {
                idstr += $(obj).attr("data-value")+",";
                if(sel.length==1){doctitle= $(this).attr("data-title");}
            })
            idstr = idstr.substring(0,idstr.length-1);
            if(sel.length>1){
                $("#row-viewdoc").hide();
            }
            else{
                $("#docid").val(idstr);
                $("#doc-name").html(doctitle);
            }

            docAddAjax(idstr);
        });

        $("#btnreback").click(function () {
            var sel = $("#tblist-body tr td input[type='radio']:checked");

            if(sel==null){
                alert("请选中要驳回的文档");
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