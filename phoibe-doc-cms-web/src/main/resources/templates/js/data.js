//var GAL_URL='http://47.93.62.169:8090/';
var GAL_URL = '';

$(function () {

    // // //循环每个tr行，添加click事件
    // $("#tblist-body").on("click","tr",function () {
    //
    //     //标题行不作任何操作
    //     if (this.rowIndex == 0) return;
    //     if ($(this).find("input").prop("checked")) {
    //         //已选中的行取消选中
    //         $(this).find("input").prop("checked",false);
    //     } else {
    //         //未选中的行，进行选中
    //         $(this).find("input").prop("checked",true);
    //     }
    // });

    // $(".checkAll").on("click",function () {
    //     if ($("#tblist-body").find("input").rowIndex == 0) return;
    //     if ($(this).attr("checked")=="checked") {
    //         //已选中的行取消选中
    //         $("#tblist-body").find("input").prop("checked",false);
    //         $(this).removeAttr("checked");
    //     } else {
    //         //未选中的行，进行选中
    //         $("#tblist-body").find("input").prop("checked",true);
    //         $(this).attr("checked","checked");
    //     }
    // });

    $(".checkAll").click(function () {
        $("#tblist-body input[type='checkbox']").prop("checked", this.checked);

    });
    $("#tblist-body").delegate("input[type='checkbox']","click",function(){
        var $checkbox = $("#tblist-body input[type='checkbox']");
        $(".checkAll").prop("checked", $checkbox.length == $checkbox.filter(":checked").length ? true : false);
    });



})
