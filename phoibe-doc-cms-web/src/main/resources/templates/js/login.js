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
    // 回车按下响应事件
    $(document).keypress(function(e) {
        // 回车键事件
        if(e.which == 13) {
            $("#btnlogin").click();
        }
    });
});