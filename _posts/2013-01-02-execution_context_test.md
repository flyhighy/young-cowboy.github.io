---
layout: post
title:  "javascript 执行环境探索 测试题"
date:   2013-01-01
categories: javascript
---
#关于Execution Context的一些习题

	alert(typeof(f));//undefined
    alert(typeof(g));//undefined
    var g = function f() {
        alert(f);
    }
    alert(typeof(g));//function
***
    function f(a) {
        a = a;
    }
    f(1);
    alert(a);
***
	function f() {
	    arguments[2] = 3;
	    console.log(arguments);//[1,2]
	}
	f(1, 2);       
***
	//create function
    function foo() {} // 声明，因为它是程序的一部分

    var bar = function foo() {}; // 表达式，因为它是赋值表达式的一部分

    new function bar() {}; // 表达式，因为它是new表达式

    (function () {
        function bar() {
        } // 声明，因为它是函数体的一部分
    })();

    (function foo() {
    }); // 函数表达式：包含在分组操作符()内

	a=1,function f(){}；//函数表达式，在逗号运算符中都是表达式
***
    //vo test1
    (function () {
        alert(test);

        function test() {
        }
    })();

    //vo test2
    (function () {
        alert(test);

        var test = 10;
        alert(test);

        function test() {
        }

        alert(test);
    })();

    //vo test3
    (function () {
        alert(test);

        var test = 10;

        alert(test);

        var test = function () {
        }

        alert(test);
    })();
***
    //[[scope]]test
    (function () {
        var a = 1;

        function f() {
            var b = 2;
            return a + b;
        }

        alert(f());
    })();
***
    //closure test
    (function () {
        var a = 1;

        function f() {
            var a = 2;
            return function () {
                return a;
            }
        }

        var temp = f();

        alert(temp());
    })();
***
    //this test1
    (function () {
        var o = {
            a:1,
            f:function () {
                return this.a;
            }
        }

        alert(o.f === o.f.prototype.constructor);
        alert(o.f());
        alert(o.f.prototype.constructor());

    })();

    //this test2
    (function () {
        var o = {a:1};

        function f() {
            return this;
        }

        f.call(o);
        f.apply(o);
        f.call(null);
        f.apply(null);

    })();

    //this test3
    (function () {
        var object1 = {
            a:1,
            f:function () {
                return this.a;
            }
        };

        var object2 = {
            a:2
        };

        alert(object1.f());

        object2.f = object1.f;

        alert(object2.f());

    })();