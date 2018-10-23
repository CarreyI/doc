var totalRows = 20;
var currPage = 0;

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var username_value = $("#tag_username").val();
    var nickname_value = $("#tag_nickname").val();
    var realname_value = $("#tag_realname").val();
    var type_value = $("#tag_type").val();

    var data = GAL_URL+"/phoibe/user/list/"+pageindex+"/20?1=1";

    if (username_value != "undefined" && username_value != null && username_value != "") {
        data = data + "&userName=" + username_value.toLowerCase();
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
          //  alert(total_rows);
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
                    + nickname + "</td><td>" + type_name + "</td>" +
                    "<td><a class='list-del user-edit' uid='"+id+"'>修改</a>&nbsp;&nbsp;<a  class='list-del doc-del' uid='"+id+"'>删除</a></td></tr>";
                $("#tblist-body").append(row);
            });
            $(".doc-del").click(function () {
                var uid = $(this).attr("uid");
                userDelAjax(uid);

            });
            $(".user-edit").click(function () {
                var uid = $(this).attr("uid");
                $("#ajaxform")[0].reset();
                $(".model-title").html("修改用户");
                $("#submit").hide();
                $("#editBtn").show();
                getUser(uid);
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

function userDelAjax(Id){
    if (confirm("确认删除选中用户吗？")) {
        var action = "phoibe/user/remove/" + Id;
        $.ajax({
            url: GAL_URL + action,
            type: "DELETE",
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

    loadData(0);
    getRolelist();
    $("#btnadd").click(function () {
        $("#ajaxform")[0].reset();
        $(".bodyMask").fadeIn();
        $(".model-title").html("添加用户");
        $("#editBtn").hide();
        $("#submit").show();
    });
    $("#btnmodify").click(function () {
        var Id = $("#tblist-body input[type=radio]:checked").attr("data-value");
        if (Id!=null){
            $("#ajaxform")[0].reset();
            $(".model-title").html("修改用户");
            $("#submit").hide();
            $("#editBtn").show();
            getUser(Id);
        }else{
            alert("请选择要修改的数据");
        }
    });
    $(".closed").click(function () {
        $(".bodyMask").hide();
    });

    $("#btnSearch").click(function () {
        loadData(0);
        parent.iframeLoad();
    });
    $("#btndel").click(function () {
        var Id = $("#tblist-body input[type=radio]:checked").attr("data-value");
        if (Id!=null){
                userDelAjax(Id);
        }else{
            alert("请选择要删除的数据");
        }
    });

    $('#submit').click(function () {
        var form = $("#ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
        var roleArray=[];
        var Id=3;
        roleArray.push(Id);
        formdata.roleId = roleArray;
        $.ajax({
            url: GAL_URL + form.attr("action"),
            type: form.attr("method"),
            data: JSON.stringify(formdata),
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code="success") {
                    $("#ajaxform")[0].reset();
                    alert("提交成功");
                    $(".bodyMask").hide();
                    loadData(0);
                }else{
                    alert("提交失败");
                }
            }
        });
    })

    $('#editBtn').click(function () {
        var action = "phoibe/user/update";
        var form = $("#ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
        var roleArray=[];
        $("#ajaxform input[type=checkbox]:checked").each(function(){
            var Id = $(this).attr("role_Id");
            roleArray.push(Id);
        });
        formdata.roleId = roleArray;
        formdata.id = formdata.userId;
        $.ajax({
            url: GAL_URL + action,
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
function getRolelist(){

    $.ajax({
        url: GAL_URL + "phoibe/user/role/list",
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.code="success") {
                //var userInfo = data.data;
                var rolelist_html ="";
                var roleObj = data.data;
                for (var i in data.data){
                    var roleId = roleObj[i].roleId;
                    var roleType = roleObj[i].roleType;
                    var roleName = roleObj[i].roleName;
                    rolelist_html = rolelist_html + "<li><input name=\"roleId\" type=\"checkBox\" role_Id="+roleId+" role_type="+roleType+">"+roleName+"</li>";
                }
                $(".roleCheckbox").html(rolelist_html);
            }
        }
    });
}
function getUser(Id){

    $.ajax({
        url: GAL_URL + "phoibe/user/fetch/"+Id,
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.code="success") {
                var userInfo = data.data;
                $("#userName").val(userInfo.userName);
                $("#realname").val(userInfo.realname);
                $("#nickname").val(userInfo.nickname);
                $("#usertype").val(userInfo.type);
                var roles = userInfo.roles;

                $(".userId").val(userInfo.id);

                var roleObj = userInfo.roles;
                $("#ajaxform input[type=checkbox]").prop("checked",false);
                for (var i in roleObj){
                    var roleType = roleObj[i].roleType;
                    $("#ajaxform input[role_type="+roleType+"]").prop("checked",true);
                }

                $(".bodyMask").fadeIn();
            }
        }
    });

}