#	深入JS
##	变量
| 基本类型| 引用类型|
|	:--	|	:--	|
| 不可修改	|	可以修改|
|	保存在栈内存中	|	保存在堆内存中	|
|	按值访问	|	按引用访问	|
|	比较时, 值相等即相等	|	比较时, 同一引用才相等|
|	复制时,创建一个副本	|	复制的其实是指针	|
|	按值传递参数	|	按值传递参数	|
|	用typeof检测类型	|	用instanceof检测类型 |

##	作用域
+	作用域有全局作用域和局部作用域
+ 	作用域链是用来查询变量
+  JS解析机制

###	js的解析机制
####	预解析
在当前作用域下js运行之前, 会把带有var和function关键字的事先声明, 并在内存中安排好(这个过程可以理解为变量提升) 然后再从上到下执行js语句, 预解析只会发生在通过var定义的变量和function上.

#####	预解析过程
+	把变量的声明提升到当前作用域的最前面, 只会提升声明, 不会提升赋值
+ 	把函数的声明提升到当前作用域的最前面, 只会提升声明, 不会提升调用
+  先提升var ,再提升function

因此, 我们在定义函数时, 绝大多数都使用使用第一种方式(函数声明的方式)

当匿名函数多余定时器里面和注册时间的时候

```js
btn.onclick = function(){}
```

#####	预解析
```js
var num = 789
function fn() {
	console.log(num)
	var num = 987
}
fn() // 调用fn函数
```

打印的是undefined, 原因就是: js解析代码时, 把函数的声明还有变量的声明提升到当前作用域的最前面

####	var
使用var定义的变量预解析, 告诉解析器知道有这个名字的存在并默认将该变量赋值undefined

```js
console.log(x)  //undefined
var x = 15
```

变量x虽然是在console.log后面定义的,的暗示使用var声明的x会提前保存在内存中, 并赋值undefined, 然后再从上往下执行js语句, 它的执行顺序类似于下面的结构:

```js
var x
console.log(x)
x = 15
```

先声明了x, x没有定义赋值为undefined, 输出的结果自然为undefined, 然后再给x赋值为15, 需要注意的是, 如果变量声明没有使用var, 不存在变量提升: 

```js
console.log(x) // error: x is not defined
x = 15
```

x 没有使用var声明, 所以报错找不到x

####	function
使用function 定义函数的预解析: 先告诉解析器这个函数名的存在, 然后在告诉解析器这个函数名的函数体是什么:

```js
console.log(xx)
function xx(){
	return "整个函数都会提升到最前面"
}
```

声明函数会把整个函数都提升到最前面, 所以结果会把函数打印出来

如果在一个函数作用域中声明一个变量, 那么他也会提升到函数作用域的最上面

```js
var a = 1
function xx() {
	console.log(a) // undefined
	var a = 2
}
xx()
```

虽然全局作用域声明了一个变量a, 但是函数里面也声明了一个变量a, 所以会先查找函数里面是否有变量a, 如果有的话就不会在全局下查找了, 函数里面的变量a会被提升到函数作用域的最前面, 并且赋值为undefined, 所以输出结果为undefined,类似于如下结构

```js
var a = 1
function xx(){
	var a
	console.log(a) // undefined
	a = 2
}
xx()
```

函数的参数也可以理解为函数作用域的变量

```js
var a = 1
function xx(a){
	console.log(a)// undefined
}
xx()
console.log(a) // 1
```

为函数xx传递一个形参a, 由于函数在调用时没有传递实参(也就是说变量a没有赋值), 所以为undefined, 而在全局下输出a自然全局下查找变量a, 结果为1

####	变量或函数覆盖
如果在同一个作用域下声明两个相同的变量后者函数, 那么后一个会覆盖前一个

```js
var a = 1
var a = 2
console.log(a) // 2
```

```js
function x() {
	console.log("xx")
}
function x() {
	console.log("xxxx")
}
x() //xxxx
```

如果声明的函数与变量名字相同, 那又会怎么覆盖呢

```js
var m = 1
function m() {
	console.log("11")
}
m() // error m is not a function 
```

js中,函数的预解析优先级是要高于变量的预解析的, 无论函数在什么位置声明, 都优先吧整个函数提升到最前面, 所以上面的例子中,虽然函数m是在变量m下面定义的, 但是在预解析时先解析函数m, 然后在解析变量m, 后面的变量m会把前面的函数m覆盖, 最后m为1为数值类型, 所以调用m时报错, m不是一个函数

需要注意的是,如果变量m定义后没有赋值, 那么函数就不会被覆盖了

```js
var m 
function m () {
	console.log("11")
}
m() // 11
```

####	来举个栗子
```js
console.log(a)	// function a() { console.log(4)}
var a = 1
console.log(a)	//1
function a() {
	console.log(2)
}
console.log(a)	//	1
var a = 3
console.log(a)	//3
function a () {
	console.log(4)
}
console.log(a)	//3
a()	// error a is not a funciton
```

