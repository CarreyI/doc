function appendDitHtml(){
    var dataDict = parent.dataDictLoadAjax();
    // {
    // "SOLDIERS":[{"dictKey":"PB","dictName":"炮兵"},[{"dictKey":"TXB","dictName":"通讯兵"}],[{"dictKey":"ZJB","dictName":"装甲兵"}],[{"dictKey":"BB","dictName":"步兵"}]],
    // "COMBAT":[{"dictKey":"BZ","dictName":"兵种战例"},[{"dictKey":"XF","dictName":"西方战例"}],[{"dictKey":"EJ","dictName":"俄军战例"}],[{"dictKey":"SJ","dictName":"苏军战例"}]]}
    // <option value="4 ">兵种战例</option>
    var combat_type = "<option value='0'>全部</option>";
    var arms = "<option value='0'>全部</option>";
    $.each(dataDict.COMBAT,function (i,val) {
        combat_type +="<option value='"+val["id"]+"'>"+val["dictName"]+"</option>";
    })
    $.each(dataDict.SOLDIERS,function (i,val) {
        arms +="<option value='"+val["id"]+"'>"+val["dictName"]+"</option>";
    })
    $("#wartype").html(combat_type);
    $("#armtype").html(arms);
}
function appendTagHtml() {
    var dataList = parent.tagLoadAjax();
    var rowhtml = "<option value=''>全部</option>";
    $.each(dataList, function (i, val) {
        var id = val["id"];
        ;
        var name = val["name"];//"标签名称";
        rowhtml +="<option value='" + id + "'>" + name + "</option>";
    });
    $("#tagtype").html(rowhtml);
}
function appendHotSearchHtml(){
    var resultData = parent.hotsearchLoadAjax();
    var rowhtml = "<li class=''>热搜：</li>";
    $.each(resultData, function (i, val) {
        rowhtml +="<a class='line-li' href='#'>" + val + "</a>";
    });
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
                var tid = val["id"];
                var statusStr="";
                if (isstock==0){
                    if (auditStatus==1){
                        statusStr="审核中";
                    }else if(auditStatus==2) {
                        statusStr="发布中"
                    }else if(auditStatus==3) {
                        statusStr="审核未通过";
                    }
                } else if (isstock==1&&auditStatus==2) {
                    statusStr="已发布"
                }
                var row = "<li class='per-60'><i class='i-star'></i><a title='" + title + "' href='docdetail.html?tid=" + tid + "'>" + cutString(title, 20) + "</a></li><li class='per-30'>" + statusStr + "</li>";
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
                    row = row + "<li>" + icon + "<a href='docdetail.html?tid=" + tid + "' title="+title+">" + cutString(title, 22) + "</a></li>";
                }
                var scoreStr="";
                for(var l=0;l<score;l++){
                    scoreStr= scoreStr+ "<i class='i-star'></i>";
                }
                var trow = "<div class='col3  clearfix'>" +
                    "<div class='ul-header'><div class='ul-img fl'><img src='images/index-head.png'/></div><div class='ul-header-right fl'>" +
                    "<div class='ul-header-name'>"+realname+"&nbsp;&nbsp;" +
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
    var url = GAL_URL + 'phoibe/document/list/0/19?f=handpick&isstock=1';
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
                var title = val["name"];
                var format = val["format"];
                var tid = val["id"];
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
                row = row + "<li>" + icon + "<a href='docdetail.html?tid=" + tid + "' tile="+title+">" +cutString(title,20) + "</a></li>";
                if (step == total_rows) {
                    var trow = "<div class='col3'><ul class='list1'>" + row + "</ul></div>";;
                    $("#recom-doc").append(trow)
                    return;
                }
                if (step % 12 == 0) {
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
        url: GAL_URL + 'phoibe/document/list/0/10?f=storage&isstock=1',
        //url: 'http://199.139.199.154:8090/phoibe/document/selectDoucumentList',
        dataType: 'json',
        success: function (result) {

            $.each(result.data.dataList, function (i, val) {
                var docname = val["name"];
                var createTime = val["stockTime"];
                var tid = val["id"];
                var d = new Date();
                var curTime = d.getTime();
                var username = val["userRealName"];

                var date3 = curTime - Date.parse(createTime);  //时间差的毫秒数

                //计算出相差天数
                var days = Math.floor(date3 / (24 * 3600 * 1000));
                var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000));

                var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000))
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000))
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000)
                var minutesTip = "";
                if (seconds > 0) minutesTip = seconds + " 秒前发布";
                if (minutes > 0) minutesTip = minutes + "分钟" + minutesTip;
                if (hours > 0) minutesTip = hours + "小时" + minutesTip;
                if (days > 0) minutesTip = days + "天" + minutesTip;

                var row = "<ul class='list3'><li><a href='docdetail.html?tid=" + tid + "' title='" + docname + "'>" + cutString(docname, 14) + "</a></li><li><span>" + username + "</span></li><li>" + minutesTip + "</li></ul>";
                $("#lst-dym").append(row);
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
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/document/count?f=storage',
        dataType: 'json',
        success: function (result) {
            if (result.code == "SUCCESS");
            //alert(result.data);
            $("#docnum").html(result.data);
        }
    });
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
        parent.appendDitHtml();
        $(window.parent.document).find(".bodyMask").fadeIn();
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
        var wartime = $("#wartime").val();
        if (null!=wartime&&wartime != "") {
            data = data + "&wartime=" + wartime;
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
        var wartypevalue = $("#wartype option:selected").val();
        if (wartypevalue != 0) {
            data = data + "&wartype=" + wartypevalue;
        }
        var armtypevalue = $("#armtype option:selected").val();
        if (armtypevalue != 0) {
            data = data + "&armtype=" + armtypevalue;
        }
        var tagtypevalue = $("#tagtype option:selected").val();
        if (tagtypevalue != 0) {
            data = data + "&tagname=" + tagtypevalue;
        }
        var doctypevalue = $("#serachType .acheck").attr("format");
        if (doctypevalue != "" && doctypevalue != null) {
            data = data + "&format=" + doctypevalue;
        }

        data = GAL_URL + url+ data;
        window.location.href = encodeURI(data);
    });
});