---
layout: post
title:  "javascript 执行环境探索"
date:   2013-01-01
categories: javascript
---
# Execution Context(EC) in ECMAScript

参考资料

* [执行环境,作用域理解](http://wenku.baidu.com/view/358a14593b3567ec102d8ac3.html)
* [深入理解JavaScript系列（2）：揭秘命名函数表达式](http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html)
* [深入理解JavaScript系列（12）：变量对象（Variable Object）](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)
* [深入理解JavaScript系列（14）：作用域链(Scope Chain)](http://www.cnblogs.com/TomXu/archive/2012/01/18/2312463.html)
* [深入理解JavaScript系列（13）：This? Yes,this!](http://www.cnblogs.com/TomXu/archive/2012/01/17/2310479.html)


代码的执行所处的环境，也叫执行上下文,它确定了代码的作用域，作用域链，this属性，代码的生存期等等，让我们从**解释器的角度**看代码是如何执行的。
EC可以用如下的数据结构表达，它有很多属性，VO,[[scope]],this等等。

	EC={
		Variable Object:....,
		[[scope]]:...,
		this:...
	}

## 1 三种EC（代码执行环境）

* global
* function
* eval

## 2 代码执行的过程

一段JS代码进入解释器到执行分为2步骤，这2步各自有各自的事要处理

* 进入执行环境
* 执行代码

## 3 Variable Object（VO）

我们声明的变量，**声明的函数**，传入的参数都放到哪里去了？引擎是在哪里寻找它们的？其实它们都放入到一个叫VO的对象里去了，可以说了解VO是很重要的。VO的数据结构可以如下表达

	VO={
		声明的变量,
		声明的函数，
		参数(函数内部VO拥有)
	}

### 3.1 函数的声明与表达式

* 函数声明式:function 函数名称 (参数：可选){ 函数体 }
* 函数表达式：function 函数名称（可选）(参数：可选){ 函数体 }

ECMAScript是通过上下文来区分的，如果function foo(){}是作为赋值表达式的一部分的话，那它就是一个函数表达式，反之为函数声明式。

	function foo(){} // 声明
	var bar = function foo(){}; // 表达式，因为它是赋值表达式的一部分
	
	new function bar(){}; // 表达式，因为它是new表达式
	
	(function(){
		function bar(){} // 声明
	})();

	(function foo(){}); // 函数表达式：包含在分组操作符()内，而分组符里的表达式

注意：根据表达式的生成函数的函数名称是不会放入函数所处的EC的VO中的。

#### 3.1.1 DEMO

    function f() {
        var bar = function foo() {};//这是表达式声明函数

		typeof bar;//function;
        typeof foo;//undefined;
    }

    f.VO.foo=undefined;//无论是在代码进入环境还是代码执行的时候


但是这个foo只在foo函数EC中有效，因为规范规定了标示符foo不能在外围的EC有效，而且是在foo的VO中存在，有些浏览器（chrome）是无法用debug访问到的，但是firefox是可以访问到的，但是IE6~IE8是在foo的外围可以访问到foo的，IE9已经修复了这个问题，可以用IE8执行如下代码。

    alert(typeof foo);//undefined
    var bar = function foo() {
        alert(typeof foo);//function
        function k() {
        }

        return function () {
            alert(typeof foo);//function
            alert(typeof k);//function
        }
    }

    bar()();


EC确定了VO的不同，所以按EC给VO分类。

### 3.2 全局环境的VO
	
所有在global声明的函数，变量都会在global的VO中存在。

	global.vo = {
	  Math: <...>,
	  String: <...>
	  ...
	  ...
	  window: global //引用自身
	};

### 3.3 函数的VO

当进入执行上下文VO会有如下属性：

* 函数的所有形参(如果我们是在函数执行上下文中)

	由名称和对应值组成的一个变量对象的属性被创建；没有传递对应参数的话，那么由名称和undefined值组成的一种变量对象的属性也将被创建。

		function f(a, b, a) {
		    debugger;
		}
		f(1, 2, 3);
		
	**执行的时候**f的VO

		f.VO={
			a:3,
			b:2
		}	
		
	因为形参名字重复，而VO的key是不可以重复的（VO是一个对象），所以在代码执行给VO赋值时根据先后顺序最后一个实参会覆盖第一个实参的值。

* 所有函数声明(FunctionDeclaration, FD)

	由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建；如果变量对象已经存在相同名称的属性，则完全替换这个属性。

* 所有变量声明(var, VariableDeclaration)

	由名称和对应值（undefined）组成一个变量对象的属性被创建；如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

**可以看到声明的函数优先级大于变量的声明**。

	alert(x); // function
	var x = 10;
	alert(x); // 10
	x = 20;
	function x() {};
	alert(x); // 20

#### 3.3.1 DEMO

test1

    function f(a, b, c) {
    	var a = a, g = 1;
	    function g() {
	        //function body
	    }
	    var k = 1;
    }

    f(1, 2, 3);


引擎进入执行环境时，把EC中的变量，形参，声明的函数放入VO，成为VO的属性

    f.VO={
        a:undefined,//这个是形参的a，优先级高于声明的变量a
        b:undefined,//这个是形参的b
        c:undefined,//这个是形参的c
        g:function,//函数的优先级最高，覆盖了变量g
        k:undefined//声明的k
    };

代码执行时给VO属性赋值，按代码执行过程

    f.VO={
        a:1,
        b:2,
        c:3,
        g:function,
        k:1
    };
	
test2
    
    function f(a) {
        a = a;
        b = a;
    }
    f(1);
    alert(a);//undefined
    alert(b);//1

test2很奇怪是吧，我们认为会alert(a)提示“1”，但是结果是undefined。在我们的脑海里总是有这个概念：没有声明的变量会变成全局变量，其实根本没这回事。事实是：给没有声明的变量赋值造成的现象是变量变为了global的属性（也就是window属性），而不是一个全局变量。让我们来看下代码的流程。

进入环境，把形参标示放入VO中，并赋值为undefined

    f.VO={
        a:undefined
    }

**这里没有把b算入f的VO，因为b不是声明出来的**

执行时

形参a根据实参1，被赋予1，代码第一行a=a,右边的a为1，解释给左边的a赋值，解释器从VO开始寻找a，发现VO中有a，就给其赋予形参a的值——1。解释器寻找b,从[[scope]]寻找一直到global的VO都没找到b，于是就给global添加一个属性——b，赋值于1。期间没有**产生新的变量**。

test3

    function f() {
        var a = 1;

        return {
            set:function (b) {
                a = b;
            },
            get:function () {
                return a;
            }
        }
    }

    var o=f();
    o.set(2);
    o.get();//2



总结：

* 所以我们没必要在函数体内又声明一个和形参相同的变量,直接访问形参变量便是。
* 我们声明的变量可以放到一起声明，原因已经在前面阐述了，而代码执行过程只是根据你的赋值表达式往VO中属性赋值。

## 4 [[scope]]

[[scope]]是函数的内部属性，它指向一个数组对象（俗称作用域链对象），这个数组对象会包含父亲函数的VO一直到global的VO。

	[[scope]]-->VO+[[scope]]

这个对象在2种环境（进入执行环境，执行代码）有着不同状态。

eg

    function f() {
        var a = 1;
    }

针对这个函数来说。

* 进入执行环境(执行代码前)，函数的EC中的VO和[[scope]]
	
        f.VO={
            a:undefined
        }
		f.scope=[global.VO];//全局vo在进入f的执行环境前已经创建了。

* 执行时，把f的VO推入[[scope]]指向的数据对象第一位。

        f.VO={
        	a:1
        }
		f.scope=[f.VO，global.VO];

### 4.1 catch,with可以改变[[scope]]指向的数组对象结构

catch，with关键词会在**执行**时把**参数**推入[[scope]]指向的数组对象第一位

	witch({a:1}){
		alert(a);//1
		var a=2;
		alert(a);//2
	}

* 进入环境

		vo={
			a:undefined
		}

* 执行

		scope=[{a:1},vo,global.vo]--->alert(a)//1
		var a=2;//执行到这里时a的值发生了改变并且影响到scope
		scope=[{a:2},vo,global.vo]--->alert(a)//2,

从本质上了解了作用域链，就很容易理解闭包了。

### 4.2 闭包

>当函数内部定义了其他函数，就创建了闭包，闭包(子函数)有权访问父级函数的**VO**所有变量。

如果子函数[[scope]]**持续**引用了父函数的VO，就会使父函数的VO无法销毁掉。所以我们要妥善处理闭包的特性。

    function f() {
        var val = 1;
        return function () {
            return val;
        }
    }

	var temp=f();

返回的函数[[scope]]持有f函数的VO，已至于f执行后无法释放VO等所占用的内存。

	var temp=null;//让GC去处理f的内存吧。

## 5 this

this是在代码进入执行环境时确认的，所以按代码进入执行环境时所在说明this更为清晰。

### 5.1 顶级执行环境global。

代码在global中执行，this永远都是global。

### 5.2 代码在函数执行环境

函数的EC中的this是由函数调用的方式来确定的。

#### 5.2.1 使用apply，call方法调用函数

this指向这些函数的第一个参数

    var sth = "global";
    function f() {
        alert(this.sth);
    }
    f();//global
    var o = {sth:"o"};
    f.apply(o);//o
    f.call(o);//o

#### 5.2.2 使用new调用函数

这是的函数叫构造函数

* 先生成一个对象
* this指向这个新对象~

#### 5.2.3 单独使用()调用函数

执行时this的值取决于()左边的值所属的对象

##### 5.2.3.1 当生成的函数对象有被引用

如果函数被引用，那么this指向这个引用函数的东东的所属环境，但是函数被函数的VO引用那么this指向null，再而转为global。

test1

	var sth = "global";
    function f() {
        alert(this.sth);
    }
    f();//global
    var o = {sth:"o"};
    o.f = f;
    o.f();//o

test2

	var a = 'global';
	function f() {
	    alert(this);
	}
	f();//global
	f.prototype.constructor();//f.prototype

test3

这种情况下，f被k的vo引用，f的执行环境的this指向null，转为global。

	function k() {
        function f() {
            alert(this);
        }
        f();//window
    }

	k.vo.f=function;
	f.this=null==>global;

test4

	var foo = {
	  bar: function () {
	    alert(this);
	  }
	};
	 
	foo.bar(); // Reference, OK => foo ()左边的引用类型属于foo，this指向foo
	(foo.bar)(); // Reference, OK => foo “()”对foo.bar没有任何处理，返回仍是foo.bar。
	 
	(foo.bar = foo.bar)(); // global 赋值操作符使返回值是foo.bar所指向的函数。返回的是一个没有东西引用的function
	(false || foo.bar)(); // global ||同上
	(foo.bar, foo.bar)(); // global 连续运算符仍是同上

##### 5.2.3.2 当函数没有被引用

this指向null，但是浏览器不会让你这么干，它会把null变为global。

**注：第5版的ECMAScript中，已经不强迫转换成全局变量了，而是赋值为undefined。**

    (function (){
        alert(this);//window
    })();


### 5.3 eval执行环境中的this
	eval('alert(this)');//window

### 5.4 让我们回想下DOM事件

#### 5.4.1 以节点对象的属性注册事件处理函数

以这个概念注册事件处理函数有2种实现方法，但是殊途同归——都是给节点对象的事件属性注册事件处理函数。

##### 5.4.1.1 直接在html里写事件处理函数

	<div onclick="alert(this.innerHTML);">1</div>
	==>'1'

##### 5.4.1.2 用对象特性写事件处理函数

    <div id="J_Demo1">2</div>
    <script type="text/javascript">
        document.getElementById("J_Demo1").onclick = function () {
            alert(this.innerHTML);//2
        };
    </script>

#### 5.4.2 addEventListener & attachEvent

>其实说这2个方法对理解function的this有点跑偏，但是还是要标记下。

2这不同的是addEventListener绑定事件处理函数后函数的this指向这个节点对象，attachEvent指向window（attachEvent存在于<=IE8）。

## 6 Test

test1 

有时候我们想这样做

	var $=document.getElementById;//引用这个方法
	$("J_Head");//Illegal invocation 非法调用

为什么会这样呢？因为我们调用getElementById的方式不对。$()执行是getElementById的中的this指向的是window，用document.getElementById方式调用getElementById，其this指向的是document，原因已经说过了。所以...

	$.apply(document,["login-container"]);//指定this指向对象就ok了
	(1,document.getElementById)();//Illegal invocation,连续运算符将getElementById已经从document中取出，执行时this指向null，进而指向global

