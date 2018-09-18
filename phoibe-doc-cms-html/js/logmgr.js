var totalRows = 0;
var currPage = 0;

function loadData(pageindex) {
    $("#tblist-body").children().remove();    
      
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