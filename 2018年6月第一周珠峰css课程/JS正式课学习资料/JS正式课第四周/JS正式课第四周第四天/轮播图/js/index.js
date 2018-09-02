/**
 * Created by Administrator on 2018/8/18.
 */


function Banner(id,url) {
    this.box=document.getElementById(id);//获取外边的盒子
    this.oUl=utils.getByClass('ul_box',this.box)[0];//获取ul条
    this.data=null;//存数据
    this.boxW=utils.css(this.box,'width');//存储盒子的宽度
    this.index=0;//要显示的图片的索引
    this.n=0;//存储图片的个数
    this.leftBtn=utils.getByClass('leftBtn',this.box)[0];
    this.rightBtn=utils.getByClass('rightBtn',this.box)[0];
    this.url=url;
}

Banner.prototype={
    constructor:Banner,
    getData:function () {
        //获取数据
        return new Promise((res,rej)=>{
            var xhr=new XMLHttpRequest();
            xhr.open('get',this.url);//默认true 异步
            xhr.onreadystatechange= ()=> {
                if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                    this.data=utils.toJson(xhr.responseText);
                    res();
                }
                if(!/^2\d{2}$/.test(xhr.status)){
                    rej();
                }
            };
            xhr.send();
        })
    },
    giveHtml:function () {
        // 把数据放到页面上
        var str=``;//用来存储拼接的DOM字符串
        this.data.push(this.data[0]);
        this.data.forEach((item,index)=>{
            var {pic,title}=item;
            str+=`<li>
            <img src="${pic}" alt="">
            <p>${title}</p>
        </li>`
        });
        utils.css(this.oUl,{'width':this.data.length*this.boxW,position:'relative'});
        this.n=this.data.length;
        this.oUl.innerHTML=str;
        this.timer=null;
    },
    play:function () {
        if(utils.css(this.oUl,'width')%this.boxW!=0)return;
        // 让图片滚动 控制oUl的left值
        this.index++;//index==this.n-1 是显示最后一张图片；做完++后index 变成了this.n
        if(this.index>=this.n){// 这是右边界
            utils.css(this.oUl,'left',0);//闪到真第一张
            this.index=1;//往第二张走
        }
        if(this.index==-1){
            utils.css(this.oUl,'left',-this.boxW*(this.n-1));
            this.index=this.n-2;
        }
        //utils.css(this.oUl,'left',-this.boxW*this.index);
      myAnimate(this.oUl,1000,{left:-this.boxW*this.index})
    },
    autoPlay:function () {
        if(utils.css(this.oUl,'left')%this.boxW!=0)return;
        this.timer=setInterval(function () {
            banner.play();
        },2000);
    },
    eventFn:function () {
      this.box.onmouseenter=()=> {
          utils.css(this.leftBtn,'display','block');
          utils.css(this.rightBtn,'display','block');
          clearInterval(this.timer);
      };
        this.box.onmouseleave=()=> {
            utils.css(this.leftBtn,'display','none');
            utils.css(this.rightBtn,'display','none');
            this.autoPlay();
        };
        this.rightBtn.onclick=()=>{
            clearInterval(this.timer);
            this.play();
        };
        this.leftBtn.onclick=()=>{
            clearInterval(this.timer);
            if(utils.css(this.oUl,'left')%this.boxW!=0)return;
            this.index-=2;
            this.play();
        }

    },
    cd:function(){
        this.giveHtml();
        this.autoPlay();
        this.eventFn();
},
    init:function () {
        this.getData();
       var p=this.getData();
        p.then(()=>{
            this.cd();
        },()=>{
            console.log('fail')
        });
        //this.tipClick();
    }
};

var banner=new Banner('box','json/data.json');
banner.init();
// console.log(banner.getData());
// banner.giveHtml();
// banner.autoPlay();
// banner.eventFn();





