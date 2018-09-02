/**
 * Created by Administrator on 2018/8/19.
 */

// $.get('data.json',function (data) {
//     console.log(data);
// });
//var data=null;
var $box=$('#box'),
    $ul=$box.children('.img_box'),
    $lis=$ul.children('li'),
    $leftBtn=$box.find('.leftBtn'),
    $rightBtn=$box.find('.rightBtn'),
    $tipBox=$box.find('.tip_box'),
    $tip=$tipBox.find('.tip');
var index=0,//显示图片的索引
    n=0, // 图片的个数
    timer=null;//存储定时器

$.ajax({
    type:'get',
    url:'data.json',
    data:{q:1},
    success:function (data) {
        giveHtml(data)
    },
    error:function () {

    }
});

function giveHtml(data) {
    //data.forEach((item,index)=>{   })
    var str=``;
    var tip=``;
        $.each(data,function (index,item) {
            str+=` <li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;
            tip+=`<li class="tip ${index==0?'current':''}">${index+1}</li>`
        });

        $ul.html(str);
      $tipBox.html(tip);
      $tip=$tipBox.find('.tip');
       n=data.length;
        init();
}
   /*
   * 做处理 显示第一张
   * */
  function init() {
      $lis=$ul.children('li');
      //$lis.eq(0).css('zIndex',10).siblings().css('zIndex',1)
      $lis.eq(0).css({zIndex:10}).siblings().css({zIndex:1,opacity:0});
      autoPlay();
      eventFn();
      tipClick()
  }
   function play() {
       if($box.running)return;
       $box.running=true;
       index++;
       if(index==n){
           index=0;
       }
       if(index<=-1){
           index=n-1;
       }
       $tip.eq(index).addClass('current').siblings().removeClass('current');
       $lis.eq(index).css({zIndex:10}).siblings().css({zIndex:1});
       $lis.eq(index).animate({opacity:1},500,function () {
           $(this).siblings().css({opacity:0});
           $box.running=false;
       })

   }
 function autoPlay() {
     timer=setInterval(function () {
         play();
     },2000)
 }
function eventFn() {
    $box.on('mouseenter',function () {
        $leftBtn.show();
        $rightBtn.show();
        clearInterval(timer);
    });
    $box.on('mouseleave',function () {
        $leftBtn.hide();
        $rightBtn.hide();
        autoPlay();
    });
    $leftBtn.on('click',function () {
        if($box.running)return;
        index-=2;
        play();
    });
    $rightBtn.on('click',function () {
        play();
    })

}
function tipClick() {
    $tip.on('click',function () {
        var $this=$(this); // this是点击的那个元素
        var n=$this.index(); // n是点击那个元素的索引
        index=n-1;  // 因为play函数里面有index++
        play();
    })
}




