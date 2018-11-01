function appendDitHtml(){
    var dataDict = parent.dataDictLoadAjax();
    // {
    // "SOLDIERS":[{"dictKey":"PB","dictName":"炮兵"},[{"dictKey":"TXB","dictName":"通讯兵"}],[{"dictKey":"ZJB","dictName":"装甲兵"}],[{"dictKey":"BB","dictName":"步兵"}]],
    // "COMBAT":[{"dictKey":"BZ","dictName":"兵种战例"},[{"dictKey":"XF","dictName":"西方战例"}],[{"dictKey":"EJ","dictName":"俄军战例"}],[{"dictKey":"SJ","dictName":"苏军战例"}]]}
    // <option value="4 ">兵种战例</option>
    var wartype = "";
    var armtype = "";
    $.each(dataDict.COMBAT,function (i,val) {
        wartype +="<li class='tag-li' dictKey="+val["id"]+">"+val["dictName"]+"</li>";
    })
    $.each(dataDict.SOLDIERS,function (i,val) {
        armtype +="<li class='tag-li' dictKey="+val["id"]+">"+val["dictName"]+"</li>";
    })
    $(".wartype").html(wartype);
    $(".armtype").html(armtype);
    $(".wartype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
    $(".armtype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
}
function appendTagHtml() {
    var dataList = parent.tagLoadAjax(10000);
    var rowhtml = "";
    $.each(dataList, function (i, val) {
        var id = val["id"];
        var name = val["name"];//"标签名称";
        rowhtml +="<li class='tag-li' dictkey='"+id+"'>"+name+"</li>";
    });
    $(".tagtype").html(rowhtml);

    $(".tagtype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });
}
function appendHotSearchHtml(){
    var resultData = parent.hotsearchLoadAjax();
    var rowhtml = "<li class=''>热搜：";
    $.each(resultData, function (i, val) {
        rowhtml +="<a class='line-li' href='#'>" + val + "</a>";
    });
    rowhtml=rowhtml+"</li>";
    $("#hotSerach").html(rowhtml);

    $("#hotSerach a").click(function () {
        var hotChar = $(this).text();
        $("#search-key").val(hotChar);
       $("#btnSearch").click();
    })
    $("#serachType a").click(function () {
        $(this).addClass("acheck");
        $("#btnSearch").click();
    })

}
function appendUserSearchHtml(){
    var resultData = parent.usersearchLoadAjax();
    var rowhtml = "";
    $.each(resultData, function (i, val) {
        rowhtml +="<option value='"  + val + "' />";
    });
    $("#userSearchList").html(rowhtml);
}
function bindZhanfa() {
    $("#zgzhanfa").children().remove();
    var userStr = getCookie("userObject");
    var userId =1;
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
    }
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/user/0/4?userId='+userId,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            var step = 0;
            var row = "";
            $.each(result.data.dataList, function (i, val) {
                var title = val["name"];
                var isstock = val["isstock"];
                var auditStatus = val["auditStatus"];
                var status = val["status"];
                var tid = val["id"];
                var statusStr="";
                var url="href='docdetail.html?tid=" + tid + "'";
                if (isstock==1){
                    if (auditStatus==1){
                        statusStr="审核中";
                    }else if(auditStatus==2) {
                        statusStr="发布中"
                    }else if(auditStatus==3) {
                        statusStr="审核未通过";
                    }
                } else if (isstock==2&&auditStatus==2) {
                    statusStr="已发布"
                }
                if (status==101){
                    statusStr="上传中断";
                    var url=" style='color:#666;cursor: pointer;' onClick=editDocFun("+tid+")";
                }
                var row = "<li class='per-60'><i class='i-star'></i><a title='" + title + "' "+url+" >" + cutString(title, 20) + "</a></li><li class='per-30'>" + statusStr + "</li>";
                $("#zgzhanfa").append(row);
            });
        }
    });
}
function bindResouDoc() {
    $(".resou-doc").children().remove();
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/hot',
        dataType: 'json',
        success: function (result) {
            var step = 0;
            $.each(result.data, function (i, val) {
                step = step + 1;
                var row="";
                var realname = val["realname"];
                var nickname = val["nickname"];
                var docnum = val["phoibeDocuments"].length;
                var phoibeDocuments = val["phoibeDocuments"];
                var score=val["avgScore"];
                for (var i in phoibeDocuments){
                    var docObj = phoibeDocuments[i];
                    var title= docObj.name;
                    var format = docObj.format;
                    var tid = docObj.id;
                    var icon = "";
                    if (format == "pdf") {
                        icon = "<i class='pdf'></i>";
                    }
                    else if (format == "doc" || format == "docx") {
                        icon = "<i class='doc'></i>";
                    }
                    else {
                        icon = "<i class='exls'></i>";
                    }
                    row = row + "<li>" + icon + "<a href='docdetail.html?tid=" + tid + "' title="+title+">" + cutString(title, 34) + "</a></li>";
                }
                var scoreStr="";
                for(var l=0;l<score;l++){
                    scoreStr= scoreStr+ "<i class='i-star'></i>";
                }
                if (scoreStr==""){
                    scoreStr="无";
                }
                var trow = "<div class='col3  clearfix'>" +
                    "<div class='ul-header'><div class='ul-img fl'><a href='searchadv.html?owner=" + nickname + "' title="+nickname+"><img src='images/index-head.png'/></a></div><div class='ul-header-right fl'>" +
                    "<div class='ul-header-name'><a href='searchadv.html?owner=" + nickname + "' title="+nickname+">"+nickname+"</a>&nbsp;&nbsp;" +
                    "<span class='ul-header-docnum'>"+docnum+"</span>篇文档&nbsp;</div>"
                    +"<div class='scoreremark'>评分:" +scoreStr
                    +"</div></div></div><ul class='list1'>" + row + "</ul></div>";
                $("#resou-doc").append(trow)
            });
        }
    });
}

