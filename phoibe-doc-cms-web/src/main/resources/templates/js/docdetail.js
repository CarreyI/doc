
var totalRows = 0;
var currPage = 0;
var tid = getUrlString("tid");
var userid=0;
var article_tag,article_armtype,article_wartype;
function getInfo() {
    var url = GAL_URL+"phoibe/document/fetch/" + tid;
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            if (result.code = "SUCCESS") {
                userid= result.data.userId;

                article_tag=result.data.tag;
                article_armtype=result.data.arms;
                article_wartype=result.data.combatType;

                var suffx = result.data.format.replace(".","");
                if (suffx == "pdf"||suffx == "doc"||suffx == "docx") {
                    // var hrefurl = "openword.html?filePath="+result.data.filePath+"&docId="+tid;
                    var hrefurl = "phoibe/document/previewDoc/"+tid;
                    hrefurl = GAL_URL+hrefurl;
                    $("#preview").attr("href",hrefurl);
                    $("#icontitle").attr("class", "pdf");
                }else{
                	$("#preview").remove();
                }
                var collection= result.data.isCollection;
                if (collection){
                    $("#favorite").html("已收藏");
                    $("#favorite").attr("status",1)
                }
                var filePath = result.data.filePath;
                if (filePath!=null&&filePath!=""){
                    filePath = filePath.substring(filePath.lastIndexOf("/")+1,filePath.length);
                }
                $("#format").html(filePath+"&nbsp;&nbsp;("+result.data.fileSize+"kb)");
                $("#attention").attr("status",result.data.subscribe);
                $("#date").html(result.data.createTime);
                var url_owner = GAL_URL+"searchadv.html?&owner="+result.data.nickname;
                $(".owner").attr("href",url_owner)
                $(".owner").html(result.data.nickname);
                if (result.data.tag != null && result.data.tag != "") {
                    var tagArray = result.data.tag.split(",");
                    var taglinkHtml = "";
                    for (var i = 0; i < tagArray.length; i++) {
                        var tag = tagArray[i]
                        var url_tag = GAL_URL + "searchadv.html?&tag=" + tag;
                        taglinkHtml += "<a class='tag-link' href='" + url_tag + "' target='_self'>" + tag + "</a>";
                    }
                }
                $(".tags-box").append(taglinkHtml);
                $("#doctitle").html(result.data.name);
                var scoreStr="评分：";
                for(var l=0;l<result.data.score;l++){
                    scoreStr= scoreStr+ "<i class='i-star'></i>";
                }
                $("#score").html(scoreStr);
                var description = result.data.description;

                if(description!="undefined" && description!="" && description!=null){
                    $("#doc-content").html("<p>"+description+"</p>");
                }else {
                    $("#doc-content").html("<h4>当前没有摘要内容，请查看附件...</h4>");
                }
                if (suffx == "mp4"){
                    filePath = "gendangzou3.mp4";
                    $("#doc-content").append("<video id='videoControl' src='docword/video/"+filePath+"' height='220' controls='controls'></video>");
                }

                parent.iframeLoad();
            }
        }
    });
}
function newwestDoc() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/0/10?f=storage&isstock=2',
        //url: 'http://199.139.199.154:8090/phoibe/document/selectDoucumentList',
        dataType: 'json',
        success: function (result) {

            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var tid = val["id"];
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row = '<li class="clearfix"><a href="'+hrefUrl+'" target="_blank">' + docname + '</a></li>';
                $("#asideNewArticle ul").append(row);
            })
        }
    })
}
function userMenu() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/0/10?f=storage&isstock=2',
        //url: 'http://199.139.199.154:8090/phoibe/document/selectDoucumentList',
        dataType: 'json',
        success: function (result) {

            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var tid = val["id"];
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row = "<li><a class='clearfix'href='"+hrefUrl+"'>"+
                    "<span class='title oneline'>目录"+i+"</span>"+
                    "<span class='count float-right'>"+(i+2)+"篇</span></a></li>";
                $("#asideCategory ul").append(row);
            })
        }
    })
}
function hotArticle() {
    var url = GAL_URL + 'phoibe/document/list/0/19?f=handpick&isstock=2';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var viewNum=984;
            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var tid = val["id"];
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li><a href='"+hrefUrl+"'target='_blank'>"+docname+"</a><p class='read'>阅读量：<span>"+(viewNum-=135)+"</span></p></li>";
                $("#asideHotArticle ul").append(row);
            });
        }
    });
}
function correlationArticle() {
    var url = GAL_URL + 'phoibe/document/relevantList/0/8?isstock=2';
    if (article_tag!=null){
        url+="&tag="+article_tag;
    }
    if (article_armtype!=null){
        url+="&arms="+article_armtype;
    }
    if (article_wartype!=null){
        url+="&combatType="+article_wartype;
    }

    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var viewNum=984;
            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var tid = val["id"];
                var description=val["description"];
                var createTime=val["createTime"];
                createTime = getFormatDate(createTime);
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,18)+
                "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime+"</span></h5></div>"+
                "<div class='right-item-desc'>"+cutString(description,76)+"</div>"+
                "</a></li>";
                $(".recommend-fixed-box").append(row);
            });
        }
    });
}
function loadData(pageindex) {
    $("#comm-content").children().remove();
    var docid = getUrlString("tid");
    var url = GAL_URL+"phoibe/comment/list/"+docid+"/"+pageindex+"/4";

	//alert(url);
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                dataType: 'json',
                success: function (result) {
                     totalRows = result.data.totalCount;

                    if(totalRows==0){
                        $("#notice_pages").hide();
                    }else{
                        $(".comment-list-box").html("");
                    }
                 $("#comment").html(totalRows+"&nbsp;条评论");
                    $.each(result.data.dataList, function (i, val) {
                        var content = val["commentContent"];
                        var createTime = val["createTime"];
                        var title = $("#doctitle").html();
                        var name = val["userName"];
                        var score = val["score"];
                        var scoreStr="";
                        for(var l=0;l<score;l++){
                            scoreStr= scoreStr+ "<i class='i-star'></i>";
                        }
                        var row = "<span class='doctitle'>《" + title + "》</span><span id='commconten'>"+content+"</span></div>";
                        row="<ul class='comment-list'><li class='comment-line-box'>" +
                            "<a target='_blank' href=''><img src='images/head.png' style='float: left;'/></a>" +
                            "<div class='right-box '><div class='info-box'>" +
                            "<a target='_blank' href=''><span class='name '>" + name + "：</span></a>" +
                            "<span class='comment'>"+content+"</span>" +
                            "<span class='score'>"+scoreStr+"</span>" +
                            "<span class='date' title='"+createTime+"'>"+createTime+"</span>" +
                            "</div></div></li></ul>";
                        $(".comment-list-box").append(row);
                        parent.iframeLoad();
                    })
                }
            });
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        laypage.render({
            elem: 'notice_pages'
            , count: totalRows
            , limit: 6
            , curr: currPage//当前页,
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

function initstar() {
    var num = 5;
    finalnum = 5;
    tempnum = 1;
    var lis = $("#com-score ul li");
    //num:传入点亮星星的个数
    //finalnum:最终点亮星星的个数
    //tempnum:一个中间值
    function fnShow(num) {
        finalnum = num || tempnum;//如果传入的num为0，则finalnum取tempnum的值
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = i < finalnum ? "light" : "";//点亮星星就是加class为light的样式
        }
    }
    for (var i = 1; i <= lis.length; i++) {
        lis[i - 1].index = i;
        lis[i - 1].onmouseover = function () { //鼠标经过点亮星星。

            fnShow(this.index);//传入的值为正，就是finalnum
        }
        lis[i - 1].onmouseout = function () { //鼠标离开时星星变暗
            fnShow(0);//传入值为0，finalnum为tempnum,初始为0
        }
        lis[i - 1].onclick = function () { //鼠标点击,同时会调用onmouseout,改变tempnum值点亮星星
            tempnum = this.index;
            $("#comentscore").val(tempnum);
        }
    }
}
function isAttention(){
    var url = GAL_URL + "phoibe/document/checkSubscribe/"+userid;
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            if(result.data){
                $("#attention").html("已订阅");
                $("#attention").attr("status",1)
            }
        }
    });
}

