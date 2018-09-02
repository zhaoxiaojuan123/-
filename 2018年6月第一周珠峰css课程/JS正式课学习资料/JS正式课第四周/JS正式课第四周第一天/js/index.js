/**
 * Created by Administrator on 2018/8/14.
 */

// 获取后台数据
var data=null;
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

// 把数据展示到页面上

var box=document.getElementsByClassName('box')[0];
var oUls=box.getElementsByTagName('ul');
var Images=box.getElementsByTagName('img');
function giveHtml() {
    data.forEach(function (item,index) {
        var {pic,title,height}=item;
        // var str=`<li><img src="http://www.sucaijishi.com/uploadfile/2013/0527/20130527034923893.gif" trueSrc="${pic}" height="${height}" alt="">
        // <p>${title}</p>
        // </li>`;
        // var temp=minUl();
        // temp.innerHTML+=str;
        //---

        var li=document.createElement('li');
        var str=`<img src="http://www.sucaijishi.com/uploadfile/2013/0527/20130527034923893.gif" trueSrc="${pic}" height="${height}" alt="">
        <p>${title}</p>`;
        li.innerHTML=str;
        var temp=minUl();
        temp.appendChild(li);
    });
}
giveHtml();

// 找到最低的ul
function minUl() {
    var ulAry=utils.toArray(oUls);
    ulAry.sort(function (a,b) {
        return  a.clientHeight-b.clientHeight
    });
    return ulAry[0];
}


// 图片懒加载 找到真正的图片地址

function loadImg(ele) {
    // 查看 图片到body 的距离是否 小于 卷去的高度加上一屏的高度  说明图片出来了
    if( ele.loaded) return;
    var scrT=utils.scrollT();
    var cliH=utils.clientH();
    var tarT=utils.offset(ele).t;
    if(scrT+cliH>tarT){
        var trueSrc=ele.getAttribute('trueSrc');
        var temp=new Image;
        temp.src=trueSrc;
        temp.onload=function () {
            ele.src=trueSrc;
            ele.loaded=true;
            fadeIn(ele)
        };
        temp=null;
    }
}

function loadImgAll(eles) {
    for (var i = 0; i < eles.length; i++) {
        loadImg(eles[i]);
    }
}
loadImgAll(Images);

window.onscroll=function () {
    loadImgAll(Images);
    getMore()
};
// 让元素渐显出来 fadeIn
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

// 当页面滑动至最低的ul底部露出来时，去加载
function getMore() {
    var temp=minUl();
    var tarT=utils.offset(temp).t+temp.clientHeight;
    var scrT=utils.scrollT();
    var cliH=utils.clientH();
    if(scrT+cliH>tarT){
        getData();
        giveHtml();
    }
}




