# 盒模型
## 初始包含块
+	当使用position: absolute 他的包含块由最近的position不为static的祖先元素创建.
+  如果没有找到祖先元素,这个决定定位的元素的包含块就是初始包含块
+  如果他的祖先是个块级元素,那么包含块就是内边距边界
+  初始包含块为视口大小的矩形

## BFC
###	Box
+	css布局的基本单位
+ 	box是css布局的对象和基本单位,直观来说,就是一个页面是由很多个box组成的
+  元素测类型和display属性决定了这个obx的类型
+  不用类型的box 会参与不同的Formatting Context(一个决定如何渲染文档的容器)
+  因此box内的元素会以不同的方式渲染
+	block-level box
	-	display属性伪block ,list-item, table的元素,会生成block-level box 并且参与block formatting context
+	inline-level box
	-	display 属性为inline inline-block, inline-table的元素,会生成inline-level box 并且参与inline Formatting context

### Formatting Context
+ Formatting Context 是w3c css2.1规范中的一个概念
+ 	他是页面中一块渲染区域,并且有一套渲染规则, 他决定了其子元素将如何定位,以及和其他元素的关系和相互作用
+  最常见的Formatting context 有 Block Formatting context (BFC) 和 inline Formatting context(IFC)

### BFC是什么
+	直接翻译:块级格式化上下文
+ 	他是一个独立的渲染区域, 只有Block-level box 参与
+  他规定了内部的Block-level Box如何布局,并且与这个区域外部毫不相干

###	BFC布局规则
+	内部的Box会在垂直方向,一个接一个的放置
+ 	BFC的区域不会与float box 重叠
+  内部的Box垂直方向的举例由margin决定,属于同一个BFC的两个相邻Box的margin会发生重叠
+  计算BFC的高度时, 浮动元素也参与计算(清除浮动 haslayout)
+  BFC就是页面上的一个隔离的独立容器,容器里面的子元素不会影响到外面的元素,反之亦然

### BFC什么时候出现(哪些元素会生成BFC)
+	根元素
+ 	float属性不为none
+  position 为 absolute 或 fixed
+  overflow 不为 visible
+  display 为inline-block, table-cell, table-caption, flex, inline-flex

# 字体相关
##	font-size
+	font-size css属性指定字体的大小.	该属性的值会被利用计算em长度单位
+	默认值 16  :可继承
+ 	最小12px 小于12 的显示12,  0 则不显示,  负值显示默认值16
+  px:	具体设置
+  em:	em值的大小是动态的,当定义font-size属性时, 1em 等于元素的父元素的字体大小
+  %:	参照父元素的字体大小

##	font-style
+	允许你选择font-family 字体下的italic 或者 oblique 样式
+ 	italic 样式一般是指书写体, 相比无样式的字体, 通常会占用较少的高度,
+  oblique字体一般只是常规字体的倾斜版本
+  默认值:normal 可继承

###	值
+	normal:	选择font-family的常规字体
+ 	italic:	选择斜体,如果当前字体没有可用的斜体版本,会选用倾斜体替代
+  oblique:	选择倾斜体, 如果当前字体没有可用的倾斜体版本,会选用斜体替代


## font-weight
+	指定了字体的粗细程度, 一些字体只提供normal和bold两种值
+	默认值: normal 可继承

### 值
+	normal	:	正常粗细,与400等值
+ 	bold:	加粗, 与700等值
+  lighter:	比从父元素继承来的值更细
+  bolder:	比从父元素继承来的值更粗
+  100(Thin 或者 Hairline), 200, 300, ..., 900

## 一行显示,多余的省略号
```js
div {
	display: block;
	white-space: nowrap; //一行显示
	overflow: hidden;	//超出隐藏
	text-overflow: ellipsis; //...
}
```

## vertical-align
+	只对inline-block 有用





