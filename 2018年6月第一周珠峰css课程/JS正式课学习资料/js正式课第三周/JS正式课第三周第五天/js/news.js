/**
 * Created by Administrator on 2018/8/13.
 */

var data=null;
function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open('get','json/data2.json',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&/2\d{2}/g.test(xhr.status)){
            data=utils.toJson(xhr.responseText);
        }
    };
    xhr.send();
}
getData();

var newsBox=document.getElementsByClassName('newsBox')[0];
// 将li标签放到页面上
function giveHtml(data) {
    for (var i = 0; i < data.length; i++) {
        var item=data[i];
    var str=`<li><a href="#">
        <div class="imgBox">
            <img src="images2/default.gif" pic="${item.pic}" alt="">
        </div>
        <div class="con">
            <p class="title">${item.title}</p>
            <span>14分钟前 跟帖${item.hot}</span>
        </div>
    </a></li>`;
    newsBox.innerHTML+=str;
    }
}
giveHtml(data);

// 获取正式的图片地址

var oImg=newsBox.getElementsByTagName('img');// 这个img的元素结合类数组

function getImg(ele) {
    if( ele.loaded) return;
     var srcT=utils.scrollT();
    var cliH=utils.clientH();
    var tarT=utils.offset(ele).t;
     if(srcT+cliH>tarT){
         var realSrc=ele.getAttribute('pic');
         var temp=new Image;
         temp.src=realSrc;
         temp.onload=function () {
             ele.src=realSrc;
             ele.loaded=true;
             fadeIn(ele);
         };
         temp=null;
     }
}

// 获取所有的img标签后让每个img标签都找到自己的真实的路径
function getImgAll(ele) {
    for (var i = 0; i < ele.length; i++) {
        getImg(ele[i]);
    }
}
getImgAll(oImg);


window.onscroll=function () {
    getImgAll(oImg);
    getMore(data)
};
// 加载时渐渐加载fadeIn
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
    },20);

}

// 获得跟多的图片 getMore
function getMore() {
    var temp=newsBox;
    var scrT=utils.scrollT();
    var cliH=utils.clientH();
    var tarT=newsBox.clientHeight;
    if(scrT+cliH>tarT){
        getData();
        giveHtml(data);
    }
}