两个函数a优先提升, 所以第二个函数a覆盖为第一个函数a, 然后两个变量a提升, 由于变量a提升后为undefined, 所以第二个函数没有被覆盖, 第一个输出a结果为第二个函数 function a(){console.log(4)}. 随后a被赋值为1, 所以第二个输出a 结果为1, 因为第一个函数a已经被提升到前面去了, 所以第三个输出a结果还是1, 随后为a赋值为3, 所以第四,第五输出结果为3, 最后调用a, a因为是数值类型, 所以会报错a不是一个函数

##	内存
+	离开作用域的值将被标记为可回收, 将在垃圾收集期间删除
+ 	标记清除是目前主流的垃圾收集算法
+  标记清除就是给不用的值加标记, 然后回收其内存
+  引用计数算法可能因为循环引用的问题而得不到释放
+  当变量不用的时候, 可以手动解除它的引用(=null)

###	为什么要进行垃圾回收
因为程序中存在很多数据, 这些数据在内存中占据一定的空间, 在程序运行中, 一些没有用的数据(这些数据可以称为垃圾), 还会在内存中占据空间, 如果不进行垃圾回收的话, 随着程序的运行,可用的内存越来越小,必然会带来程序性能的下降, 造成卡, 慢,甚至系统异常

###	js垃圾回收机制
js具有自动垃圾回收机制, 也就是说, 执行环境会负责管理代码执行过程中使用的内存

####	原理
垃圾收集器会定期(周期性) 找出那些不在继续使用的变量, 然后释放其内存

####	标记清除
js中最常见的垃圾回收方式就是标记清除, 当变量进入环境时, 例如, 在函数中声明一个变量, 就将这个变量标记为 "进入环境". 此时的变量在函数执行过程中一直存在, 知道函数结束后, 将变量标记为 "离开坏境", 变量就被回收了(javascript 中管全局变量的在浏览器卸载页面才会被销)  

```js
function count(){
	var num = 0
	num ++
	console.log(num)
}
count() // 1
count() // 1
```

定义一个函数count, 函数count被调用两次结果num都输出1, 说明当第一次执行之后函数里面的变量num会被回收, 然后在第二次调用时,又重新声明变量num并初始化为0, 再进行计算输出结果1

###	内存管理
计算机分配给web浏览器的可用内存数量通常要比分配给桌面应用程序的少, 这样做的目的主要是出于安全方面的考虑, 目的是防止运行js的网页耗尽全部系统内存而导致系统崩溃, 因此, 确保占用最少的内存可以让页面获得更好的性能, 而优化内存占用的最佳方式, 就是为执行中的代码只保存必要的数据, 一旦数据不再有用, 最好通过将其值设置为null来释放其引用-- 这个做法就叫做解除引用

```js
function personObj(name){
	var person = new Object()
	person.name = name
	return person
}
var student = personObj("mazy")
console.log(student.name)
// 手动解除student的引用
student = null
```

这一做法适用于大多数全局变量和全局对象的属性, 局部变量会在他们离开执行环境时自动被解除引用


##	面向对象
对代码的一种抽象, 对外统一提供调用接口的编程思想

###	基于类的面向对象和基于原型的面向对象
+	基于原型的面向对象方式中, 对象则是依靠构造器利用原型构造出来的

###	名词
+	属性: 事物的特性
+ 	方法: 事物的功能
+  	对象:	事物的一个实例
+   原型: js函数中由prototype属性引用了一个对象,即原型对象

### 闭包
闭包是一个拥有许多变量和绑定了这些变量的环境的表达式(通常是一个函数)

###	声明对象
```js
// 字面量方式
var obj = {
    name: 'zhagnsan',
    say:function(){}
}

// new 
var obj = new Object()
obj.name = "zhangsan"

//构造方法声明对象
function test([参数]){
    this.name = name
}

// 工厂方式
function createObject(name, age){
    var obj = new Object()
    obj.name = name
    return obj
}

var box = createObject('zhangsan', 100)

// 原型模式
function test(){}
test.prototype.name = 'zhangsan'
var obj = new test()

//js中混合模式声明对象
function test(v1, v2){
    this.v1 = v1;
    this.v2 = v2;
}
test.prototype.say = function(){}

```

###	遍历对象的属性和方法
```js
var ren = {}
ren.name='zhangsan';
ren.age = 11;
for(var i in ren){
	console.log(ren[i])
}
```

###	封装
把对象内部数据和操作细节进行隐藏

###	原型
是利用prototype添加属性和方法

###	原型链
js在创建对象(不论是普通对象还是函数对象)的时候, 都有一个叫做__ proto__ 的内置属性, 用于指向创建他的函数对象的原型对象prototype

###	原型继承
利用原型让一个引用类型继承另一个引用类型的属性和方法

###	构造函数继承
在子类内部构造父类的对象实现继承

###	call和apply 的用法
+	call: 调用一个对象的一个方法, 以另一个对象替换当前对象
+ 	apply: 应用某一对象的一个方法, 用另一个对象替换当前对象

###	ji面向对象的关键字
+	instanceof
+ 	delete
+  call
+  apply
+  arguments
+  callee: 代表自己
+  this









