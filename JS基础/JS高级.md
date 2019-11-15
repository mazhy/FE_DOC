#	JS 基础
+	JavaScript 是一种基于对象和事件驱动的客户端脚本语言, 最初的设计是为了检验HTML表单输入的正确性
+ 	完整的JavaScript 是由ECMAScript(语法), Browser Object(DOM, BOM)特性组成的

##	使用JS
可以在head 或body中使用```<script>``` 嵌入JS脚本

##	JS注释与分号
```js
// 单行注释

/**/ 多行注释
```

语句结束使用分号, 如果省略, 则由解析器确定语句的结尾

##	JS的语法
ECMAScript 中的一切(变量, 函数名, 操作符) 都区分大小写

##	JS的标识符
+	变量, 函数, 属性的名字, 或者函数的参数
+ 	命名规则
	-	由字母, 数组, 下划线或者美元符号组成
	- 	不能以数字开头
	-  不能使用关键字, 保留字符作为标识符

###	变量
+	ECMAScript 的变量是松散类型
+ 	松散类型: 可以用来保存任何类型的数据 => 换句话说, 每个变量仅仅是一个用于保存值的占位符而已

####	变量的声明与赋值
+	变量声明: 变量的声明要使用var操作符, 语法: var 变量名
+ 	变量赋值: 声明的同时赋值: var 变量名 = 值
	-	先声明后赋值: 变量名 = 值
+	省略var声明的变量是全局变量
+ 	不推荐省略var操作符来定义全局变量
+  一次声明多个变量, 用逗号隔开
	-	```var id , sex, age, name = "marry"```

##	JS数据类型
+	ECMAScript 中有5种简单数据类型(也称为基本数据类型)
	-	Undefined, Null, Boolean, Number和String
+	复杂数据类型
	-	Object

###	typeof
+	语法: typeof 变量 或 typeof(变量)
+ 	功能: 检测变量类型
+  返回值: String类型, 值有可能是: string, number, boolean, object, undefined, function

###	undefined
+	undefined 类型只有一个值, 即特殊的undefined
+ 	一般而言, 不存在需要显示地把一个变量设置为undefined值的情况

###	null
+	null值表示一个空对象指针
+ 	如果定义的变量准备在将来用于保存独享, 那么最好将该变量初始化为null而不是其他值
+  undefined 值是派生自null 值的, 所以 undefined == null 的返回值是true

###	Number
+	表示整数和浮点数
+ 	NaN: 即非数值(Not a Number) 是一个特殊的数值
+  任何涉及NaN的操作(例如: NaN/10) 都会返回NaN
+  NaN与任何值都不相等, 包括NaN本身

####	isNaN()
+	语法: isNaN(n)
+ 	功能: 检测n是否是 "非数值" 返回值: boolean
+  参数: 参数n可以是任何类型
+  说明: isNaN()在接收到一个值之后, 会尝试将这个值转换为数值
+  某些不是数值的值会直接转换为数值 => "123"  == 123

####	数值转换
有3个函数可以把非数值转换为数值: Number(), parseInt() 和 parseFloat(). 其中Number()可以用于任何数据类型, 而parseInt()和parseFloat()则专门把字符串转换成数值

#####	parseInt()
+	会忽略字符串前面的空格, 直至找到第一个非空格字符
+	parseInt(): 转换空字符串返回NaN
+ 	parseInt(): 这个函数提供第二个参数: 转换时使用的基数(多少进制)

#####	parseFloat()
+	从第一个字符开始解析每个字符,直至遇到一个无效的浮点数字符为止
+ 	除了第一个小数点有效外, parseFloat()与parseInt()的第二个区别在于它始终都会忽略前导的零
+  如果字符串中包含有效的十六进制格式, parseInt('0xf')将'0x'转换为相同大小的十进制数值而parseFloat('0xf')只会输出0




































