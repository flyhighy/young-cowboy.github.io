---
layout: post
title:  "javascript 原型链"
date:   2013-01-01
categories: javascript
---
# Prototype Chain

参考资料：

* 《javascript权威指南 第六版》
* 《javascript高级程序设计 第二版》

写在前面的话

所谓的原型链就是一个一个的对象通过其\_\_proto\_\_属性连接起来的数据结构
（链）。这个数据结构对JS的继承很重要。

	object a		object b		object c
	|----------|    |---------|    |---------|    
	|__proto__----> |__proto__---->|__proto__----> ...
	|----------|    |---------|    |---------|    

* js的世界里除了简单数据类型（Number，String，Boolean，Undefined，Null）就是复杂数据类型——对象，**连作用域都是对象**。
	* 简单数据类型很简单，就是简单的数据段，直接赋值给变量，生存在**栈**中，**因为它们的大小设置好后就不可以改变**。
	* 复杂数据类型很复杂，由多类型值组成，生存在**堆**中，栈中的变量只有对这个复杂数据类型的内存引用，**设置好后可能会发生变化**。
	* 有些语言（java，c#)把字符串设置为对象，但是**js放弃**了。
* 每个对象都有一个\_\_proto\_\_属性，它默认指向另一个对象（构造这个对象的构造器的prototype属性指向的对象）或者为null（null是一个空对象，什么也没有,Object.prototype.\_\_proto\_\_===null），现代浏览器都支持你访问到这个属性。
* 当引擎读取一个对象的属性时，引擎先找自身的是否有个这个属性，没有的话按照自身的\_\_proto\_\_属性指向的对象查找，一直递归查询到Object.prototype指向的对象为止，因为Object.prototype.\_\_proto\_\_===null。
* 每个Function对象（包括Function自己）都有一个prototype属性，它指向一个对象，这个对象有一个constructor属性默认指向这个引用对象函数对象。
* js中的函数是一个对象，一个特殊的对象。

## 1 函数对象和对象

可以说函数对象是对象扩展，相比普通对象函数对象多了一个**逻辑代码**+**prototype**属性。prototype属性指向一个对象，这个对象有一个constructor属性指向函数对象。

![function](/images/function.png)

![function](/images/object.png)


## 2 new操作符

当我们使用new调用构造函数时会自动的创建一个对象，因此构造函数本身只要初始化这个新对象的状态。调用构造函数的一个特征就是把构造函数的**prototype**属性被用作新对象的原型,即新对象的\_\_proto\_\_属性会指向构造函数的prototype指向的对象。多个对象的\_\_proto\_\_都指向同一个prototype对象。

## 3 函数执行的本质
当我们调用一个函数时是这样的：查找函数对象中逻辑代码，执行之。

## 4 构造函数和函数

2个都是函数，只不过是调用的方式不同导致他们叫法不一样。当使用new操作符调用函数时函数叫构造器，使用(),apply,call时叫函数。

## instanceof运算符的原理

	A instanceof B

流程：先计算B.prototype，然后查询A.\_\_proto\_\_判断是否相同，不同则继续沿着A.\_\_proto\_\_.\_\_proto\_\_查找是否相同（也就是沿着原型链查找），直到原型链的头Object.prototype.\_\_proto\_\_。

## 5 Object，Function

Object是所有对象直接或者间接构造器，Function是所有函数的直接或者间接构造器，但是他们指向的对象都是函数对象。

### 5.1 谁是上帝

回想下instanceof的原理吧。

    Function instanceof Function;
    Function instanceof Object;
    Object instanceof Function;
    Object instanceof Object;

![prototype chain](/images/prototype.jpg)

## 6 TEST

    Object.prototype.sth = "O";
    Function.prototype.sth = "F";
    function f() {
        return function () {
            return sth;
        }
    }
    alert(f()());

### 6.1 提示

* 作用域在js里也是对象，查找变量也是在作用域对象中查找的。
* typeof window === 'object'

### 6.2 解释变量的二维查找

引擎先查找返回的匿名函数的作用域对象，发现没有sth变量，进而沿着作用域链的第二位查找f的作用域对象，发现也没有，接着查找globel（window）作用域对象，发现也没有。接着沿着window的原型查找,发现Object.prototype.sth = "O"，所以...

	window.__proto__===Window.prototype;//true
	Window.__proto__===Object.prototype;//true
	window instanceof Window;//true
	window instanceof Object;//true

## 7 原型链的优势

代码复用，构造出的对象节省内存空间。

## 8 深入delete操作符

delete可以删除对象的属性，它的操作数应该是一个属性访问表达式，它只能删除对象**自身的属性**，不能删除原型链上的属性。

	


注意

* 如果对象没有这个属性，或者操作数不是属性表达式，返回true

	    var a = {};
	    delete a.b;//true
	    a.b = 1;
	    console.info(a.b);//1
	    delete a.b;//true
	    console.info(a.b);//undefined
		delete 1;//true


* 但是如果删除的是全局属性，则可以省略对全局对象的引用，直接删除

        window.a = 1;
        delete a;//true
        console.info(typeof window.a);//undefined

* 当delete删除一些不可以删除的属性返回false，全局环境声明的变量、函数是无法删除的。

        var a = 1;
        function f(){};
        console.info(window.a);//1
        delete a;//false
        delete f;//false
        delete window.a;//false
        delete window.f;//false
        console.info(window.a);//1
        console.info(window.f);//function f(){}

* eval执行的代码中声明的变量，函数是可以删除的，**控制台的代码是放在eval中执行的**。

        eval("var a=1;function f(){};");

        console.info(a);//1
        console.info(f);//function f(){}

        delete a;//true
        delete f;//true

        console.info(typeof a);//undefined
        console.info(typeof f);//undefined

### 8.1 test

	delete document.getElementById//true
	document.hasOwnProperty("getElementById");//false 表明getElementById不是document的属性。
	document.__proto__==HTMLDocument.prototype;//HTMLDocument是document的构造函数
	HTMLDocument.prototype.hasOwnProperty("getElementById");//getElementById也不是HTMLDocument.prototype属性。
	HTMLDocument.prototype.__proto__===Document.prototype;//true
	Document.prototype.hasOwnProperty("getElementById");//true
	document.__proto__.__proto__===Document.prototype;//沿着原型链可以看到getElementById属性来自Document.prototype。
	delete Document.prototype.getElementById;//无法删除这个属性。
	Document.prototype.getElementById=null;//修改这个属性
	document.getElementById("xx");//TypeError: Property 'getElementById' of object #<HTMLDocument> is not a function
