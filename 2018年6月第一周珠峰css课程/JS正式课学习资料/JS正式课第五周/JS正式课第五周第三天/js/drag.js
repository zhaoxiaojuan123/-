/**
 * Created by Administrator on 2018/8/23.
 */


function dragStart(e) {
    clearInterval(this.flsyTimer);
    e=e||window.event;

    this.DragMove=dragMove.bind(this);
    this.DragEnd=dragEnd.bind(this); // 强行转变this指向
    //document.onmousemove=this.DragMove;
    on(document,'mousemove',this.DragMove);
    //document.onmouseup=this.DragEnd;
    on(document,'onmouseup',this.DragEnd);
    this.startX=this.offsetLeft;
    this.startY=this.offsetTop; // 盒子的初始值
    this.mx=e.pageX; // 鼠标的初始值
    this.my=e.pageY;
    on(oDiv,'myFlay',fly);
    on(oDiv,'myDrop',drop);
}
function dragMove(e) {
    // if(!this.flag)return;
    // this.flag=true;
    e=e||window.event;
    var x=e.pageX-this.mx,
        y=e.pageY-this.my;
    this.style.left=this.startX+x+'px';
    this.style.top=this.startY+y+'px';
    if(!this.prevX){
        this.prevX=0
    }
    this.speed=e.pageX-this.prevX; // 两次move 触发时 移动的距离当做速度
    this.prevX=e.pageX;
}
function dragEnd(e) {
    //this.flag=false;//控制盒子能不能移动
    //document.onmousemove=null;
    //document.onmouseup=null;
    off(document,'onmousemove');
    off(document,'onmouseup');

    this.maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
    if(!this.running){  // 上一次的fly不停止，新的flay就不执行
        fire(this,'myFlay','qqq');
        //fly.call(this);
    }
    // 最大top值
    this.maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
    //drop.call(this);
    fire(this,'myDrop');
}


