
var totalRows = 0;
var currPage = 0;
var wartype = "";
var pageSize=19;
var dirId="";

var userStr = getCookie("userObject");
var userId =1;
if (null!=userStr&&""!=userStr) {
    userObject = JSON.parse(userStr);
    userId = userObject.id;
}

//清除记录
function nearreadAjax(tid){
    var url = GAL_URL + "phoibe/document/cancelbrowse/" + tid;
    //alert(url);
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            if(result.code=="SUCCESS"){
                nearreadListLoad();
            }
        }
    });
}

function editDocFun(docId){
    $("#uploadfile").click();
    parent.getDocObjecLoad(docId);
}
function loadData(pageindex) {

    $("#tblist-body").children().remove();
    var data = GAL_URL+'phoibe/document/list/' + pageindex + '/'+pageSize+'?1=1';
    data = data +"&userId="+userId;
    if (dirId!=""){
        data = data +"&dirId="+dirId;
    }
    //alert(data);
    $.ajax({
            type: 'GET',
            url: data,
            dataType: 'json',
            async: false,
            success: function (result) {//<div class='font22 title'>中国战法</div>
                var total_rows = result.data.totalCount;
                totalRows = total_rows;

                if (total_rows < 1) currPage = 1;
                var step = 0;
                var row = "";
                $.each(result.data.dataList, function (i, val) {
                    var title = val["name"];
                    var id = val["id"];
                    var format = val['format'];
                    var pagecount = val["pagecount"];
                    var filesize = val["fileSize"];
                    var status = val["status"];
                    var createtime = val["createTime"];
                    var auditstatus = val["auditStatus"];
                    var tagId = val["tag"];
                    if (val["tag"] == 'undefined' || val["tag"] == null) {
                        tagId = '';
                    }
                    var auditdate = val["auditTime"];
                    if (val["auditTime"] == 'undefined' || val["auditTime"] == null) {
                        auditdate = '';
                    }

                    var auditor = "admin";
                    var tid = val["id"];
                    var docstatus = "";
                    var auditstatustyle = "f-blue";
                    if (status == 101) {
                        docstatus = "上传中";
                    }

                    else if (status == 100) {
                        docstatus = "上传完成";
                    }
                    if (auditstatus == 1) {
                        auditstatustyle = "f-red";
                        auditstatus = "待审核";
                    }
                    else if (auditstatus == 2) {
                        auditstatus = "审核通过";
                    }
                    else if (auditstatus == 3) {
                        auditstatus = "审核不通过";
                        auditstatustyle = "f-red";
                    }
                    var docdetailHtml="<a class='list-del doc-detail' tid='"+id+"'>详细</a>&nbsp;&nbsp;";
                    var url="href='docdetail.html?tid=" + tid + "'";
                    if (status==101){
                        auditstatus="上传中断";
                        auditstatustyle = "f-red";
                        var url=" style='color:#666;cursor: pointer;' onClick=editDocFun("+tid+")";
                        docdetailHtml="";
                    }
                   
                    var row = "<tr><td><input type='checkbox' data-value='" + id + "' name='chksel'/></td>" +
                        "<td class='d-title'><a "+url+" title='"+title+"'>" + cutString(title,32) + "</a></td>" +
                        "<td>" + filesize + "</td>" +
                        "<td>" + format + "</td>" +
                        "<td>" + createtime + "</td>" +
                        "<td>" + auditdate + "</td>" +
                        "<td class='"+auditstatustyle+"'>"+auditstatus+"</td>" +
                        "<td>"+docdetailHtml+"<a class='list-del doc-move' tid='"+id+"'>移动</a>&nbsp;&nbsp;<a  class='list-del doc-del' tid='"+id+"'>删除</a></td></tr>";
                    $("#tblist-body").append(row);//<td>" + tagId + "</td>
                    parent.iframeLoad();
                });
                $(".doc-del").click(function () {
                    var tid = $(this).attr("tid");
                    docDelAjax(tid);

                });
                $(".doc-move").click(function () {
                    var tid = $(this).attr("tid");
                        $(".documentId").val(tid);
                        $(".filelist_bodyMask").fadeIn();
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
            //自定义首页、尾页、上一页、下一页文本
            laypage.render({
                elem: 'notice_pages'
              , count: totalRows
              , curr:currPage
                ,limit:pageSize
              , first: '首页'
              , last: '尾页'
              , prev: '<em>←</em>'
              , next: '<em>→</em>'
               , jump: function (obj, first) { //触发分页后的回调
                   if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                       currPage = obj.curr;
                       loadData(obj.curr - 1);
                   }
               }
            });
        });
       
    }

function docDelAjax(tid){
    if (confirm("确认删除选中文章吗？")) {
        $.ajax({
            url: GAL_URL + "phoibe/document/delete",
            type: "post",
            data: {"_method": "delete", "idstr": tid},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.code == "SUCCESS") {
                    loadData(0);
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
            }
        });
    }
}

    function loadFileMenu(){
        var userStr = getCookie("userObject");
        var userId =1;
        if (null!=userStr&&""!=userStr) {
            userObject = JSON.parse(userStr);
            userId = userObject.id;
        }
        $.ajax({
            url: GAL_URL + "phoibe/directory/list/"+userId,
            type: "GET",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code="success") {
                    //var userInfo = data.data;
                    var filelist ="<li>+ <a href=\"#\" class=\"menu-a\" dirId=''>全部文章</a></li>";
                    var selectlist_html ="";
                    var roleObj = data.data;
                    for (var i in data.data){
                        var dirId = roleObj[i].id;
                        var dirName = roleObj[i].dirName;
                         filelist=filelist + "<li>&nbsp;&nbsp;&nbsp;&nbsp;- <a href=\"#\" class=\"menu-a\" dirId='"+dirId+"'>"+dirName+"</a>&nbsp;&nbsp;&nbsp;<a href=\"#\" class=\"menu-del menu-btn\" dirId='"+dirId+"'>删除</a></li>";
                         selectlist_html=selectlist_html + "<li><input type='radio' data-value='' name='chksel' value='"+dirId+"'/><a href=\"#\">"+dirName+"</a></li>";
                    }

                    $(".file_list").html(filelist);
                    $(".file_selectlist").html(selectlist_html);
                }
            }
        });

        //添加点击行选中单选框
        $(".file_selectlist").on("click","li",function () {

            //标题行不作任何操作
            if (this.rowIndex == 0) return;
            if ($(this).find("input").checked) {
                //已选中的行取消选中
                $(this).find("input").prop("checked",false);
            } else {
                //未选中的行，进行选中
                $(this).find("input").prop("checked",true);
            }
        });

        $(".file_list .menu-a").click(function(){
            dirId = $(this).attr("dirid");
            loadData(0);
        });
        $(".file_list li").hover(function(){
            $(this).find(".menu-btn").fadeIn();
        },function () {
            $(this).find(".menu-btn").hide();
        });
        // 删除目录
        $(".menu-del").click(function(){
                dirId = $(this).attr("dirid");
                delMenuAjax(dirId);
        });

    }

