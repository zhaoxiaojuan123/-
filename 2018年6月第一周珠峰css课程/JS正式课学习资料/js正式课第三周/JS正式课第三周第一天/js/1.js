/**
 * Created by Administrator on 2018/8/7.
 */
var reg=/w/; // 要检测的字符串中含有 w 字符
console.dir(reg);
var reg2=/\w/;

var str='http://www.zhufeng.com';
reg.test(str);// true



var reg4=/\d+/ ;// 检测字符串中有没有数字 数字出现的次数是1到多次
var str_1='2018珠峰2019珠峰';
var str_2='2珠峰珠峰';
var str_3='珠峰珠峰';
reg4.test(str_1);// true
reg4.test(str_2);// true
reg4.test(str_3);// false


var reg5=/\d?/; // 检测字符串中有没有出现数字，次数是0 或 1次
var str5_1='2018珠峰2019珠峰';
var str5_2='2珠峰珠峰';
var str5_3='珠峰珠峰';
reg5.test(str5_1);// true
reg5.test(str5_2);// true
reg5.test(str5_3);  // true



var reg6=/\d*/ ;// 检测字符串中有没有出现数字，次数是0 到 多次
var str6_1='2018珠峰2019珠峰';
var str6_2='2珠峰珠峰';
var str6_3='珠峰珠峰';
reg6.test(str6_1);// true
reg6.test(str6_2);// true
reg6.test(str6_3);// true


var reg7=/\d{2}/ ;// 检测字符串中有没有出现数字，连续出现2次（连着的两个数字）
var str7_1='2018珠峰2019珠峰';
var str7_2='2珠峰珠峰';
var str7_3='珠峰珠峰';
var str7_4='珠2峰珠3峰';
reg7.test(str7_1);// true
reg7.test(str7_2);// false
reg7.test(str7_3);// false
reg7.test(str7_4);// false