function bindRecommDoc() {
    $("#zgzhanfa").children().remove();
    var url = GAL_URL + 'phoibe/document/list/0/16?f=handpick&isstock=2';
    //alert(url);
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            var step = 0;
            var row = "";
            $.each(result.data.dataList, function (i, val) {
                var format = val["format"];
                step = step + 1;

                var icon = "";
                if (format == "pdf") {
                    icon = "<i class='pdf'></i>";
                }
                else if (format == "doc" || format == "docx") {
                    icon = "<i class='doc'></i>";
                }
                else {
                    icon = "<i class='exls'></i>";
                }
                var docname = val["name"];
                var createTime = val["stockTime"];
                var tid = val["id"];
                var description=val["description"];
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                row = row + "<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                    "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>" + icon +cutString(docname,28)+
                    "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime.substring("5","10")+"</span></h5></div>"+
                    "<div class='right-item-desc'>"+cutString(description,76)+"</div>"+
                    "</a></li>";
                if (step == total_rows) {
                    var trow = "<div class='col3'><ul class='list1'>" + row + "</ul></div>";;
                    $("#recom-doc").append(trow)
                    return;
                }
                if (step % 4 == 0) {
                    var trow = "<div class='col3'><ul class='list1'>" + row + "</ul></div>";;
                    $("#recom-doc").append(trow)
                    row = "";
                }

            });
        }
    });
}
function bindDym() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/list/0/20?f=storage&isstock=2',
        //url: 'http://199.139.199.154:8090/phoibe/document/selectDoucumentList',
        dataType: 'json',
        success: function (result) {
            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var createTime = val["stockTime"];
                var tid = val["id"];
                var description=val["description"];
                if (""==description||null==description){
                    description="当前没有摘要内容，请查看附件...";
                }
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                    "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,24)+
                    "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime.substring("5","10")+"</span></h5></div>"+
                    "<div class='right-item-desc'>"+cutString(description,76)+"</div>"+
                    "</a></li>";
                $("#lst-dym").append(row);
                //alert(row);
            });
        }
    });
}
function getUserDocNum() {

    var userStr = getCookie("userObject");
    var userId =1;
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
    }
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/count?userId='+userId,
        dataType: 'json',
        success: function (result) {
            if (result.code == "SUCCESS");
            //alert(result.data);
            var url_tag = GAL_URL+"percenter.html";
            $("#userdocnum").attr("href",url_tag);
            $("#userdocnum").html(result.data);
        }
    });
}
function getDocNum() {

    var userStr = getCookie("userObject");
    var userId =1;
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
    }
     //SOLDIERS3223423
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/statistical/COMBAT',
        dataType: 'json',
        success: function (result) {

            if (result.code == "SUCCESS"){
                $.each(result.data,function (i,val) {
                    if (i<6){
                    var name = val.name;
                    var count = val.count;
                    var wartype=val.id;
                        var hrefUrl= "searchadv.html?combatArray="+wartype;
                        var countStr=""+count;
                        if (count>10000){
                            countStr = parseInt(count/10000) + "+&nbsp;万";
                        }
                    var row="<li><span>"+name+"：<a href='"+hrefUrl+"'target='_self'>"+countStr+"</a></span></li>";

                    $(".dw-bk ul").append(row);
                    }
                })
            }

        }
    });
}

