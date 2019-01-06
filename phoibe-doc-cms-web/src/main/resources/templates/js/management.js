$.ajaxSetup({
    complete: function(xhr) {
        //token过期，则跳转到登录页面
        if(xhr.responseJSON.status == 401){
            parent.location.href = 'login.html';
        }
    }
});
function docDetailOpenController(docId){
    appendDitHtml();
    getTag();
    var docObj = getDocObjecLoad(docId);
    $("#filebtn .preview").remove();
    $("#filebtn .download").remove();
    var suffx = docObj.format.replace(".","");
    if (suffx == "pdf"||suffx == "doc"||suffx == "docx") {
        // var hrefurl = "openword.html?filePath="+result.data.filePath+"&docId="+tid;
        var hrefurl = "phoibe/document/previewDoc/"+docId;
        hrefurl = GAL_URL+hrefurl;
        $("#filebtn").append("<a target='_blank' href='"+hrefurl+"'><span class='preview' style='cursor: pointer; color: #666;'>查看</span></a>");
    }
    var downurl = GAL_URL + "phoibe/document/download?Id=" + docId;
    $("#filebtn").append("&nbsp;&nbsp;<a target='_blank' href='"+downurl+"'><span class='download' style='cursor: pointer;color: #666; '>下载</span></a>");
    $("#formthelist .state").remove();
    $("#picker").hide();
    $("#submit").hide();
    $(".bodyMask").fadeIn();
}
function docDetailRecoverController(){
    $("#filebtn .preview").remove();
    $("#filebtn .download").remove();
    $("#picker").show();
    $(window.parent.document).find("#submit").show();
}
function hotsearchLoadAjax(){
    var data = GAL_URL+"phoibe/document/hotsearch";
    var resultData=[];
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            resultData=result.data;
        }
    });
    return resultData;
}
function usersearchLoadAjax(){
    var data = GAL_URL+"phoibe/document/usersearch";
    var resultData=[];
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            resultData=result.data;
        }
    });
    return resultData;
}function logOptionTypeLoadAjax(){
    var data = GAL_URL+"phoibe/logging/toJsonLogType";
    var dataOption={};
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            dataOption = result;
        }
    });
    return dataOption;
}
function dataDictSelectHtml() {
    var dictObj = dataDictLoadAjax();
    var dictSelectObj={};
    for (var obj in dictObj) {
        var selectHtml="";
        $.each(dictObj[obj],function (i,val) {
            selectHtml += "<option class='tag-li' value='"+val["id"]+"'>"+val["dictName"]+"</option>";
        })
        dictSelectObj[obj] = selectHtml;
    }
    return dictSelectObj;
}
function dataDictLoadAjax(){
    var data = GAL_URL+"phoibe/dict/list/0/1000/1?dictType=1";
    var dataDict={};
    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {
            $.each(result.data.dataList, function (i, val) {

                var groupKey =val["groupKey"];
                var obj= {
                    id: val["id"],
                    dictName: val["dictName"]
                }
                if (null!=dataDict[groupKey]){
                    var listobj = dataDict[groupKey];
                    listobj.push(obj);
                    dataDict[groupKey] = listobj;
                } else {
                    dataDict[groupKey] = [obj];
                }
            });
        }
    });
    return dataDict;
}

function selectfield(field){
    var fieldname="";//在映射类中的字段名，查询用
    var fieldtitle="";
    switch (field) {
        case "WARSTATE" :
            fieldtitle= "参战国家";
            fieldname= "warstate";
            break;
        case "WARNUM" :
            fieldtitle= "作战规模";
            fieldname= "warnum";
            break;
        case "WARADDR" :
            fieldtitle= "作战地域";
            fieldname= "waraddr";
            break;
        case "WARSTYPE" :
            fieldtitle= "战例类型";
            fieldname= "warstype";
            break;
        case "CORPSTYPE" :
            fieldtitle= "兵种类型";
            fieldname= "corpstype";
            break;
        case "FIGHTTIME" :
            fieldtitle= "作战年代";
            fieldname= "fighttime";
            break;
        case "FIGHTTYPE" :
            fieldtitle= "战法类别";
            fieldname= "fighttype";
            break;
        case "COMBATTYPE" :
            fieldtitle= "战斗种类";
            fieldname= "combattype";
            break;
        case "FIGHTTRAIT" :
            fieldtitle= "作战特点";
            fieldname= "fighttrait";
            break;
            break;
    }

    return {fn:fieldname,ft:fieldtitle};
}
function tagLoadAjax(num){
    var data = GAL_URL+"phoibe/tag/list/0/"+num+"?1=1";
    var dataList;
    $.ajax({
        url: data,
        type: "GET",
        dataType: "json",
        async:false,
        contentType:"application/json;charset=UTF-8",
        success: function (result)
        {
            dataList = result.data.dataList;
        }
    });
    return dataList;
}
   $(function(){

       userAuthController();

       //加载查询框
       var dataDict = dataDictSelectHtml();
       for (var obj in dataDict){
           var fieldObj = selectfield(obj);
           var fieldfn = fieldObj.fn;
           if(""!=fieldfn){
               $("#"+fieldfn).html(dataDict[obj]);
           }
       }

       //左侧页面导航切换
       $('.main .navLeft li').on('click',function(){
           $(this).addClass('active').siblings('.navList').removeClass('active')
           var taggle = $(this).attr('data-toggle');
           $("#frm-main").attr("src",taggle);
           //var dataToggle='page'+;
           //$('.main .container .page').removeClass('show')
          // $('.main .container').find('.'+dataToggle).addClass('show')
       });
       //多选框
       $('li.checkBox').on('click', function () {
           var checked = $(this).attr("checked");
           if(checked!=null&&checked == "checked"){
               $(this).removeAttr('checked');
           }else{
               $(this).attr('checked','checked');
           }
           $(this).toggleClass('check')

       })

   })

