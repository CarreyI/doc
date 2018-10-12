var totalRows = 10;
var currPage = 0;

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var username_value = $("#username").val();
    var title_value = $("#title").val();

    var data = GAL_URL+"phoibe/comment/list/"+pageindex+"/10?1=1";

    if (username_value != "" && username_value != null) {
        data = data + "&username=" + username_value.toLowerCase();
    }
    if (title_value != "" && title_value != null) {
        data = data + "&title=" + title_value.toLowerCase();
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


                var row="<tr><td class='chksel'><input type='checkbox' name='chksel' data-value='" + id + "'</td>" +
                    "<td>"+username+"</td>"
                    +"<td>"+realname+"</td>"
                    +"<td>"+nickname+"</td>"
                    +"<td>"+title+"</td>"
                    +"<td>"+comment_content+"</td>"
                    +"<td>"+create_time+"</td>"
                    +"<td><a  class='list-del doc-del' cid='"+id+"'>删除</a></td></tr>";
                $("#tblist-body").append(row);
                parent.iframeLoad();
            });
            $(".doc-del").click(function () {
                var cid = $(this).attr("cid");
                commgrDelAjax(cid);

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

function commgrDelAjax(Id){
    var action = "phoibe/comment/remove";
    $.ajax({
        url: GAL_URL + action,
        type: "post",
        data:{"_method":"delete","idstr":Id},
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
        var sel = $("#tblist-body tr td input[type='checkbox']:checked");
        if(sel.length == 0){
            alert("请选中要删除的数据");
            return
        }
        var idstr = "";
        $.each(sel,function (index,obj) {
            idstr += $(obj).attr("data-value")+",";
        })
        idstr = idstr.substring(0,idstr.length-1)
        commgrDelAjax(idstr);
    });

    loadData(0);

    $("#btnSearch").click(function () {
        loadData(0);

    });

});