/**
 * Created by Administrator on 2018/7/13.
 */
/*
* 需求：点击哪个Li ,就让其有select这个样式类（对应的DIV也有这个样式类）。其余的li（DIV）都把SELECT样式类移除即可
*
* 不管点击哪一个li,我首先让所有的li（DIV）都移除SELECT，再让当前点击的有SELECT样式类
* */


var til=document.getElementsByClassName('til')[0];
var oList=til.getElementsByTagName('li');
var bodys=document.getElementsByClassName('body')[0];
var oDivList=bodys.getElementsByTagName('li');

// 创建一个函数实现页卡切换的功能
 function  change(index) {
     // index 是形参 ，实现方法的时候我们不知道用户点击的是哪一个li，设定一个入口，当用户点击需要页卡切换的时候，只要执行change 方法，并且把点击这个li的索引传递给我们，我们就可以在oList 集合中通过索引获取到当前点击的这个li对象
     //让所有的 li 移除select 样式类
     for(var i=0;i<oList.length;i++){
         oList[i].className='';
         oDivList[i].className='';
     }
     //  让当前点击的li 有选中的样式
     oList[index].className='select';
     oDivList[index].className='select';
 }



 // =》 自定义属性方法：
/*for (var i = 0; i < oList.length; i++) {
    oList[i].myIndex=i;
     oList[i].onclick=function () {
         change(this.myIndex);
         //-> this: 当前点击的这个li
         // this.myIndex : 当前点击这个li 的myIndex 这个自定义属性的值

        // console.log(i);//=>3   不管点击哪个li 输出的结果是3，此处的i,并不是想象中点击的这个li的索引?
     }
}*/
/*
* 自定义属性
* 当i = 0
* oList[0].myIndex=0;
* 当i = 1
* oList[1].myIndex=1;
* 当i = 2
*  oList[2].myIndex=2;
* */

/*
 // 自定义之前的解析循环过程
 // 第一轮

 oList[0].onclick=function () {
 "console.log(i);"// => 给元素点击事件绑定方法，点击才执行，此处绑定属于创建函数，空间中储存的都是字符串，i不是变量是字符

 }
 //第二轮
 oList[1].onclick=function () {
 "console.log(i);"// => 给元素点击事件绑定方法，点击才执行，此处绑定属于创建函数，空间中储存的都是字符串，i不是变量是字符

 }

 // 第三轮
 oList[2].onclick=function () {
 "console.log(i);"// => 给元素点击事件绑定方法，点击才执行，此处绑定属于创建函数，空间中储存的都是字符串，i不是变量是字符

 }
 // => 循环结束 i= 3
 // =》 用户开始点击第二个li ： 开始执行第二个绑定的方法（方法执行：形成一个新的作用域，把之前存储的字符串变为代码执行 console.log(i）
 */


// => 使用闭包实现

/*
for (var i = 0; i < oList.length; i++) {
    ~function (i) {
        oList[i].onclick=function () {
            change(i);
        }
    }(i);

}
*/


//
/*for (var i = 0; i < oList.length; i++) {

        oList[i].onclick=(function (i) {
            return function () {
                change(i);
            }

    })(i);

}*/

//  es6实现原理 就是把之前不行的var 改成let 就可以,这就是作用域的特点
//

for (let i = 0; i < oList.length; i++) {
    oList[i].onclick=function () {
        change(i);
    }
}






























