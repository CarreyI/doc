var totalRows = 10;
var currPage = 1;

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var username_value = $("#username").val();
    var nickname_value = $("#nickname").val();
    var realname_value = $("#realname").val();
    var create_time_value = $("#create_time").val();

    var data = GAL_URL+"phoibe/comment/list/"+pageindex+"/10?1=1";

    if (username_value != "undefined" && username_value != null) {
        data = data + "&username=" + username_value.toLowerCase();
    }
    if (nickname_value != "undefined" && nickname_value != null) {
        data = data + "&nickname=" + nickname_value.toLowerCase();
    }
    if (realname_value != "undefined" && realname_value != null) {
        data = data + "&realname=" + realname_value.toLowerCase();
    }

    if (create_time_value != "undefined" && create_time_value != null) {
        data = data + "&create_time=" + create_time_value.toLowerCase();
    }

    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            $.each(result.data.dataList, function (i, val) {
                var id = val["id"];//
                var username = val["username"];//"用户名";
                var nickname = val["nickname"];//"姓名";
                var title = val["title"];//"标题";
                var comment_content = val["commentContent"];//"评论内容";
                var create_time = val["createTime"];//"创建时间";

                var row = "<tr><td class='chksel'><input type='radio' name='chksel' data-value='" + id + "'/></td><td>"
                    + username + "</td><td>" + nickname + "</td><td>"
                    + title + "</td><td>" + comment_content + "</td><td>"
                    + create_time + "</td></tr>";
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
        alert(GAL_URL + form.attr("action"));
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