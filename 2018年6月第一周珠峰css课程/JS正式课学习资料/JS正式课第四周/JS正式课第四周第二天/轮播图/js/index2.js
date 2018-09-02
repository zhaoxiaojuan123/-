/**
 * Created by Administrator on 2018/8/15.
 */

var data=null;
var oUl=utils.getByClass('img_box')[0];
var n=0;
var timer=0;
var boxW=utils.css(oUl,'width');// 盒子的宽度
var index=0;// 这是图片的索引
var leftBtn=utils.getByClass('left_btn')[0];
var rightBtn=utils.getByClass('right_btn')[0];

function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open('get','json/data.json',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            data=utils.toJson(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
console.log(data);
// 将数据放到页面上
function giveHtml() {
    var str=``;
    data.push(data[0]);
    data.forEach(function (item,index) {
        var {pic,title}=item;
        str+=`<li>
              <img src="${pic}" alt="">
              <p>${title}</p>
          </li>`
    });
    n=data.length;
    oUl.innerHTML=str;
    oUl.style.position='relative';
    oUl.style.width=boxW*n+'px';
}
giveHtml();

timer=window.setInterval(function () {
    play();
},2000);

function play() {
    index++; // 解决定时器累加的问题 left值一直在减少 index 是图片的索引
    if(index==-1){
        utils.css(oUl,'left',-boxW*(n-1));
        index=3;
    }
    if(index==n){
       utils.css(oUl,'left',0);
        index=1;
    }
    var cur=-boxW*index;// 先判断再赋值
    //----------------------
   // var cur= utils.css(oUl,'left');
   //  cur =utils.css(oUl,'left')-boxW;
   //  if(cur==-boxW*n){// 右边界
   //      cur=0;
   //      utils.css(oUl,'left',0);
   //      cur=utils.css(oUl,'left')-boxW;
   //      // utils.css(oUl,'left',cur);// 不能赋值
   //  }
    //---------------
    myAnimate(oUl,1000,{left:cur});
}

rightBtn.onclick=function () {
    clearInterval(timer);
    play();
    timer=window.setInterval(function () {
        play();
    },2000);
};
leftBtn.onclick=function () {
    clearInterval(timer);
    index-=2;
    play();
    timer=window.setInterval(function () {
        play();
    },2000);
};
