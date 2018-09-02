/**
 * Created by Administrator on 2018/8/11.
 */

var utils=(function () {
    function getCss(ele,attr) {
        var str=navigator.userAgent;
       var res=null;
       if(/MSIE *[6-8]/.test(str)){
           res=ele.currentStyle[attr];
       }
       else {
           res=window.getComputedStyle(ele)[attr];
       }
       if(!isNaN(parseFloat(res))){
           res=parseFloat(res);
       }
       return res;
 }
    function setCss(ele,attr,value){
        var reg=/width| height |top| left| padding| right |bottom| fontsize |margin/i;
       if(reg.test(attr)){
           value=parseFloat(value)+'px';
       }
       ele.style[attr]=value;
   }
   function setGroup(ele,obj) {
       if(Object.prototype.toString.call(obj)=="[object object]"){
           for(var k in obj){
               if(obj.hasOwnProperty(k)){
                   setCss(ele,k,obj[k]);
               }
           }
       }
   }
   function css(...arg) {
       if(arg.length==2){
            if(typeof arg[1]=='string'){
                return getCss(arg[0],arg[1])
            }
            setGroup(arg[0],arg[1]);
        }else {
            setGroup(arg[0],arg[1],arg[2]);
        }
   }
   return {
       getCss,
       setCss,
       setGroup,
       css
   }
})();

