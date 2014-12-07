---
layout: post
title:  "diff & patch"
date:   2013-01-01
categories: git
---
# diff&patch

在没有cvs的时代它们一直是很好的源码比较和打打补丁工具。

## 1 diff
用**逐行比较两个文本文件**，列出其不同之处。

### 1.1 语法造成结构以及选项

语法：diff [选项] file1 file2

常用选项：

* -r 是一个递归选项，设置了这个选项，diff会将两个不同版本源代码目录中的所有对应文件全部都进行一次比较，包括子目录文件。
* -w 忽略所有空格
* -b 忽略由于空格属不同造成的差异
* -B 忽略任何因空行而造成的差异。
* -c 上下文模式输出diff
* -u 合并模式输出diff
* ......

### 1.2 diff输出模式的历史

要想理解现代的diff，看下diff历史是很有必要的。

* 正常模式（normal diff）
* 上下文格式（context diff）
* 合并格式（unified diff）

这里我准备了2个文本a.txt，b.txt

a.txt

	window.onscroll = function () {
	    var top = document.documentElement.scrollTop || document.body.scrollTop;
	    if (top > 586 && !hasFixed) {
	        hasFixed = true;
	        if (isIE6) {
	            nav.style.top = top + 586 + "px";
	            return;
	        }
	        nav.className += ' mobile-download-fixed';
	        return;
	    }
	    if (top < 586) {
	        hasFixed = false;
	        nav.className = 'mobile-download';
	    }
	}

b.txt

	window.onscroll = function () {		
	    var top = document.documentElement.scrollTop || document.body.scrollTop;
	    if (top > 586 && !hasFixed) {
	        hasFixed = false;
	        nav.className += ' mobile-download-fixed';
	        return;
	    }
	    if (top < 586) {
	        hasFixed = false;
	        nav.className = 'mobile-download';
	    }
	}
	alert('hello world');

可以看出我相对于a文件对b文件作了增，删，改操作；

正常模式的diff输出结果很简单，但是结果过于简单很难理解。
	
	$ diff a.txt b.txt
	1c1
	< window.onscroll = function () {
	---
	> window.onscroll = function () {
	4,8c4
	<         hasFixed = true;
	<         if (isIE6) {
	<             nav.style.top = top + 586 + "px";
	<             return;
	<         }
	---
	>         hasFixed = false;
	12c8,9
	<     if (top < 586) {
	---
	>
	>     if (top < 586)      {
	16c13,14
	< }
	\ 文件尾没有 newline 字符
	---
	> }
	> alert('hello world');
	\ 文件尾没有 newline 字符
	
所以诞生了context diff，让输出结果有上下文，这样好了解。

	$ diff -c a.txt b.txt
	*** a.txt       2012-09-12 17:35:11.952861200 +0800
	--- b.txt       2012-09-12 17:54:13.569823400 +0800
	***************
	*** 1,16 ****
	! window.onscroll = function () {
	      var top = document.documentElement.scrollTop || document.body.scrollTop;
	      if (top > 586 && !hasFixed) {
	!         hasFixed = true;
	!         if (isIE6) {
	!             nav.style.top = top + 586 + "px";
	!             return;
	!         }
	          nav.className += ' mobile-download-fixed';
	          return;
	      }
	!     if (top < 586) {
	          hasFixed = false;
	          nav.className = 'mobile-download';
	      }
	! }
	\ 文件尾没有 newline 字符
	--- 1,14 ----
	! window.onscroll = function () {
	      var top = document.documentElement.scrollTop || document.body.scrollTop;
	      if (top > 586 && !hasFixed) {
	!         hasFixed = false;
	          nav.className += ' mobile-download-fixed';
	          return;
	      }
	!
	!     if (top < 586)      {
	          hasFixed = false;
	          nav.className = 'mobile-download';
	      }
	! }
	! alert('hello world');
	\ 文件尾没有 newline 字符


但是context diff输出浪费空间，所以之后诞生了合并模式,在一个输出里表明diff。

	$ diff -u a.txt b.txt
	--- a.txt       2012-09-12 17:35:11.952861200 +0800
	+++ b.txt       2012-09-12 17:54:13.569823400 +0800
	@@ -1,16 +1,14 @@
	-window.onscroll = function () {
	+window.onscroll = function () {
	     var top = document.documentElement.scrollTop || document.body.scrollTop;
	     if (top > 586 && !hasFixed) {
	-        hasFixed = true;
	-        if (isIE6) {
	-            nav.style.top = top + 586 + "px";
	-            return;
	-        }
	+        hasFixed = false;
	         nav.className += ' mobile-download-fixed';
	         return;
	     }
	-    if (top < 586) {
	+
	+    if (top < 586)      {
	         hasFixed = false;
	         nav.className = 'mobile-download';
	     }
	-}
	\ 文件尾没有 newline 字符
	+}
	+alert('hello world');
	\ 文件尾没有 newline 字符

合并模式可以让人对diff一目了然。

### 1.3 demo演示

现在使用diff命令做一个最简单的合并模式diff输出

	diff -u a.txt b.txt

使用统一格式输出差异，并且忽略空格。

	--- a.txt       2012-09-12 17:35:11.952861200 +0800
	+++ b.txt       2012-09-12 17:36:03.454861200 +0800
	@@ -1,11 +1,7 @@
	-window.onscroll = function () {
	+window.onscroll = function () {
	     var top = document.documentElement.scrollTop || document.body.scrollTop;
	     if (top > 586 && !hasFixed) {
	-        hasFixed = true;
	-        if (isIE6) {
	-            nav.style.top = top + 586 + "px";
	-            return;
	-        }
	+        hasFixed = false;
	         nav.className += ' mobile-download-fixed';
	         return;
	     }
	@@ -13,4 +9,5 @@
	         hasFixed = false;
	         nav.className = 'mobile-download';
	     }
	-}
	\ 文件尾没有 newline 字符
	+}
	+alert('hello world');
	\ 文件尾没有 newline 字符

#### 1.3.1 解释

第一，二行的---表示源文件，+++表示目标文件

每个@@**@@表示一个差异的开始，其中的内容-1,11 +1,7表示原始文件的第一行，连续11行和目标文件第一行连续7行有差异（包括没有差异）。

-:表示原始文件的行数

+:表示目标文件的行数。

以此类推.

## 2 patch

patch命令相当于diff操作的逆过程，利用产生的diff来修复文件。

### 2.1 简单的用法demo

	$ diff -u a.txt b.txt > temp
	
	$ cat temp
	--- a.txt       2012-09-12 17:35:11.952861200 +0800
	+++ b.txt       2012-09-12 19:04:33.373155300 +0800
	@@ -1,16 +1,14 @@
	 window.onscroll = function () {
	     var top = document.documentElement.scrollTop || document.body.scrollTop;
	     if (top > 586 && !hasFixed) {
	-        hasFixed = true;
	-        if (isIE6) {
	-            nav.style.top = top + 586 + "px";
	-            return;
	-        }
	+        hasFixed = false;
	         nav.className += ' mobile-download-fixed';
	         return;
	     }
	-    if (top < 586) {
	+
	+    if (top < 586)      {
	         hasFixed = false;
	         nav.className = 'mobile-download';
	     }
	-}
	\ 文件尾没有 newline 字符
	+}
	+alert('hello world');
	\ 文件尾没有 newline 字符

这样我们就可以利用temp文件操作a.txt更新为b.txt或者将b.txt还原为a.txt

	$ patch a.txt < temp
	patching file a.txt
	Hunk #1 succeeded at 1 with fuzz 2.

	$ patch -R b.txt < temp

	
	
	
	



