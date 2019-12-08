# ES6
## es6模块化如何使用,开发环境如何打包
### 	语法: import,export(注意有无default)
###	环境: babel编译ES6语法,模块化可用webpack,rollup

##	class和普通构造函数有何区别
###	JS构造函数

```js
function MathHandle(x,y){
	this.x = x
	this.y = y
}

MathHandle.prototype.add = function() {
	return this.x + this.y
}

var m = new MathHandle(1,2)
console.log(m.add())

```
### 	Class基本语法

```js
class MathHandle {
	constructor(x,y){
		this.x = x
		this.y = y
	}
	
	add () {
	return this.x + this.y
}

const m = new MathHandle(1,2)
console.log(m.add())

```
###	语法糖

```js
class MathHandle {...}

typeof MathHandle // "function"
MathHandle === MathHandle.prototype.constructor // true
```

####	class本身就是语法糖

```js
typeof MathHandle // "function"
MathHandle === MathHandle.prototype.constructor // true
m.__proto__ === MathHandle.prototype	//true
```

###	继承
```js
//js继承
function Animal() {
  this.eat = function() {
    console.log('animal eat')
  }
}
function Dog() {
  this.bark = function() {
    console.log('dog bark')
  }
}
Dog.prototype = new Animal()
var hashiqi = new Dog()

//class继承
class Animal {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log('eat')
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name)
    this.name = name
  }
  say() {
    console.log('say')
  }
}
const dog = new Dog('哈士奇')
```
### 总结
1.	class在语法上更加贴切和面向独享的写法
2. class实现继承更加易读,易理解
3. 更易于写java等后端语言的使用
4. 本质上还是语法糖,使用prototype(原型)

## promise的基本使用和原理
###	Callback Hell
```js
function loadImg (src, callback, fail) {
  var img = document.createElement('img')
  img.onload = function() {
    callback(img)
  }
  img.onerror = function() {
    fail()
  }
  img.src = src
}

var src = 'https://www.imooc.com/static/img/index/logo.png'
loadImg(src,function(img) {
  console.log(img.width)
}, function() {
  console.log('error')
})
```

###	Promise 语法
```js
function loadImg(src) {
  const promise = new Promise(function(resole,reject) {
    var img  = document.createElement('img')
    img.onload = function() {
      resole(img)
    }
    img.onerror = function () {
      reject()
    }
    img.src = src
  })
  return promise
}
//使用
var src = 'https://www.imooc.com/static/img/index/logo.png'
var result = loadImg(src)

result.then(function(img){
	console.log(img.width)
},function() {
	console.log('failed')
})

result.then(function(img){
	console.log(img.height)
})
//then,可以写很多个
```

### 总结
1.	new Promise实例,而且要return
2. new Promise时要传入函数,函数有resolve,reject两个参数
3. 成功时执行resolve() 失败时执行reject()
4. 用then监听结果

## 总结es6的其他功能
###	let/const
1.	let可以重新赋值,const不可以

###	多行字符串/模板变量
1.	``可以写多行字符串,比如jquery时代的拼接html
2.	${}	变量替换,前提外面有``

###	解构赋值

```js
const obj = { a: 10, b: 20, c: 30}
const {a, c} = obj

const arr = ['xxx','yyy','zzz']
const [x,y,z] = arr
```

###	块级作用域
```js
const obj = {a:10,b:20}
for(let item in obj) {
  console.log(item)
}
console.log(item)//undefined
```

###	函数默认参数
```js
function(a,b=0){...} // 没有传b参数的时候默认伪0
```

###	箭头函数
```js
const arr = [1,2,3]
arr.map(item => item + 1)
arr.map( (item, index) => {
  console.log(index)
  return item + 1
})

//注意
function fn() {
  console.log('real', this) // {a:10}
  var arr = [1,2,3]
  arr.map(function(item) {
    console.log('js',this)  //window
    return item + 1
  })
  arr.map(item => {
    console.log('es6',this) 
    //{a:10} 剪头函数是对不同js的一个补充,剪头函数中的this,指向他外层最近的this
    return item + 1
  })
}
fn.call({a:10})
```

### 总结
1.	let/const
2. 多行字符串/模板变量
3. 解构赋值
4. 块级作用域
5. 函数默认参数
6. 剪头函数

## JS众多模块化标准
1.	AMD成为标准,require.js(也有CMD)
2.	前端打包工具,是的nodejs模块化可以被使用
3.	ES6出现,想统一现在所有模块化标准
4.	node积极支持,浏览器尚未统一
5.	你可以自造lib,但是不要自造标准