function editDocFun(docId){
    $("#upload").click();
    parent.getDocObjecLoad(docId);
}
$(function () {
    getUserDocNum();
    getDocNum();
    bindRecommDoc();
    bindDym();
    bindZhanfa();
    bindResouDoc();
    appendDitHtml();
    appendTagHtml();
    appendUserSearchHtml();
    appendHotSearchHtml();
    $("#upload").click(function () {
        var itemlength = $(window.parent.document).find("#thelist").find(".item").length;
        if (itemlength>0){
            alert("有未上传完成的任务，请先上传");
            $(window.parent.document).find(".uplaodTaskBox").click();
        }else{
            parent.emptyformw();
            $(window.parent.document).find(".bodyMask").fadeIn();
            parent.appendDitHtml();
            parent.getTag();
        }
    });
    $(window.parent.document).find("#clear-btn").click(function () {
        parent.emptyformw();
        window.location.reload();
    });
    $("#condif").click(function () {
        $("#condwhere").fadeIn();
    });
    $(".closed").click(function () {
        $("#condwhere").fadeOut();
    });

   
    $(".btnSearch").click(function () {

        var url = 'searchadv.html?';
        var data="";

        var searchKey = $("#search-key").val();
        if (searchKey!=""&&searchKey!=null){
            data =  data+ "&search-key=" + searchKey;
        }
        var docname = $("#docname").val();
        if (docname!=""&&docname!=null){
            data = data + "&docname=" + docname;
        }
        var owner = $("#owner").val();
        if (owner != "") {
            data = data + "&owner=" + owner;
        }
        var warstate = $("#warstate").val();
        if (warstate != "") {
            data = data + "&warstate=" + warstate;
        }
        var waraddr = $("#waraddr").val();
        if (waraddr != "") {
            data = data + "&waraddr=" + waraddr;
        }
        var wartime_start = $("#wartime_start").val();
        if (null!=wartime_start&&wartime_start != "") {
            data = data + "&wartime_start=" + wartime_start;
        }
        var wartime_end = $("#wartime_end").val();
        if (null!=wartime_end&&wartime_end != "") {
            data = data + "&wartime_end=" + wartime_end;
        }
        var winner = $("#winner").val();
        if (winner != "") {
            data = data + "&winner=" + winner;
        }
        var loser = $("#loser").val();
        if (loser != "") {
            data = data + "&loser=" + loser;
        }
        var warnum = $("#warnum").val();
        if (warnum != "") {
            data = data + "&warnum=" + warnum;
        }
        var wartypevalue = "";
        $(".wartype .tag-li-in").each(function () {
            wartypevalue = $(this).attr("dictKey");
            data = data + "&combatArray=" + wartypevalue;
        })
        var armtypevalue = "";
        $(".armtype .tag-li-in").each(function () {
            armtypevalue = $(this).attr("dictKey");
            data = data + "&armsArray=" + armtypevalue;
        })
        var tagtypevalue = "";
        $(".tagtype .tag-li-in").each(function () {
            tagtypevalue = $(this).attr("dictKey");
            data = data + "&tagArray=" + tagtypevalue;
        })
        var doctypevalue = $("#serachType .acheck").attr("format");
        if (doctypevalue != "" && doctypevalue != null) {
            data = data + "&format=" + doctypevalue;
        }

        data = GAL_URL + url+ data;
        window.location.href = encodeURI(data);
    });
});