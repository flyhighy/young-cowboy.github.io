---
layout: post
title:  "Javascript历史"
date:   2013-01-29
categories: javascript
---
# Javascript的历史

阮一峰的有篇blog写了[javascript的诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)。

## 后来

### 谁都希望自己开发语言成为标准

95年，Netscape Navigator 2.0发布并且搭载着javascript1.0（原先叫LiveScript，改名的原因可以在阮一峰的[blog](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)中找到）。

随后Netscape Navigator 3.0搭载着javascript1.1发布。

随后微软进军浏览器，IE3.0搭载着JScript。

后来...乱了。同时存在3个版本的javascript，标准化是很有必要的，谁都希望自己开发的语言成为标准。

97年Netscape为了增强自己的竞争力把javascript1.1提交给ECMA，并且希望通过ECMA来标准化javascript，使其成为一个“准化一个通用、跨平台、中立于厂商的脚本语言的语法和语义”。可惜的ECMA-262定义的ECMAScript只规范了javascript的核心语言功能：

* 语法
* 类型
* 语句
* 关键词
* 保留字
* 操作字
* 对象
* ......

对于javascript的其他2个主要部分DOM，BOM没有规范化，由浏览器厂商自己实现。

Netscape 4.06+，IE5开始对ECMAScript兼容。

## JavaScript=ECMAScript+DOM+BOM

### BOM

IE3.0和NetScape3.0开始可以通过js可以访问浏览器提供的接口操作浏览器。但是各自实现的接口不相同，到现在BOM都没有标准。

### DOM
IE4.0和NetScape4.0开始可以通过js操纵DOM，但是缺乏规范，w3c开始制定DOM标准。到现在一共有个3个标准存在和一个非标准存在DOM0

* DOM0

	* IE4.0和NetScape4.0自己定义的DOM标准。

* DOM1
	* 规定了如何映射基于xml的文档结构，以简化对文档的访问和操作
	* 规定操作dom的方法。

* DOM2
	
	* todo

* DOM3

	* todo
	