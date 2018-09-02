/**
 * Created by Administrator on 2018/8/4.
 */
var xhr=new XMLHttpRequest();// 创建一个AJAX对象
// => 大开请求的URL
// [http method]:http 请求方式 get post put delete head....
// [url]:请求数据的地址
// [async]:设置同步或者异步请求，默认是true异步，我们暂时写false 同步
xhr.open('get','data.txt',false);
// => 监听状态改变，完成数据的获取
xhr.onreadystatechange=function () {
    if(xhr.readyState===4&&xhr.status===200){
        var result=xhr.responseText;
        console.log(result);
    }

};
xhr.send(null);