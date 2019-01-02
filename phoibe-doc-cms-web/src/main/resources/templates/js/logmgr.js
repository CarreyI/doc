var totalRows = 0;
var currPage = 0;
var logOption={};
function loadData(pageindex) {
    $("#tblist-body").children().remove();

    var data = GAL_URL+"phoibe/logging/list/"+pageindex+"/20?1=1";
    var sDatatime=$("#startdate").val();
    var eDatatime=$("#enddate").val();

    if (sDatatime!=""){
        sDatatime = new Date(sDatatime).getTime();
        data = data +"&sDatatime="+sDatatime;
    }
    if (eDatatime!=""){
        eDatatime = new Date(eDatatime).getTime();
        eDatatime = eDatatime + (24*60*60*1000);
        data = data +"&eDatatime="+eDatatime;
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
                var id = val["eventId"];//
                var message = val["formattedMessage"];//"日志信息";
                var ipAddr = val["arg0"];//"IP";
                var opertype = val["arg1"];//"操作类型";
                var username = val["arg2"];//"用户名-昵称-真实姓名";
                var modulename = val["arg3"];//"功能模块";
                var datatime = val["timestmp"];//"记录时间";
                datatime = (new Date(datatime)).Format("yyyy-MM-dd hh:mm:ss.S")

                var row="<tr><td><input type='checkbox' data-value='" + id + "' name='chksel'/>" +
                    "<td>"+modulename+"</td>"
                    +"<td>"+logOption[opertype]+"</td>"
                    +"<td>"+message+"</td>"
                    +"<td>"+username+"</td>"
                    +"<td>"+ipAddr+"</td>"
                    +"<td>"+datatime+"</td>"
                    +"<td><a class='list-del doc-del' lid='"+id+"'>删除</a></td></tr>";
                $("#tblist-body").append(row);
            });
            $(".doc-del").click(function () {
                var lid = $(this).attr("lid");
                logDelAjax(lid);

            });
        }
    });

    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
    , layer = layui.layer;
        laypage.render({
            elem: 'notice_pages'
          , count: totalRows
          , curr: currPage
            ,limit:20
          , first: '首页'
          , last: '尾页'
          , prev: '<em>←</em>'
          , next: '<em>→</em>'
           , jump: function (obj, first) { //触发分页后的回调
               if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                   currPage = obj.curr;
                   loadData(obj.curr - 1);
               }
           }
        });
    });
}
function logDelAjax(lid){
    if (confirm("确认删除选中日志吗？")) {
        $.ajax({
            url: GAL_URL + "phoibe/logging/delete",
            type: "post",
            data: {"_method": "delete", "idstr": lid},
            dataType: "json",
            async: false,
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


$(function () {
   logOption = parent.logOptionTypeLoadAjax();
    /*  
            js由毫秒数得到年月日  
            使用： (new Date(data[i].creationTime)).Format("yyyy-MM-dd hh:mm:ss.S")  
            */
    Date.prototype.Format = function (fmt) { //author: meizz  
        var o = {
            "M+": this.getMonth() + 1, //月份  
            "d+": this.getDate(), //日  
            "h+": this.getHours(), //小时  
            "m+": this.getMinutes(), //分  
            "s+": this.getSeconds(), //秒  
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
            "S": this.getMilliseconds() //毫秒  
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
        loadData(0);
        
        $(".btnSearch").click(function () {
            currPage = 0;
            totalRows = 0;
            loadData(0);
        })
    $("#btnexport").click(function () {
        var url= GAL_URL +"phoibe/logging/export?1=1";
        $("#ajaxform").attr("action",url);
        $(".export_bodyMask").fadeIn();
    });
    $("#btnbackup").click(function () {
        var url= GAL_URL +"phoibe/logging/backups?1=1";
        $("#ajaxform").attr("action",url);
        $(".export_bodyMask").fadeIn();
    });
    $(".export_closed").click(function () {
        $(".export_bodyMask").hide();
    });
    $("#btndel").click(function () {
        var sel = $("#tblist-body tr td input[type='checkbox']:checked");
        if(sel.length == 0){
            alert("请选中要删除的日志");
            return
        }
        var idstr = "";
        $.each(sel,function (index,obj) {
            idstr += $(obj).attr("data-value")+",";
        })
        idstr = idstr.substring(0,idstr.length-1)
            logDelAjax(idstr);
    });
    $("#down_submit").click(function () {
        var sDatatime=$("#sDatatime").val();
        var eDatatime=$("#eDatatime").val();
        var url = $("#ajaxform").attr("action");
        if (sDatatime!=""){
            sDatatime = new Date(sDatatime).getTime();
            url = url +"&sDatatime="+sDatatime;
        }else{
            alert("请选择开始时间");
            return
        }
        if (eDatatime!=""){
            eDatatime = new Date(eDatatime).getTime();
            eDatatime = eDatatime + (24*60*60*1000);
            url = url +"&eDatatime="+eDatatime;
        }else{
            alert("请选择截止时间");
            return
        }

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $(".export_bodyMask").hide();
                $(window.parent.document).find(".loaddingBox").fadeIn();
            },
            complete: function () {
                // Handle the complete event
                $(window.parent.document).find(".loaddingBox").hide();
            },
            success: function (data) {
                if (data.code == "SUCCESS") {
                    window.location.href=encodeURI(encodeURI(GAL_URL+"phoibe/logging/exportDownload?fileName="+data.data));
                    $(".file_bodyMask").hide();
                    //清空输入框
                    $("#sDatatime").val("");
                    $("#eDatatime").val("");
                } else {
                    alert(data.data);
                }
            },
            error: function (data) {
                alert("提交失败,请联系管理员");
                console.info("error: " + data.responseText);
            }
        });
    });
});
