---
layout: post
title:  "CSS3 transform-matrix"
date:   2013-01-01
categories: css3
---
# 深入理解transform的matrix

>数学真的是很重要。

参考资料

* [**仿射变换**](http://zh.wikipedia.org/wiki/%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2)
* [**blog**(需要翻墙)](http://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/comment-page-1)

要理解matrix是需要一定的数学矩阵功底的。我们知道调用transform的函数rotate，scale，skew，translate到最后其实都是调用了matrix函数，只是浏览器帮你转化了。

首先我们要知道一个数学矩阵概念：[**仿射变换**](http://zh.wikipedia.org/wiki/%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2)，就是这个矩阵实现了transform。

这里有篇[**blog**](http://www.useragentman.com/blog/2011/01/07/css3-matrix-transform-for-the-mathematically-challenged/comment-page-1)写的很好，它深入讲解了transform的matrix函数。

**注意** transform-origin的会影响一个图形的基本点，间接影响4个坐标。

## 例子

**注意**：一个图形没有transform时其matrix的默认参数是（1,0,0,1,0,0），你可以使用调试工具查看。

如果我们有一个图形（width:200px,height:100px），并且设置transform-origin:50% 50%。那么变换前4个坐标（**相对于变形origin**）为
	
	(-100px,-50px)
			|——————————|(100px,-50px)
			|	  *    |
			|——————————|(100px,50px)
	(-100px,50px)

现在我们给它变换

	transform:matrix(3,4,5,6,100px,50px);

先算左上角经过变换的坐标值，我们会生成2个矩阵：matrix的参数矩阵和原先坐标矩阵

	| 3 5 100 |  
	| 4 6 50  |   
	| 0 0  1  |   

	| -100 | 
	|  -50 | 
	|  -50 | 
	|   1  |

**注意**：3*3的矩阵和1*3的矩阵最下一行的 0，0,1  0是因为数学概念**仿射变换**预设的。当时我也困惑了很久知道了解放射变换。

	| 3 5 100 |   | -100 |   | 3*-100+5*-50+100*1|   | -450 | 
	| 4 6 50  | * |  -50 | = | 4*-100+6*-50+50*1 | = | -650 |
	| 0 0  1  |   |   1  |   | 0*-100+0*-50+1*1  |	 |   1  |


所以左上角的新坐标为 （-450px，-650px）

以此类推剩下的3个点坐标为

右上

	| 3 5 100 |   |  100 |   | 3*100+5*-50+100*1 |   |  150 | 
	| 4 6 50  | * |  -50 | = | 4*100+6*-50+50*1  | = |  150 |
	| 0 0  1  |   |   1  |   | 0*100+0*-50+1*1   |	 |   1  |

左下
	
	| 3 5 100 |   | -100 |   | 3*-100+5*50+100*1 |   |   50 | 
	| 4 6 50  | * |   50 | = | 4*-100+6*50+50*1  | = |  -50 |
	| 0 0  1  |   |   1  |   | 0*-100+0*50+1*1   |	 |   1  |
	
右下

	| 3 5 100 |   |  100 |   | 3*100+5*50+100*1  |   |  650 | 
	| 4 6 50  | * |   50 | = | 4*100+6*50+50*1   | = |  750 |
	| 0 0  1  |   |   1  |   | 0*-100+0*50+1*1   |	 |   1  |

所以新坐标为

	(-450px,-650px)
			|——————————|(150px,150px)
			|	  .    |
			|——————————|(650px,750px)
	(50px,-50px)

### 关于那些内置函数

rotate，scale，skew，translate它们的参数最后都会转为matrix的参数，来变换。
	