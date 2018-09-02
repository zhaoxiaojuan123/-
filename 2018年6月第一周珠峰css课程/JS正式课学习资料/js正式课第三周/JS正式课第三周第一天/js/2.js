/**
 * Created by Administrator on 2018/8/7.
 */
var reg=/\d/;
var str='珠峰2018珠峰2019';
reg.test(str);// true


var reg2=/^\d/;// ^ 在这里是以什么开头  在[^]  中的^ 代表非
var str2='珠峰2018珠峰2019';
var str2_1='2017珠峰2018珠峰2019';
console.log(reg2.test(str2));// false 不是以数字开头
console.log(reg2.test(str2_1));// true 是以数字开头

var reg3=/^\d{4}/ ; // 以四个数字开头的字符串
var str3='2018珠峰';
var str3_1='18珠峰';
console.log(reg3.test(str3));// true
console.log(reg3.test(str3_1));//false

var reg4=/\d+$/;// 以一个数字或者多个数字结尾
var reg4_1=/\d$/;// 以一个数字结尾
var reg4_2=/\d{2}$/;// 以连续的两个数字结尾
var str4='2018珠峰';
var str4_1='2018珠峰2019';
var str4_2='2018珠峰0';
console.log(reg4.test(str4));// false
console.log(reg4.test(str4_1));// true
console.log(reg4.test(str4_1));// true

console.log(reg4_2.test(str4)); // false
console.log(reg4_2.test(str4_1));// true
console.log(reg4_2.test(str4_1));// false


var reg5=/\d/;// 字符串中有没有数字
var reg5_1=/^\d$/;// 以数字开头以数字结尾
var str5='珠峰2018珠峰';
var str5_1='2018珠峰2018珠峰2019';

console.log(reg5.test(str5)); // true
console.log(reg5_1.test(str5)); // false
console.log(reg5_1.test(str5_1)); //


var reg7=/^\d$/;// 只能是一个数字
var reg7_1=/^\d+$/;// 以数字开头以数字结尾 只能是数字  数字连续出现 1到多次
var reg7_1=/^\d*$/;// 以数字开头以数字结尾 只能是数字  数字连续出现 1到多次; * 多匹配了一个空字符串str='';这样匹配
var str7='1';
var str7_1='123456';
var str7_2='123www456';
console.log(reg7.test(str7)); // true
console.log(reg7.test(str7_1)); // false

console.log(reg7_1.test(str7)); // true
console.log(reg7_1.test(str7_1)); // true
console.log(reg7_1.test(str7_2)); //  false



