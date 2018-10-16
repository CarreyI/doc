
var totalRows = 0;
var currPage = 0;
var wartype = "";
var dirId="";
//最新动态
function docdymListLoad() {
    $.ajax({
        type: 'GET',
        url: GAL_URL+'phoibe/document/list/0/9?isstock=1',
        dataType: 'json',
        success: function (result) {
            var total_rows = result.data.totalCount;
            var row = "";
            var step = 0;
            $.each(result.data.dataList, function (i, val) {
                step=step+1;
                var title = val["name"];
                var format = val["format"];
                var pagecount = val["pagecount"];
                var tid =val["id"]
                var status = val["status"];
                var docstatus = "";
                if (status == 0) {
                    docstatus = "上传中";
                }
                else if (status > 1) {
                    docstatus = "上传完成";
                }

                //alert(docstatus);

                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else{
                    icon = "<i class='exls'></i>";//
                }
                row = row + "<li>" + icon + "<a title='" + title + "' href='docdetail.html?tid=" + tid + "'>" + cutString(title,12) + "</a>&nbsp;&nbsp;&nbsp;<b class='f-blue fr' style='margin-right:8px;'>" + docstatus + "</b></li>";

                if (step == total_rows) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";
                    $("#docdym").append(trow)
                    return;
                }
                if (step % 3 == 0) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";;
                    $("#docdym").append(trow)
                    row = "";
                }
            });

            if (result.data.dataList==null){
                var nullStr = "<ol class=\"list1\"><li><div>没有新的动态</div></li></ol>";
                $("#docdym").append(nullStr);
            }
        }
    });
}
//最近浏览
function nearreadListLoad() {
    var data = GAL_URL+'phoibe/document/list/browse/0/9?queryFlag=browse&isstock=1'
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'json',
        success: function (result) {
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            var row = "";
            var step = 0;
            $("#nearread").html("");
            $.each(result.data.dataList, function (i, val) {
                step = step + 1;
                var title = val["name"];
                var format = val["format"];
                var createtime = val["createTime"];
                var tid=val["id"];
                var userRealName=val["userRealName"];
                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else{
                    icon = "<i class='exls'></i>";//
                }
                row = row + "<li>" + icon + "<a title='" + title + "' href='docdetail.html?tid=" + tid + "'>" + cutString(title, 12) + "</a>&nbsp;&nbsp;&nbsp;" + createtime.substring(0,16) + "<b class='f-blue fr' style='margin-right:8px;' ><a class='list-del nearread-del' tid='"+tid+"'>清除</a></b></li>";
                if (step == total_rows) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";
                    $("#nearread").append(trow)
                    return;
                }
                if (step % 3 == 0) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";
                    $("#nearread").append(trow)
                    row = "";
                }
            });
            if (step==9){
                var frs ="<a class=\"frs\" style=\"position: absolute;\" href=\"searchadv.html?queryFlag=browse\">更多</a>";
                $("#nearread").append(frs);
            }
            if (result.data.dataList==null){
             var nullStr = "<ol class=\"list1\"><li><div>最近未浏览任何文档</div></li></ol>";
                $("#nearread").append(nullStr)
            }
            $(".nearread-del").click(function () {
                var tid = $(this).attr("tid");
                nearreadAjax(tid);
            });
        }
    });
}

//我的收藏
function randomListLoad() {
    var data = GAL_URL+'phoibe/document/list/collection/0/9?queryFlag=collection&isstock=1'
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'json',
        success: function (result) {
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            var row = "";
            var step = 0;
            $("#random_li").html("");
            $.each(result.data.dataList, function (i, val) {
                step = step + 1;
                var title = val["name"];
                var format = val["format"];
                var createtime = val["createTime"];
                var tid=val["id"];
                var userRealName=val["userRealName"];
                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else{
                    icon = "<i class='exls'></i>";//
                }
                row = row + "<li>" + icon + "<a title='" + title + "' href='docdetail.html?tid=" + tid + "'>" + cutString(title, 14) + "</a>&nbsp;&nbsp;&nbsp;" + createtime.substring(0,10) + "<b class='f-blue fr' style='margin-right:8px;' ><a class='list-del random-del' tid='"+tid+"'>取消</a></b></li>";

                if (step == total_rows) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";
                    $("#random_li").append(trow)
                    return;
                }
                if (step % 3 == 0) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";;
                    $("#random_li").append(trow)
                    row = "";
                }
            });
            if (step==9){
                var frs ="<a class=\"frs\" style=\"position: absolute;\"  href=\"searchadv.html?queryFlag=collection\">更多</a>";
                $("#random_li").append(frs);
            }

            if (result.data.dataList==null){
                var nullStr = "<ol class=\"list1\"><li><div>未收藏任何文档</div></li></ol>";
                $("#random_li").append(nullStr);
            }

            $(".random-del").click(function () {
                var tid = $(this).attr("tid");
                favoriteAjax(tid);
            });
        }
    });
}
//我的订阅
function attentionListLoad() {
    var data = GAL_URL+'phoibe/document/list/0/9?queryFlag=subscribe&isstock=1'
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'json',
        success: function (result) {
            var total_rows = result.data.totalCount;
            var row = "";
            var step = 0;
            $("#attention_li").html("");
            $.each(result.data.dataList, function (i, val) {
                step = step + 1;
                var title = val["name"];
                var format = val["format"];
                var createtime = val["createTime"];
                var tid=val["id"];
                var userRealName=val["userRealName"];
                var userId=val["userId"];
                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else{
                    icon = "<i class='exls'></i>";//
                }

                row = row + "<li>" + icon + "<a title='" + title + "' href='docdetail.html?tid=" + tid + "'>" + cutString(title,16) + "</a>&nbsp;&nbsp;&nbsp;<b class='f-blue fr' style='margin-right:8px;' title='"+userRealName+"'>"+cutString(userRealName,14)+"&nbsp;&nbsp;<a class='list-del attention-del' userId='"+userId+"'>取消</a></b></li>";
                // alert(row);
                if (step == total_rows) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";
                    $("#attention_li").append(trow)
                    return;
                }
                if (step % 3 == 0) {
                    var trow = "<div class='col3'><ol class='list1'>" + row + "</ol></div>";
                    $("#attention_li").append(trow)
                    row = "";
                }
            });
            if (step==9){
                var frs ="<a class=\"frs\" style=\"position: absolute;\"  href=\"searchadv.html?queryFlag=subscribe\">更多</a>";
                $("#attention_li").append(frs);
            }
            if (result.data.dataList==null){
                var nullStr = "<ol class=\"list1\"><li><div>未订阅任何文档</div></li></ol>";
                $("#attention_li").append(nullStr)
            }
            $(".attention-del").click(function () {
                var userId = $(this).attr("userId");
                attentionAjax(userId);
            });
        }
    });
}

