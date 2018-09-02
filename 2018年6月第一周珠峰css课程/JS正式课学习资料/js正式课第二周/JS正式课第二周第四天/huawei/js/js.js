/**
 * Created by Administrator on 2018/8/4.
 */

var data=null;

var xhr=new XMLHttpRequest();
xhr.open('get','json/data1.json',false);
xhr.onreadystatechange=function () {
    if(xhr.readyState==4&&xhr.status==200)
    data=JSON.parse(xhr.responseText);
};
xhr.send();
console.log(data);
var oUl=document.getElementsByClassName('oul_box')[0];

  function giveHtml(data) {
      var str='';
      for (var i = 0; i < data.length; i++) {
         str+=`<li>
           <div class="img_box"><img src="${data[i].picImg}" ></div>
           <div class="titl_box">${data[i].title}</div>
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
      oUl.innerHTML=str;
  }
giveHtml(data);

var oBtn=document.getElementsByClassName('btn_box')[0];
var oLis=oBtn.getElementsByTagName('li');
var ary=['price','hot','time'];
    for (let i = 0; i < oLis.length; i++) {
        oLis[i].onclick=function(){
            data.sort(function (a,b) {
                return a[ary[i]].toString().replace(/-/g,'')-b[ary[i]].toString().replace(/-/g,'')
            });
            giveHtml(data);
        }
    }




