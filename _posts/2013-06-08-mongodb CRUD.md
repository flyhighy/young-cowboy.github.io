---
layout: post
title:  "MongoDB CRUD"
date:   2013-06-08
categories: mongodb
---
# Mongodb

## CRUD

### creat

插入文档很简单，检测是否有_id、是否超过4mb，然后接卸为BSON。

	db.user.insert(docuemnt)

### remove

	db.user.remove(condition)

### update & upsert

#### 普通查询后更新文档

#### 使用modifier

只修改文档的一部分的话，使用modifier修改文档效率更高。

#### $set,$unset

设置值，若不存在则插入新的，存在则更新

	db.stu.update({age:12,name:"zj"},{"$set":{sex:"male"}})

删除值
	
	db.stu.update({age:12,name:"zj"},{"$unset":{sex:1}})

#### $inc

在原先的整数，长整型，浮点的基础上加/减值

	db.stu.update({age:12,name:"zj"},{"$inc":{age:10}})

#### 数组操作

##### $push,$addToSet,$each,$pop,$pull,$

$push

push一个数组

	db.stu.update({age:22},{$push:{like:"apple"}})

addToSet具有set的属性，数组中有相似的就不push

	db.stu.update({age:22},{$addToSet:{like:"apple"}})

pop使用个数从数组中删除元素，1表示尾，-1表示从头开始删除

	db.stu.update({},{$pop:{like:1}})

pull使用的是查询条件，删除匹配

	 db.stu.update({age:22},{$pull:{"like":"orange"}})

#### upsert

update 的第三个参数为true时表示改update为upsert，upsert的好处是将update && insert 变为原子性。

### retrieve

#### find

必须使用常量来进行查找

	db.stu.find() //db.stu.find({})
	db.stu.find({age:22})
	db.stu.find({age:20,name:"Jan"})

#### $lt, $lte,$gt,$gte, $no