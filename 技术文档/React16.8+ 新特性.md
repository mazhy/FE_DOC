#	React16.8+ 新特性
##	lazy & Suspense
+	引入

```js
import React, { Component, lazy, Suspense } from "react"
```

+	定义懒加载组件

```js
//	lazy是一个函数, 且他的参数也是一个函数
//	函数内部使用import的另一种用法, 以方法的形式引入
//	webpack默认会给这个chunk起一个0,1,2类似的名字, 可以用 */* webpackChunkName: "editor" */*指定名字
const LazyEditor = lazy(() => import(/* webpackChunkName: "editor" */"./components/Editor"))
```

+	lazy 并不能单独使用, 需要配合 Suspense 使用
+ 	因为在 lazy 加载组件时期有一段空档期需要填充
+	fallback 需要使用一个组件填充

```js
<Suspense fallback={<div>loading</div>}>
	<LazyEditor {...EditorProps} />
</Suspense>
```

##	memo


##	Hooks
###	class类组件不足
+	难以复用的状态逻辑
	-	缺少复用机制
	-	渲染属性和高阶组件导致层级冗余
+ 	趋向复杂难以维护
	-	生命周期函数混杂不相干逻辑
	- 	相干逻辑分散在不同的生命周期
+	this指向困扰
	-	内联函数过度创建新句柄
	- 	类成员函数不能保证this

###	Hooks优势
+	优化类组件的三大问题
	-	函数组件无this问题
	- 	自定义Hook方便复用状态逻辑
	-  副作用的关注点分离
	
###	state hooks
hooks 都要以use开头
	
###	effect hooks
+	副作用使用的时期
	-	mount之后	componentDidMount
	- 	update之后	componentDidUpdate
	-  unMount 之前	componentWillUnMount
+	使用useEffect 就可以代替以上三个生命周期函数
