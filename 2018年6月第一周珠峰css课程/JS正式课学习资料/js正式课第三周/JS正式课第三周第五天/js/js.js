/**
 * Created by Administrator on 2018/8/12.
 */

  /*
  * 第一步 从后台获取数据
  * */
var data=null; // 用来存储后台获取的数据
// var xhr=new XMLHttpRequest();
// xhr.open('get','json/data.json',false);
// xhr.onreadystatechange=function () {
//     if(xhr.readyState==4&& /^2\d{2}$/.test(xhr.status)){
//         data=utils.toJson(xhr.responseText);
//     }
// };
//xhr.send();
function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open('get','json/data.json',false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&& /^2\d{2}$/.test(xhr.status)){
            data=utils.toJson(xhr.responseText);
        }
    };
    xhr.send();
}
getData();

// 第二步 把数据渲染到页面上

var box=document.getElementsByClassName('box')[0];
var oUls=document.getElementsByTagName('ul');
var ulAry=utils.toArray(oUls);// 把类数组转成数组
var oImags=document.getElementsByTagName('img');// 获取所有的img标签
// data.forEach(function (item,index) {
//     /*
//     * index是从0到data.length
//     * 要知道每一条数据放到哪个ul里边；我们在这里，我们把前四条 依次放到四个ul 中；
//     * 后四条再依次放到四个ul中；这样依次进行就可以了
//     * index%4
//     * */
//     var {pic,title}=item;// 这个是对象的解构赋值item{id: ,pic:'',title:'',height: }
//     var str=`<li>
//             <img src="${pic}" alt="">
//             <p>${title}</p>
//         </li>`
//       var n=index%4;//0 1 2 3
//     oUls[n].innerHTML+=str;
//
// });

 // function giveHtml(data) {
 //     data.forEach(function (item,index) {
 //         /*
 //          * index是从0到data.length
 //          * 要知道每一条数据放到哪个ul里边；我们在这里，我们把前四条 依次放到四个ul 中；
 //          * 后四条再依次放到四个ul中；这样依次进行就可以了
 //          * index%4
 //          * */
 //         var {pic,title,height}=item;// 这个是对象的解构赋值item{id: ,pic:'',title:'',height: }
 //         var str=`<li>
 //            <img src="images2/default.gif" trueSrc="${pic}" height="${height}" alt="">
 //            <p>${title}</p>
 //        </li>`;
 //         // 按个排的会导致长短差距越来越大
 //         // var n=index%4;//0 1 2 3
 //         // oUls[n].innerHTML+=str;
 //         // 排序方式，换成每次给最矮的那个ul 排数据
 //         getMinUl().innerHTML+=str;
 //     });
 //
 // }
// 闪现问题
   function giveHtml2(data) {
    data.forEach(function (item,index) {
        var {pic,title,height}=item;
        var li=document.createElement('li');
        var str=`
            <img src="images2/default.gif" trueSrc="${pic}" height="${height}" alt="">
            <p>${title}</p>`;
         li.innerHTML=str;
        var temp= getMinUl();//获取最小的ul
        temp.appendChild(li);// 把图片信息放到ul标签里
    });
}

    /*
    * 找个子最低的ul minUl
    * */
    function getMinUl() {
        ulAry.sort(function (a,b) {
            return a.clientHeight-b.clientHeight
        });
        return ulAry[0];// 将最矮的ul return 出去
    }
giveHtml2(data);
giveHtml2(data);
/*
* 接下来时间图片的懒加载；
* 我们需要把真实路径存放到img上的自定义属性上，给img默认的小图
* */
    function loadImg(ele) {
        if(ele.loaded) return;
        var srcT=utils.scrollT();
        var cliH=utils.clientH();
        var tarH=utils.offset(ele).t;
        if(srcT+cliH>tarH){
            var temp=document.createElement('img');
            var trueSrc=ele.getAttribute('trueSrc');//真实路径
            temp.src=trueSrc;
            temp.onload=function () {
                ele.src=trueSrc;
                ele.loaded=true;
                fadeIn(ele);
            };
            temp=null;
        }
    }

    function loadAll(eles) {
        for (var i = 0; i < eles.length; i++) {
            loadImg(eles[i]);
        }
    }

     loadAll(oImags);

    window.onscroll=function () { // 滚动事件
        loadAll(oImags); // 加载所有的img
        getMore();
    };

    /*
    * 加载新数据
    * */
   function getMore() {
       var scrT=utils.scrollT();
       var cliH=utils.clientH();
       var temp=getMinUl();
       var tarT=temp.clientHeight+utils.offset(temp).t;// 最低的ul的高度+ul到body的距离
       if(scrT+cliH>tarT){
           getData();// 获取新数据
           giveHtml2(data)
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




