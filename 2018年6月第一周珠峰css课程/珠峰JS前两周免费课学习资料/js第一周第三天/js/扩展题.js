//===第一题
var obj = {
    name:"zfpx",
    class:{
        JS:'zf',
        css:"px"
    }
};
var obj2 = obj;
var obj3 = obj2;
obj2.html = {
    html4:'html4',
    html5:'html5'
};
obj3.class = {
    JS:'zfpx'
};
var html = 'html4';

var JS = obj3.class.JS;
console.log(obj2.class,obj3['html'][html],obj.html['html']);//obj2.class:object{JS:'zfpx'}...obj3['html'][html]:html4
                                                                // obj.html['html']:undefined



JS = 'www';
console.log(obj.class.JS);//'zfpx'

obj3.class.JS = 'http';
console.log(obj3.class.JS);//'http'



 //===第二题  思考题 不要求
 for(var i = 0; i < 10; i++){
     switch (i%4 || '0'){
         case 1:
         case 3:
             i += 1;
             break;
         case 0:
         case 2:
             i += 2;
             break;//跳出switch 循环
         default:
             i += 4;
     }
 }
 console.log(i);//  11


 //===第三题
 var obj2 = {
     name: '小明',
     age: '12',
     sex: 1,
     height: '120cm',
     weight: '30kg',
 };
 var obj2_2 = {};
 //要求 把obj2中的属性值中含有数字的键值对 赋值一份到obj2_2中




//===第四题
var str = 'qwwrwer123sdfsf234';
var str2 = '';
//要求  str2 的内容是 str 出去数字的剩余字符组成的新字符串
// 提示 用 for循环操作

