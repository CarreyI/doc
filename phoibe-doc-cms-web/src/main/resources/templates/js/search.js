var totalRows = 0;
var currPage = 1;
var pageSize =7;

function loadData(type,pageindex) {

    $("#docmgr-content").children().remove()

    var url = 'phoibe/document/list/user/' + pageindex + '/'+pageSize+'?1=1';
    var data="";
    var searchKey = $("#search-key").val();
    if (searchKey!=""&&searchKey!=null){
        data = data+ "&contentStr=" + searchKey;
    }
    var docname = $("#docname").val();
    if (docname!=""&&docname!=null){
        data = data + "&docname=" + docname+ "&name=" + docname;
    }

    var owner = $("#owner").val();
    if (owner != "") {
        data = data + "&nickname=" + owner;
    }
    var winner = $("#winner").val();
    if (winner != "") {
        data = data + "&winner=" + winner;
    }
    var loser = $("#loser").val();
    if (loser != "") {
        data = data + "&loser=" + loser;
    }

    var turl = getulvaluestr("warstateu","warstateArray");
    if (null!=turl&&turl!= "") {
        data = data + turl;
    }
    else{
        var warstate = getUrlString("warstate");

        if(warstate!=null && warstate!="")
            data = data+"&warstate="+warstate;
    }

    turl = getulvaluestr("warstypeu","warstypeArray");

    if(turl!=""){
        data=data+turl;
    }
    else {
        var warstype = getUrlString("warstype");
        if(warstype!=null && warstype!="")
            data = data+"&warstype="+warstype;
    }


    turl = getulvaluestr("waraddru","waraddrArray");
    if(turl!=""){
        data=data+turl;
    }
    else {
        var waraddr = getUrlString("waraddr");
        if(waraddr!=null && waraddr!="")
            data = data+"&waraddr="+waraddr;
    }

    /*turl = getulvaluestr("warstypeu","warstypeArray");
    if(turl!=""){
        data=data+turl;
    }
    else {
        var wastype = getUrlString("wastype");
        if(wastype!=null && wastype!="")
            data = data+"&wastype="+wastype;
    }*/

    turl = getulvaluestr("fighttypeu","fighttypeArray");
    if(turl!=""){
        data=data+turl;
    }
    else {
        var fighttype = getUrlString("fighttype");
        if(fighttype!=null && fighttype!="")
            data = data+"&fighttype="+fighttype;
    }


    turl = getulvaluestr("combattypestringu","combattypestringArray");
    if(turl!=""){
        data=data+turl;
    }
    else {
        var combattypestring = getUrlString("combattypestring");
        if(combattypestring!=null && combattypestring!="")
            data = data+"&combattypestring="+combattypestring;
    }

    turl = getulvaluestr("corpstypeu","corpstypeArray");
    if(turl!=""){
        data=data+turl;
    }
    else {
        var corpstype = getUrlString("corpstype");
        if(corpstype!=null && corpstype!="")
            data = data+"&corpstype="+corpstype;
    }

    turl = getulvaluestr("fighttraitu","corpstypeArray");
    if(turl!=""){
        data=data+turl;
    }
    else {
        var fighttrait = getUrlString("fighttrait");
        if(fighttrait!=null && fighttrait!="")
            data = data+"&fighttrait="+fighttrait;
    }



    var fighttime = $("#fighttime").val();
    if (null!=fighttime&&fighttime!= "") {
        data = data + "&fightTime=" + fighttime;
    }
    else{
        if(getUrlString("fighttime")!=null ){
            data = data+"&fightTime="+getUrlString("fighttime");
        }
    }



    var doctype=$('input:radio[name="doctype"]:checked').val();
    if (null!=doctype&&doctype != "") {
        data = data + "&docType=" + doctype;
    }
    else{
        if(getUrlString("docType")!=null ){
            data = data+"&docType="+getUrlString("docType");
        }
    }

    $("#condwhere").find("select option:checked").each(function (i,val) {
        var input_id = $(this).parent().attr("id");
        var filedft = $(this).val();
        if (""!=filedft){
            data = data + "&"+input_id+"=" + filedft;
        }
    })
    var tagtypevalue = "";
    $("#tag .tag-li-in").each(function () {
        tagtypevalue = $(this).attr("dictKey");
        data = data + "&tagArray=" + tagtypevalue;
    })


    var queryFlag = $("#queryFlag").val();

    if (queryFlag != "undefined" && queryFlag!="" && queryFlag!=null) {

        if(queryFlag=='mydoc') {
            var ownerId = $("#userId").val();
            url = 'phoibe/document/list/' + pageindex + '/' + pageSize + '?1=1'+ "&userId=" + ownerId;
        }
        else{
        url = 'phoibe/document/list/'+queryFlag+"/" + pageindex + '/'+pageSize+'?1=1'+"&queryFlag=" + queryFlag;
        }
    }
    var doctypevalue = "";
    $("#serachType .acheck").each(function () {
        doctypevalue += $(this).attr("format");
    })
    if (doctypevalue != "" && doctypevalue != null) {
        data = data + "&formatArray=" + doctypevalue.toLowerCase();
    }
    //alert(data);
    data = url + data + "&isstock=2";//&auditStatus=2&
    data = decodeURI(data);
    //alert(data);
    $.ajax({
             type: 'GET',
             url: GAL_URL + data,
             async: false,
             dataType: 'json',
             success: function (result) {
                 var total_rows = result.data.totalCount;
                 totalRows = total_rows;
                 var step = 0;
                 var row = "";

                 for(var i in result.data.dataList){
                     var val = result.data.dataList[i];
                     var score = val["score"];
                     var title = val["name"];
                     var format = val["format"];
                     var id = val["id"];
                     var pagecount = val["pagecount"];
                     var filesize = val["fileSize"];
                     var status = val["status"];
                     var auditstatus = val["auditStatus"];
                     var createtime = val["createTime"];
                     var owner = val["nickname"];
                     var auditdate = "2018-08-26";
                     var auditor = "admin";
                     var tag = "";
                     var docstatus = "";
                     var auditstatustyle = "f-blue";
                     var desc = val["description"];
                     var tag = "";
                     if (status == 1) {
                         docstatus = "上传中";
                     }

                     else if (status == 2) {
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
                     var descStr = "";
                     if (desc!=null&&desc!=""){
                         descStr = cutString(desc,200);
                     }
                     var row = "<div class='row'><div class='doc-row'><div class='i-doc-block'></div><a class='title' href='docdetail.html?tid="+id+"'>"+title+"</a><div class='desc' title='"+desc+"'>摘要："+descStr+"</div><ul><li>上传时间:"+createtime+
                         "</li><li class='' format='"+format+"'>格式:"+format+"</li><li>评分:"+score+"</li><li>大小:"+filesize+"kb</li><li class='owner_btn a_btn' owner='"+owner+"'>文档拥有者:" + owner + "</li></ul></div></div>";
                     $("#docmgr-content").append(row);
                     parent.iframeLoad();
                 }
             }
         });

    $(".format_btn").click(function () {
        var format_val = $(this).attr("format");
        format_val = format_val.toLocaleUpperCase();
        $(".checkList").find("li").each(function () {
            var check_val = $(this).html();
                if (format_val==check_val){
                    $(this).addClass("check");
                    $(this).attr("checked","checked");
                }
        })
        loadData(1, 0);
    });
    $(".owner_btn").click(function () {
        var owner_val = $(this).attr("owner");
        $("#owner").val(owner_val);
        loadData(1, 0);

    });

         layui.use(['laypage', 'layer'], function () {
             var laypage = layui.laypage
             , layer = layui.layer;
             //自定义首页、尾页、上一页、下一页文本
             laypage.render({
                 elem: 'notice_pages'
               , count: totalRows
               , curr: currPage
                 ,limit:pageSize
               , first: '首页'
               , last: '尾页'
               , prev: '<em>←</em>'
               , next: '<em>→</em>'
                , jump: function (obj, first) { //触发分页后的回调
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                         currPage = obj.curr;
                        loadData(1, obj.curr-1);
                    }
                }
             });
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
    $("#tag").html(rowhtml);

    /*$(".tagtype .tag-li").click(function() {
        alert("t");
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
        }
    });*/
}

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
        if ($(this).attr("class").indexOf("acheck")>-1){
            $(this).removeClass("acheck");
        } else {
            $("#serachType a").removeClass("acheck");
            $(this).addClass("acheck");
        }
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
function InitUserId() {

    var userStr = getCookie("userObject");
    var userId = 1;
    if (null != userStr && "" != userStr) {
        userObject = JSON.parse(userStr);
        userId = userObject.id;
        $("#userId").val(userId);
    }
}


function initdata(tid,data){
    var warstate = getUrlString(data);
    //alert(tid);

    if(null!=warstate && warstate!=""){
        var tagtypekey = warstate.split(",");
        for(var i=0;i<tagtypekey.length-1;i++)
        {
            //alert("#"+tid+" .tag-li[tagid='"+tagtypekey[i]+"']");
            $("#"+tid+" .tag-li[tagid='"+tagtypekey[i]+"']").addClass('tag-li-in');
        }
    }
}

     $(function () {
         InitUserId();
         $("#queryFlag").val(getUrlString("queryFlag"));

         appendTagHtml();
         appendHotSearchHtml();
         appendUserSearchHtml();
         //parent.appendDitHtml();

         //当首页跳转到查询页时，遍历取首页查询参数
         $("#condwhere").find("input").each(function () {
             var input_id = $(this).attr("id");
             var input_val = getUrlString(input_id);
             if(null!=input_val&&input_val!=""){
                 $(this).val(decodeURI(input_val));
             }
         })
         $("#condwhere").find("select").each(function (i,val) {
             var input_id = $(this).attr("id");
             var input_val = getUrlString(input_id);
             //alert(input_val);
             if(null!=input_val&&input_val!=""){
                 input_val=decodeURI(input_val);
                 //$("#"+input_id).find("option[value='"+input_val+"']").attr("selected",true);
                $("#"+input_id).val(input_val);
             }
         })

         var doctype= getUrlString("doctype");
         if(doctype!=null && doctype!=""){
             $("input[type=radio][name='doctype'][value='"+doctype+"']").attr("checked",'checked');
         }

         var tagtype = getUrlString("tagArray");
         if(null!=tagtype&&tagtype!=""){
              var tagtypekey = tagtype.split(",");
              for(var i=0;i<tagtypekey.length;i++)
             {
                 $("#tag .tag-li[dictKey='" + tagtypekey[i] + "']").addClass('tag-li-in');
             }
         }

         initdata("warstateu","warstateArray");
         initdata("waraddru","waraddrArray");
         initdata("warstypeu","warstypeArray");
         initdata("corpstypeu","corpstypeArray");
         initdata("fighttypeu","fighttypeArray");
         initdata("combattypestringu","combattypestringArray");
         initdata("fighttraitu","fighttraitArray");

         var tagtype = getUrlString("tagname");
         if(null!=tagtype&&tagtype!=""){
             $("#tag").val(tagtype);
         }
         var format = getUrlString("format");

         if (format != "" && format != null) {
             $("#serachType").find("a").each(function () {
                 var check_val = $(this).attr("format");
                 if (format.indexOf(check_val) > -1) {
                     $(this).addClass("acheck");
                 }
             })
         }
         loadData(0,0);

         $("#condif").click(function () {
             $("#condwhere").fadeIn();
         });
         $(".closed").click(function () {
             $("#condwhere").fadeOut();
         });

         $(".btnSearch").click(function () {
             currPage = 0;
             totalRows = 0;
             loadData(currPage,totalRows);
             $("#condwhere").fadeOut();
         });
     });