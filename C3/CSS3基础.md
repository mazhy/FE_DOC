#	CSS3基础
##		C3选择器
###	子元素选择器
+	子元素选择器只能选择某元素的子元素
+ 	语法: 父元素 > 子元素
+  兼容性: ie8以上

###	相邻兄弟元素选择器
+	相邻兄弟选择器可以选择紧接在另一个元素后的元素, 而且他们具有一个相同的父元素
+ 	语法: 元素 + 兄弟相邻元素
+  兼容性: ie8以上

###	通用兄弟选择器
+	选择某元素后面的所有兄弟元素, 而且他们具有一个相同的父元素
+	语法: 元素 ~ 后面所有兄弟相邻元素
+ 	兼容性: ie8 以上

###	群组选择器
+	群组选择器是将具有相同样式的元素分组在一起, 每个选择器之间使用,隔开
+ 	语法: 元素1, 元素2,...,元素n
+  兼容性: ie6以上

###	属性选择器
+	对带有指定属性的html 元素设置样式
	-	使用C3属性选择器, 你可以只指定元素的某个属性, 或者你还可以同时指定元素的某个属性和其对应的属性值

####	Element[attribute]
+	选择所有带有attribute属性元素
+ 	兼容性: ie8以上

####	Element[attribute="value"]
+	选择所有带有attribute="value"属性元素
+ 	兼容性: ie8以上

####	Element[attribute~="value"]
+	选择attribute属性包含单词"value" 的元素
+ 	兼容性: ie8以上

####	Element[attribute^="value"]
+	选择attribute属性以单词"value" 开头的元素
+ 	兼容性: ie8以上

####	Element[attribute$="value"]
+	选择attribute属性以单词"value" 结尾的元素
+ 	兼容性: ie8以上

####	Element[attribute*="value"]
+	选择attribute属性包含"value" 所有的元素
+ 	兼容性: ie8以上

####	Element[attribute|="value"]
+	选择attribute属性以"value" 或"-value"开头的元素
+ 	兼容性: ie8以上

###	伪类选择器
####	动态伪类
这些伪类并不存在html中, 只有当用户和网站交互的时候才能体现出来

+	锚点伪类
	-	:link
	- 	:visited
+	用户行为伪类
	-	:hover
	- 	:active
	-  :focus

####	UI元素状态伪类
+	我们把 :enabled, :disabled, :checked 伪类称为ui元素状态伪类
+	ie9+

####	css3结构类
+	c3的:nth选择器
	-	我们把c3的:nth选择器也称为c3结构类

#####	element:first-child
+	选择属于其父元素的首个子元素的每个element元素
+	ie8+

#####	element:last-child
+	选择属于其父元素的最后一个子元素的element元素
+	ie8+

#####	element:nth-child(N)
+	:nth-child(N) 选择器匹配属于其父元素的第N个子元素, 不论元素的类型
+	ie9+, firefox4+

#####	关于参数(N)
+	element:nth-child(number)
	-	选择某元素下的第number(具体数字)个element元素
+	element:nth-child(n)
	-	n是一个简单表达式, 取值从0开始计算, 这里只能是n, 不能用其他字母代替
+	element:nth-child(odd),element:nth-child(even)
	-	odd, even是可用于匹配下标是奇数或者偶数的element元素的关键字

#####	element:nth-last-child(N)
+	匹配属于其元素的第N个子元素的每个元素, 不论元素的类型,从最后一个子元素开始计数
+ 	兼容性: ie9+, firefox4+

#####	element:nth-of-type(N)
+	:nth-of-type(N)选择器匹配属于父元素的特定类型的第N个子元素的每个元素
+ 	兼容性: ie9+, firefox4+

#####	element:nth-last-of-type(N)
+	匹配属于父元素的特定类型的第N个子元素的每个元素, 从最后一个子元素开始计数
+ 	兼容性: ie9+, firefox4+

#####	element:first-of-type
+	:first-of-type 选择器匹配属于其元素的特定类型的首个子元素的每个元素
+ 	兼容性: ie9+

#####	element:last-of-type
+	: last-of-type 选择器匹配属于其元素的特定类型的最后一个子元素的每个元素
+ 	兼容性: ie9+

#####	element:only-child
+	:only-child 选择器匹配属于其父元素的唯一子元素的每个元素
+ 	兼容性: ie9+

#####	element:only-of-type
+	:only-of-type 选择器匹配属于其父元素的特定类型的唯一子元素的每个元素
+ 	兼容性: ie9+, firefox4+

#####	element:empty
+	:empty 选择器匹配没有子元素(包括文本节点)的每个元素
+ 	兼容性: ie9+

#####	否定选择器(:not)
+	:not(Element/selector) 选择器匹配非指定元素/选择器的每个元素
+ 	语法: 父元素:not(Element/selector)
+ 	兼容性: ie9+

####	伪元素
+	css伪元素用于向某些选择器设置特殊效果
+ 	语法: 元素::伪元素 
+ 	兼容性: ie9+

#####	伪元素-Element::first-line
+	根据first-line 伪元素中的样式对 Element 元素的第一行文本进行格式化
+	first-line 伪元素只能用于块级元素

#####	伪元素-Element::first-letter
+	用于向文本的首字母设置特殊样式
+	first-letter 伪元素只能用于块级元素

#####	伪元素-Element::before
+	在元素的内容前面插入新内容
+	常用content配合使用

#####	伪元素-Element::after
+	在元素的内容后面插入新内容
+	常用content配合使用, 多用于清除浮动

#####	伪元素-Element::selection
+	用于设置在浏览器中选中文本后的背景色和前景色
+	::selection 在ie家族中, 只有ie9+版本支持, 在firefox中需要加上其前缀"-moz"

###	css权重
####	什么是权重
当很多的规则被应用到某一个元素上时, 权重是一个决定哪种规则生效, 或者是优先级的过程

####	权重等级与权重
行内样式(1000) > id选择器(100) > 类, 属性选择器和伪类选择器(10) > 元素和伪元素(1) > *(0)

####	权重计算口诀
从0开始, 一个行内样式+1000, 一个id+100, 一个属性选择器,class或者伪类 + 10, 一个元素名或者伪元素+1

###	权重规则
+	包含更高权重选择器的一条规则拥有更高的权重
+ 	id选择器的权重比属性选择器高
+  带有上下文关系的选择器比单纯的元素选择器权重更高
+  与元素挨得近的规则生效
+  最后定义的这条规则则会覆盖上面与之冲突的规则
+  无论多少个元素组成的选择器,都没有一个class选择器权重高
+  通配符选择器的权重是0, 被继承的css属性也带有权重, 权重也是0