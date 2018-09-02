/**
 * Created by Administrator on 2018/8/7.
 */
/*
* exec 捕获  获取字符串中  满足正则条件  的字符或字符串
*
* */
var reg=/\d+/;
var str='珠峰2018珠峰2019';
console.log(reg.test(str));// true
console.log(reg.exec(str));// ["2018", index: 2, input: "珠峰2018珠峰2019", groups: undefined]
/*
* ["2018", index: 2, input: "珠峰2018珠峰2019", groups: undefined]
* 第一项 是整个正则捕获的内容
* 第二项开始  捕获的是每一个分组捕获的内容
* index 捕获的项开始的索引
* input 原始字符串
*
* */
/*
* + 放在括号外面捕获最后一个字母或数字 （[a-z]）+
* */

/*
* 正则捕获的懒惰性：它只捕获字符串中第一次符合规则的部分；即使多次执行，也不会再去后边捕获；
* 解决这个问题 我们需要在正则的后边加上全局修饰符 g ;
* */
/*
*
* lastIndex: 记录的是下一次查找开始的索引
* 没有全局修饰符g 时；每次都是从索引0 开始查找
* 加上全局修饰符g 时；每次都是从上次查找完毕后结束的索引处开始；
* 查不到时，返回null
* */

/*
* 需求：获取到字符串中所有满足条件的字符或字符串;返回找到的内容组成数组
* 思路：利用全局修饰符g 的特性一直查找 ，找到一个就放到数组中直到返回null时 则停止查找 返回数组
* */

RegExp.prototype.execAll=function (str) {
    var temp;
    if(!this.global){
        // 若没有全局修饰符
        var temp=this.exec(str)||[];
         temp.errorReason='你没有加全局修饰符';
      /*  var str='';
        var reg1=eval(str+this+'g');
        var str1='ac125';
        console.log(reg1,typeof reg1);*/
        return temp;
    }
    var ary=[];
    temp=this.exec(str);
    while (temp){
       ary.push(temp[0]);
        temp=this.exec(str);
    }
    return temp;
};

var reg=/\d+/;
var str='珠峰2018珠峰2019';
reg.execAll(str);

