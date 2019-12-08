#	组件化
1.	是否做过React开发
2. React以及组件化的一些核心概念
3. 实现流程

##	题目
1.	说一下对组件化的理解
2. JSX本质是什么
3. JSX和vdom的关系
4. 说一下setState的过程
5. 阐述自己对React和Vue的认识

### 对组件化的理解
1.	组件的封装
	1.	视图 (render)
	2. 数据	(this.state)
	3. 变化逻辑(数据驱动视图变化)(对于外面是个黑盒操作) (js方法)
2. 组件的复用
	1.	props传递(属性,方法)
	2. 复用(写好一个组件可复用多遍)
3.	组件的封装: 封装视图,数据,变化逻辑
4. 组件的复用: props传递,复用

###	JSX本质是什么
1.	JSX语法
	1.	html形式
	2. 引入JS变量和表达式
	3. if...else...
	4. 循环
	5. style和className
	6. 事件绑定
2. JSX解析成JS(JSX是语法糖,需要被解析成JS才能运行)
3. 独立的标准,可被其他项目使用

####	JSX语法
##### 注释
{/* 代码 */}

#### JSX语法根本无法被浏览器解析
1.	JSX是一个语法糖,最终解释为js代码
2. React.createElement('div',{id:'div1'},child1,child2,child3)
3. React.createElement('div',{id:'div1'},[...])
4. 开发环境会将JSX编译成js代码
5. JSX的写法打打降低了学习成本和编码工作量
6. JSX增加了debug成本

####	JSX独立的标准
1.	JSX是React引入的,但不是React独有的
2. React已经将他作为一个独立标准开放,其他项目也可以用
3. React.createElement是可以自定义修改的
4. 说明: 本身功能已经完备,和其他标准兼容和扩展性没问题


###	JSX和vdom的关系
1.	分析: 为何需要vdom => JSX需要渲染成html,数据驱动视图
2. React.createElement和h,都返回vnode
3. 何时patch(ReactDOM.render()和setState)
	1.	初次渲染-ReactDOM.render(<App/>,container),会触发patch(container,vnode)
	2. re-render-setState时,会触发patch(vnode,newVnode)
4. 自定义组件的解析: 初始化实例,然后执行render,就是相当于 new 自定义组件

####	为何需要vdom
1.	vdom是React初次推广开来的,结合JSX
2. JSX就是模板,最终要渲染成html
3. 初次渲染 + 修改state后的re-render
4. 正好符合vdom的应用场景

####	自定义组件的解析
1.	div直接渲染成<div>即可,vdom可以做到
2. 自定义组件,vdom默认不认识
3. 因此自定义组件,定义的时候必须声明render函数
4. 根据props初始化实例,然后执行实例的render函数
5. render函数的返回的还是vnode对象

###说一下React setState的过程
1.	setState的异步
2. vue修改属性也是异步的
3. setState的过程

####	setState的异步
1.	当用setState修改数据的时候,紧接着打印修改的值,发现这个值并没有直接修改

####	setState为何需要异步
1.	可能会一次执行多次setState
2. 你无法规定,限制用户如何实用setState
3. 没必要每次setState都重新渲染,考虑性能
4. 即便是每次重新渲染,用户也看不到中间的效果(js是单线程,dom渲染卡顿,所以看不到中间的过程)
5. 只看到最后的结果即可

####	vue修改属性也是异步的
1.	效果,原因和setState一样
2. vue的异步发生在第四步(data属性变化,属性的set时候执行updateComponent是异步的)


###	setState的过程
1.	每个组件实例,都有一个renderComponent方法(公共父类里)
2. 执行renderComponent 会重新执行实例的render
3. render函数返回newVnode,然后拿到preVnode
4. 执行patch(preVnode,newVnode)


### setState异步
1.	setState的异步: 效果,原因
2. vue修改属性也是异步:效果,原因
3. setState的过程,最终走到patch(preVnode,newVnode)

### 阐述自己对React和Vue的认识
1.	两者的本质区别
2. 看模板和组件化的区别
3. 两者共同点
4. 总结问题答案

####	前言
1.	文无第一武无第二,技术选型没有绝对的对与错
2. 技术选型要考虑的因素非常多
3. 作为面试者,你要有自己的主见
4. 和面试官的观点不一致没有关系,只要能说出理由

#### 两者的本质区别
1.	vue 本质是mvvm框架,由mvc发展而来
2. react 本质是前端组件化框架,由后端组件化发展而来
3. 但这并不妨碍他们两者都能实现相同的功能

#### 模板的区别
1.	vue-使用模板(最初由angular提出)
2. React 使用JSX
3. 模板语法上,我更倾向于JSX,模板和js混在一起,未分离
4. 模板分离上,我更倾向于vue
5. 模板应该和js逻辑分离
6. 开放封闭原则

#### 组件化的区别
1.	React本身就是组件化,没有组件化就不是React
2. vue也支持组件化,不过是在MVVM上的扩展
3. 查阅vue组件化的文档,洋洋洒洒很多
4. 对于组件化,我更加倾向于React,做的彻底而清晰 

####	两者的共同点
1.	都支持组件化
2. 都是数据驱动视图


#### 总结
1.	国内使用,首推vue,文档更容易读,易学,社区都大
2. 如果水平较高,推荐使用React,组件化和JSX