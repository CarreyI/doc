var totalRows = 10;
var currPage = 0;

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var username_value = $("#username").val();
    var nickname_value = $("#nickname").val();
    var realname_value = $("#realname").val();
    var create_time_value = $("#create_time").val();

    var data = GAL_URL+"phoibe/comment/list/"+pageindex+"/10?1=1";

    if (username_value != "" && username_value != null) {
        data = data + "&username=" + username_value.toLowerCase();
    }
    if (nickname_value != "" && nickname_value != null) {
        data = data + "&nickname=" + nickname_value.toLowerCase();
    }
    if (realname_value != "" && realname_value != null) {
        data = data + "&realname=" + realname_value.toLowerCase();
    }

    if (create_time_value != "" && create_time_value != null) {
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
                //alert(JSON.stringify(val));
                var id = val["id"];//
                var username = val["userName"];//"用户名";
                var realname = val["realname"];//"姓名";
                var nickname = val["nickname"];//"姓名";
                var title = val["title"];//"标题";
                var comment_content = val["commentContent"];//"评论内容";
                var create_time = val["createTime"];//"创建时间";


                var row="<tr><td class='chksel'><input type='radio' name='chksel' data-value='" + id + "'</td>" +
                    "<td>"+username+"</td>"
                    +"<td>"+realname+"</td>"
                    +"<td>"+nickname+"</td>"
                    +"<td>"+title+"</td>"
                    +"<td>"+comment_content+"</td>"
                    +"<td>"+create_time+"</td>"
                    +"</tr>";
                $("#tblist-body").append(row);
                parent.iframeLoad();
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
                    loadData(obj.curr-1);
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
    $("#btndel").click(function () {
        var Id = $("#tblist-body input[type=radio]:checked").attr("data-value");
        if (Id!=null){
            var action = "phoibe/comment/remove/"+Id;
            $.ajax({
                url: GAL_URL + action,
                type: "DELETE",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.code="success") {
                        alert("删除成功");

                        loadData(0);
                    }else{
                        alert("删除失败");
                    }
                }
            });
        }else{
            alert("请选择要删除的数据");
        }
    });

    loadData(0);

    $("#btnSearch").click(function () {
        loadData(0);

    });

});