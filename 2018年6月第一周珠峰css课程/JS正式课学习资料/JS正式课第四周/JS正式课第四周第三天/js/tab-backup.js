/**
 * Created by Administrator on 2018/8/17.
 */

~function ($) {
    function pluginTab(options) {
        //=>this:当前你想让哪个选项卡实现切换，this就是当前选项卡的容器
        var $tabBox=this,
            $tabList=$tabBox.find('.tab>li'),// 上面新闻的按钮
            $conList=$tabBox.children('.con');//下面的选项卡切换
        //=>init parameters
        var _default={
            initIndex:0,
            eventType:'click'
        };
        options &&$.each(options,function (key,value) {
            if(options.hasOwnProperty(key)){
                _default[key]=value;
            }
        });
        //=>show default
        change(_default.initIndex);

        //=>bind event
        $tabList.on(_default.eventType,function () {
            var $this=$(this),
                index=$this.index();
            change(index)
        });
        function change(index) {
            $tabList.eq(index).addClass('select').siblings().removeClass('select');
            $conList.eq(index).addClass('select').siblings().removeClass('select');
        }

    }
    $.fn.extend({
        pluginTab:pluginTab
    });

}(jQuery);




// var tabRender=(function () {
//     var $tabBox=$('#tabBox'),
//         $tabList=$tabBox.find('.tab>li'),
//         $conList=$tabBox.children('.con');
//     //=>给所有的li绑定点击事件
//
//     var _default={
//         initIndex:0,
//         eventType:'click'
//     };
//     function bindEvent() {
//         //$tabList.click(function () {});
//         //=>this:current click li
//         $tabList.on(_default.eventType,function (){
//             var $this=$(this),
//                 _index=$this.index();
//             //=>this:当前点击的这个li
//             $(this).addClass('select')
//                 .siblings().removeClass('select');
//             $conList.eq(_index).addClass('select')
//                 .siblings().removeClass('select');
//
//             // $conList.each(function (index,item) {
//             //     //=>this:item
//             //     if(_index===index){
//             //         $(item).addClass('select')
//             //     }else {
//             //         $(item).removeClass('select')
//             //     }
//             // })
//         })
//     }
//     function initDefault() {
//         $tabList.removeClass('select');
//         $conList.removeClass('select');
//         $tabList.eq(_default.initIndex).addClass('select');
//         $conList.eq(_default.initIndex).addClass('select');
//     }
//
//     return {
//         init:function (options) {
//             //=>init parameters
//             if(typeof  options!=='undefined'){
//                 $.each(options,function (key,value) {
//                     if(options.hasOwnProperty(key)){
//                         _default[ket]=value;
//                     }
//                 })
//             }
//             initDefault();
//             bindEvent();
//         }
//     }
// })();
// 执行
// tabRender.init({
//     initIndex:1,
//     eventType:'mouseover'
//
// });







