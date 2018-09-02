/**
 * Created by Administrator on 2018/8/7.
 */


var reg1=/x|y/; // 字符串出现一个x或y
var reg2=/[xy]/; // 字符串出现一个x或y
var str='abxyd';


var reg2=/^1|2$/;// 以1开头 或者 以2结尾 的字符串
var str2='123456';
var str2_1='4562';


var reg=/^18|19$/;// 以18开头 或者 以19结尾 的字符串

//--------------
// 分组
var reg=/^(18|19)$/; //  代表 18 或者19
// 分开的意思是：  /^18$/   /^19$/

/*
* 分组的作用
* 1、提升优先级
* 2、分组匹配   可以理解为大正则里边的小正则
* 3、分组捕获
* */
var reg=/[abc]/ ;  // 字符串中有a 或b 或c
var reg1=/^[abc]$/ ;  // 代表单个a 或b 或c
var reg2=/^[abc]+$/ ;  // 代表是a b c 出现1到 多个
reg2.test('abc');//true
reg2.test('aaa');//true
reg2.test('bca');//true
reg2.test('bcaacb');//true

var reg4=/^abc$/; // 只能匹配'abc'
// 以a开头 以c结尾 中间只能是b


var reg6=/^[2.3]$/;// 在中括号中的 . 代表 点这个符号本身
var reg6_1=/^[2\.3]$/;// 和上面一个意思
reg6.test('2.3');//false
reg6.test('2');//true
reg6.test('.');//true
reg6.test('3');//true
reg6.test('\n');//false


var reg7=/^2.3$/; // 以2开头 以3结尾 中间随便（除了\n）

var reg9=/^[\da-z]+$/;//  代表0-9的数字或者a-z的之母 可以多个


//------------------

var reg10=/^[^abc]$/;// 除了abc ，其他的字符的一个

var reg11=/^2\.3$/; // 只能匹配 '2.3'

//---------------------------









