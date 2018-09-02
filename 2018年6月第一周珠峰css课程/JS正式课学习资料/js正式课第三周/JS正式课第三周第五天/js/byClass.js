/**
 * Created by Administrator on 2018/8/13.
 */
/*
* [context].getElementByClassName([className])
* 在指定的上下文中，通过样式类名获取一组元素集合，在IE6-8不兼容
* */
console.log(document.getElementsByClassName('box1'));
//  [div.box1.box2, div.box1.box2.box3, div.box1.box3]

console.log(document.getElementsByClassName('box1 box2'));
//  [div.box1.box2, div.box1.box2.box3]
// 如果纯涤多个样式类名：同时具备这些样式类的元素（多个样式类之间加几个空格都无所谓，而且不计较编写的顺序）
// =>当前只处理传递一个样式类名的（但是收尾可能会加很多的空格）
// strClass :传递进来的样式类名，例如：'box1'
// context:限定获取的范围（上下文），不传递默认值为document
function getEleByClass(strClass,context) {
    context=context||document;
    //=>思路：获取指定上下文中所有的标签，然后遍历这些标签，把所有class中包含传递进来的样式类的元素都保存起来即可
    var result=[],
        nodeList=context.getElementsByTagName('*');// 获取指定上下文的所有标签
    //=>去除传递进来样式类的收尾空格
    strClass=strClass.replace(/^\s+|\s$/g,'');
    for (var i = 0; i < nodeList.length; i++) {
        var item=nodeList[i];
        // =>当前项的class：item.className
        //=>传递进来的样式类：strClass
        //=>我们接下来要验证item.className 字符串中是否包含传递进来的strClass样式类
        var reg=new RegExp('(^| +)'+strClass+'( +|$)');
        if(reg.test(item.className)){
            result.push(item);
        }
        /*
        * indexOf：虽然可以验证字符串是否包含某个字符，但是无法判断是否半寒这个样式类
        * "box100 box2 box3".indexOf('box1')=>0
        * 但是样式中并没有box1这个样式类
        * */

    }

    return result;
}
//=>/box2/ => 只要包含box2这个字符就可以了（和indexOf类似了）
//=> /\bbox2\b/ =>这个说明他是完整的单词 遇到这种字符就不可以了'box1 box2-2 box3' 在正则中\b 不仅是单词的边界，而且它会把中杠两边也作为边界  'box2-2'和/\bbox2\b/是匹配的，但是当前元素样式类是box2-2 而不是box2
// /(^| +)box2( +|$)/ 中间是box2完整单词，左右两边是空格或者开始结束；






















