var totalRows = 10;
var currPage = 0;
var groupKey="";
function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var dictKey_value = $("#search_dictKey").val();
    var dictName_value = $("#search_dictName").val();
    var groupKey_value = $("#search_groupKey").val();
    var groupName_value = $("#search_groupName").val();

    var data = GAL_URL+"phoibe/dict/list/" + pageindex +"/20/"+pageindex+"?dictType=1";

    if (dictKey_value != "" && dictKey_value != null) {
        data = data + "&dictKey=" + dictKey_value.toLowerCase();
    }if (dictName_value != "" && dictName_value != null) {
        data = data + "&dictName=" + dictName_value;
    }
    if (groupKey_value != "" && groupKey_value != null) {
        data = data + "&groupKey=" + groupKey_value.toLowerCase();
    }
    if (groupName_value != "" && groupName_value != null) {
        data = data + "&groupName=" + groupName_value;
    }
    if (groupKey != "" && groupKey != null) {
        data = data + "&groupKey=" + groupKey.toLowerCase();
    }
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            $.each(result.data.dataList, function (i, val) {
                var id = val["id"];
                var dictKey =  val["dictKey"];
                var dictName =  val["dictName"];
                var groupKey =  val["groupKey"];
                var orderBy =  val["orderBy"];


                var row = "<tr><td>"
                    + dictName + "</td>" +
                    // "<td>" + dictKey + "</td><td>" + groupKey + "</td>" +
                    "<td>"+orderBy+"</td>" +
                    "<td><a  class='list-del doc-del' tid='"+id+"'>删除</a></td></tr>";
                $("#tblist-body").append(row);
            });
            $(".doc-del").click(function () {
                var tid = $(this).attr("tid");
                tagSonDelAjax(tid);

            });
        }
    });


    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        laypage.render({
            elem: 'notice_pages'
            , count: totalRows
            , curr: currPage//当前页,
            ,limit:20
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

function tagSonDelAjax(tid){
    if (confirm("确认删除选中的属性吗？")) {
        $.ajax({
            url: GAL_URL + "phoibe/dict/remove?idstr=" + tid,
            type: "DELETE",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
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

function loadDataMenu(){

    $.ajax({
        url: GAL_URL + "phoibe/dict/list/0/1000/0?dictType=2",
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.code="success") {
                var datalist ="<li>+ <a href=\"#\" class=\"menu-a\" dirId=''>全部字段</a></li>";
                var roleObj = data.data.dataList;
                for (var i in roleObj){
                    var groupKey = roleObj[i].groupKey;
                    var groupName = roleObj[i].groupName;

                    datalist=datalist + "<li>+ <a href=\"#\" class=\"menu-a\" groupKey='"+groupKey+"'>"+groupName+"</a>" +
                        "&nbsp;&nbsp;&nbsp;<a href=\"#\" class=\"menu-add menu-btn\" groupKey='"+groupKey+"'>新增属性</a></li>";

                }$(".data_list").html(datalist);
            }
        }
    });


    $(".data_list .menu-a").click(function(){
        groupKey = $(this).attr("groupKey");
        loadData(0);
    });
    $(".data_list li").hover(function(){
        $(this).find(".menu-btn").fadeIn();
    },function () {
        $(this).find(".menu-btn").hide();
    });
    // 新增属性
    $(".menu-add").click(function(){
        var groupkey_value= $(this).attr("groupKey");
        $("#parent_groupKey").val(groupkey_value);
        $(".son_bodyMask").fadeIn();
    });

}
$(function () {

    loadData(0);
    loadDataMenu();

    $("#btnSearch").click(function () {
        loadData(0);
        parent.iframeLoad();
    });
    $("#btnadd").click(function () {
        $(".bodyMask").fadeIn();
    });
    $(".closed").click(function () {
        $(".bodyMask").hide();
        $(".son_bodyMask").hide();
    });

    $('#group_submit').click(function () {

        var form = $("#ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
        formdata.status=formdata.sequence;

        $.ajax({
            url: GAL_URL + form.attr("action"),
            type: form.attr("method"),
            data: JSON.stringify(formdata),
            dataType: "json",
            async: false,
            // contentType: "contentType: application/x-www-form-urlencoded",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code="success") {
                    alert("提交成功");
                    $(".bodyMask").hide();
                    loadDataMenu();
                }else{
                    alert("提交失败");
                }
            }
        });
    })
    $('#son_submit').click(function () {

        var form = $("#son_ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
        formdata.status=1;
        $.ajax({
            url: GAL_URL + form.attr("action"),
            type: form.attr("method"),
            data: JSON.stringify(formdata),
            dataType: "json",
            async: false,
            // contentType: "contentType: application/x-www-form-urlencoded",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code="success") {
                    alert("提交成功");
                    $("#son_ajaxform")[0].reset();
                    $(".son_bodyMask").hide();
                    loadData(0);
                }else{
                    alert("提交失败");
                }
            }
        });
    })

});
