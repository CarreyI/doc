var totalRows = 0;
var currPage = 1;
function loadData(type,pageindex) {
    $("#docmgr-content").children().remove()

    var url = 'phoibe/document/list/' + pageindex + '/10?s=1';
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
    var wartypevalue = $("#wartype .tag-li-in").attr("dictKey");
    if (wartypevalue != ""&&wartypevalue!=null) {
        data = data + "&combatType=" + wartypevalue;
    }
    var armtypevalue = $("#armtype .tag-li-in").attr("dictKey");
    if (armtypevalue != ""&&armtypevalue!=null) {
        data = data + "&arms=" + armtypevalue;
    }
    var queryFlag = $("#queryFlag").val();

    if (queryFlag != "undefined"&&queryFlag!=""&&queryFlag!=null) {
        if (queryFlag == "subscribe"){
            data = data + "&queryFlag=" + queryFlag;
        }else{
            url = 'phoibe/document/list/'+queryFlag+"/" + pageindex + '/10?1=1';
        }
    }
    var doctypevalue = "";
    $("#con-value .check").each(function () {
        if (doctypevalue==""){
            doctypevalue = $(this).html();
        }else {
            doctypevalue = doctypevalue +","+$(this).html();
        }
    })
    if (doctypevalue != "" && doctypevalue != null) {
        data = data + "&format=" + doctypevalue.toLowerCase();
    }
    data = url + data;
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
                     var owner = "admin";
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
                     var row = "<div class='row'><div class='doc-row'><a class='title' href='docdetail.html?tid="+id+"'>"+title+"</a><div class='desc'>摘要："+desc+"</div><ul><li>上传时间:"+createtime+
                         "</li><li class='format_btn a_btn' format='"+format+"'>格式:"+format+"</li><li>评分:"+score+"</li><li>大小:"+filesize+"kb</li><li class='owner_btn a_btn' owner='"+owner+"'>文档拥有者:" + owner + "</li></ul></div></div>";
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
    $("#wartype").html(wartype);
    $("#armtype").html(armtype);
    $("#wartype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $("#wartype .tag-li-in").removeClass('tag-li-in');
            $(this).addClass('tag-li-in');
        }
        loadData(1, 0);
    });
    $("#armtype .tag-li").click(function() {
        if ($(this).hasClass('tag-li-in')) {
            $(this).removeClass('tag-li-in');
        } else {
            $("#armtype .tag-li-in").removeClass('tag-li-in');
            $(this).addClass('tag-li-in');
        }
        loadData(1, 0);
    });
}
     $(function () {
         appendDitHtml();
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
         var armtype = getUrlString("armtype");
         if(null!=armtype&&armtype!=""){
            $("#armtype .tag-li[dictKey='"+armtype+"']").addClass('tag-li-in');
         }
         var wartype = getUrlString("wartype");
         if(null!=wartype&&wartype!=""){
             $("#wartype .tag-li[dictKey='"+wartype+"']").addClass('tag-li-in');
         }
         var format = getUrlString("format");

            $(".checkList").find("li").each(function () {
                var check_val = $(this).html();
                if(format!=""&&format!=null){
                    if (format.indexOf(check_val)>-1){
                        $(this).addClass("check");
                        $(this).attr("checked","checked");
                    }
                }
            })
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
             loadData(1,0);
         });
     });