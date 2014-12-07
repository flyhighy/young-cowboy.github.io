---
layout: post
title:  "Getting Start With Git"
date:   2013-01-01
categories: git
---
# Git

>Linus Torvalds 开发的git真的是好东西~我怎么没能早点接触上它呢~	

学习资料：

* [getting-git](http://www.slideshare.net/chacon/getting-git)
* [图解git](http://marklodato.github.com/visual-git-guide/index-zh-cn.html)
* [Git权威指南](http://baike.baidu.com/view/6097792.htm)

查看每个命令的详细信息可以使用

	git xx --help

## git相关的配置

### 配置的作用域

	git config  xxxx	.git/config 文件
	git config --global xxxx ~/.gitconfig 文件
	git config --system xxxx // /etc/gitconfig 文件

三个option（null，global，system）分别对应于版本库，用户级别，系统级别。

### alias
	
	//为用户级别config配置一个别名
	git config --global alias.conf "config --global"
	//打开显示颜色
	git conf color.ui true
	//配置你的姓名
	git conf user.name "yingyi.zj"
	//配置你的邮箱
	git conf user.email "xxx.xxx"
	//配置一些简单的别名demo
	git conf alias.st status
	git conf alias.br branch
	git conf alias.com "commit -am"
	git conf alias.ch checkout
	git conf alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
	git conf alias.rl "reflog"
	git conf alias.rs "reset"
	git conf alias.df "diff --stat"
	git conf alias.pl "pull"
	git conf alias.ps "push"

### 查看已配置的信息

	git config --list


## concept

### gitignore

让git忽略文件或者目录，gitignore文件的语法如下：

* 所有空行或者以注释符号 ＃ 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配。
* 匹配模式最后跟反斜杠（/）说明要忽略的是目录。
* 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

### 信息摘要

一个算法，可以将任意长度的信息转换为固定长度输出，并且对不同信息的摘要唯一。目前比较著名的实现算法有MD5与SHA1。当然转换后的信息重复的概率很小。

在git中摘要是对commit，blob和tree进行SHA-1,用以比对是否产生文件差异。

### 裸版本库

只有版本库，没有工作区、缓冲区,配置为 core.bare=true

	git init --bare xxxxx

默认情况下只能往裸版本库里推送信息。因为git会阻止你往一个非裸版本库里push sth，如果这样可行的话，非裸版本库的working directory的文件怎么办？


### 快进式推送
	
就是推送的版本库的提交是建立在远程版本库相应分支的提交基础上的，也就是说远程版本库的某个分支是本地的相应那个分支的父亲。默认下不允许非快进式推送。所以我们一般要先**meger**下，以防出现差异。

	pull=fetch + meger

### .git/config文件

这个文件配置了一些分支特性：远程源，分支对应的源，是否忽略文件大小写，等等。可以使用git config --help查看详细

	vim .git/config

	  1 [core]
	  2     repositoryformatversion = 0
	  3     filemode = true
	  4     bare = false
	  5     logallrefupdates = true
	  6     ignorecase = true
	  7 [remote "origin"]
	  8     fetch = +refs/heads/*:refs/remotes/origin/*
	  9     url = git@github.com:jan424/jan423.github.com.git
	 10 [branch "master"]
	 11     remote = jan
	 12     merge = refs/heads/master
	 13 [remote "jan"]
	 14     url = /cygdrive/f/jan/
	 15     fetch = +refs/heads/*:refs/remotes/jan/*

看出jan分支对应的远程分支为本地的某个版本库（/cygdrive/f/jan/）分支的jan分支。

## usage

### remote

创建，修改remote的一些信息

	git remote add [-t <branch>] [-m <master>] [-f] [--tags|--no-tags] [--mirror=<fetch|push>] <name> <url>

	-f创建好remote后。立即fetch远程信息
	-t<branch> 设置指定的fetch分支信息，可以设置多个branch
	-m<master> 设置master映射
	

### checkout

* 修改HEAD指针指向的commit对象
* 修改HEAD指向的分支
	
		git checkout [branch]

* 从commit，index中检出文件

		git checkout [-q][commit] [--] <path>

### stash

保存working directory和index的状态，用以后续恢复，最新创建好的stash对象hash会保存在.get/refs/stash文件里。

	git stash save ...
	git stash list ...
	git apply|pop stash@{x}

### reset 和reflog

reset是将以前的commit恢复到工作区或者缓冲区

reflog是利用log文件将commit恢复到日志中某个状态

#### reset
	//soft只改变commit对象
	//mixed只commit、暂存区而不改变工作区，默认为这个参数
	//hard改变所有区域
	git reset [--soft | --mixed | --hard ] [<commit>]
	git reset HEAD
	git reset HEAD^^

#### reflog
reflog用来显示commit的历史，对应的文件位置在.git/logs文件夹里。
	
	//默认为显示所有ref的commit历史。
	git reflog [show] [log-options] [<ref>]
	git reflog jan
	
	git reset --hard master@{3}


### 跨平台

#### 关闭Git对0×80以上的字符进行quote

    git config --global core.quotepath false

#### 关闭Git的大小写敏感
    
针对 *NIX，window平台对大小写敏感

    git config --global core.ignorecase true

#### CRLF，CR ，LF

关闭自动转换CRLF和LF的功能，是怎么样就是怎么样提交到版本库

    git config --global core.autocrlf false

开启自动转换：版本库的LF将自动转为CRLF，提交时eol转换为LF

    git config --global core.autocrlf true

加入版本库全转换为LF，检出也转为LF

    git config --global core.autocrlf input

so...

**windows 平台设置为 true，*nix设置为input**

添加LF和CRLF非可逆转的转换warming

    git config --global core.safecrlf true //发现后直接拒绝提交
    git config --global core.safecrlf warn //发现后只warn，不阻止