
# vue学习笔记
##	基础

###	vue实例
```vue
	var vm = new Vue({
		el: '#app',
		data: {
			a:2
		}
	})
```

1.	vue实例通过构造函数创建
2.	el是必不可少的选项,它用于指定一个在页面中已存在的DOM元素,用来挂在Vue实例
3.	data对象,可以声明应用内需要双向数据绑定的数据,所有会用到的数据都要预先在data中声明,这样不至于将数据散落在业务逻辑中个,难以维护
4. vue实例本身也代理了data对象里的所有属性,==> vm.a = 2


###	生命周期
每个vue实例创建的时候都要经历一系列的初始化过程,同事也会调用一些相应的生命周期钩子,我们可以利用这些钩子,再合适的时机执行具体的业务

1.	created 实例创建完成之后调用,还未挂载,可以处理一些初始化的数据
2. mounted el挂载到实例上之后调用,一般第一个业务逻辑从这里开始
3. beforeDestory	实例销毁之前调用,可以解绑一些事件监听,定时器之类的操作

```vue
	var vm = new Vue({
		el: '#app',
		data: {
			a:2
		},
		created: function(){
			//...created 钩子函数
		},
		mounted : function () {
			//... mounted 钩子函数
		},
		beforeDestory : function () {
			//... beforeDestory 钩子函数
		},
	})
```

###	插值表达式
使用双大括号{{}}使用插值表达式,他会自动的将我们双向绑定的数据实时显示出来

```vue
	<div id="app">
		{{book}}
	</div>
	var vm = new Vue({
		el: '#app',
		data: {
			book:"<<这是一本书>>"
		}
	})
```

1.	data中的book会替换掉{{book}}的内容,通过任何方法修改data里的book属性,插值表达式都会替换成最新的内容
2. 插值表达式只是替换成文本
3. 插值表达式{{}}中可以支持简单的表达式,不支持语句和流控制
4. 插值表达式支持过滤器在尾部使用| 对数据进行过滤,过滤器可以串联{{data | format1 | format2 | format3}} 将开始过滤的结果以此往后传,得到最终结果

```vue
	<div id="app">
		{{data | myFormat}}
	</div>
	
	var vm = new Vue({
		el: '#app',
		data: {
			data: new Date()
		},
		filters:{
			myFormat: function(value) {
				//... 过滤操作
			}
		}
	})
```

如果想输出HTML而不是纯文本的话,使用v-html指令

```vue
	<div id="app">
		<span v-html="link"></span>
	</div>
	var vm = new Vue({
		el: '#app',
		data: {
			link:"<a href="#">这是一个链接</a>"
		}
	})
```


###	指令
前缀以 v- 开头的就是指令,比如v-if,v-show等,指令的主要职责就是当期表达式的值改变时,相应的将某些行为应用到DOM上.

####	v-bind:
v-bind是动态更新html元素上的属性,可以简写为 ":"
```vue
	<img v-bind:src="imgUrl"/>
```

####	v-on
用来绑定事件监听,可以简写为"@"
```vue
<button v-on:click="handleClick">click</button>
```

@click调用的方法名,没有参数的时候可不写(),默认传递原生event,如果需要传递参数,需要加(param),也可以传递$event原生event

####	v-cloak
v-cloak 不需要表达式的指令,他会在vue实例结束编译时,从绑定的html元素上移除,经常和css的display:none配合使用

```vue
<div id="app" c-cloak>
  {{message}}
</div>
[c-cloak] {
  display: none
}
```

这是解决初始化慢导致页面闪动的最佳解决办法
页面闪动: 就是当网速慢,或者客户端设备不好,导致开始渲染页面时,页面出现{{message}} 表达式,然后闪动替换的情况

####	v-once
也是不需要表达式的指令,作用是定义它的元素或者组件只渲染一次,包括元素和他的子节点,首次渲染后不会跟随数据的变化而变化,被视为静态内容

```vue
	<div id="app" v-once>
		{{message}}
	</div>
```

当某块元素确定他不会改变时可以这样使用,可以提升性能

####	v-if v-else-if v-else
与javascript中的条件语句if,else if,else相同,Vue的条件指令可以根据表达式的值在DOM中渲染或销毁元素/组件

```vue
<div id="app">
	<p v-if="status === 1">当status等于1 显示这一行</p>
	<p v-else-if="status === 2">当status等于2 显示这一行</p>
	<p v-else>其余的显示这行</p>
</div>
```	

1.	v-else-if 必须紧跟在v-if之后
2. v-else 可以跟在v-if,或者v-else-if之后
3. v-else 没有表达式

如果需要判断多个元素,可以使用Vue内置的template元素上使用条件指令

```vue
<template v-if="isShow">
	<p>第一行</p>
	<p>第二行</p>
	<p>第三行</p>
</template>
```

