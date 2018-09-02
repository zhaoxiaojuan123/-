/**
 * Created by Administrator on 2018/8/19.
 */

var $box=$('#box'),
    $ul=$box.children('.ul_box'),
    $tipBox=$('.tip_box'),
    $tips=$tipBox.children('.tips'),
    $btnBox=$('.btn_box'),
    $leftBtn=$btnBox.children('.leftBtn'),
    $rightBtn=$btnBox.children('.rightBtn');
var n=0,
    index=0;
    timer=null;

$.ajax({
    type:'get',
    url:"json/data1.json",
    success:function (data) {
        console.log(data);
        giveHtml(data)
    },
    error:function () {

    }
});

function giveHtml(data) {
    var str=``;
    var tip=``;
    $.each(data,(index,item)=>{
        str +=` <li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;

        tip +=`  <li class="tips ${index==0?'current':''}">${index+1}</li>`
    });
    $ul.html(str);
    $tipBox.html(tip);
    $lis=$ul.children('li');
    $tips=$tipBox.children('.tips');
    n=data.length;
    init();
}
function init() {
    $lis.eq(0).css({zIndex:10}).siblings().css({zIndex:1,opacity:0});
    autoPlay();
    eventFn();
    tipClick()
}

function play() {
    if( $box.running) return;
    $box.running=true;
    index++;
    if(index==n){
        index=0
    }
    if(index==-1){
        index=n-1
    }

    $tips.eq(index).addClass('current').siblings().removeClass('current');
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
        clearInterval(timer)
    });
    $box.on('mouseleave',function () {
        $leftBtn.hide();
        $rightBtn.hide();
        autoPlay();
    });
    $leftBtn.on('click',function () {
        index-=2;
        play();
    });
    $rightBtn.on('click',function () {
        play();
    })

}
  function tipClick() {
      $tips.on('click',function () {
      var $this=$(this);
          var n=$this.index();
          index=n-1;
          play()
      })

  }