//清除记录
function nearreadAjax(tid){
    var url = GAL_URL + "phoibe/document/cancelbrowse/" + tid;
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
//取消收藏
function favoriteAjax(tid){
    if (confirm("确认取消关注当前文章吗？")) {
        var url = GAL_URL + "phoibe/document/cancelCollection/" + tid;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            dataType: 'json',
            success: function (result) {
                if (result.code == "SUCCESS") {
                    randomListLoad();
                }
            }
        });
    }
}

//取消订阅
function attentionAjax(userid){
    if (confirm("确认取消对当前文章作者的订阅吗？")) {
        var url = GAL_URL + "phoibe/document/cancelSubscribe/" + userid;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            dataType: 'json',
            success: function (result) {
                if (result.code == "SUCCESS") {
                    attentionListLoad();
                }
            }
        });
    }
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
                if (data.code = "success") {
                    loadData(0);
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
            }
        });
    }
}
function loadData(pageindex) {

    $("#tblist-body").children().remove();
    var userStr = getCookie("userObject");
    var userId =1;
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
    }
    var data = GAL_URL+'phoibe/document/list/' + pageindex + '/10?1=1';
    data = data +"&userId="+userId;
    if (dirId!=""){
        data = data +"&dirId="+dirId;
    }
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

                   
                    var row = "<tr><td style='width:30px'><input type='checkbox' data-value='" + id + "' name='chksel'/></td>" +
                        "<td><a href='docdetail.html?tid="+id+"' title='"+title+"'>" + cutString(title,18) + "</a></td>" +
                        "<td>" + filesize + "</td>" +
                        "<td>" + format + "</td>" +
                        "<td>" + createtime + "</td>" +
                        "<td>" + auditdate + "</td>" +
                        "<td class='"+auditstatustyle+"'>"+auditstatus+"</td>" +
                        "<td><a class='list-del doc-move' tid='"+id+"'>移动</a>&nbsp;&nbsp;<a  class='list-del doc-del' tid='"+id+"'>删除</a></td></tr>";
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

                         filelist=filelist + "<li>+ <a href=\"#\" class=\"menu-a\" dirId='"+dirId+"'>"+dirName+"</a>&nbsp;&nbsp;&nbsp;<a href=\"#\" class=\"menu-del menu-btn\" dirId='"+dirId+"'>删除</a></li>";
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
                if (data.code = "SUCCESS") {
                    loadFileMenu();
                }
            }
        });
    }
}
    $(function () {

       // docdymListLoad();
        nearreadListLoad();
        randomListLoad();
        attentionListLoad();

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
            if(sel.length > 1){
                alert("一次只能选中一条");
                return;
            }
            var Id = $(sel).attr("data-value");
            if (Id!=null){
                $(".documentId").val(Id);
                $(".filelist_bodyMask").fadeIn();
            }
        });

        $("#uploadfile").click(function () {
            parent.appendDitHtml();
            $(window.parent.document).find(".bodyMask").fadeIn();
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
            $.ajax({
                url: GAL_URL + form.attr("action"),
                type: form.attr("method"),
                data: JSON.stringify(formdata),
                dataType: "json",
                async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if (data.code="success") {
                        alert("提交成功");
                        $(".file_bodyMask").hide();
                        loadFileMenu();
                    }else{
                        alert("提交失败");
                    }
                }
            });
        })
        // 移动文件目录提交
        $('#filelist_submit').click(function () {

            var form = $("#filelist_ajaxform");

            var formdata ={
                directoryId : $(".file_selectlist  input[type='radio']:checked").val(),
                 documentId : $(".documentId").val()
            };

            $.ajax({
                url: GAL_URL + form.attr("action"),
                type: form.attr("method"),
                data: JSON.stringify(formdata),
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