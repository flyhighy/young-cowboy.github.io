---
layout: post
title:  "HTML5 Drag & Drop"
date:   2013-03-22
categories: html5
---
# Drag and Drop

参考资料

* [http://www.html5rocks.com/en/tutorials/dnd/basics/](http://www.html5rocks.com/en/tutorials/dnd/basics/)

## 浏览器支持情况

   chrome 7+,safari 5+,firefox 3.6+,ie6 +(ie6+ 不完全支持，无dataTransfet属性)

## 事件执行顺序

   dragstart --> drag --> dragenter --> dragover --> dragleave --> drop --> dragend

## 使DOM对象有拖拽效果

添加draggable属性，draggable="true"

    <li draggable="true" class="">A</li>

## 拖拽事件对象

### e.dataTransfer

退拽对象用来传递的媒介

### e.effectAllowed

拖拽运行类型值：none，copy，copyLink， copyMove,link,linkMove,move，all，uninitialized

### e.datatransfer.setData(format,data)

为元素添加指定数据

    e.dataTransfer.setData('text/html', this.innerHTML);

### e.datatransfer.clearData([format])

删除指定格式的数据，如果未指定，则删除当前元素所有数据

####  format

设置保存值类型 text/plain, image/jpeg, text/html,text/uri-list

### e.datatransfer.types dragstart

事件出发时为元素存储数据的格式,外部文件的拖曳，则返回 files


### e.datatransfer.getData(format)

返回指定数据，如果数据不存在，则返回空字符串

### e.datatransfer.files

如果是拖曳文件，返回文件列表FileList

### e.datatransfer.setDragImage(element, x, y)

制定拖曳元素时跟随鼠标移动的图片，想，y分别为相对鼠标的坐标

### e.datatransfer.addElement(element)

添加一起跟随拖曳的元素


### 注意

Event.preventDefault()

阻止默认的些事件方法等执行。在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发。
另外，如果是从其他应用软件或是文件中拖东西进来，尤其是图片的时候，默认的动作是显示这个图片或是相关信息，并不是真的执行drop。
此时需要用用document的ondragover事件把它直接干掉。

## 让jquery支持dataTransfer

   jquery早期并不支持event的dataTransfer。所以要push到 jQuery.event.props.push("dataTransfer");

## demo

* [dnd-demo](/demo/dnd-demo.html)

部分代码

    <ul class="demo-box demo-box3" id="J_BoxCtn">
        <li draggable="true" class="">A</li>
        <li draggable="true" class="">B</li>
        <li draggable="true" class="">C</li>
    </ul>


    jQuery.event.props.push("dataTransfer");
    var dnd = {
        "dragstart" : function (e) {
            this.classList.add('draging');
            e.dataTransfer.setData('text/html', this.innerHTML);
            temp = e.target;
        },
        "drag"      : function (e) {
        },
        "dragenter" : function (e) {
            this.classList.add('over');
        },
        "dragover"  : function (e) {
            e.preventDefault();
        },
        "dragleave" : function (e) {
            this.classList.remove('over');
        },
        "drop"      : function (e) {
            e.stopPropagation();
            this.classList.remove('over');
            temp.innerHTML = e.target.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        },
        "dragend"   : function (e) {
            this.classList.remove('draging');
            this.classList.remove('over');
        }
    };

    var temp = null;

    for (var i in dnd) {
        $("#J_BoxCtn").on(i, "li", dnd[i]);
    }