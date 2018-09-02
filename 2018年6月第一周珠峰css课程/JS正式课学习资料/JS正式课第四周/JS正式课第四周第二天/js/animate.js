/**
 * Created by Administrator on 2018/8/15.
 */
(function () {
    var moveType={
        linear: function linear(times,changeL,duration,beginL) {
            return changeL/duration*times+beginL;
        },
        easeIn: function (t,c,d,b) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t,c,d,b) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t,c,d,b) {
            if ((t /= d / 2) < 1) {
                return  -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };

    // 多方向运动

    function move2(ele,duration,obj,moveT,callback) {
        clearInterval(ele.timer);
        var beginL={};// 存放初始值
        var changeL={};
        moveT=moveT||'linear';
        for(var k in obj){
            if(obj.hasOwnProperty(k)){
                beginL[k]=utils.css(ele,k);
                changeL[k]=obj[k]-beginL[k];// 需要改变的值
            }
        }
        var times=0;
        ele.timer=setInterval(function () {
            times+=20;
            if(times>duration){
                clearInterval(ele.timer);
                times=duration;
                callback&&callback();// callback 是个回调函数
            }
            for(var  k in obj){
                if(obj.hasOwnProperty(k)){
                    var curPos=moveType[moveT](times,changeL[k],duration,beginL[k]);
                    utils.setCss(ele,k,curPos);
                }
            }
        },20);
    }
    window.myAnimate=move2;
})();