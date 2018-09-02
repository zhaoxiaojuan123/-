/**
 * Created by Administrator on 2018/8/2.
 */


var data=null;
var xhr=new XMLHttpRequest();
xhr.open('get','json/data1.json',false);
xhr.onreadystatechange=function () {// ajax 监听请求状态
    if(xhr.readyState==4 &&xhr.status==200){
        data=JSON.parse(xhr.responseText)
    }
};
xhr.send();
console.log(data);
// 上面是获取data数据
//----------------------------------------------------
var oUl=document.getElementsByClassName('ul_box')[0];
var oBtn=document.getElementsByClassName('ul_btn')[0];
var btns=oBtn.getElementsByTagName('li');
function giveHtml(data) {
    var str='';
    for (let i = 0; i < data.length; i++) {
        str+=`<li>
            <div class="img_box"><img src="${data[i].picImg}"></div>
            <div class="til">${data[i].title}</div>
            <div class="price_box public_box">
                价格：<span>${data[i].price}.00</span>
            </div>
            <div class="desc_box">
                评价数：<span>${data[i].hot}</span>
            </div>
            <div class="time_box">
                上架时间：<span>${data[i].time}</span>
            </div>
        </li>`
    }

    oUl.innerHTML=str;
}
giveHtml(data);
// 用一个函数来实现排序
var ary=['price','hot','time'];
for (let i = 0; i < btns.length; i++) {
   btns[i].onclick=function () {

       data.sort(function (a,b) {
           return a[ary[i]].toString().replace(/-/g,'')-b[ary[i]].toString().replace(/-/g,'');
       });
       giveHtml(data);
   }

}


/*
btns[0].onclick=function () {
    data.sort(function (a,b) {
        return a.price-b.price;
    });
    giveHtml(data);
};

btns[1].onclick=function () {
    data.sort(function (a,b) {
        return a.hot-b.hot;
    });
    giveHtml(data);
};
btns[2].onclick=function () {
    data.sort(function (a,b) {
        return a.time.replace(/-/g,'')-b.time.replace(/-/g,'');
    });
    giveHtml(data);
};
*/

