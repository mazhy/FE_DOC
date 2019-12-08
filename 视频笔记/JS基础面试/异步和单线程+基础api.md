#	异步和单线程
##	题目
1.	同步和异步的区别是什么,分别举一个同步和异步的例子
2. 一个关于setTimeout的笔试题
3. 前端使用异步的场景有哪些

## 什么是是异步(对比同步)
```js
console.log(100)
setTimeout(function(){
	console.log(200)
},1000)
console.log(300)

// 同步
console.log(100)
alert(200)	//一秒钟确认,阻塞执行
console.log(300)
```

1.	执行第一行,打印100
2. 执行setTimeout后,传入的函数会被暂存起来,不会立即执行(单线程的特点,不能同时干两件事)
3. 执行最后一行,打印300
4. 待所有程序执行完,处于空闲状态时,会立马看有没有暂存起来的要执行的函数
5. 发现暂存起来的setTimeout中的函数无需等待时间,就立即来执行(或者等待时间之后再拿过来执行)

##什么时候需要异步
1.	在可能发生等待的情况
2. 等待你过程中不能像alert一样阻塞程序执行
3.	所有的 "等待的情况" 都需要异步


##	前端使用异步的场景
1.	定时任务: setTimeout, setInverval
2. 网络请求: ajax请求,动态加载img加载
3. 事件绑定


## 同步和异步的区别是什么,分别举一个同步和异步的例子
1.	同步会阻塞代码执行,而异步不会
2. alert是同步,setTimeout是异步

##	一个关于setTimeout的笔试题
```js
console.log(1)
setTimeout(function(){
	console.log(2)
})
console.log(3)
setTimeout(function(){
	console.log(4)
},1000)
console.log(5)
// 1 3 5 2 4

```

## 重点总结
1.	异步和同步的区别
2. 异步和单线程的关系
3. 异步在前端的引用场景

#	日期
## 题目
1.	获取 2017-06-10 格式的日期
2. 获取随机数,要求是长度一致的字符串格式
3. 写一个能遍历对象和数组的通用forEach 函数

## 日期函数
1.	Date.now()	// 获取当前时间毫秒数
2. var dt = new Date()
3. dt.getTime()	//获取毫秒数
4. dt.getFullYear()	//年
5. dt.getMonth()	//月(0-11)
6. dt.getDate()	//日(0-30)
7. dt.getHours()	//小时(0-23)
8. dt.getMinutes()	//分钟(0-59)
9. dt.getSeconds()	//秒(0-59)

## Math
1.	获取随机数Math.random()	//处理缓存问题

## 数组API
1.	forEach 遍历所有元素
2. every 判断所有元素是否都符合条件
3. some判断是否有至少一个元素符合条件
4. sort 排序
5. map对元素重新组装,生成新数组
6.	过滤符合条件的元素

###	forEach
```js
var arr = [1,2,3]
  arr.forEach(function(item,index) {
    console.log(index,item) //遍历所有元素
   })
```

### every
```js
var arr = [1,2,3,5]
var result = arr.every(function(item,index) {
	//  用来判断所有的数组元素,都满足一个条件
	if(item < 4){
	  return true
	}
})
console.log(result)
```

### some
```js
  var arr = [1,2,3,5]
  var result = arr.some(function(item,index) {
    //  用来判断所有的数组元素,只要有一个满足条件即可
    if(item < 2){
      return true
    }
  })
  console.log(result)
```

###	sort
```js
  var arr = [1,3,2,4,6,5]
  var arr2 = arr.sort(function(a,b) {
    //从小到大排序
    //return a - b
    //从大到小排序
    return b - a
  })
```

### map
```js
  var arr = [1,2,3,4]
  var arr2 = arr.map(function(item,index) {
    return '<br>'+ item + '</br>'
  })
  console.log(arr2)
```

### filter
```js
  var arr = [1,2,3,4]
  var arr2 = arr.filter(function(item,index) {
    // 通过某一个条件过滤数组
    if(item>= 2){
    	return true
    }
  })
  console.log(arr2)
```

## 对象API
###	 for in
```js
  var obj = {
    x:100,
    y:200,
    z:300
  }
  var key 
  for(key in obj){
    // 注意这里, hasOwnProperty 只遍历本实例中的属性
    if(obj.hasOwnProperty(key)){
      console.log(key,obj[key])
    }
  }
```

## 解题
###	获取 2017-06-10 格式的日期
```js
  function formatDate(dt) {
    if(!dt) {
      dt = new Date()
    }
    var year = dt.getFullYear()
    var month = dt.getMonth() + 1
    var date = dt.getDate()
    if(month < 10) {
      month = '0' + month
    }
    if(date < 10) {
      date = '0' + date
    }
    return year + '-' + month + '-' + date
  }
  var dt = new Date()
  var formatDate = formatDate(dt)
  console.log(formatDate)
```

###	获取随机数,要求是长度一致的字符串格式
```js
  var random = Math.random()
  random = random + '0000000000' //后面加上10 个 0
  random = random.slice(0,10)
  console.log(random)
```

###	写一个能遍历对象和数组的通用forEach 函数
```js
  function forEach(obj,fn) {
    var key
    //准确判断是不是数组
    if(obj instanceof Array) {
      obj.forEach(function(item,index) {
        fn(index, item)
      })
    }else{
      //不是数组就是对象
      for(key in obj) {
        fn(key, obj[key])
      }
    }
  }

  var arr = [1,2,3,4]
  forEach(arr,function(index,item) {
    console.log(index,item)
  })

  var obj = {x:100,y:200}
  forEach(obj,function(key, value) {
    console.log(key,value)
  })
  ```