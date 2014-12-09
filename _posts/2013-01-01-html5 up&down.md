---
layout: post
title:  "《html5揭秘》学习笔记"
date:   2013-01-01
categories: html
---
# 《html5揭秘》学习笔记

## 一些基础的东西

### doctype

这个东西的诞生是因为IE5 for Mac支持标准化html的产物。先前的html编写是按照当时主流的ie4和netscape4开发的，由于这2款浏览器渲染模式是按照非标准来的（quirks模式），当一个浏览器ie5想按照标准渲染html问题就来了——以前的页面怎么办。

解决方案是在html文档第一行加入doctype，ie5会先检查是否有doctype而采用按照什么模式渲染html（存在doctype使用标准模式，不存在使用quirks模式）。

当mozila发布1.1浏览器时发现自己的引擎有些bug：虽然声明了doctype但是有些渲染还是按照quirks模式渲，当修复了这个bug后返现现在网络上的网页已经变得五花八门。没办法为了迎合网页渲染，又搞了个almost standard mode。

Henri Sivonen 在他的大作“使用Doctype 激活浏览器的渲染模式”一文中作了总结

>* Quirks
>
>	在这个模式中，浏览器违反了web格式规范，以避免那些依照90年代的流行做法编写的网页不至于被呈现得无法阅读
>
>* 标准模式
>
>	在标准模式中，浏览器尽力尝试用符合标准规范的方式去渲染页面。html5中称为非quirks模式。
>
>* almost standard mode
>
>	ff，safari，chrome，opera和ie8也具有被称为almost standard mode，其中以传统方式实现了表格单元格的竖直尺寸，没有严格遵循css2规范，html5中讲这个模式称为limited quirks mode（有限quriks模式）

其实almost standard mode和standard mode相差不多。

html5规定使用<\!doctype html> doctype触发标准模式。

*.dtd文档设定了文档的标记符的语法规则：嵌套关系，属性种类等等。

关于doctype详细信息可以参照这个网站[!DOCTYPE](http://baike.baidu.com/view/1091028.htm)。

**总的来说是ie5为了支持标准web规范（standard mode）创造了doctype，mozila因为bug不幸创造了almost standard mode。为了产品的市场份额，浏览器做了很多兼容处理，并不是严格实施规范。**

## meta

这个是http response头里的一个信息，用来告诉浏览器传输的是什么类型的信息。

	Content-Type:text/html; charset=GB2312
	Content-Type:text/css
	Content-Type:image/png
	Content-Type:application/x-javascript
	......

这个meta和html中的meta相比，优先级更高。