function delMenuAjax(dirId) {
    if (confirm("确认删除选中目录吗？")) {
        $.ajax({
            url: GAL_URL + "phoibe/directory/remove/" + dirId,
            type: "DELETE",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code == "SUCCESS") {
                    loadFileMenu();
                }
            }
        });
    }
}
function checkfileNameAjax(filename,userId){
    var pd=false;
    $.ajax({
        url: GAL_URL + "phoibe/directory/check?dirName=" + filename+"&userId="+userId,
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.code == "SUCCESS") {
                pd=true;
            }
        }
    });
    return pd;
}
    $(function () {
       // docdymListLoad();
        //nearreadListLoad();
        //randomListLoad();
        //attentionListLoad();
        loadData(0);
        loadFileMenu();
        $("#btndel").click(function () {
            var sel = $("#tblist-body tr td input[type='checkbox']:checked");
            if(sel.length == 0){
                alert("请选中要删除掉文章");
                return
            }
            var idstr = "";
            $.each(sel,function (index,obj) {
                idstr += $(obj).attr("data-value")+",";
            })
            idstr = idstr.substring(0,idstr.length-1)
                docDelAjax(idstr);
        });
        $("#wartype").change(function(){
            var wartypevalue = $("#wartype option:selected").val();
            wartype = "&combatType=" + wartypevalue;
            loadData(0);
        });

        // 新建文件目录
        $("#btnnewfolder").click(function () {
            $(".file_bodyMask").fadeIn();
        });
        $(".file_closed").click(function () {
            $(".file_bodyMask").hide();
        });
        // 移动到文件目录
        $("#btnmove").click(function () {
            var sel = $("#tblist-body input[type=checkbox]:checked");
            var idstr = "";
            $.each(sel,function (index,obj) {
                idstr += $(obj).attr("data-value")+",";
            })
            idstr = idstr.substring(0,idstr.length-1)
            if (idstr!=null){
                $(".documentId").val(idstr);
                $(".filelist_bodyMask").fadeIn();
            }
        });

        $("#uploadfile").click(function () {
            parent.docDetailRecoverController();
            var itemlength = $(window.parent.document).find("#thelist").find(".item").length;
            if (itemlength>0){
                alert("有未上传完成的任务，请先上传");
                $(window.parent.document).find(".uplaodTaskBox").click();
            }else{
                parent.emptyformw();
                $(window.parent.document).find(".bodyMask").fadeIn();
                //parent.appendDitHtml();
                //parent.getTag();
            }
        });

        $(".filelist_closed").click(function () {
            $(".filelist_bodyMask").hide();
        });
        // 新建目录提交
        $('#file_submit').click(function () {
            var form = $("#file_ajaxform");
            var formdata ={};
            for (var i = 0; i < form.serializeArray().length; i++) {
                var key = form.serializeArray()[i].name;
                var value = form.serializeArray()[i].value;
                formdata[key] = value;
            }
            var userStr = getCookie("userObject");
            var userId =1;
            if (null!=userStr&&""!=userStr) {
                userObject = JSON.parse(userStr);
                userId = userObject.id;
            }
            formdata.creator = userId;
            var pd = checkfileNameAjax(formdata.dirName,userId);
            if(pd){
                $.ajax({
                    url: GAL_URL + form.attr("action"),
                    type: form.attr("method"),
                    data: JSON.stringify(formdata),
                    dataType: "json",
                    async: false,
                    contentType: "application/json;charset=UTF-8",
                    success: function (data) {
                        if (data.code="success") {
                            $("#file_ajaxform")[0].reset();
                            alert("提交成功");
                            $(".file_bodyMask").hide();
                            loadFileMenu();
                        }else{
                            alert("提交失败");
                        }
                    }
                });
            }else{
                alert("目录名已存在")
            }
        })
        // 移动文件目录提交
        $('#filelist_submit').click(function () {

            var directoryid =$(".file_selectlist  input[type='radio']:checked").val();
            var docids =$(".documentId").val().split();
            var docidstr="";
            for(var i=0;i<docids.length;i++){
                docidstr += "&docids="+docids[i];
            }
            $.ajax({
                url: GAL_URL + "phoibe/directory/move?directoryid="+directoryid+docidstr,
                type: "GET",
                dataType: "json",
                async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if (data.code="success") {
                        alert("提交成功");
                        $(".filelist_bodyMask").hide();
                        loadFileMenu();
                    }else{
                        alert("提交失败");
                    }
                }
            });
        })
    });