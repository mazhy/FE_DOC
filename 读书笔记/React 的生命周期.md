# React 的生命周期
## 渲染顺序
+	constructor
+ 	componentWillMount
+  render
+  componentDidMount

## constructor
+	做一些数据初始化

##componentWillMount
+	官方不推荐在此处发请求,原因可能会造成渲染的阻塞 

##render
+	可以做渲染过滤

##componentDidMount
+	数据已经装载,会引起二次render,实际应用发网络请求

## 修改顺序
+	shouldComponentUpdate
+ 	componentWillUpdate
+ 	render
+ 	componentDidUpdate

## 类似VUE 的插槽 Solt
+	当使用自定义组件的时候,可以在标签内部继续引用子组件或者html标签,这样,在子组件中可以使用{this.props.children} 获取到传递给子组件的插槽内容
+ 传dom元素,可以使用子组件的标签引入dom节点

## 路由
```js
    //exact 纵向匹配,,精确匹配
    //switch 横向匹配,只会匹配一个
 <Router>
  <Route path="/"  exact component={Home}></Route>
  <Switch>
    <Route path="/a"  component={Home}></Route>
    <Route path="/a"  component={Home}></Route>
    <Route path="/a"  component={Home}></Route>
  </Switch>
</Router>
```

## redux
+	需要安装两个包 redux, react-redux