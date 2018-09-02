/**
 * Created by Administrator on 2018/8/17.
 */
var tabRender=(function () {
    var $tabBox=$('#tabBox'),
        $tabList=$tabBox.find('.tab>li'),
        $conList=$tabBox.children('.con');
    //=>给所有的li绑定点击事件

    var _default={
        initIndex:0,
        eventType:'click'
    };
    function bindEvent() {
        //$tabList.click(function () {});
        //=>this:current click li
        $tabList.on(_default.eventType,function (){
        var $this=$(this),
            _index=$this.index();
            //=>this:当前点击的这个li
            $(this).addClass('select')
                .siblings().removeClass('select');
            $conList.eq(_index).addClass('select')
                .siblings().removeClass('select');

            // $conList.each(function (index,item) {
            //     //=>this:item
            //     if(_index===index){
            //         $(item).addClass('select')
            //     }else {
            //         $(item).removeClass('select')
            //     }
            // })
        })
    }
    function initDefault() {
        $tabList.removeClass('select');
        $conList.removeClass('select');
        $tabList.eq(_default.initIndex).addClass('select');
        $conList.eq(_default.initIndex).addClass('select');
    }

    return {
        init:function (options) {
          //=>init parameters
           if(typeof  options!=='undefined'){
               $.each(options,function (key,value) {
                   if(options.hasOwnProperty(key)){
                       _default[ket]=value;
                   }
               })
           }
            initDefault();
            bindEvent();
        }
    }
})();
// 执行
tabRender.init({
    initIndex:1,
    eventType:'mouseover'

});







