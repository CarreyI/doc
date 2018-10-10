
var totalRows = 0;
var currPage = 0;
var tid = getUrlString("tid");
var userid=0;
function getInfo() {
    var url = GAL_URL+"phoibe/document/fetch/" + tid;
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (result) {
            if (result.code = "SUCCESS") {
                userid= result.data.userId
                var suffx = result.data.format.replace(".","");
                if (suffx == "pdf"||suffx == "doc"||suffx == "docx") {
                    // var hrefurl = "openword.html?filePath="+result.data.filePath+"&docId="+tid;
                    var hrefurl = "phoibe/document/previewDoc/"+tid;
                    hrefurl = GAL_URL+hrefurl;
                    $(".perview").attr("href",hrefurl);
                    $("#icontitle").attr("class", "pdf");
                }else{
                	$(".perview").remove();
                }
                var collection= result.data.isCollection;
                if (collection){
                    $("#favorite").addClass("favorite_ok");
                    $("#favorite").attr("status",1)
                }
                $("#attention").attr("status",result.data.subscribe);
                $("#date").html(result.data.createTime);
                $("#format").html(result.data.format);
                $("#size").html(result.data.fileSize);
                $("#owner").html(result.data.userRealName);
                $("#tag").html(result.data.tag);
                $("#doctitle").html(result.data.name);
                $("#score").html(result.data.score);
                var description = result.data.description;

                if(description!="undefined" && description!=""){
                    $("#doc-content").html("<p>"+description+"</p>");
                }

                parent.iframeLoad();
            }
        }
    });
}

function loadData(pageindex) {
    $("#comm-content").children().remove();
    var docid = getUrlString("tid");
    var url = GAL_URL+"phoibe/comment/list/"+docid+"/"+pageindex+"/10";
	//alert(url);
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                dataType: 'json',
                success: function (result) {
                    var total_rows = result.data.totalCount;
                    totalRows = total_rows;
                 $("#comment").html(total_rows);
                    $.each(result.data.dataList, function (i, val) {
                        var content = val["commentContent"];
                        var createTime = val["createTime"];
                        var title = $("#doctitle").html();
                        var name = val["nickname"];
                        var step = 0;
                        var row = "";
                        var row = "<div class='row'><div class='imghead'><img src='images/head.png' /></div><span class='name'>" + name + "</span><span class='com-date'>"+createTime+"</span><br /><span class='doctitle'>《" + title + "》</span><span id='commconten'>"+content+"</span></div>";
                        //alert(row);
                        $("#comm-content").append(row);
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
                  , curr: currPage//当前页,
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

function initstar() {
    var num = finalnum = tempnum = 0;
    var lis = document.getElementsByTagName("li");
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
            $("#comentscore").val(((tempnum-2)/2));
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
                $("#attention").addClass("attention_ok");
                $("#attention").attr("status",1)
            }
        }
    });
}

//关注
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
                    $("#attention").addClass("attention_ok");
                    $("#attention").removeClass("attention");
                    $("#attention").attr("status",1)
                }else{
                    $("#attention").addClass("attention");
                    $("#attention").removeClass("attention_ok");
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
                    $("#favorite").addClass("favorite_ok");
                    $("#favorite").removeClass("favorite");
                    $("#favorite").attr("status",1)
                }else{
                    $("#favorite").addClass("favorite");
                    $("#favorite").removeClass("favorite_ok");
                    $("#favorite").attr("status",0)
                }
            }
        }
    });
}
//下载
function downloadAjax(){
    url = GAL_URL + "phoibe/document/download?Id=" + tid;
    window.location.href = url;
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
$(function () {
    initstar();
        getInfo();
        loadData(0);
    isAttention();
    $(".attention").click(function () {
        attentionAjax(tid);
    });
    $(".favorite").click(function () {
        favoriteAjax(tid);
    });
    $(".download").click(function () {
        downloadAjax(tid);
    });
        $("#submit").click(function () {
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
                    }else{
                        alert("评论失败")
                    }
                }
            });
        });

});   

      