var totalRows = 0;
var currPage = 0;

var userStr = getCookie("userObject");
var userId =1;
if (null!=userStr&&""!=userStr) {
    userObject = JSON.parse(userStr);
    userId = userObject.id;
}

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var username_value = $("#username").val();
    var title_value = $("#title").val();

    var data = GAL_URL+"phoibe/comment/list/"+pageindex+"/16?1=1";
    if(userId>0){
        data = data +"&userId="+userId;
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
                var documentId = val["documentId"];

                var hrefUrl= "docdetail.html?tid=" + documentId + "' title='" + title + "'";

                var row="<tr><td><input type='checkbox' name='chksel' data-value='" + id + "'</td>"
                    /*"<td>"+username+"</td>"
                    +"<td>"+realname+"</td>"
                    +"<td>"+nickname+"</td>"*/
                    +"<td class='d-title'><a href='"+hrefUrl+"'target='_blank'>"+title+"</a></td>"
                    +"<td class='d-title'>"+cutString(comment_content,100)+"</td>"
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
            ,limit:16
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
    if (confirm("确认删除选中评论吗？")) {
        $.ajax({
            url: GAL_URL + action,
            type: "post",
            data: {"_method": "delete", "idstr": Id},
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.code == "SUCCESS") {
                    alert("删除成功");

                    loadData(0);
                } else {
                    alert("删除失败");
                }
            }
        });
    }
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
            alert("请选中要删除的评论");
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