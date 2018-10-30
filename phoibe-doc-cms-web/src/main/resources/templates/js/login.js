$(function () {
    $("#btnreset").click(function () {
        $("#username").val("");
        $("#password").val("");
    });
    $("#btnregister").click(function(){
        $(".bodyMask").fadeIn();
    });
    $(".closed").click(function () {
        $(".bodyMask").fadeOut();
    });

    $("#btnlogin").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        password = hex_md5(password);
        var url = GAL_URL + 'phoibe/userlogin';
        $.ajax({
            type: 'POST',
            url: url,
            data:{"username":username,"password":password},
            dataType: 'json',
            success: function (result) {

                if (result.code == "SUCCESS") {
                    setCookie("username", username);
                    setCookie("userObject", JSON.stringify(result.data));
                    if (self != top) {
                        top.location.reload();
                        //top.frames["frm-main"].location.href = './index-m.html';
                    }
                    else {
                        window.location.href = './index.html';
                    }
                }
                else {
                    alert("用户名或密码错误，请重新输入。");
                }
            }
        });
    });
    $('#submit').click(function () {
        if (!userCheckAjax()){
            return
        }
        var form = $("#ajaxform");
        var formdata ={};
        for (var i = 0; i < form.serializeArray().length; i++) {
            var key = form.serializeArray()[i].name;
            var value = form.serializeArray()[i].value;
            formdata[key] = value;
        }
        var roleArray=[];
        roleArray.push(3);

        formdata.roleId = roleArray;
        formdata.password = formdata.repassword;
        $.ajax({
            url: GAL_URL + form.attr("action"),
            type: form.attr("method"),
            data: JSON.stringify(formdata),
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code="SUCCESS") {
                    alert("注册成功");
                    $("#username").val(formdata.userName);
                    $(".bodyMask").hide();
                    loadData(0);
                }else{
                    alert("注册失败");
                }
            }
        });
    })
    // 回车按下响应事件
    $(document).keypress(function(e) {
        // 回车键事件
        if(e.which == 13) {
            $("#btnlogin").click();
        }
    });
});
function userCheckAjax(){
    var pd = true;
    var msg="";
    $("#ajaxform input").each(function () {
        if (!$(this).val()){
            msg+=$(this).attr("title")+"不能为空！";
           pd = false;
        }
    });
    var regpassword = $("#regpassword").val();
    var repassword = $("#repassword").val();
    if(regpassword!=repassword){
        alert("请确认密码两次输入一致！");
        return false;
    }
    if (pd){
        var userName = $("#userName").val();
        var nickname = $("#nickname").val();
        $.ajax({
            url: GAL_URL + "/phoibe/user/isExitUser?userName="+userName+"&nickname="+nickname,
            type: "GET",
            dataType: "json",
            async: false,
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if (data.code="SUCCESS") {
                    if (data.data.length>0){
                        pd= false;
                        alert("用户名或昵称已存在")
                    }
                }else{
                    alert("注册出错，请联系管理员")
                    pd= false;
                }
            }
        });
    }else {
        alert(msg)
    }
    return pd
}