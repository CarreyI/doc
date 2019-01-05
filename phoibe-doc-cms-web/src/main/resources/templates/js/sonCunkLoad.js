function appendCunkHtml(){
    var dataDict = parent.dataDictLoadAjax();

    //sonCunkLoad(dataDict);
}
function sonCunkLoad(obj){

    var chunkhtml="";
    $.each(obj, function (i, val) {
        var field=selectfield(obj[i]);
        var doclist=cunkListLoad(val["doclist"]);
        var row="<li class='sonChunk'>" +
            "<div class='chunk_title'>" +
            "<span class='label'>作战年代</span>" +
            "</div>" +
            "<div class='chunk_select'>" +
            "<select  name=''>" +
            "<option class='tag-li' value='89'>美国</option>" +
            "</select>" +
            "</div>" +
            "<div class='chunk_content'>" +
            "<div class='dynamiclist'>" +
            " <ul>"+doclist+"</ul></div></div></li>";
        chunkhtml = chunkhtml+ row;
    })
    return chunkhtml;
}
function cunkListLoad(obj){
    var listhtml = "";
    $.each(obj, function (i, val) {
        var format = val["format"];
        var docname = val["name"];
        var createTime = val["stockTime"];
        var tid = val["id"];
        var description=val["description"];
        var hrefUrl= "docdetail.html?tid=" + tid + "' title='" + docname + "'";
        var row="<li class='right-item'><a href='"+hrefUrl+"'target='_blank'>"+
            "<div class='right-item-content clearfix'><h5 class='' title='"+docname+"'>"+cutString(docname,24)+
            "<span class='time'>&nbsp;&nbsp;&nbsp;&nbsp;"+createTime.substring("5","10")+"</span></h5></div>"+
            "<div class='right-item-desc'>"+cutString(description,76)+"</div>"+
            "</a></li>";
        listhtml= listhtml+row;
    });
    return listhtml;
}
function selectfield(field){
    var fieldname="";
    switch (field) {
        case "WARSTATE" :
            fieldname= "参战国家";
            break;
        case "WARNUM" :
            fieldname= "作战规模";
            break;
        case "WARADDR" :
            fieldname= "作战地域";
            break;
        case "WARSTYPE" :
            fieldname= "战例类型";
            break;
        case "CORPSTYPE" :
            fieldname= "兵种类型";
            break;
        case "FIGHTTIME" :
            fieldname= "作战年代";
            break;
        case "FIGHTTYPE" :
            fieldname= "战法类别";
            break;
        case "COMBATTYPE" :
            fieldname= "战斗种类";
            break;
        case "FIGHTTRAIT" :
            fieldname= "作战特点";
            break;
        case "DOCTYPE" :
            fieldname= "文档类别";
            break;
    }
    return fieldname;
}
$(function () {
    appendCunkHtml()
})