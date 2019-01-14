
function showmsg(id,title,desc){
    var layopen = layer.open({
        id:id,
        type: 1,
        title:title,
        skin: 'layui-layer-demo',
        closeBtn: false,
        anim: 0,
        shadeClose: false,
        content: '<div class="msg-content">&nbsp;&nbsp;&nbsp;&nbsp;'+desc+'<br/><br/><div class="msg-btn-list"><div onclick="okmsg()" class="btn btn-ok">确定</div><div onclick="cancelmsg();" class="btn btn-cancel">取消</div></div></div>'
    });
    return layopen;
}