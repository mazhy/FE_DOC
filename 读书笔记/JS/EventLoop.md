#	进程和线程
## 进程
	进程描述了CPU在运行指令以及加载和保存上下文所需的时间,放在应用上就代表了一个程序

##	线程
	线程是进程中更小单位,描述了执行一段指令所需的时间

##浏览器
	当创建一个tab页面时,就是创建了一个进程,一个进程中可以有多个线程,比如渲染线程,
	js引擎线程,HTTP请求线程,当你发起一个请求时,其实就是创建了一个线程,
	当请求结束后,该线程可能被销毁
## 单线程
	js是单线程执行,比如说js引擎线程和渲染线程就是互斥的,因为js是可以修改dom元素的,
	如果js执行的时候ui线程还在工作,就可能导致不能安全的渲染ui

#	执行栈
## 栈
先进后出的数据结构

##	执行栈
存储函数调用的栈结构,当开始执行js时,首先执行主函数,然后执行我们的代码,根据先进后出的原则,后执行的函数会先弹出栈

# 浏览器中的EventLoop
```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

script start => script end => promise1 => promise2 => setTimeout
```
##	宏任务(task)
浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->...）

鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTMl

setTimeout的作用是等待给定的时间后为它的回调产生一个新的宏任务。这就是为什么打印‘setTimeout’在‘script end’之后。因为打印‘script end’是第一个宏任务里面的事情，而‘setTimeout’是另一个独立的任务里面打印的。

## 微任务(Microtasks)
微任务通常来说就是需要在当前 task(宏) 执行结束后立即执行的任务，比如对一系列动作做出反馈，或者是需要异步的执行任务而又不需要分配一个新的 task，这样便可以减小一点性能的开销。只要执行栈中没有其他的js代码正在执行且每个宏任务执行完，微任务队列会立即执行。如果在微任务执行期间微任务队列加入了新的微任务，会将新的微任务加入队列尾部，之后也会被执行。微任务包括了mutation observe的回调还有接下来的例子promise的回调。

一旦一个pormise有了结果，或者早已有了结果（有了结果是指这个promise到了fulfilled或rejected状态），他就会为它的回调产生一个微任务，这就保证了回调异步的执行即使这个promise早已有了结果。所以对一个已经有了结果的promise调用.then(yey, nay)会立即产生一个微任务。这就是为什么‘promise1’,'promise2'会打印在‘script end’之后，因为所有微任务执行的时候，当前执行栈的代码必须已经执行完毕。‘promise1’,'promise2'会打印在‘setTimeout’之前是因为所有微任务总会在下一个宏任务之前全部执行完毕。

## async/await
带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象
如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装
如果async关键字函数显式地返回promise，那就以你返回的promise为准

await等待右面的表达式结果(await会让出线程,执行async函数之后的代码)
如果不是 promise , await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为 await表达式的结果
如果它等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。

## 分析
```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
.then(function() {
	console.log('promise1')
})
.then(function() {
	console.log('promise2')
})

console.log('script end')
```

###	先执行同步流程
1.先打印 script start

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start | |

2.执行了async1(), await 让出线程,继续执行外面的同步流程

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start,async2 end ||

3.setTimeout 遇到setTimeout会将放入宏任务队列

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start,async2 end| |
| 2| setTimeout |  |

4.new Promise 立即执行构造函数内函数

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start,async2 end, Promise | |
| 2| setTimeout |  |

5.当遇到promise.then()时,加入到当前宏函数的微任务队列中

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start,async2 end, Promise | promise1 , promise2 |
| 2| setTimeout |  |

6.执行script end

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start,async2 end, Promise,script end | promise1 , promise2 |
| 2| setTimeout |  |

7.async 外面的同步函数执行完之后处理await

| 顺序 | 宏任务 | 微任务 |
| ------ | ------ | ------ |
| 1 | script start,async2 end, Promise,script end | promise1 , promise2 ,async1 end|
| 2| setTimeout |  |


## 宏任务&微任务
###微任务包括 process.nextTick ，promise ，MutationObserver。

###宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

### 因为script也是宏任务,所以首先执行的就是宏任务

## 总结执行顺序
1.	首先执行同步代码，这属于宏任务
2.	当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
3.	执行所有微任务
4.	当执行完所有微任务后，如有必要会渲染页面
5.	然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数





###	宏任务按顺序执行，且浏览器在每个宏任务之间渲染页面
###	所有微任务也按顺序执行，且在以下场景会立即执行所有微任务
1.	每个回调之后且js执行栈中为空。
2.	每个宏任务结束后。