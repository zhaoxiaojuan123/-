var a = {
    x:1
};
a.c = a = {y:1};
//-------------------


console.log(a,b,c);
var a=10,b=20,c=30;
function f(a){
    console.log(a,b,c);
    var b = a = c = 100;
    console.log(a,b,c)
}
f(10,20);
console.log(a,b,c);



//----------------------------
a();
var a = c = function() {
    console.log(2)
};
a();
function a() {
    console.log(1)
};
a();

//----------------------------
console.log(a);
var a=12;
function fn(){
    console.log(a);
    var a=13;
}
fn();

//----------------
var foo=1;
function bar(){
    if(!foo){
        var foo=10;
    }
    console.log(foo);
}
bar();

//----------------------------

//----------------------------
function a() {
    console.log(1)
};
function c() {
    console.log(2)
}
(function(b) {
    b(), c();
    var b = c = function a() {
        console.log(3)
    };
    function b(){
        console.log(4)
    }
    b();
})(a);
c();

//----------------------------------------------------
alert(a);
console.log("a" in window);
if(!("a" in window)){
    var a = 10;
    function fn() {
        console.log(3)
    }
}
console.log(a);
console.log(fn);
if(9==8){
    function fn(){
        console.log(2);
    }
}

//===============================
var n=5;
function a(n){
    n++; //1+undefined=NaN
    n=10;
    b();
    function b(){
        n++;
        alert(n);//11
    };
}
a();
alert(n);//5

//
var a=3;
function c(a){
    alert(a);
}
(function(){
    var a=4;
    c(a);  //4
})();


//
var n = 10;
function fn() {
    var n = 20;
    function f() {
        n++;
        console.log(n)
    };
    f();
    return f
}
var f = fn();  //n=21
f();//22
f();//23
console.log(n);//10

//======================

var i = 1;
function fn(i) {
    return function (n) {
        console.log(n+(++i))
    }
}
var f = fn(2);// 函数中 i=2
f(3);// n+i=3+3=6 i=3
fn(5)(6);//i=5;n=6;n+i=7+6=12
fn(3)(2);//i=3;n=2;n+i=2+4=6
f(4);// n=4,4+4=8

//------------------------------------

let i = 1;
let fn = function (n) {
    i *= 2;
    return function (m) {
        i += n + m;
        console.log(i);
    }
};
let f = fn(2);// i=2 n=2
f(3);//i=2+2+3=7
fn(2)(3);//i=7*2=14  n=2  m=3  i=14+2+3=19
f(4);//i=19+2+4=25
f(5);//i=25+2+5=32
//---------------------------------------------------

let i = 1;
let fn = function (n) {
    i *= 2;
    return function (m) {
         n=n+m;
        console.log(n);
    }
};
let f = fn(2);// i=2 n=2
f(3); // n=2+3=5
fn()(3);// NaN
f(4);//n=5+4=9
f(5);//n=9+5=14