function roleAuthObject(roleType) {

    var roleObj = {
        commonRole: {
            path: "",
            ops: ""
        },
        putRole: {
            path: "index-m.html,stockmgr.html",
            ops: ""
        },
        auditRole: {
            path: "index-m.html,auditupload.html,commgr.html",
            ops: ""
        },
        adminRole: {
            path: "index-m.html,percenter.html,usermgr.html,tagmgr.html,logmgr.html",
            ops: ""
        },
        superRole: {
            path: "index-m.html,stockmgr.html,auditupload.html,commgr.html,percenter.html,usermgr.html,tagmgr.html,datamgr.html,logmgr.html",
            ops: ""
        }
    }

    var ret_roleobje={};
    if (roleType==103){
        //103	普通用户
         ret_roleobje = roleObj.commonRole;
    }
    if (roleType==104){
        //104	系统审核员
        ret_roleobje = roleObj.auditRole;
    }
    if (roleType==105){
        //105	系统入库员
        ret_roleobje = roleObj.putRole;

    }
    if (roleType==102){
        //101	系统管理员
        ret_roleobje = roleObj.adminRole;
    }
    if (roleType==101){
        //101	超级管理员
        ret_roleobje = roleObj.superRole;
    }
    return ret_roleobje;
}
function userAuthController(){
    var userStr = getCookie("userObject");
    if (null!=userStr&&""!=userStr) {
        userObject = JSON.parse(userStr);
        // "data":{"id":2,
        // "userName":"admin",
        // "type":1,
        // "createTime":"2018-08-25 15:48:22",
        // "realname":"管理员",
        // "status":1,"nickname":"管理员",
        // "roleType":102,"roleName":"管理员"}}

        var userId = userObject.id;
        var userName = userObject.userName;
        var userType = getUserType(userObject.type);
        var createTime = userObject.createTime;
        var status = userObject.status;
        var nickname = userObject.nickname;
        var roles = userObject.roles;

        var roleobj_path ="";
        for (var i in roles){
            var roleName = roles[i].roleName;
            var roleType = roles[i].roleType;

            var obj = roleAuthObject(roleType);

            roleobj_path = roleobj_path+","+obj.path;
        }

        $(".userName").html(nickname);
        $(".userIdentity").html(userType);

        $("#nav_left").hide();
        $(".fl").find("li").hide();


        $(".fl").find("li").each(function(){
           var data_toggle =  $(this).attr("data-toggle");
            var pd = roleobj_path.indexOf(data_toggle);
            //alert(pd+"--"+roleType+"--"+path+"--"+data_toggle);
            if(pd>-1){
                $("#nav_left").show();
                $(this).show();
                $("#main-content").css("padding-left", "260px");
                $("#nav_left").delay(5).animate({ left: '0' });
                $("#nav_arrow").attr("data-value", 1);
            }
        })
        if (roleobj_path==","){
            $("#main-content").css("padding-left", "20px");
            $(this).remove();
        }
    }
}
function getUserType(type){
       var typename ="";
    if (type == 1) {
        typename = "军";
    } else if (type == 2 ) {
        typename = "师";
    } else if (type == 3) {
        typename = "旅";
    } else if (type == 4 ) {
        typename = "团";
    } else if (type == 5) {
        typename = "营";
    } else if (type == 6 ) {
        typename = "连";
    } else if (type == 7) {
        typename = "排";
    } else if (type == 8 ) {
        typename = "班";
    } else if (type == 9) {
        typename = "兵";
    } else if (type == 10) {
        typename = "参谋";
    }
       return typename;
}
function getUrlString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
};


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function authExit() {
    $.ajax({
        type: 'GET',
        url: GAL_URL + 'phoibe/logout',
        dataType: 'json',
        success: function (result) {
        }
    });

}
function cutString(str, len) {

    if (null==str||""==str){
        return "";
    }
    //length属性读出来的汉字长度为1
    if (str.length * 2 <= len) {

        return str;

    }

    var strlen = 0;

    var s = "";

    for (var i = 0; i < str.length; i++) {

        s = s + str.charAt(i);

        if (str.charCodeAt(i) > 128) {

            strlen = strlen + 2;

            if (strlen >= len) {

                return s.substring(0, s.length - 1) + "...";

            }

        } else {

            strlen = strlen + 1;

            if (strlen >= len) {

                return s.substring(0, s.length - 2) + "...";

            }

        }
    }
    return s;
}
function getUrlParam(paramStr,paramneme) {
    var reg = new RegExp("(^|&)" + paramneme + "=([^&]*)(&|$)", "i");

    var result = paramStr.match(reg);
    if (result == null || result.length < 1) {
        return "";
    }
    return result[2];
}