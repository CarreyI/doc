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
    var ownerId = $("#userId").val();
    if (ownerId != "") {
        data = data + "&userId=" + ownerId;
    }
    var owner = $("#owner").val();
    if (owner != "") {
        data = data + "&nickname=" + owner;
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
        data = data + "&wartimeBegin=" + wartime_start;
    }
    var wartime_end = $("#wartime_end").val();
    if (null!=wartime_end&&wartime_end != "") {
        data = data + "&wartimeEnd=" + wartime_end;
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
    var queryFlag = $("#queryFlag").val();

    if (queryFlag != "undefined"&&queryFlag!=""&&queryFlag!=null) {
        if (queryFlag == "subscribe"){
            data = data + "&queryFlag=" + queryFlag;
        }else{
            url = 'phoibe/document/list/'+queryFlag+"/" + pageindex + '/10?1=1';
        }
    }
    var doctypevalue = "";
    $("#serachType .acheck").each(function () {
        doctypevalue += $(this).attr("format");
    })
    if (doctypevalue != "" && doctypevalue != null) {
        data = data + "&formatArray=" + doctypevalue.toLowerCase();
    }
    data = url + data + "&auditStatus=2&&isstock=2";
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
                     var row = "<div class='row'><div class='doc-row'><a class='title' href='docdetail.html?tid="+id+"'>"+title+"</a><div class='desc' title='"+desc+"'>摘要："+descStr+"</div><ul><li>上传时间:"+createtime+
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
        var index = $(this).index();
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
            $(".u-con-list .wartype .tag-li:eq("+index+")").removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
            $(".u-con-list .wartype .tag-li:eq("+index+")").addClass('tag-li-in');
        }
    });
    $(".armtype .tag-li").click(function() {
        var index = $(this).index();
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
            $(".u-con-list .armtype .tag-li:eq("+index+")").removeClass('tag-li-in');
        } else {
            $(this).addClass('tag-li-in');
            $(".u-con-list .armtype .tag-li:eq("+index+")").addClass('tag-li-in');
        }
    });
    $(".search-cond  .tag-li").click(function() {
        loadData(1, 0);
    })
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
     $(function () {
         appendDitHtml();
         appendTagHtml();
         appendHotSearchHtml();
         appendUserSearchHtml();

         $("#back").click(function () {
             history.back();
         });
         //当首页跳转到查询页时，遍历取首页查询参数
         $("#condwhere").find("input").each(function () {
             var input_id = $(this).attr("id");
             var input_val = getUrlString(input_id);
             if(null!=input_val&&input_val!=""){
                 $(this).val(decodeURI(input_val));
             }
         })
         var search_key = getUrlString("search-key");
         if(null!=search_key&&search_key!=""){
             $("#search-key").val(decodeURI(search_key));
         }
         var armtype = getUrlString("armsArray");
         if(null!=armtype&&armtype!=""){
            $(".armtype .tag-li[dictKey='"+armtype+"']").addClass('tag-li-in');
         }
         var wartype = getUrlString("combatArray");
         if(null!=wartype&&wartype!=""){
             $(".wartype .tag-li[dictKey='"+wartype+"']").addClass('tag-li-in');
         }
         var tagtype = getUrlString("tagArray");
         if(null!=tagtype&&tagtype!=""){
             $(".tagtype .tag-li[dictKey='"+tagtype+"']").addClass('tag-li-in');
         }

         var tagtype = getUrlString("tagname");
         if(null!=tagtype&&tagtype!=""){
             $("#tagtype").val(tagtype);
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
             $(".search-cond .tag-li").removeClass("tag-li-in");
             $(".u-con-list .tag-li-in").each(function () {
                 var dictKey = $(this).attr("dictKey");
                 $(".search-cond .tag-li[dictKey='"+dictKey+"']").addClass('tag-li-in');
             })
             $("#condwhere").fadeOut();
         });
     });