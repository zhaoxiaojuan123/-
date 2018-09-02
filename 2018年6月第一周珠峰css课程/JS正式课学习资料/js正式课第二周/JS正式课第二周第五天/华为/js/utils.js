/**
 * Created by Administrator on 2018/8/5.
 */

var  utils={
    toJson:function (str) {
        var obj={};
        try{
            obj=JSON.parse(str)
        }catch (e){
            obj=eval(`(${str})`);
        }
        return obj;
    },
    listToAry:function (arg) {
        var ary=[];
        try{
            return [].shift.call(arg)
        }catch (e){
            for (let i = 0; i < arg.length; i++) {
               ary.push(arg[i])
            }
        }
        return ary;
    }
};

