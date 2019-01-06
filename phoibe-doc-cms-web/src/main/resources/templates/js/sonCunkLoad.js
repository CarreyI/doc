
var dataDictHtml;
function appendCunkHtml(){
    var userCunkObje= [
        {USER_CONFIG:"WARSTATE",WARS_TACTICS:1,QUERYWHERE:"美国"},
        {USER_CONFIG:"WARNUM",WARS_TACTICS:1,QUERYWHERE:"1~5万"},
        {USER_CONFIG:"WARADDR",WARS_TACTICS:1,QUERYWHERE:"平原作战"},
        {USER_CONFIG:"WARSTYPE",WARS_TACTICS:1,QUERYWHERE:"海陆联合战例"},
        {USER_CONFIG:"FIGHTTYPE",WARS_TACTICS:2,QUERYWHERE:"战术战法"},
        {USER_CONFIG:"COMBATTYPE",WARS_TACTICS:2,QUERYWHERE:"袭击战"},
        {USER_CONFIG:"CORPSTYPE",WARS_TACTICS:2,QUERYWHERE:"空军作战"},
        {USER_CONFIG:"FIGHTTRAIT",WARS_TACTICS:2,QUERYWHERE:"以少胜多"}
        ];

    var sonCunkHtml = sonCunkLoad(userCunkObje);
    $("#zhanli-ul").html(sonCunkHtml.zl);
    $("#zhanfa-ul").html(sonCunkHtml.zf);

}
function sonCunkLoad(obj){

    var chunkHtmlObj={};
    $.each(obj, function (i, val) {;
        var WARS_TACTICS = val.WARS_TACTICS
        var USER_CONFIG = val.USER_CONFIG
        var QUERYWHERE = val.QUERYWHERE

        var fieldObje = parent.selectfield(USER_CONFIG);//将数据字典中的字段名转为映射类中的属性名

        //取出方块的字段名（对应映射类中属性名）和默认查询参数查询
        var dataObj=getDocFieldList(fieldObje.fn,QUERYWHERE);
        var field=fieldObje.ft;
        var doclist=cunkListLoad(dataObj.datalist);
        var widnum = dataObj.datacount;
        var row="<div class='wid-border' >" +
            "   <div class='wid-cicle'>" +
            "            <div class='wid-title'>"+field+"</div>" +
            "            <div class='wid-num'>"+widnum+"</div>" +
            "   </div>" +
            "   <div class='wid-title-bk'>"+
                    "<select  name='"+USER_CONFIG+"'>" +
                    dataDictHtml[USER_CONFIG]+
                    "</select>" +
            "   </div>" +
            "   <div class='dynamiclist'>" +
                doclist+
            "   </div>"+
            " </div>";

        if (WARS_TACTICS==1){
            if(null!=chunkHtmlObj.zl){
                var htmlobj = chunkHtmlObj.zl;
                htmlobj+=row;
                chunkHtmlObj.zl = htmlobj;
            }else{
                chunkHtmlObj.zl = row;
            }
        }else{
            if(null!=chunkHtmlObj.zf){
                var htmlobj = chunkHtmlObj.zf;
                htmlobj+=row;
                chunkHtmlObj.zf = htmlobj;
            }else{
                chunkHtmlObj.zf = row;
            }
        }
        //alert(JSON.stringify(row))
    })
    return chunkHtmlObj;
}
function cunkListLoad(obj){
    var listhtml = "";
    $.each(obj, function (i, val) {
        var tid = val["id"];
        var format = val["format"];
        var docname = val["name"];
        var stockTime = val["stockTime"];
        if (null!=stockTime){
            stockTime = stockTime.substring("5","10");
        }
        var description=val["description"];
        if (null!=description){
            description = cutString(description,76);
        }
        var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
        var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
            "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,24)+
            "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+stockTime+"</span></h5></div>"+
            "<div class='right-item-desc'>"+description+"</div>"+
            "</a></li>";
        listhtml+=row;
    });
    return listhtml;
}
function getDocFieldList(dield,querywhere){
    var data = "phoibe/document/list/user/0/3?&auditStatus=2&&isstock=2&"+dield+"="+querywhere;
    var listObjt={};
    $.ajax({
        type: 'GET',
        url: GAL_URL + data,
        async: false,
        dataType: 'json',
        success: function (result) {
            listObjt.datacount = result.data.totalCount;
            listObjt.datalist = result.data.dataList
        }
    });
    return listObjt;
}
$(function () {
    dataDictHtml = parent.dataDictSelectHtml();
    appendCunkHtml()
})