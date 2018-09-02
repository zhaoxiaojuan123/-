/**
 * Created by Administrator on 2018/8/5.
 */

var utils= {
    toJson:function (str) {
    var obj={};
    try{
        obj=JSON.parse(str)
    }catch (e){
      obj=eval(`(${str})`)
    }
    return obj;
},
    toAry:function (arg) {
        var arr=[];
        try{
            arr=[].slice.call(arg)
        }catch (e){
            for (var i = 0; i < arg.length; i++) {
                arr.push(arg[i])
            }
        }
        return arr;
    }


}
