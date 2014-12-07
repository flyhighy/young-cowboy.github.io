---
layout: post
title:  "Getting Start With Mongodb"
date:   2013-05-24
categories: Mongodb
---
# Getting Start With Mongodb

## start

### 开启服务

在根目录（磁盘所在目录）创建 data/db 文件夹

运行 mongod 文件，将会开启27017端口服务

    ./mongod

http://localhost:28017/ 为db的信息、管理web页面

	--dbpath 指定数据库位置
	--logfile 日志文件位置
	--auth 使用权限
	--repair 通过repaire选项恢复数据库

demo
	
	mongod --port 22222 --directoryperdb --dbpath /data/db

开启22222端口服务，并且设置每一个db单独一个文件夹，指定db所在的文件夹

### 终端访问

运行 mongo 文件，可以打开一个控制台控制DB

    ./mongo

### 关闭服务

    use admin
    db.shutdownServer()

#### 非正常关闭mongodb，导致无法启动

1. 删除 /data/db/mongod.locks文件
2. 使用repair 选项修复mongodb

		./mongod --repair
 
3. 重启启动mongodb

		./mongod

## 管理

### export & import

#### export

demo

	mongoexport -d templates -c page -o templates.txt

	//远程导出
	mongoexport -d templates -c template -h 10.32.84.119:27017 -o  templates.txt

更多help

	mongoexport --help
	
#### import

demo

	mongoimport -d templates -c template --file template.txt

更多help

	mongoimport --help

### remote db

连接远程终端

	mongo -u admin -p admin 192.168.0.197:27017/templates

更多help

	mongo -h
	

##	概念

### _id

用于标示文档唯一性的_id,默认类型为ObjectId，但是可以为任意类型。


### BSON

mongodb的document的一种数据结构，二进制JSON，用来保存数据，mongodb对齐BSON数据进行了优化。
