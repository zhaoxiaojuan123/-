var name = "zhufengpeixun.com";
var person = {
    name: "zhufeng",
    pro: {
        name: "peixun",
        getName: function() {
            return this.name;
        },
        getName2: function () {
            return function () {
                return this.name
            }
        }
    }
};

console.log(person.pro.getName());//peixun
var pepole = person.pro.getName;
console.log(person.pro.getName2()());//"zhufengpeixun.com" 第二个括号前面（person.pro.getName2()）没有点 this指向全局window
console.log(pepole());//"zhufengpeixun.com";



//2
var num = 2;
var obj = {
    num: 2,
    fn: (function (num) {
        num *= 2;
        this.num +=1;
        return function () {
            this.num *=3;
            ++num;
            console.log(num)
        }
    })(num)
};
var fn = obj.fn;
fn();
obj.fn();
console.log(num, obj.num);


//3、
function a(xx){
    this.x=xx;
    return this
};

var x=a(5);//
console.log(x.x);//window.window
var y=a(6);
console.log(x.x);//6.x undefined
console.log(y.x);//window.6

//4
var number = 4;
var obj = {
    'number': 4,
    'tbl': (function(num){
        this.number *= 2;
        num+=2;
        console.log(this.number);
        return function(){
            this.number *= 2;
            num++;
            console.log(num,this.number)
        }
    })(number)
};
var tbl = obj.tbl;  //this.number-->8
tbl();// -->7 16
obj.tbl();// 8 8