---
layout: post
title:  "Hight Performance JS"
date:   2013-01-29
categories: javascript
---
# Hight Performance JS

学习资料：

* [高性能JavaScript](http://baike.baidu.com/view/4720389.htm)

## 检测工具

## 网络

### js下载

正常写入html的script标签只有执行完或者下载+执行完后才会让出资源给render或者其他资源下载，所以在这种情况下script的下载、解析会使其他资源（包括其他script资源）等待下载，渲染停止。

但是在ie8+，firefox3.5+，safari4+，chrome2+允许script下载时不影响其他script下载。

### defer

IE4+,ff3.5+支持，告诉浏览器下载的脚本不会修改dom，下载的脚本不会阻塞其他资源下载（js、css、img），并且脚本将在domready时执行。

### 动态脚本

通过js创建的动态脚本连接的下载不会影响到页面其他处理。

## DOM

每次使用JS操作DOM很耗资源，追其根本是DOM与JS在实现上是分离开的，分别在2个处理环境中。

## 字符串

### 拼接字符串

	str = "a" + "b" + "c";

	str = "a";
	str += "b";
	str += "c";

	str = ["a","b","c"].join("");

	str = "a";
	str = str.contat("b","c");