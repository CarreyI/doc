
var totalRows = 0;
var currPage = 0;
var wartype = "";
var pageSize=19;
var dirId="";
var roles = "";
var userStr = getCookie("userObject");
var userId =1;
if (null!=userStr&&""!=userStr) {
    userObject = JSON.parse(userStr);
    userId = userObject.id;
    roles = userObject.roles;
}

function getpizhuauth(){
    for (var i in roles){
        var roleName = roles[i].roleName;
        var roleType = roles[i].roleType;
        if(roleType==101 || roleType==102 || roleType==104 || roleType==105)
        {
            return true;
            break;
        }
    }
    return false;
}
function loadData(pageindex) {

    $("#tblist-body").children().remove();
    var data = GAL_URL+'/phoibe/userPostil/mypizhulist/' + pageindex + '/'+pageSize+'?1=1';
    var tid=getUrlString("tid");

    var isAllDoc = getpizhuauth();

    if(tid!=null){
        data = data+"&docId="+tid;
    }
    else{
        if(!isAllDoc){
            data = data + "&userId=" + userId;
        }
    }
    //(data);
    $.ajax({
            type: 'GET',
            url: data,
            dataType: 'json',
            async: false,
            success: function (result) {
                var total_rows = result.data.totalCount;
                totalRows = total_rows;
                if (total_rows < 1) currPage = 1;
                var step = 0;
                var row = "";
                $.each(result.data.dataList, function (i, val) {

                    var title = val["docName"];
                    var id = val["id"];
                    var docid = val["docId"];
                    var createtime = val["createTime"];
                    var filesize = val["fileSize"];
                    var username = val["userName"];

                    var docdetailHtml = "<a href='phoibe/userPostil/previewDoc/" + id + "' target='_blank' class='list-del doc-detail' tid='" + id + "'>查看批注</a>&nbsp;&nbsp;";
                    var url = "href='docdetail.html?tid=" + docid + "'";

                    var row = "<tr><td><input type='checkbox' data-value='" + id + "' name='chksel'/></td>" +
                        "<td class='d-title'><a " + url + " title='" + title + "'>" + cutString(title, 34) + "</a></td>" +
                        "<td>" + filesize + "</td>" + "<td>" + username + "</td>" +
                        "<td>" + createtime + "</td>" +
                        "<td>" + docdetailHtml + "";

                    if (tid== null || tid=='' || isAllDoc ) {
                        row=row+"&nbsp;&nbsp;<a  class='list-del doc-del' tid='" + id + "'>删除</a>";
                    }
                    row = row+"</td></tr>";

                    $("#tblist-body").append(row);
                    parent.iframeLoad();
                });

                $(".doc-del").click(function () {
                    var tid = $(this).attr("tid");
                    //alert(tid);
                    docDelAjax(tid);
                });
                $(".doc-detail").click(function () {
                    var tid = $(this).attr("tid");
                    //alert(tid);
                    parent.docDetailOpenController(tid);
                });
            }
        });

        layui.use(['laypage', 'layer'], function () {
            var laypage = layui.laypage
            , layer = layui.layer;
            //自定义首页、尾页、上一页、下一页文本
            laypage.render({
                elem: 'notice_pages'
              , count: totalRows
              , curr:currPage
                ,limit:pageSize
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

function docDelAjax(tid){
    if (confirm("确认删除选中的批注吗？")) {
        $.ajax({
            url: GAL_URL + "phoibe/userPostil/delete",
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

    $(function () {
        loadData(0);
    });