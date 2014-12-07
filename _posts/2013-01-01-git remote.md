---
layout: post
title:  "Git remote"
date:   2013-01-01
categories: git
---
# Git remote

## clone

当从一个远程分支clone版本库时，git会把远程版本库的所有分支pull下来，但是在本地是不会自动显示出来，并且默认远程的版本库名字为**origin**

用一下的命令查看版本库的所有分支情况

	git branch -r

	origin/HEAD -> origin/master
	origin/j
	origin/master

远程库的名字叫origin，origin有一个j分支，远程的HEAD指针指向远程master分支。

### 切换分支

	git checkout j
	Branch j set up to track remote branch j from origin.
	Switched to a new branch 'j'

此命令会促使创建一个本地分支，并且切换到改分支。若早起版本的git要执行以下命令

	git checkout -b j origin/j

当如上checkout远程分支后，本地的j分支和远程的j分支会自动关联起来。git pull 和git push 会自动更新和推送改分支

我们可以从.git/config文件看出配置信息

	[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
	[remote "origin"]
		fetch = +refs/heads/*:refs/remotes/origin/*
        url = /cygdrive/f/h
	[branch "master"]
        remote = origin
        merge = refs/heads/master
	[branch "j"]
        remote = origin
        merge = refs/heads/j

branch j 已经有一个remote配置，指向名字为origin的远程库


## push & pull

当我们在主干或者一个分支上执行pull或者push操作时会发生什么？

当在本地创建了一个**基于本地的新分支**，使用git push、git pull，不会关联到远程分支。

	$ git ch -b j
	Switched to a new branch 'j'


	$ git pl
	You asked me to pull without telling me which branch you
	want to merge with, and 'branch.j.merge' in
	your configuration file does not tell me, either. Please
	specify which branch you want to use on the command line and
	try again (e.g. 'git pull <repository> <refspec>').
	See git-pull(1) for details.
	
	If you often merge with the same branch, you may want to
	use something like the following in your configuration file:
    [branch "j"]
    remote = <nickname>
    merge = <remote-ref>

    [remote "<nickname>"]
    url = <url>
    fetch = <refspec>

	See git-config(1) for details.


但是可以使用track命令和远程关联

	$ git checkout --track -b j

	Branch j set up to track local branch master.
	Switched to a new branch 'j'

### push

* 若当前分支在config里有配置改分支的remote属性，则使用remote的值的pushurl push信息,若pushurl不存在则使用url push
* 若无配置信息则相当执行 git push origin

### pull

过程和push相似