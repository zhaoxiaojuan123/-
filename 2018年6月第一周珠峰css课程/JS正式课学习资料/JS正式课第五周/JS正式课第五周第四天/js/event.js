/**
 * Created by Administrator on 2018/8/23.
 */

function on(ele,type,f) { //type 对应报社的某个频道
    // 若是JS原生事件，我们需要改变绑定方式
    if(/^(my)/.test(type)){
        ele[type]=ele[type]||[];
        var n=ele[type].indexOf(f);
        if(n>-1)return; // 解决重复绑定
        ele[type].push(f)
    }else {
        // 需要判断 type 是否带on ；若带着就直接用；没有带着的话就补上
        type=/^(on)/.test(type)?type:("on"+type);
        ele[type]=f;
        // if(/^(on)/.test(type)){
        //     ele[type]=f;
        // }else {
        //     ele['on'+type]=f;
        // }
       // ele.addEventListener(type,f,false);
    }
}
function fire(ele,type,options) {
    ele[type]=ele[type]||[];
    ele[type].forEach((item)=>{
        item&&item.call(ele,options);
    })
}
function off(ele,type,f) {
    if(/^(my)/.test(type)){
        ele[type]=ele[type]||[];
        var n=ele[type].indexOf(f);
        if(n!=-1){
            ele[type].splice(n,1);
        }
        }else { // 证明是原生事件
            type=/^on/.test(type)?type:('on'+type);
            ele[type]=null;
    }
}
