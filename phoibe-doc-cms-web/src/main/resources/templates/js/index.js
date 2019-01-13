

function appendHotSearchHtml(){
    var resultData = parent.hotsearchLoadAjax();
    var rowhtml = "<li class=''>热门：";
    $.each(resultData, function (i, val) {
        rowhtml +="<a class='line-li' href='#'>" + cutString(val, 14) + "</a>";
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


function bindRecommDoc() {
    $("#zgzhanfa").children().remove();
    var url = GAL_URL + 'phoibe/document/list/0/7?f=hothit&isstock=2';
    //alert(url);
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (result) {
            $.each(result.data.dataList, function (i, val) {
                var format = val["format"];
                var docname = val["name"];
                var createTime = val["stockTime"];
                createTime = getFormatDate(createTime);
                var tid = val["id"];
                var description=val["description"];
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                    "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,18)+
                    "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime+"</span></h5></div>"+
                    "<div class='right-item-desc'>"+cutString(description,36)+"</div>"+
                    "</a></li>";
                $("#lst-rm").append(row);
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
                createTime = getFormatDate(createTime);
                var tid = val["id"];
                var description=val["description"];
                if (""==description||null==description){
                    description="当前没有摘要内容，请查看附件...";
                }
                var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
                var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
                    "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,18)+
                    "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime+"</span></h5></div>"+
                    "<div class='right-item-desc'>"+cutString(description,36)+"</div>"+
                    "</a></li>";
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
            var url_tag = GAL_URL+"percenter.html";
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
    //appendDitHtml();
    appendTagHtml();
    appendUserSearchHtml();
    appendHotSearchHtml();

    $("#upload").click(function () {

        //alert($(window.parent.document)(".tag-li").lenth);

        //$(this).parent().attr("class")
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

        //parent.index_uploaddoc();
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
        var data="1=1";
        if($("input[name='doctype']:checked").val()!=null)
            data=data+"&doctype="+$("input[name='doctype']:checked").val();

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
        var winner = $("#winner").val();
        if (winner != "") {
            data = data + "&winner=" + winner;
        }
        var loser = $("#loser").val();
        if (loser != "") {
            data = data + "&loser=" + loser;
        }
        var doctypevalue = $("#serachType .acheck").attr("format");
        if (doctypevalue != "" && doctypevalue != null) {
            data = data + "&format=" + doctypevalue;
        }

        $("#condwhere").find("select option:checked").each(function (i,val) {
            var input_id = $(this).parent().attr("id");
            var filedft = $(this).val();
            if (""!=filedft){
                data = data + "&"+input_id+"=" + filedft;
            }
        })

        var tagArray = "";
        $("#tag .tag-li-in").each(function () {
            var tag_html = $(this).attr("dictkey");
            tagArray = tagArray +tag_html+",";
        });
        data =data+"&"+"tagArray="+tagArray;

        var warstateArray = "";
        $("#warstateu .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            warstateArray = warstateArray +tag_html+",";
        });
        data =data+"&"+"warstateArray="+warstateArray;

        var waraddrArray = "";
        $("#waraddru .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            waraddrArray = waraddrArray +tag_html+",";
        });
        data =data+"&"+"waraddrArray="+waraddrArray;


        var warstypeArray = "";
        $("#warstypeu .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            warstypeArray = warstypeArray +tag_html+",";
        });
        data =data+"&"+"warstypeArray="+warstypeArray;

        var waraddrArray = "";
        $("#waraddru .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            waraddrArray = waraddrArray +tag_html+",";
        });
        data =data+"&"+"waraddrArray="+waraddrArray;


        var corpstypeArray = "";
        $("#corpstypeu .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            corpstypeArray = corpstypeArray +tag_html+",";
        });
        data =data+"&"+"corpstypeArray="+corpstypeArray;

        var fighttypeArray = "";
        $("#fighttypeu .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            fighttypeArray = fighttypeArray +tag_html+",";
        });
        data =data+"&"+"fighttypeArray="+fighttypeArray;

        var combattypestringArray = "";
        $("#combattypestringu .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            combattypestringArray = combattypestringArray +tag_html+",";
        });
        data =data+"&"+"combattypestringArray="+combattypestringArray;

        var fighttraitArray = "";
        $("#fighttraitu .tag-li-in").each(function () {
            var tag_html = $(this).attr("tagid");
            fighttraitArray = fighttraitArray +tag_html+",";
        });
        data =data+"&"+"fighttraitArray="+fighttraitArray;

        data = GAL_URL + url+ data;
        //alert(data);
       window.location.href = encodeURI(data);
    });

});