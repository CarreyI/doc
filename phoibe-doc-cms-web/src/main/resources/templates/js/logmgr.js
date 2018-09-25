var totalRows = 0;
var currPage = 0;

function loadData(pageindex) {
    $("#tblist-body").children().remove();

    var data = GAL_URL+"phoibe/logging/list/"+pageindex+"/10?1=1";

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
                var message = val["formattedMessage"];//"日志信息";
                var ipAddr = val["arg0"];//"IP";
                var opertype = val["arg1"];//"操作类型";
                var username = val["arg2"];//"用户名-昵称-真实姓名";
                var modulename = val["arg3"];//"功能模块";
                var datatime = val["timestmp"];//"记录时间";
                datatime = (new Date(datatime)).Format("yyyy-MM-dd hh:mm:ss.S")

                var row="<tr>" +
                    "<td>"+modulename+"</td>"
                    +"<td>"+opertype+"</td>"
                    +"<td>"+message+"</td>"
                    +"<td>"+username+"</td>"
                    +"<td>"+ipAddr+"</td>"
                    +"<td>"+datatime+"</td>"
                    +"</tr>";
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
          , curr: currPage
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



$(function () {
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

        laydate.render({
            elem: '#startdate'
         , done: function (value, date, endDate) {
             $("#startdate").attr("data-value", value);
         }
        });
        laydate.render({
            elem: '#enddate'
             , done: function (value, date, endDate) {
                 $("#enddate").attr("data-value", value);
             }
        });
        loadData(0);
        
        $(".btnSearch").click(function () {
            currPage = 0;
            totalRows = 0;
            loadData(0);
        });

    });