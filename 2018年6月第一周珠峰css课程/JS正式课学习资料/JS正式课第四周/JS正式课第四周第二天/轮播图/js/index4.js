/**
 * Created by Administrator on 2018/8/16.
 */

function Banner(id,url) {
        this.data=null;
        this.timer=null;
        this.url=url;
        this.oDiv=document.getElementById(id);
        this.oUl=utils.getByClass('img_box',this.oDiv)[0];
        this.tipBox=utils.getByClass('tip_box',this.oDiv)[0];
        this.tips=this.tipBox.getElementsByClassName('tip');
        this.boxW=utils.css(this.oDiv,'width');// 盒子的宽度
        this.n=0;//记录图片个数
        this.index=0;// 记录当前显示图片的索引
        this.leftBtn=utils.getByClass('left_btn',this.oDiv)[0];
        this.rightBtn=utils.getByClass('right_btn',this.oDiv)[0];
        this.init();
}
Banner.prototype={
    constructor:Banner,
    getData:function getData() {
        var xhr=new XMLHttpRequest();
        xhr.open('get',this.url,false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
               this.data=utils.toJson(xhr.responseText);
            }
        };
        xhr.send()
    },
    giveHtml:function giveHtml() {
        var str=``;
        var tipStr=``;
        this.data.push(this.data[0]);// 把第一张图片添加到最后一张
        this.data.forEach( (item,index)=> {
            var {pic,title}=item;
            str +=`<li>
              <img src="${pic}" alt="">
              <p>${title}</p>
          </li>`;
            if(index<this.data.length-1){
                tipStr+=`<li class="tip ${index==0?'current':''}">${index+1}</li>`; // 三元运算符作用是给第一张图片加一个类名current
            }
        });
        this.n=this.data.length;
        this.oUl.innerHTML=str;
        this.tipBox.innerHTML=tipStr;
        this.oUl.style.position='relative';// 设置定位
        this.oUl.style.width=this.boxW*this.n+'px';// 设置oUl的宽度
    },
    autoPlay:function autoPlay() {
        this.timer=window.setInterval(()=> {
            this.play();
        },2000);
    },
    play: function play() {
        if( utils.css(this.oUl,'left')%this.boxW!=0)return;// 防止连续点击
        this.index++;
        if(this.index==-1){ // 往左走的左边界
            utils.css(this.oUl,'left',-this.boxW*(this.n-1));  // 直接闪到最后一张
            this.index=this.n-2;// 紧接着让ul向左移动 这是倒数第二张图片的索引
        }
        if(this.index==this.n){ // 往右走的边界
            this.index=1;
            utils.css(this.oUl,'left',0);// 闪到第一张
        }
        [...this.tips].forEach((item,index)=>{
            utils.removeClass(item,'current')
        });
        if(this.index==this.n-1){ // 走到最后一张时，给第一个tip加一个current
            utils.addClass(this.tips[0],'current');
        }else {
            utils.addClass(this.tips[this.index],'current');
        }
        var curL=-this.boxW*this.index;
        myAnimate(this.oUl,1000,{left:curL});
    },
    eventFn:function eventFn() {
        this.rightBtn.onclick= ()=> {
            clearInterval(this.timer);
            this.play();
            // timer=window.setInterval(function () {
            //     play();
            // },2000);
        };
        this.leftBtn.onclick=()=> {
            if( utils.css(this.oUl,'left')%this.boxW!=0)return;// 防止连续点击
            clearInterval(this.timer);
            this.index -=2; // 让index 整体减2 ； 它在play 中又加了1；相当于UL整体左移一个
            this.play();
            // timer=window.setInterval(function () {
            //     play();
            // },2000);
        };
        this.oDiv.onmouseenter=()=> {
            // 鼠标滑进去
            // 鼠标进入oDiv
            clearInterval(this.timer);
            utils.css(this.leftBtn,'display','block');
            utils.css(this.rightBtn,'display','block');
        };
        this.oDiv.onmouseleave=()=> {
            // 鼠标滑进去
            // 鼠标离开oDiv
            utils.css(this.leftBtn,'display','none');
            utils.css(this.rightBtn,'display','none');
            this.autoPlay();
        };

    },
    tipClick: function tipClick() {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick= ()=> {
                this.index=i-1;// 先减一是因为在play中是index先做了一个++的动作
                this. play();
            }
        }
    },
    init:function () {
        this.getData();
        this.giveHtml();
        this.autoPlay();
        this.eventFn();
        this.tipClick();
    }
};



