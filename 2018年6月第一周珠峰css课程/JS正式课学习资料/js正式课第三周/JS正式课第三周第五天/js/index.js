/**
 * Created by Administrator on 2018/8/12.
 */

// 先获取json 数据
// var data=null;
// var xhr=new XMLHttpRequest();
// xhr.open('get','json/data.json',false);
// xhr.onreadystatechange=function () {
//     if(xhr.readyState==4&&/^2\d{2}$/g.test(xhr.status)){
//         data=utils.toJson(xhr.responseText);
//     }
// };
// xhr.send();
// console.log(data);

function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open('get','json/data.json',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&/^2\d{2}$/g.test(xhr.status)){
            data=utils.toJson(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
// 将数据放到页面上

var oDiv=document.getElementById('div1');
var oUl=document.getElementsByTagName('ul');
var oImgs=document.getElementsByTagName('img');// 获得的是所有li的集合
var ulAry=utils.toArray(oUl);


function giveHtml(data) {
    data.forEach(function (item,index) {
        var {pic,title,height}=item;
        var str=`  <img src="images2/default.gif" realSrc="${pic}" height="${height}" alt="">
               <p>${title}</p>`;
          // 防止页面闪现
        var li=document.createElement('li');
        li.innerHTML=str;
        var temp=getMinUl();// 将li放到最小的那个ul里
        temp.appendChild(li);
    })
}


function getMinUl() {
    ulAry.sort(function (a,b) {
        return a.clientHeight-b.clientHeight;
    });
    return ulAry[0]; // 将找到的最小ul返回
}

giveHtml(data);
// 图片懒加载 把图片真实路径获取到

function loadImg(ele) {
    if(ele.loaded) return;
    var srcT=utils.scrollT();
    var cliH=utils.clientH();
    var tarT=utils.offset(ele).t;
    if(srcT+cliH>tarT){
        var realSrc=ele.getAttribute('realSrc');
        var temp=document.createElement('img');
        temp.src=realSrc;
        temp.onload=function () {
            ele.src=realSrc;
            ele.loaded=true;
            fadeIn(ele);
        };
        temp=null;
    }
}

// loadAll
function loadAll(eles) {
    for (var i = 0; i < eles.length; i++) {
        loadImg(eles[i]);
    }
}
loadAll(oImgs);// 加载所有的img

// 滚动事件
window.onscroll=function () {
    loadAll(oImgs);
    getMore();
};
// 获取更多的图片数据
   function getMore() {
       var temp=getMinUl();
       var srcT=utils.scrollT();
       var cliH=utils.clientH();
       var tarT=temp.clientHeight;
       if(srcT+cliH>tarT){
           getData();
           giveHtml(data);
       }
   }

function fadeIn(ele) {
    ele.style.opacity=0;
    var opa=0.1;
   var timer=window.setInterval(function () {
       opa+=0.1;
       ele.style.opacity=opa;
       if(opa>1){
           ele.style.opacity=1;
           clearInterval(timer);
       }
   },20)
}





