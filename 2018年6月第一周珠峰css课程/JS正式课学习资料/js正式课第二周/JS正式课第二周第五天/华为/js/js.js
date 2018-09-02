/**
 * Created by Administrator on 2018/8/5.
 */

var data=null;
var xhr=new XMLHttpRequest();
xhr.open('get','json/data1.json',false);
xhr.onreadystatechange=function () {
    if(xhr.readyState==4 && xhr.status==200){
        data=utils.toJson(xhr.responseText);
    }
};
xhr.send();
console.log(data);

var oU2=document.getElementsByClassName('oU2_box')[0];
var str=``;
function giveHtml(data) {
    for (var i = 0; i < data.length; i++) {
        str+=`<li price="${data[i].price}" hot="${data[i].hot}" time="${data[i].time.toString().replace(/-/g,'')}">
            <div class="img_box"><img src="${data[i].picImg}"></div>
            <div class="til">${data[i].title}</div>
            <div class="price_box">
                价格：<span>${data[i].price}</span>
            </div>
            <div class="hot_box">
                评价数：<span>${data[i].hot}</span>
            </div>
            <div class="time_box">
                上架时间：<span>${data[i].time}</span>
            </div>
        </li>`;
    }
    oU2.innerHTML=str;
}
giveHtml(data);

// 实现排序
 // 直接改变原数据 改变后直接让数据重新放在页面上
// DOM 的 重绘 和 回流

// DOM的重绘 ：改变 背景颜色 color font-size...
// DOM的回流 DOM的位置改变、添加元素、删除元素
// 减少页面的回流 是前端优化的一个方面

// 直接操纵DOM 实现排序

var oLis=oU2.getElementsByTagName('li');// 获取要排序的元素
var liAry=utils.listToAry(oLis);// 为了下边操作方便，我们把类数组转化成数组
var btns=document.getElementsByClassName('btn');// 获取要点击的元素

// liAry.sort((a,b)=>{
//     return a.getAttribute('price')-b.getAttribute('price');
// });
// liAry.forEach(function (item,index) {
//     oU2.appendChild(item)
// });

var arr=['price','hot','time'];
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick=function () {
        liAry.sort((a,b)=>{ // a 和 b 形参放的都是要排序的li
            return a.getAttribute(arr[i])-b.getAttribute(arr[i]);
        });
        var frag=document.createDocumentFragment();
        liAry.forEach(function (item,index) {
            frag.appendChild(item)
        });
        oU2.appendChild(frag);
        frag=null;
    }
}











