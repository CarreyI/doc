var totalRows = 10;
var currPage = 0;

function loadData(pageindex) {

    $("#tblist-body").children().remove();

    var tagname_value = $("#tagname").val();
    var createtime_value = $("#createtime").val();

    var data = GAL_URL+"phoibe/tag/list/" + pageindex +"/10?1=1";

    if (tagname_value != "" && tagname_value != null) {
        data = data + "&name=" + tagname_value.toLowerCase();
    }
    if (createtime_value != "" && createtime_value != null) {
        data = data + "&createtime=" + createtime_value.toLowerCase();
    }

    $.ajax({
        type: 'GET',
        url: data,
        async:false,
        dataType: 'json',
        success: function (result) {//<div class='font22 title'>中国战法</div>
            var total_rows = result.data.totalCount;
            totalRows = total_rows;
            $.each(result.data.dataList, function (i, val) {
                var id = val["id"];;
                var name =  val["name"];//"标签名称";
                var createtime =  val["createTime"];//"创建时间";
                var status =  val["status"];//"排序";
                var orderby =  val["orderby"];//"排序";


                var row = "<tr><td><input type='checkbox' name='chksel' data-value='" + id + "'/></td><td>"
                    + name + "</td><td>" + createtime + "</td><td>"+orderby+"</td>" +
                    "<td><a  class='list-del doc-del' tid='"+id+"'>删除</a></td></tr>";
                $("#tblist-body").append(row);
            });
            $(".doc-del").click(function () {
                var tid = $(this).attr("tid");
                tagDelAjax(tid);

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

function tagDelAjax(tid){
    if (confirm("确认删除此项标签吗？")) {
        $.ajax({
            url: GAL_URL + "phoibe/tag/remove",
            type: "post",
            data: {"_method": "delete", "idstr": tid},
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
function checkForm(){
    if (""==$("#name").val()||null==$("#name").val()){
        alert("请输入标签名称！");
        return false;
    }
    if ($("#name").val().length>8||$("#name").length>8){
        alert("标签名称请不要超过8个字！");
        return false;
    }
    if (""!=$("#orderby").val()&&null!=$("#orderby").val()){
        if(isNaN($("#orderby").val())){
            alert("请确认输入的排序是数字!")
            return false;
        }
    }

    return true
}
$(function () {
    loadData(0);
    $("#btnadd").click(function () {
        $(".bodyMask").fadeIn();
        $(".model-title").html("添加标签");
        $("#editBtn").hide();
        $("#submit").show();
    });
    $("#btnmodify").click(function () {
        $(".model-title").html("修改标签");
        $("#submit").hide();
        $("#editBtn").show();
        var sel = $("#tblist-body input[type=checkbox]:checked");
        if(sel.length > 1){
            alert("只能选中一条");
            return;
        }
        var Id = $(sel).attr("data-value");
        if (Id!=null){
            getTag(Id);
        }else{
            alert("请选择要修改的数据");
            return;
        }
        $(".bodyMask").fadeIn();
    });
    $(".closed").click(function () {
        $(".bodyMask").hide();
    });
    $("#btnSearch").click(function () {
        loadData(0);
        parent.iframeLoad();
    });
    $("#btndel").click(function () {
        var sel = $("#tblist-body tr td input[type='checkbox']:checked");
        if(sel.length == 0){
            alert("请选中要删除的标签");
            return
        }
        var idstr = "";
        $.each(sel,function (index,obj) {
            idstr += $(obj).attr("data-value")+",";
        })
        idstr = idstr.substring(0,idstr.length-1)
            tagDelAjax(idstr);
    });

    $('#submit').click(function () {
        if (checkForm()){
            var form = $("#ajaxform");
            var formdata ={};
            for (var i = 0; i < form.serializeArray().length; i++) {
                var key = form.serializeArray()[i].name;
                var value = form.serializeArray()[i].value;
                formdata[key] = value;
            }
            $.ajax({
                url: GAL_URL + form.attr("action"),
                type: form.attr("method"),
                data: JSON.stringify(formdata),
                dataType: "json",
                async: false,
                // contentType: "contentType: application/x-www-form-urlencoded",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if (data.code="success") {
                        alert("提交成功");
                        $("#ajaxform")[0].reset();
                        $(".bodyMask").hide();
                        loadData(0);
                    }else{
                        alert("提交失败");
                    }
                }
            });
        }
    })
    $('#editBtn').click(function () {

        if (checkForm()){

            var form = $("#ajaxform");
            var formdata ={};
            for (var i = 0; i < form.serializeArray().length; i++) {
                var key = form.serializeArray()[i].name;
                var value = form.serializeArray()[i].value;
                formdata[key] = value;
            }
            formdata.id=formdata.tagId;
            var action ="phoibe/tag/update";
            $.ajax({
                url: GAL_URL + action,
                type: form.attr("method"),
                data: JSON.stringify(formdata),
                dataType: "json",
                async: false,
                // contentType: "contentType: application/x-www-form-urlencoded",
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
        }
    })
});

function getTag(Id){

    $.ajax({
        url: GAL_URL + "phoibe/tag/fetch/"+Id,
        type: "GET",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (data.code="success") {
                var tagObj = data.data;
                $("#name").val(tagObj.name);
                $("#orderby").val(tagObj.orderby);
                $("#tagId").val(tagObj.id);
                $(".bodyMask").fadeIn();
            }
        }
    });

}