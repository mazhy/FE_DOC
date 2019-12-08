# 基础知识 && JS-WEB-API
## w3c标准
1.	定义用于浏览器中JS操作页面的API和全局变量

## JS内置的全局函数和对象有哪些
1.	Object,Array,Boolean,String,Math,JSON等
2. window, document
3. nabigator.userAgent

## JS是什么
1.	js包含两个部分
2. js基础知识(ECMA262标准)
3. JS-Web-API(w3c标准)

## DOM 操作
1.	DOM是哪种基本的数据结构
2. DOM操作的常用API有哪些
3. DOM节点的attr和property有何区别

### DOM
浏览器把拿到的html代码,结构化一个浏览器能识别并且js可操作的一个模型而已

### 获取DOM节点(js对象)
1.	document.getElementById
2. document.getElementsByTagName
3. document.getElementsByClassName


### property
1.	js对象的标准属性是property

### attribute
1.	DOM节点标签的属性

### DOM结构操作
#### 新增节点
```js
  var div1 = document.getElementById('div1')
  //新增节点
  var p = document.createElement('p')
  p.innerHTML = 'this is p1'
  div1.appendChild(p)

  //移动节点
  var p2 = document.getElementById('p2')
  div1.appendChild(p2) 
```

#### 获取父元素
```js
  //获取父元素和子元素
  var div1 = document.getElementById('div1')
  var parent = div1.parentElement
  var child = div1.childNodes
  div1.removeChild(child[0])
```

#### 删除节点
```js
var chileNodes = div1.childNode
div1.removeChild(childNodes[0])
```

### DOM是哪种基本的数据结构
#### 树 节点树

### DOM操作的常用API有哪些
1.	获取DOM节点,以及节点的property和attribute
2. 获取父节点,获取子节点
3. 新增节点,删除节点


### DOM节点的attr和property有何区别
1.	property 只是一个JS独享的属性的修改
2. Attribute 是对html标签属性的修改

## BOM操作
1.	如何检测浏览器的类型 (navigator 部分)
2. 拆解url的各部分 (location & history部分)

### navigator
```js
//浏览器api
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

###	screen	屏幕的特性
```js
console.log(screen.width)
console.log(screen.height)
```

### location & history
```js
location.href	// www.baidu.com
location.protocol	//http:
location.pathname	///classindex.html
location.search	//?id=12
location.hash	//#mid=100
//history
history.back()
history.forward()
```

# 事件
1.	编写一个通用的事件监听函数
2. 描述事件冒泡流程
3. 对于一个无限下拉加载图片的页面,如何给每个图片绑定事件

##	编写一个通用的事件监听函数
```js
//原始写法
  var btn = document.getElementById('btn1')
  btn.addEventListener('click', function(event) {
    console.log('clicked')
  })
//通用
  function bindEvent(elem, type, fn) {
    elem.addEventListener(type,fn)
  }

  var a = document.getElementById('link1')
  bindEvent(a,'click',function(e) {
    e.preventDefault();
    alert('clicked')
  })
```  

### 关于ie低版本的兼容性
1.	ie低版本使用attachEvent绑定事件,和w3c标准不一样
2. ie低版本使用量非常少,很多网站都早已不支持
3. 建议对ie低版本的兼容性,了解即可,无需深究
4. 如果遇到对ie低版本要求苛刻的面试,果断放弃

### 完善通用绑定事件函数
```js
function bindEvent(elem, type, selector, fn) {
    if(fn == null) {
      fn = selector
      selector = null
    }

    elem.addEventListener(type,function(e) {
      var target 
      if(selector) {
        target = e.target
        if(target.matches(selector)) {
          fn.call(target, e)
        }
      }else{
        fn(e)
      }
    })
  }
  
    //使用代理
  var div1 = document.getElementById('div1')
  bindEvent(div1, 'click', 'a', function(e) {
    console.log(this.innerHTML)
  })
  //不使用代理
  var a = document.getElementById('a1')
  bindEvent(a, 'click', function(e) {
    console.log(a.innerHTML)
  })
```
 
### 代理的好处
 1.	代码简洁
 2. 减少浏览器内存占用

# ajax
##	手动编写一个ajax,不依赖第三方库
```js
 var xhr = new XMLHttpRequest()
  xhr.open('GET', '/api', false) 
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      if(xhr.status == 200) {
        alert(xhr.responseText)
      }
    }
  }
  xhr.send(null)
```

###	readState
1.	0- 未初始化 - 还没有调用send方法
2. 1- 载入	已调用send方法,正在发送请求
3. 2- 载入完成	send方法执行完成,已经接受到全部响应内容
4. 3-交互- 正在解析响应内容
5. 4-完成-响应内容解析完成,可以在客户端调用了


###	状态码
1.	2xx - 表示成功处理请求
2. 3xx	-	需要重定向,浏览器直接跳转
3. 4xx - 客户端请求错误
4. 5xx - 服务器错误


## 跨域的几种实现方式
###	什么是跨域
1.	浏览器有同源策略, 不允许ajax访问其他域接口
2. 跨域条件: 协议, 域名, 端口, 又一个不同就是跨域

###	可以跨域的三个标签
1.	有三个标签允许跨域加载资源
2. img
3. script
4. link

###	三个标签的场景
1.	img 用于打点统计,统计网站可能是其他域
2. link,script 可以使用cdn,cdn也是其他域
3. script 可以使用jsonp

### 跨域注意事项
1.	所有跨域请求都必须经过信息提供方允许
2. 如果未经允许即可获取,那是浏览器同源策略出现漏洞

### jsonp
1.	本地设置回调函数,并将回调函数的名字以参数的形式放松到服务器
2. 服务器动态设置返回内容,返回内容是调用本地的回调函数,需要返回的数据为参数

###服务器端设置http header
1.	需要服务器端来做
2. 解决跨域的趋势
3. response.setHeader('Access-Control-Allow-Origin', 'http://www.baidu.com')

# 存储
##	描述cookie, sessionStore, localStorage的区别
###	cookie
1.	本身用于客户端和服务器端通信
2. 但是它有本地存储的功能,于是就被借用
3. 使用document.cookie='' 获取和修改即可

###cookie用于存储的缺点
1.	存储量太小只有4kb
2. 所有http请求都带着,会影响获取资源效率
3. api简单,需要封装才能用


### sessionStore, localStorage
1.	html5 专门为存储而设计,最大容量5M
2. api简单易用
3. setItem(k,v) getItem(k)

































