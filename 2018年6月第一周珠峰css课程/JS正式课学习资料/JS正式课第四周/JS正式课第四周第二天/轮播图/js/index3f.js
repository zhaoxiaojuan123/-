/**
 * Created by Administrator on 2018/8/16.
 */

var banner=(function () {
    var data=null,
     timer=null,
     oDiv=document.getElementById('div1'),
     oUl=utils.getByClass('img_box')[0],
     tipBox=utils.getByClass('tip_box',oDiv)[0],
     tips=tipBox.getElementsByClassName('tip'),
     boxW=utils.css(oUl,'width'),// 盒子的宽度
     n=0,//记录图片个数
     index=0,// 记录当前显示图片的索引
     leftBtn=utils.getByClass('left_btn')[0],
     rightBtn=utils.getByClass('right_btn')[0];
    // 获取数据
    function getData() {
        var xhr=new XMLHttpRequest();
        xhr.open('get','json/data.json',false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                data=utils.toJson(xhr.responseText);
            }
        };
        xhr.send()
    }
    // 放到页面上
    function giveHtml() {
        var str=``;
        var tipStr=``;
        data.push(data[0]);// 把第一张图片添加到最后一张
        data.forEach(function (item,index) {
            var {pic,title}=item;
            str +=`<li>
              <img src="${pic}" alt="">
              <p>${title}</p>
          </li>`;
            if(index<data.length-1){
                tipStr+=`<li class="tip ${index==0?'current':''}">${index+1}</li>`; // 三元运算符作用是给第一张图片加一个类名current
            }
        });
        n=data.length;
        oUl.innerHTML=str;
        tipBox.innerHTML=tipStr;
        oUl.style.position='relative';// 设置定位
        oUl.style.width=boxW*n+'px';// 设置oUl的宽度
    }
    //自动播放
    function autoPlay() {
        timer=window.setInterval(function () {
            play();
        },2000);
    }
    //播放函数
    function play() {
        // 怎么动 动多少
        if( utils.css(oUl,'left')%boxW!=0)return;// 防止连续点击
        index++;//
        if(index==-1){ // 往左走的左边界
            utils.css(oUl,'left',-boxW*(n-1));  // 直接闪到最后一张
            index=n-2;// 紧接着让ul向左移动 这是倒数第二张图片的索引
        }
        if(index==n){ // 往右走的边界
            index=1;
            utils.css(oUl,'left',0);// 闪到第一张
        }
        /*index的取值范围 0 1 2 3 4*/
        [...tips].forEach((item,index)=>{
            utils.removeClass(item,'current')
        });
        if(index==n-1){ // 走到最后一张时，给第一个tip加一个current
            utils.addClass(tips[0],'current');
        }else {
            utils.addClass(tips[index],'current');
        }

        var curL=-boxW*index;
        myAnimate(oUl,1000,{left:curL});
    }
    //事件绑定 函数
    function eventFn() {
        rightBtn.onclick=function () {
            clearInterval(timer);
            play();
            // timer=window.setInterval(function () {
            //     play();
            // },2000);
        };
        leftBtn.onclick=function () {
            if( utils.css(oUl,'left')%boxW!=0)return;// 防止连续点击
            clearInterval(timer);
            index -=2; // 让index 整体减2 ； 它在play 中又加了1；相当于UL整体左移一个
            play();
            // timer=window.setInterval(function () {
            //     play();
            // },2000);
        };
        oDiv.onmouseenter=function () {
            // 鼠标滑进去
            // 鼠标进入oDiv
            clearInterval(timer);
            utils.css(leftBtn,'display','block');
            utils.css(rightBtn,'display','block');
        };
        oDiv.onmouseleave=function () {
            // 鼠标滑进去
            // 鼠标离开oDiv
            autoPlay();
            utils.css(leftBtn,'display','none');
            utils.css(rightBtn,'display','none');
        };

    }
    // tip绑定 函数
    function tipClick() {
        for (let i = 0; i < tips.length; i++) {
            tips[i].onclick=function () {
                index=i-1;// 先减一是因为在play中是index先做了一个++的动作
                play();
            }
        }
    }
    return {
        init:function () {
            getData();
            giveHtml();
            autoPlay();
            eventFn();
            tipClick();
        }
    }
})();
banner.init();
