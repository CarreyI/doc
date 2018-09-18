var totalRows = 10;
var currPage = 1;

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var username_value = $("#tag_username").val();
    var nickname_value = $("#tag_nickname").val();
    var realname_value = $("#tag_realname").val();
    var type_value = $("#tag_type").val();

    var data = GAL_URL+"/phoibe/user/list/"+pageindex+"/10?1=1";

    if (username_value != "undefined" && username_value != null && username_value != "") {
        data = data + "&username=" + username_value.toLowerCase();
    }
    if (nickname_value != "undefined" && nickname_value != null && nickname_value != "") {
        data = data + "&nickname=" + nickname_value.toLowerCase();
    }
    if (realname_value != "undefined" && realname_value != null && realname_value != "") {
        data = data + "&realname=" + realname_value.toLowerCase();
    }
    if (type_value != null&&type_value != 0) {
        data = data + "&type=" + type_value;
    }
    $.ajax({
        type: 'GET',
        url: data,
        async: false,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            $.each(result.data.dataList, function (i, val) {
                var id = val["id"];
                var username = val["userName"];//"用户名";
                var realname = val["realname"];//"姓名";
                var nickname = val["nickname"];//"昵称";
                var type = val["type"];//"类型";
                var type_name="";
                if (type == "1") {
                    type_name = "军";
                }
                else if (type == "2") {
                    type_name = "师";
                }
                else if (type == "3") {
                    type_name = "旅";
                }
                else if (type == "4") {
                    type_name = "团";
                }
                else if (type == "5") {
                    type_name = "营";
                }
                else if (type == "6") {
                    type_name = "连";
                }
                else if (type == "7") {
                    type_name = "排";
                }
                else if (type == "8") {
                    type_name = "班";
                }
                else if (type == "9") {
                    type_name = "兵";
                }
                else if (type == "10") {
                    type_name = "参谋";
                }
                var row = "<tr><td class='chksel'><input type='radio' name='chksel' data-value='" + id + "'/></td><td>"
                    + username + "</td><td>" + realname + "</td><td>"
                    + nickname + "</td><td>" + type_name + "</td></tr>";
                $("#tblist-body").append(row);
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
            , first: '首页'
            , last: '尾页'
            , prev: '<em>←</em>'
            , next: '<em>→</em>'
            , jump: function (obj, first) { //触发分页后的回调
                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                    currPage = obj.curr;
                    loadData(obj.curr);
                }
            }
        });
    });


}

$(function () {
    $("#btnadd").click(function () {
        $(".bodyMask").fadeIn();
    });
    $("#btnmodify").click(function () {
        $(".model-title").html("修改标签");
        $(".bodyMask").fadeIn();
    });
    $(".closed").click(function () {
        $(".bodyMask").hide();
    });

    loadData(0);
    $("#btnSearch").click(function () {
        loadData(0);
        parent.iframeLoad();
    });

    $('#submit').click(function () {

        var form = $("#ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
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
                    $(".bodyMask").hide();
                    loadData(0);
                }else{
                    alert("提交失败");
                }
            }
        });
    })
});