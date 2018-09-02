/**
 * Created by Administrator on 2018/8/5.
 */

var data=null;
var xhr=new XMLHttpRequest();
xhr.open('get','./json/data1.json',false);
xhr.onreadystatechange=function () {
    if(xhr.readyState==4 && xhr.status==200){
        data=utils.toJson(xhr.responseText);
    }
};

xhr.send();
console.log(data);

// 操纵DOM 实现排序
var oUl2=document.getElementsByClassName('oU2_box')[0];

function giveHtml(data) {
    var str='';
    for (let  i = 0; i < data.length; i++) {
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
        </li>`
    }
    oUl2.innerHTML=str
}
giveHtml(data);


// 点击实现排序

var btns=document.getElementsByClassName('btn');// 这是点击的按钮 价格、热点 时间
var oLis=oUl2.getElementsByTagName('li');// 这是要排序的li
var liAry=utils.toAry(oLis);// 将要排序的li 集合转化成数组 为forEach 循环数组做铺垫
var ary=['price','hot','time'];
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick=function () {
        liAry.sort(function (a,b) {
            return  a.getAttribute(ary[i])-b.getAttribute(ary[i]);
        });
        liAry.forEach(function (item) {
            oUl2.appendChild(item)
        })
    }
}





