/**
 * Created by Administrator on 2018/8/26.
 */
function on(ele,options,f) {
    ele[options]=ele[options]||[];
    var n=ele[options].indexOf(f);
    if(n==-1){
        ele[options].push(f)
    }
}
function fire(ele,options) {
    ele[options].forEach((item)=>{
        item&&item.call(ele);
    })
}
function off(ele,options,f) {
    var n=ele[options].indexOf(f);
    if(n!==-1){ //查看这个人是否在名单里
        ele[options].splice(n,1); // 把这个人从名单中移除
    }
}