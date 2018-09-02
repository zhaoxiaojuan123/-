/**
 * Created by Administrator on 2018/8/18.
 */

function Banner(id,url) {
    this.data=null;
    this.url=url;
    this.n=0;
    this.index=0;
    this.timer=0;
    this.box=document.getElementById(id);
    this.oUl=utils.getByClass('ul_box')[0];
    this.boxW=utils.css(this.oUl,'width');
    this.leftBtn=utils.getByClass('leftBox',this.box)[0];
    this.rightBtn=utils.getByClass('rightBox',this.box)[0];
    this.tipBox=document.getElementsByClassName('tip_box')[0];
    this.tips=this.tipBox.getElementsByClassName('tip');
}

Banner.prototype={
    constructor:Banner,
    //获取数据
    getData:function () {
        var xhr=new XMLHttpRequest();
        xhr.open('get',this.url,false);
        xhr.onreadystatechange= ()=> {
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                this.data=utils.toJson(xhr.responseText);
            }
        };
        xhr.send();
        console.log(this.data);
    },
   // 将数据放到页面上
    giveHtml:function () {
        var str=``;
        var str2=``;
        this.data.push(this.data[0]);
        this.data.forEach( (item,index)=> {
            var {pic,title}=item;
            str+=`<li>
               <img src="${pic}" alt="">
               <p>${title}</p>
           </li>`;
            if(index<this.data.length-1){
                str2+=`<li class="tip ${index==0 ? 'current':''}">${index+1}</li>`
            }

        });
        this.n=this.data.length;
        utils.css(this.oUl,'width',this.boxW*this.n) ;
        this.oUl.innerHTML=str;
        this.tipBox.innerHTML=str2;
        utils.css(this.oUl,'position','relative');
    },
  // 页面滑动 play
    play:function () {
        if(utils.css(this.oUl,'left')%this.boxW!=0)return;
        this.index++;
        if(this.index>=this.n){//这是右边界
            utils.css(this.oUl,'left',0);
            this.index=1
        }
        if(this.index==-1){
            utils.css(this.oUl,'left',-this.boxW*(this.n-1));
            this.index=this.n-2
        }
        [...this.tips].forEach((item,index)=> { // 移除每个小tip的current
            utils.removeClass(item,'current')
        });
        if(this.index==this.n-1){
            utils.addClass(this.tips[0],'current')
        }else {
            utils.addClass(this.tips[this.index],'current')
        }

        //utils.css(this.oUl,'left',-this.boxW*this.index);
       myAnimate(this.oUl,1000,{left:-this.boxW*this.index})
    },
   autoPlay:function () {
        this.timer=setInterval( ()=> {
           this.play();
        },2000)
   },
  eventFn:function () {
      this.box.onmouseenter= ()=> {
          utils.css( this.leftBtn,'display','block');
          utils.css( this.rightBtn,'display','block');
          clearInterval(this.timer);
      };
      this.box.onmouseleave= ()=> {
          utils.css( this.leftBtn,'display','none');
          utils.css( this.rightBtn,'display','none');
          this.autoPlay();
      };

      this.rightBtn.onclick= ()=>{
        clearInterval(this.timer);
          this.play();
      };
      this.leftBtn.onclick=()=>{
          clearInterval(this.timer);
          this.index-=2;
          this.play();
      }


  },
  tipClick:function () {
      for (let i = 0; i < this.tips.length; i++) {
         this.tips[i].onclick=()=>{
             if(this.index==this.n-1){
                 utils.css(this.oUl,'left',0)
             }
             this.index=i-1;
             this.play();
         }
      }
  },
   init:function () {
       this.getData();
       this.giveHtml();
       this.autoPlay();
       this.tipClick();
       this.eventFn();
   }
};


var banner=new Banner('box','json/data.json');
banner.init();
