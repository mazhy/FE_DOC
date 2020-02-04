#	ES6

##		4.扩展对象
###	对象简写
+	当一个对象的属性, 与本地变量同名时, 不必在写冒号和值, 简单的只写属性名即可
	-	原理
		+	当字面量里只有一个属性的名称时, js引擎会在可访问作用域中查找其同名变量
		+ 	如果找到,则该变量的值被赋给对象字面量里的同名属性

###	方法简写
+	消除了冒号和function关键字

```js
var person = {
	sayName() {
		console.log('name')
	}
}
```

###		可计算属性名
```js
var person = {
	["first " + "name"]: "张三"
}
```

###	Object.is()
+	正常使用=== 进行强判断
+ 	但是在+0 和 -0 || NaN和NaN的判断上会有问题
+	运行结果在大部分情况中与===运算符相同, 唯一的区别在于+0和-0被识别为不相等并且NaN和NaN等价

```js
console.log(Object.is(NaN, NaN))	//true
console.log(Object.is(+0, -0))	// false
```

###	Object.assign()
+	接收一个接收对象和任意数量的源对象,最终返回接收对象
+ 	可以接收任意数量的源对象, 并按指定的顺序将属性复制到接收对象中, 所以如果多个源对象具有同名属性, 则排位靠后的源对象会覆盖排位靠前的.

###	对象中的重复属性
+	在es5中, 对象中如果有两个重复属性会报语法错误


###	新增修改原型的方法 setPrototypeOf()
+	对象原型的真实值被储存在内部专用属性[[Prototype]]中, 
+ 	调用Object.getPrototypeOf()方法返回储存在其中的值, 
+  	调用Object.setPrototypeOf()方法改变其中的值

###		简化原型访问-Super
+	super引用相当于指向对象原型的指针,实际上也就是Object.getPrototypeOf(this) 的值
+ 	通过Super引用调用对象原型上所有其他的方法
+  必须要在使用简写方法的对象中使用super引用, 
+  如果在其他方法声明中使用会导致语法错误

###	方法定义
+	在对象中定义的叫做方法
	-	但是内部会有[[HomeObject]]属性来容纳这个方法从属的对象
+ 	不在对象中的叫做函数


##	解构赋值
###		对象解构
+	对象解构的语法形式是在一个赋值操作符左边放置一个对象字面量
+	解构必须初始化, 也就是说在= 右面必须有响应的数据结构

```js
let { type, name } = { type: 1, name: "z3"}
```

###	解构赋值
+	如果在之前声明了变量
+ 	在解构赋值给同名的变量
+  那么必须用() 包起来, 否则报语法错误

```js
let node = {type:"1", name:"2"}, type = "11", name="22";

({type, name } = node )
console.log(type, name)
```

####	方法传参机构赋值

```js
fn({type, name} = node)
// 这种方式是 是将node解构赋值给全局变量, 但是传入fn方法里的还是node
```

####	默认值
+	使用解构赋值表达式时, 如果指定的局部变量名称在对象中不存在, 那么这个局部变量会被赋值为undefined
+	当指定的属性不存在时, 可以随意定义一个默认值, 在属性名称后添加一个等号(=)和相应的默认值即可
+	为变量value设置了默认值true, 只有当node上没有该属性或者该属性值为undefined时该值才生效.

```js
let { type, name, value=true } = node
```	
	
####	为非同名局部变量赋值
+	读取type的属性并将其值存储在变量localType上
+ 	放使用其他变量名进行赋值时也可以添加默认值, 只需在变量名后添加等号和默认值即可

```js
let { type: localType, name: localName } = node

let { type: localType, name: localName = "bar" } = node
```	
	
####	嵌套对象结构
+	所有冒号钱的标识符都代表在对象中的检索位置, 其右侧为被赋值的变量名
+ 	如果冒号后是花括号,则意味着要赋予的最终值嵌套在对象内部更深的层级中
	
```js
let { loc: {start}} = node 
```
	
####	数组解构
+	在解构模式中, 可以直接省略元素, 只为感兴趣的元素提供变量名
+ 	如果你只想取数组中的第三个值, 则不需要提供第一个和第二个元素的变量名称

```js
let color = [ "red", "green", "blue"]
let [ , , thirdColor ] = color 
```	

#####	两个变量值交换
```js
let [a, b ] = [ b , a ]
```
	
#####	不定元素
+	在数组中, 可以通过...语法将数组中的其他元素赋值给一个特定的变量

```js
let color = [ "red", "green", "blue"]
let [a, ...restColor ] = color
```

+	复制一个数组

```js
let color = [ "red", "green", "blue"]
let [ ...newColor ] = color
```
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	