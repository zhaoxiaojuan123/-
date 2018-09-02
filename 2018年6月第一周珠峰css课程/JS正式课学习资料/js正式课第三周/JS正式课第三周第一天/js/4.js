/**
 * Created by Administrator on 2018/8/7.
 */

/*
* 匹配 10-29 的年龄段
* */
var reg=/^(1|2)\d$/;
var reg1=/^[1|2]\d$/;
var reg2=/^[12]\d$/;


/*
* 匹配 18-65年龄段
* 18-19
* 20-59
* 60-65
* */

var reg=/^1[8|9]|([2-5]\d)|(6[0-5])$/; // 正确
for (var i =10; i < 70; i++) {
   console.log(i,reg.test(i))

}


/*
* 匹配 有效数字
*  +
*  -
*  小数
* */

var reg=/^[+-]?(\d|[1-9]\d+)(\.\d+)?$/;
// [+-]?  ：代表正负号可能出现 也可以不出现
// (\d|[1-9]\d+) -->代表若是一位数，则可以 以0开头；若是多位数 则必须以1-9之间的数字开头
//(\.\d+)?  ---> 代表小数点部分，出现0次或1次



var str='-12.32';
var str1='12..32';

/*
* 验证手机号
* 开头是1
* 11位数字
* */

var reg=/^1\d{10}$/;
// 邮箱
/*
* qq.com --->@前边最小5位  最大11位
* 163.com---> @前边  数字 字母 下划线 最小6位  最大18位
* 126.com -->@前边  数字 字母 下划线 最小6位  最大18位
* */

// var reg=/^\d{5,11}@qq\.com|([a-zA-Z\d_]{6,18}@163\.com)|([a-zA-Z\d_]{6,18}@126\.com)$/;
var reg1=/^([1-9]\d{4,10}@qq)|(\w{6,18}@(163|126))\.com$/;









