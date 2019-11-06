#	css基础
##	html, css, js的关系
+	html是网页内容的载体
+ 	css样式是表现(外观控制)
+  js是行为, 用来实现网页的特效效果

##	什么是css
+	css 层叠样式表(Cascading Style Sheets)
+ 	用于定义html内容在浏览器内的显示样式

##	为什么使用css
+	css简化html相关标签, 网页体积小, 下载快
+ 	解决内容与实现分离的问题
+  	更好的维护网页, 提高工作效率

##	css样式规则
+	css规则由两部分构成: 选择器, 声明
``` 选择器 {属性: 值} ```

##	css引用
+	写在head标签内

```css
<style type="text/css">
	css样式
</style>
```

##	css注释
+	``` /* 注释内容 */ ```

##	如何引用css样式
+	行内样式(内联样式)
+ 	内部样式表(嵌入样式)
+  外部样式表(link链入)
+  导入式(@import)

###	行内样式
在开始标签内添加style样式属性

```css
<p style="color:red;">内容</p>
```

###	内部样式
+	内部样式, 把css样式代码卸载style标签内
+ 	style标签放在head标签之间

```css
<style type="text/css">
	样式
</style>
```

###	css外部样式
+	外部样式表, 把css样式代码写在独立的文件中
+ 	扩展名 css文件名.css
+  引入外部文件```<link href="xx.css" rel="stylesheet" type="text/css">```
+  link标签放在head标签之间

###	css导入式
+	@import "外部css样式"
+ 	@import url(外部css样式)
+  @import 写在style标签内最开始

###	css使用方法区别

| 类别|引入方法|位置 | 加载|
| :-- | :-- | :-- | :-- |
|行内样式 | 开始标签内style | html文件内 | 同时 |
|内部样式| head中style内 | html文件内 | 同时 |
|外部样式| head中link内	| css样式文件与html文件分离 | 页面加载时, 同时加载css样式|
| 导入式@import | 在样式代码最开始处 | css样式文件与html文件分离 | 在读取完HTML文件之后加载|

##	css使用方法优先级
##	 行内样式 > 内部样式 > 外部样式
+	链入外部样式表与内部样式表之间的优先级取决于所处位置的先后
+ 	最后定义的优先级最高(就近原则)

##	css选择器
###	标签选择器
+	以HTML标签作为选择器

```css
p{font-size: 30px;}
```

###	全局选择器
+	所有标签设置样式

```css
*{color: blue}
```

###	类选择器
+ 	为html标签添加class属性, 通过类选择器来为具有此class属性的元素设置css样式

```css
<p class="red">内容</p>
.red{color: red}
```

+	可对不用类型元素的同一个名称的类选择器设置不同的样式规则

```css
<h1 class="red">h1</h1>
<p class="red">pp</p>

p.red{font-size: 40px;}
h1.red{font-size: 20px;}
```

+	同一个元素可以设置多个类, 之间用空格隔开

```html
<p class="red fsize">ppp</p>
```
###	群组选择器
+	集体统一设置样式

```css
p,h1,h2{font-size: 40px}
```

###	ID选择器
+	为html标签添加id属性

```html
<p id="p1">内容</p>
```

+	通过id选择器来为具有此id的元素设置css规则

```css
#p1{color: red}
```
###	后代选择器
+	使用后代选择器设置, 之间用空格隔开

```css
p em{font-size: 40px}
```

+	后代选择器可以多层

```css
p a em{...}
#p1 em {...}
p.red a em{...}
```

## 伪类
###	伪类链接
链接的4种状态: 激活状态(:active), 已访问状态(:visited), 未访问状态(:link), 和鼠标悬停状态(:hover)

###	伪类:hover和:active
+	:hover用于访问的鼠标经过某个元素时
+ 	:active用于一个元素被激活时,(即按下鼠标之后放开鼠标之前的时间)

```css
p:hover{color:red}
p:active{font-size: 20px;}
```

+	ie6及更早版本, 支持a元素的4中状态
+ 	Ie6浏览器不支持其他元素的:hover和:active

###	链接伪类的顺序
+	:link > :visited > :hover > :active
+ 	a:hover 必须置于a:link 和 a:visited之后,才有效
+  a:active 必须置于a:hover之后才有效
+  伪类名称对大小写不敏感

##	css继承和重叠
###	css继承
+	从父元素那集成部分css属性

###	css层叠
+	可以定义多个样式
+ 	不冲突时, 多个样式可层叠为一个
+  冲突时,按不同样式规则优先级来应用样式

###	css优先级
+	行内样式 > 内部样式 > 外部样式
+ 	链入外部样式表与内部样式表之间的优先级取决于所处位置的先后
+  最后定义的优先级最高(就近原则)

###	css优先级规则
同一样式表中

+	权值相同: 就近原则
+ 	权值不同: 根据权值来判断css样式, 哪种css样式权值高, 就是用哪种样式

###	选择器权值
+	标签选择器: 权值为1
+ 	类选择器和伪类: 权值为10
+  id选择器: 权值为100
+  通配符选择器: 权值为0
+  行内样式: 权值为1000

###	权值规则
+	统计不用选择器的个数
+ 	每类选择器的个数乘以相应权值
+  把所有的值相加得出选择器的权值

```css
#main div.warning h2{...}
id: 1 => 1 * 100 = 100
class: 1 => 1 * 10 = 10
标签:2 => 2 * 1 = 2 
权值: 100 + 10 + 2 = 112
```

###	!important规则
+	可调整样式规则的优先级
+ 	添加在样式规则之后, 中间用空格隔开

```css
div{color: red !important;}
```

###	css优先级总结
+	!important声明最高
+ 	css使用方法的优先级
	-	行内样式> 内部样式 > 外部样式
	- 	link链入外部样式和style内部样式优先级, 取决于先后顺序
+	样式表中优先级
	-	id选择器 > class选择器 > 标签选择器 > 通配符

###	css样式命名规则
+	采用英文字母, 数字, 以及 - 和 _ 命名
+ 	以小写字母开头, 不能以数字和 - 或 _ 开头
+  命名形式: 单字, 连接符, 下划线, 驼峰

##	字体和文本样式
###	文字样式属性
| 类型 | 属性 |
|:-- | :-- |
| 字体 | font-family |
|文字大小| font-size |
|文字颜色|font-color |
|文字粗细|font-weight |
|文字样式|font-style |

####	font-family字体属性
定义元素内文字以什么字体来显示

+	语法
	-	font-family:[字体1][,字体2][...]
+	说明
	-	含空格字体名和中文, 用英文引号(")括起来
	- 	多个字体, 用英文逗号 , 隔开
	-  引号嵌套, 外使用双引号, 内使用单引号
+	font-family属性值: 具体属性名, 字体集
	-	Serif
	- 	Sans-serif
	-  Monospace
	-  Cursive
	-  Fantasy

```css
span{font-family : "微软雅黑","宋体"}
p.serif{font-family:"Times New Roman",Times,serif;}
p.sansserif{font-family:Arial,Helvetica,sans-serif;}
```




































