#	zepto
##	dom对象和zepto对象的转换
```js
// dom
var one = document.getElementById('one')
one.className = "tow"

// zepto
$("#one").addClass("two")

// 转换成dom
$("#one")[0].className="two"
$("#one").get(0).className="two"

// 转换成zepto对象
$(one).addClass('thr')
```

##	zepto选择器的优势
###	完善的处理机制
+	在原生的写法中如果没有这个元素,调用方法和属性就会报错, 停止执行

```js
var tt = document.getElementById("tt")
tt.className = "hello"
```

+ 	在zepto中做了处理, 不会报错会继续执行

```js
$("#tt").addClass("hello")
```

###	当检查某个元素是否存在的时候
+	$("#tt") 返回的是一个对象, 不能直接用它来判断这个元素是否存在
+ 	用$("#tt").length> 0 来判断是否有元素

###	事件写法
```js
$('li').on("click",function(){})
```

+	单双行变色
	-	不用像传统的方式循环遍历每一行来设置颜色

```js
$('#tt tbody tr:nth-child(odd)').css('backgroundColor', 'red')
```

##	DOM操作
###	插入
```js
var $cr = #("<div class="cr">插入的div</div>")
$("#a").append($cr)
$cr.appendTo($("#a"))
```

##	各公司JD上已经没有zepto方面, 先放下以后再看

###	删除

###	复制节点

###	替换节点











































