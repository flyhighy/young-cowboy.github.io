---
layout: post
title:  "html5 file system"
date:   2013-03-29
categories: html
---
# File System

参考资料：

* [filesystem](http://www.html5rocks.com/zh/tutorials/file/filesystem/) 

一直想好好的总结fs的一些信息，但是一直不得空。

## Blob

先了解下Blob吧，因为理解了Blob就很容易理解Javascript 的 Fs

Blob（binary large object）最早来源于SQL数据库，在SQL中表示二进制大对象，而在js里表示二进制数据。并且blob是不透明的，通常只能获取其大小，MIME类型，或者分割为更小数据。

### 由Blob继承而来的File对象

FS的File对象继承于Blob，并且扩展了一些属性：name和lastModifiedDate
	
	File.prototype.__proto__===Blob.prototype;//true

### createObjectURL


### 读取Blob

之前一直都是依赖浏览器显示blob内容，我们无法从语言角度去读取blob，由blob继承而来的file对象，为我们准备了一些方法可以操作blob。

## FS

待续...