####	v-show
1.	v-show的用法跟v-if类似,只不过v-show是改变元素的css属性display,v-show表达式为ture时显示,false时隐藏
2.	但是v-show不能使用在template上

#####	v-if 和 v-show
1.	他俩都有类似的功能,不过v-if是真正的条件渲染,他会根据表达式适当的销毁或者重建元素及绑定的事件或子组件,若表达式初始值为false,则一开始元素/组件并不会渲染,当有条件第一次变为真才开始编译
2. 而v-show 只是简单的css属性的切换,无论条件真假,都会编译.
3. v-if更适合条件不经常改变的场景,因为他切换开销相对较大,而v-show适用于频繁的切换条件

####	v-for
当将一个数组或者对象循环显示,就会用到列表渲染指令v-for,他的表达式经常需要结合in,of来使用,类似 item in items 的方式

```vue
	/** items是个数组 ,item是别名, 可以用of替换in**/
	<li v-for="item in items">{item.name}</li>
	/** 支持可选的参数,index,作为当前想的索引值**/
	<li v-for="(item,index) in items">{index}{item.name}</li>
	/** 可以用在内置template标签上,进行多元素渲染 **/
	<template v-for="item in items">
		<p>{item.title}</p>
		<p>{item.content}</p>
	</template>
	/** 可以遍历对象 **/
	data:{
		user:{
			name:'zhangsan',
			age: 23,
			gender:'male'
		}
	}
	<span v-for="val in user">{val}</span>
	/** 还有两个可选参数 key: 键名, index : 索引值**/
	<span v-for="(val, key, index) in user">{val}</span>
	/** 还可以迭代整数 1-10 **/
	<span v-for="n in 10">{{n}}</span>
```

###	计算属性
计算属性可用来处理在插值表达式中较复杂的逻辑代码,在vue实例中,在computed属性对象中定义,最终返回计算的结果.

```vue
 	{{fun}}
 	
	var vm = new Vue({
		el: '#app',
		data: {
			val:'hello world'
		},
		computed: {
			fun :function(){
				return this.val.split('').reverse().join('')
			}
		}
	})
```

1.	计算属性中引用的数据只要发生变化,计算属性就会重新进行计算,视图也会更新
2. 每个计算属性都有getter,setter方法,默认情况下只有getter,可省略,如果需要,需显示生命setter方法
3. 计算属性依赖缓存,如果引用的数据没有发生变化,那么计算属性就不会重新计算,直接从缓存中提取.

###	v-bind:class
给v-bind:class设置一个对象,可以动态的切换class,该div的class取决于data中的isActive,而且:class可以与class并存

```vue
<div v-bind:class="{'active' : isActive}" class="static"></div>
```

处理class属性逻辑较为复杂时,可以使用计算属性,classes可以是计算属性,Object对象,或者methods

```vue
<div :class="classes"></div>
```

也可以绑定数组

```vue
<div :class="[activeCls,errCls]"></div>
data: {
	activeCls: 'active',
	errCls: 'err'
}
```

###	v-bind:style
v-bind:style 可以给元素绑定内联样式,跟:class语法类似
css属性名使用驼峰命名法,或者短横线分隔命名

###	vue数组更新
vue的核心是 数据 与 视图 的双向绑定,当我们修改数组时,vue会检测到数据变化, 所以用v-for渲染的视图也会立即更新,vue提供了数组变异的方法,使用它们改变数组也会触发视图更新
1.	push()
2.	pop()
3. shift()
4. 	unshift()
5. splice()
6. sort()
7. reverse()

还有一些不会改变原数组
1.	filter()
2. concat()
3. slice()
它们返回新的数组,用新数组替换原数组也会使视图重新渲染

*	vue检测数组变化时,并不是直接重新渲染整个列表,而是最大化的复用DOM元素替换的数组中没有变化的内容将不会重新渲染,因此可以大胆的使用新数组替换原数组
* 	有一些是检测不到数组变化的,
1.	通过索引直接设置值	app.book[3]={...}
2.	修改数组的长度	app.book.length = 10

解决办法
*	用Vue.set(app.book, 3,{...})
* 	用app.book.splice(3,1,{...})
*  用app.book.splice(10)修改长度


###	修饰符
在@绑定事件后用.在跟一个修饰符来实现一些特定的功能
1.	.stop
2. .prevent
3. .capture
4. 	.self
5. 	.once

```vue
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</di>

```

在表单元素上监听键盘事件时,还可以使用按键修饰符

```vue
/** 只有在keyCode=13时候触发回调函数 **/
<input @keyup.13 ="xxx"/>

```
记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

```vue
<!-- 同上 -->
<input v-on:keyup.enter="submit">

<!-- 缩写语法 -->
<input @keyup.enter="submit">
```
全部的按键别名:
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right

```vue
//可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```
用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

.ctrl
.alt
.shift
.meta(mac:  command, windows: win键)

```vue
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

