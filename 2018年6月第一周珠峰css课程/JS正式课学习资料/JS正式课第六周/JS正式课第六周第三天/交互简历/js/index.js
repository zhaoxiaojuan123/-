/**
 * Created by Administrator on 2018/8/30.
 */

// 第一个块 loading 块
    let bell=$('#bell')[0],
         say=$('#say')[0],
         bgm=$('#bg_music')[0];
let loading=function () {
    // 进度条加载完成后要让 loading 的这个块消失
    let $progressBar=$('.progress .progressBar'),
        $loadingBox=$('.loadingBox');
    // 进度条的进度 是由项目中所有图片加载完成 来决定的
    let ary=['phone-bg.jpg',
        'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n=0;// 记录加载完成的图片个数
    ary.forEach((item)=>{
        let img=new Image();
        // 让临时的img 去请求 图片
        img.src=`./images/`+item;
        img.onload=load;
        // img.onload=function () {
        //     load()
        // }
    });
    function load() {
        n++;
        if(n==ary.length){
            // 说明所有图片加载完成
            $progressBar.css({
                width:'100%'
            });
            let timer2=setTimeout(function () {
                $loadingBox.hide();
                // 第一个隐藏 执行第二个块相关的内容
                phoneFn();
            },1800);
            // let timer=setTimeout(function () {
            //     $loadingBox.css({
            //         opacity:0
            //     })
            // },1000)
            $loadingBox.css({
                       opacity:0
                   })

        }else {
            $progressBar.css({
                width:n/ary.length*100+'%'
            })
        }
    };
};
loading();
// 第二模块 phoneFn
let phoneFn=function () {
  let $phoneBox=$('.phoneBox'), // 整个第二个块
      $listenBox=$('.listen_box'), // 接听的盒子
      $listenBtn=$('.listenBox'),  // 接听的按钮
      $noListenBox=$('.no_listen_box'), // 挂机对应的盒子
      $noListenBtn=$('.no_listenBox'),  // 挂机键
      $timeBox=$('.phoneBox header h4'); // 语音的时间
    // $listenBtn.on('touchend',fn)
    bell.play();
    bell.addEventListener('canplay',function () { //音频能播放会触发canplay函数
        console.log(1);
    },false);
       // bell.play();
     $listenBtn.tap(function () {
         // 点击 接听按钮 让接听的盒子隐藏；让时间显示；让挂机盒子升上来
         // 点击 接听按钮
         $listenBox.hide();
         $timeBox.show();
         $noListenBox.css({
             transform:'translateY(0)'
         });
         bell.pause();
         say.play();
         // 语音播放 怎么让上边的时间跟着变化
         let sayTimer=setInterval(function () {
             let t=say.currentTime;
             let str='00:'+(Math.ceil(t)<10?'0'+Math.ceil(t):Math.ceil(t));
             $timeBox.html(str);
             // 需要把say.currentTime 00:35这个格式的字符串
             // 需要我们判断音频是否播放完毕；若播放完毕，则直接执行 挂机键执行的操作
             if(say.ended){
                 clearInterval(sayTimer);
                 phoneEnd();
             }

         },1000);

         $noListenBtn.on('touchend',function () {
             say.pause();
             phoneEnd();

         });
         function phoneEnd() {
             let h=document.documentElement.clientHeight||document.body.clientHeight;
             // 获取到的是以px 为单位的数字
             $phoneBox.css({
                 transform:`translateY(${h}px)`
             });
             // 设置定时器 等待0.8s触发下一个模块的函数
             setTimeout(function () {
                 msgFn();
             },1000)
         }
     })

};
// 第三个块 msgFn
let msgFn=function () {
    // 让每一个li先都透明并且下移
    // 循环这些LI 让这些LI轮着  显示并升上去
    let $msgBox=$('.msgBox'),
        $ul=$msgBox.children('ul'),
        $lis=$ul.children('li'),
        $keyboard=$msgBox.find('.keyboard'),
        $textBox=$keyboard.find('.textBox'),
        $btn=$keyboard.find('.btn');
    bgm.play();
    let h=0,
        n=0;// n 是存储当前要显示的那个元素LI 的索引
    let moveTimer=null;
    function move() {
        moveTimer=setInterval(function () {
            if(n==$lis.length){  // 如果已经走完 则直接清除定时器
                clearInterval(moveTimer)
            };
            $lis.eq(n).css({
                transform:'translateY(0)',
                opacity:1
            });
            // ul 移动 根据索引； 如果索引大于3 ，就让ul 向上移动；
            if(n>=3){
                h+=$lis[n].clientHeight;
                $ul.css({
                    transform:`translateY(-${h}px)`
                });
            }
            if(n==2){
                $keyboard.css({
                    transform:'translateY(0)'
                });
                clearInterval(moveTimer);
                // 接下来 我们要让字体 一个一个的显示出来
                setTimeout(function () {
                    inputWord(); // 这个是异步的 执行完n++,才执行 这个定时器n=3
                },1600);
                // inputWord();// 这个是同步的 n=2
            }
            n++;
        },2000);
    }
    // let moveTimer=setInterval(function () {
    //     if(n==$lis.length-1){  // 如果已经走完 则直接清除定时器
    //         clearInterval(moveTimer)
    //     };
    //     $lis.eq(n).css({
    //         transform:'translateY(0)',
    //         opacity:1
    //     });
    //     // ul 移动 根据索引； 如果索引大于3 ，就让ul 向上移动；
    //     if(n>=3){
    //         h+=$lis[n].clientHeight;
    //        $ul.css({
    //            transform:`translateY(-${h}px)`
    //           })
    //     }
    //     if(n==2){
    //         $keyboard.css({
    //             transform:'translateY(0)'
    //         });
    //         clearInterval(moveTimer);
    //         // 接下来 我们要让字体 一个一个的显示出来
    //         setTimeout(function () {
    //             inputWord(); // 这个是异步的 执行完n++,才执行 这个定时器n=3
    //         },1600);
    //         // inputWord();// 这个是同步的 n=2
    //     }
    //
    //     n++;
    // },2000);
    move();
    function inputWord() {
        // 让字体一个一个蹦出来
        let str=$lis[n].innerText; // 获取文本值,要显示的全部内容 n不需要加一了
        let str2='';//当前要显示的字体内容
        let timer2=null;
        let index=0;// 控制当前要出来的那字
        //现在我们要让字体出现完成之后再去让按钮显示
        timer2=setInterval(function () {
            if(index==str.length){
                clearInterval(timer2);
                $btn.show();//让按钮显示
                $btn.tap(function () {
                    $textBox.html('');
                    $lis.eq(n).css({
                        opacity:1,
                        transform:'translateY(0)'
                    });
                    h+=$lis[n].clientHeight;
                    $ul.css({
                        transform:`translateY(-${h}px)`
                    });
                    n++;
                    $keyboard.css({
                        transform:'translateY(7rem)'
                    });
                    move();
                }); //点击按钮要做的 1、清空textBox 2、让键盘下去 3、对话框接着弹
                return;
            }
            str2+=str[index];
            $textBox.html(str2); // 把str2的内容放到页面上
            index++;
        },500)

    }

       // $lis.each(function (index,item) {
       //     setTimeout(function () {
       //         $(item).css({
       //             opacity:1,
       //             transform:'translateY(0)'
       //         });
       //         if(index>=3){
       //             h+=item.clientHeight;
       //             $ul.css({
       //                 transform:`translateY(-${h}px)`
       //             })
       //         }
       //         if(index==2){
       //             $keyboard.css({
       //                 transform:'translateY(0)'
       //             })
       //         }
       //     },index*2000)
       // })
};