//订阅
function attentionAjax(){
    var url = "";
    var status = $("#attention").attr("status");
    if(status==0){
        url = GAL_URL + "phoibe/document/subscribe/" + userid
    }else{
        url = GAL_URL + "phoibe/document/cancelSubscribe/" + userid
    }
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            if(result.code=="SUCCESS"){
                if (status==0){
                    $("#attention").html("已订阅");
                    $("#attention").attr("status",1)
                }else{
                    $("#attention").html("订阅");
                    $("#attention").attr("status",0)
                }
            }
        }
    });
}
//收藏
function favoriteAjax(){

    var url = "";
    var status = $("#favorite").attr("status");
    if(status==0){
        url = GAL_URL + "phoibe/document/collection/" + tid;
    }else{
        url = GAL_URL + "phoibe/document/cancelCollection/" + tid;
    }
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            if(result.code=="SUCCESS"){
                if (status==0){
                    $("#favorite").html("已收藏");
                    $("#favorite").attr("status",1)
                }else{
                    $("#favorite").html("收藏文章");
                    $("#favorite").attr("status",0)
                }
            }
        }
    });
}
//下载
function downloadAjax(){
    url = GAL_URL + "phoibe/document/download?Id=" + tid;
    window.open(url);
    // $.ajax({
    //     type: 'GET',
    //     url: url,
    //     async: false,
    //     dataType: 'json',
    //     success: function (result) {
    //         if (result.source==true){
    //             window.location.href = url;
    //         }else{
    //             alert("下载文件请求失败，请联系管理员");
    //         }
    //     }
    // });
}
function loadPizhuData(){
    $("#detial-pizhu").children().remove();
    var url = GAL_URL+"phoibe/userPostil/list/"+0+"/10?docId="+tid;
    //alert(url);
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            totalRows = result.data.totalCount;
            var count = totalRows;
            $.each(result.data.dataList, function (i, val) {

                var id = val["id"];
                //alert(id);
                var createTime = val["createTime"];
                var title = "批注"+count;
                var path = val["docPath"];
                var username=val["userName"];
                var row="";
                var hrefurl = "phoibe/userPostil/previewDoc/"+id;
                hrefurl = GAL_URL+hrefurl;
                row = "<li class='right-item'><a href='"+hrefurl+"' target='_blank'><div class='right-item-content clearfix'><h5>"+title+"<span class='time'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span title='"+username+"'>"+cutString(username,12)+"</span>&nbsp;&nbsp;"+createTime.substring("0","10")+"</span></h5></div> </a></li>"
                count--;
                $("#detial-pizhu").append(row);
                //parent.iframeLoad();
            })
        }
    });
}
$(function () {
    initstar();
    getInfo();
    loadData(0);
    correlationArticle();
    loadPizhuData();
    isAttention();

    $("#back").click(function () {
        history.back();
    });
    $("#attention").click(function () {
        attentionAjax(tid);
    });
    $("#favorite").click(function () {
        favoriteAjax(tid);
    });
    $("#download").click(function () {
        downloadAjax(tid);
    });
    $("#uploadnote").click(function() {

        $("#docId").val(tid);
        var docName = $("#doctitle").html();
        $("#docName").val(docName);
       //alert(docName);
       //return ;
        var itemlength = $(window.parent.document).find("#thelist").find(".item").length;
        if (itemlength>0){
            alert("有未上传完成的任务，请先上传");
            $(window.parent.document).find(".uplaodTaskBox").click();
        }else{
            parent.emptyformw();
            $(".bodyMask").fadeIn();
            //$(window.parent.document).find(".bodyMask").fadeIn();
            parent.appendDitHtml();
            //parent.getTag();
        }
    });

    $("#submit").click(function () {
        /*var form = $("#ajaxform");
        form.submit();*/
    });

    $(window.parent.document).find("#clear-btn").click(function () {
        parent.emptyformw();
        window.location.reload();
    });

        $("#submit1").click(function () {
            if($("#comment-content").val()==""){
                alert("请输入评论内容");
                return
            }
            var url = "phoibe/comment/save";
            var userStr = getCookie("userObject");
            var userId =1;
            if (null!=userStr&&""!=userStr) {
                userObject = JSON.parse(userStr);
                userId = userObject.id;
            }
            var formdata = {
                commentContent: $("#comment-content").val(),
                score: parseInt($("#comentscore").val()),
                documentId: parseInt(tid),
                userId: userId
            };
            $.ajax({
                type: 'POST',
                url: GAL_URL + url,
                data:JSON.stringify(formdata),
                async: false,
                dataType: 'json',
                contentType: "application/json",
                success: function (result) {
                    if (result.code == "SUCCESS") {
                        $("#comment-content").val("");
                        alert("评论成功");
                        loadData(0);
                        getInfo();
                    }else{
                        alert("评论失败")
                    }
                }
            });
        });

});   

      