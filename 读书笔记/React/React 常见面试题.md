# React 常见面试题
##调用setState之后发生了什么？
调用setState函数之后，react会将传入的参数对象与组件当前的状态合并，然后触发调和过程(Reconciliation)。以高效方式根据新的状态构建React元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。（按需渲染，不是全部渲染）
##React 中 Element 与 Component 的区别是？
React Element 是描述屏幕上所见内容的数据结构，是对于 UI 的对象表述。典型的 React Element 就是利用 JSX 构建的声明式代码片然后被转化为createElement的调用组合；
React Component 则是可以接收参数输入并且返回某个 React Element 的函数或者类。
##React 中 refs 的作用是什么？
访问 DOM 元素或者某个组件实例的句柄。

```js
//  类组件
class CustomForm extends Component {
  handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          ref={(input) => this.input = input} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

//  函数式组件
function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

##在什么情况下你会优先选择使用 Class Component 而不是 Functional Component(函数式组建)？
在组件需要包含内部状态或者使用到生命周期函数的时候使用 Class Component ，否则使用函数式组件。

## 展示组件(Presentational component)和容器组件(Container component)之间有何不同
1.	展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。
2.	容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。

## 类组件(Class component)和函数式组件(Functional component)之间有何不同
1.	类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
2.	当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件

##(组件的)状态(state)和属性(props)之间有何不同
1.	State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
2.	Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。

## 何为受控组件(controlled component)
```js
在 HTML 中，类似 <input>, <textarea> 和 <select> 这样的表单元素会维护自身的状态，
并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。
但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，
并且每次调用回调函数时，如 onChange 会更新 state，重新渲染组件。
一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。
```

##何为高阶组件(higher order component)
高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。

##为什么建议传递给 setState 的参数是一个 callback 而不是一个对象
因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。

##除了在构造函数中绑定 this，还有其它方式吗
你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。

##(在构造函数中)调用 super(props) 的目的是什么
在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。

##应该在 React 组件的何处发起 Ajax 请求
在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 componentDidMount 中发起网络请求将保证这有一个组件可以更新了。

##描述事件在 React 中的处理方式。
为了解决跨浏览器兼容性问题，您的 React 中的事件处理程序将传递 SyntheticEvent 的实例，它是 React 的浏览器本机事件的跨浏览器包装器。

这些 SyntheticEvent 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。有趣的是，React 实际上并没有将事件附加到子节点本身。React 将使用单个事件监听器监听顶层的所有事件。这对于性能是有好处的，这也意味着在更新 DOM 时，React 不需要担心跟踪事件监听器。

## React 中 keys 的作用是什么？
Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。

```js
render () {
  return (
    <ul>
      {this.state.todoItems.map(({task, uid}) => {
        return <li key={uid}>{task}</li>
      })}
    </ul>
  )
}
```

在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。
##在生命周期中的哪一步你应该发起 AJAX 请求？
componentDidMount

+	React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 componentWillMount 的触发次数。对于 componentWillMount 这个生命周期函数的调用次数会变得不确定，React 可能会多次频繁调用 componentWillMount。如果我们将 AJAX 请求放到 componentWillMount 函数中，那么显而易见其会被触发多次，自然也就不是好的选择。

+	如果我们将 AJAX 请求放置在生命周期的其他函数中，我们并不能保证请求仅在组件挂载完毕后才会要求响应。如果我们的数据请求在组件挂载之前就完成，并且调用了setState函数将数据添加到组件状态中，对于未挂载的组件则会报错。而在 componentDidMount 函数中进行 AJAX 请求则能有效避免这个问题。

##shouldComponentUpdate 的作用是啥以及为何它这么重要？
允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。

##传入 setState 函数的第二个参数的作用是什么？
该函数会在setState函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：

```js
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)
```

## 如何告诉 React 它应该编译生产环境版本？
通常情况下我们会使用 Webpack 的 DefinePlugin 方法来将 NODE_ENV 变量值设置为 production。编译版本中 React 会忽略 propType 验证以及其他的告警信息，同时还会降低代码库的大小，React 使用了 Uglify 插件来移除生产环境下不必要的注释等信息

## 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？
props.children并不一定是数组类型，譬如下面这个元素：

```js
<Parent>
  <h1>Welcome.</h1>
</Parent>
```

如果我们使用props.children.map函数来遍历时会受到异常提示，因为在这种情况下props.children是对象（object）而不是数组（array）。React 当且仅当超过一个子元素的情况下会将props.children设置为数组，就像下面这个代码片：

```js
<Parent>
  <h1>Welcome.</h1>
  <h2>props.children will now be an array</h2>
</Parent>
```
这也就是我们优先选择使用React.Children.map函数的原因，其已经将props.children不同类型的情况考虑在内了。

##概述下 React 中的事件处理逻辑
为了解决跨浏览器兼容性问题，React 会将浏览器原生事件（Browser Native Event）封装为合成事件（SyntheticEvent）传入设置的事件处理器中。这里的合成事件提供了与原生事件相同的接口，不过它们屏蔽了底层浏览器的细节差异，保证了行为的一致性。另外有意思的是，React 并没有直接将事件附着到子元素上，而是以单一事件监听器的方式将所有的事件发送到顶层进行处理。这样 React 在更新 DOM 的时候就不需要考虑如何去处理附着在 DOM 上的事件监听器，最终达到优化性能的目的。


## 传入 setState 函数的第二个参数的作用是什么？
该函数会在setState函数调用完成并且组件开始重渲染的时候被调用，我们可以用该函数来监听渲染是否完成：

```js
this.setState(
  { username: 'tylermcginnis33' },
  () => console.log('setState has finished and the component has re-rendered.')
)
```
## createElement 与 cloneElement 的区别是什么？
createElement 函数是 JSX 编译之后使用的创建 React Element 的函数，而 cloneElement 则是用于复制某个元素并传入新的 Props。

React.createElement():JSX 语法就是用 React.createElement()来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如 div、span，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。

```js
React.createElement(
    type,
    [props],
    [...children]
)
```
React.cloneElement()与 React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会并入原有的属性，传入到返回的新元素中，而就的子元素奖杯替换。

```js
React.cloneElement(
  element,
  [props],
  [...children]
)
```

##React 中有三种构建组件的方式
React.createClass()、ES6 class 和无状态函数。

##react 组件的划分业务组件技术组件？
1.	根据组件的职责通常把组件分为 UI 组件和容器组件。
2.	UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
3.	两者通过 React-Redux 提供 connect 方法联系起来。


##shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）
shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

##为什么虚拟 dom 会提高性能?(必考)
虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

## react diff 原理（常考，大厂必考）
1.	把树形结构按照层级分解，只比较同级元素。
2.	给列表结构的每个单元添加唯一的 key 属性，方便比较。
3.	React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
4.	合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
5.	选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

##redux中间件
中间件提供第三方插件的模式，自定义拦截 action -> reducer 的过程。变为 action -> middlewares -> reducer 。这种机制可以让我们改变数据流，实现如异步 action ，action 过滤，日志输出，异常报告等功能。

常见的中间件：
redux-logger：提供日志输出
redux-thunk：处理异步操作
redux-promise：处理异步操作，actionCreator的返回值是promise

##了解 redux 么，说一下 redux 把
+	redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action，store，reducer，工作流程是 view 调用 store 的 dispatch 接收 action 传入 store，reducer 进行 state 操作，view 通过 store 提供的 getState 获取最新的数据，flux 也是用来进行数据操作的，有四个组成部分 action，dispatch，view，store，工作流程是 view 发出一个 action，派发器接收 action，让 store 进行数据更新，更新完成以后 store 发出 change，view 接受 change 更新视图。Redux 和 Flux 很像。主要区别在于 Flux 有多个可以改变应用状态的 store，在 Flux 中 dispatcher 被用来传递数据到注册的回调事件，但是在 redux 中只能定义一个可更新状态的 store，redux 把 store 和 Dispatcher 合并,结构更加简单清晰
+	新增 state,对状态的管理更加明确，通过 redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点时当数据更新时有时候组件不需要，但是也要重新绘制，有些影响效率。一般情况下，我们在构建多交互，多数据流的复杂项目应用时才会使用它们


##简述 flux 思想
Flux 的最大特点，就是数据的"单向流动"。

1.	用户访问 View
2.	View 发出用户的 Action
3.	Dispatcher 收到 Action，要求 Store 进行相应的更新
4.	Store 更新后，发出一个"change"事件
5.	View 收到"change"事件后，更新页面

##redux有什么缺点
1.	一个组件所需要的数据，必须由父组件传过来，而不能像flux中直接从store取。
2.	当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新render，可能会有效率影响，或者需要写复杂的shouldComponentUpdate进行判断。
##react组件的划分业务组件技术组件？
根据组件的职责通常把组件分为UI组件和容器组件。
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
两者通过React-Redux 提供connect方法联系起来。
具体使用可以参照如下链接：http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html

 
##react生命周期函数
这个问题要考察的是组件的生命周期

+	初始化阶段：
-	getDefaultProps:获取实例的默认属性
-	getInitialState:获取每个实例的初始化状态
-	componentWillMount：组件即将被装载、渲染到页面上
-	render:组件在这里生成虚拟的DOM节点
-	componentDidMount:组件真正在被装载之后
+	运行中状态：
-	componentWillReceiveProps:组件将要接收到属性的时候调用
-	shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回false，接收数据后不更新，阻止render调用，后面的函数不会被继续执行了）
-	componentWillUpdate:组件即将更新不能修改属性和状态
-	render:组件重新描绘
-	componentDidUpdate:组件已经更新
+	销毁阶段：
-	componentWillUnmount:组件即将销毁

##react性能优化是哪个周期函数？
shouldComponentUpdate 这个方法用来判断是否需要调用render方法重新描绘dom。因为dom的描绘非常消耗性能，如果我们能在shouldComponentUpdate方法中能够写出更优化的dom diff算法，可以极大的提高性能。

详细参考：
https//segmentfault.com/a/1190000006254212

##为什么虚拟dom会提高性能?
虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。
具体实现步骤如下：
+	用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
+	当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
+	把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。
参考链接：
https://www.zhihu.com/question/29504639?sort=created
 
##diff算法?
把树形结构按照层级分解，只比较同级元素。
给列表结构的每个单元添加唯一的key属性，方便比较。
React 只会匹配相同 class 的 component（这里面的class指的是组件的名字）
合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
选择性子树渲染。开发人员可以重写shouldComponentUpdate提高diff的性能。
参考链接：
https//segmentfault.com/a/1190000000606216

##react性能优化方案
1.	重写shouldComponentUpdate来避免不必要的dom操作。
2.	使用 production 版本的react.js。
3.	使用key来帮助React识别列表中所有子组件的最小变化。
参考链接：
https://segmentfault.com/a/1190000006254212
 
##简述flux 思想
Flux 的最大特点，就是数据的"单向流动"。

1.	用户访问 View
2.	View 发出用户的 Action
3.	Dispatcher 收到 Action，要求 Store 进行相应的更新
4.	Store 更新后，发出一个"change"事件
5.	View 收到"change"事件后，更新页面
参考链接：
http://www.ruanyifeng.com/blog/2016/01/flux.html

##React项目用过什么脚手架？Mern? Yeoman?
Mern：MERN是脚手架的工具，它可以很容易地使用Mongo, Express, React and NodeJS生成同构JS应用。它最大限度地减少安装时间，并得到您使用的成熟技术来加速开发。

## React 的工作原理
React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 "diffing" 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。

##使用 React 有何优点
+	只需查看 render 函数就会很容易知道一个组件是如何被渲染的
+	JSX 的引入，使得组件的代码更加可读，也更容易看懂组件的布局，或者组件之间是如何互相引用的
+	支持服务端渲染，这可以改进 SEO 和性能
+	易于测试
+	React 只关注 View 层，所以可以和其它任何框架(如Backbone.js, Angular.js)一起使用

## 指出(组件)生命周期方法的不同
-	componentWillMount -- 多用于根组件中的应用程序配置
-	componentDidMount -- 在这可以完成所有没有 DOM 就不能做的所有配置，并开始获取所有你需要的数据；如果需要设置事件监听，也可以在这完成
-	componentWillReceiveProps -- 这个周期函数作用于特定的 prop 改变导致的 state 转换
-	shouldComponentUpdate -- 如果你担心组件过度渲染，shouldComponentUpdate 是一个改善性能的地方，因为如果组件接收了新的 prop， 它可以阻止(组件)重新渲染。shouldComponentUpdate 应该返回一个布尔值来决定组件是否要重新渲染
-	componentWillUpdate -- 很少使用。它可以用于代替组件的 componentWillReceiveProps 和 shouldComponentUpdate(但不能访问之前的 props)
-	componentDidUpdate -- 常用于更新 DOM，响应 prop 或 state 的改变
-	componentWillUnmount -- 在这你可以取消网络请求，或者移除所有与组件相关的事件监听器

## 使用箭头函数(arrow functions)的优点是什么
+	作用域安全：在箭头函数之前，每一个新创建的函数都有定义自身的 this 值(在构造函数中是新对象；在严格模式下，函数调用中的 this 是未定义的；如果函数被称为“对象方法”，则为基础对象等)，但箭头函数不会，它会使用封闭执行上下文的 this 值。
+	简单：箭头函数易于阅读和书写
+	清晰：当一切都是一个箭头函数，任何常规函数都可以立即用于定义作用域。开发者总是可以查找 next-higher 函数语句，以查看 this 的值


##	为什么建议传递给 setState 的参数是一个 callback 而不是一个对象
因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。

##除了在构造函数中绑定 this，还有其它方式吗
你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。

##怎么阻止组件的渲染
在组件的 render 方法中返回 null 并不会影响触发组件的生命周期方法

##当渲染一个列表时，何为 key？设置 key 的目的是什么
Keys 会有助于 React 识别哪些 items 改变了，被添加了或者被移除了。Keys 应该被赋予数组内的元素以赋予(DOM)元素一个稳定的标识，选择一个 key 的最佳方法是使用一个字符串，该字符串能惟一地标识一个列表项。很多时候你会使用数据中的 IDs 作为 keys，当你没有稳定的 IDs 用于被渲染的 items 时，可以使用项目索引作为渲染项的 key，但这种方式并不推荐，如果 items 可以重新排序，就会导致 re-render 变慢。

##(在构造函数中)调用 super(props) 的目的是什么
在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。

##何为 JSX
JSX 是 JavaScript 语法的一种语法扩展，并拥有 JavaScript 的全部功能。JSX 生产 React "元素"，你可以将任何的 JavaScript 表达式封装在花括号里，然后将其嵌入到 JSX 中。在编译完成之后，JSX 表达式就变成了常规的 JavaScript 对象，这意味着你可以在 if 语句和 for 循环内部使用 JSX，将它赋值给变量，接受它作为参数，并从函数中返回它。

##何为 Children
在JSX表达式中，一个开始标签(比如<a>)和一个关闭标签(比如</a>)之间的内容会作为一个特殊的属性props.children被自动传递给包含着它的组件。

这个属性有许多可用的方法，包括 React.Children.map，React.Children.forEach， React.Children.count， React.Children.only，React.Children.toArray。

##在 React 中，何为 state
State 和 props 类似，但它是私有的，并且完全由组件自身控制。State 本质上是一个持有数据，并决定组件如何渲染的对象。

什么原因会促使你脱离 create-react-app 的依赖
当你想去配置 webpack 或 babel presets。

##何为 redux
Redux 的基本思想是整个应用的 state 保持在一个单一的 store 中。store 就是一个简单的 javascript 对象，而改变应用 state 的唯一方式是在应用中触发 actions，然后为这些 actions 编写 reducers 来修改 state。整个 state 转化是在 reducers 中完成，并且不应该有任何副作用。

##在 Redux 中，何为 store
Store 是一个 javascript 对象，它保存了整个应用的 state。与此同时，Store 也承担以下职责：

允许通过 getState() 访问 state
运行通过 dispatch(action) 改变 state
通过 subscribe(listener) 注册 listeners
通过 subscribe(listener) 返回的函数处理 listeners 的注销
##何为 action
Actions 是一个纯 javascript 对象，它们必须有一个 type 属性表明正在执行的 action 的类型。实质上，action 是将数据从应用程序发送到 store 的有效载荷。

##何为 reducer
一个 reducer 是一个纯函数，该函数以先前的 state 和一个 action 作为参数，并返回下一个 state。

##Redux Thunk 的作用是什么
Redux thunk 是一个允许你编写返回一个函数而不是一个 action 的 actions creators 的中间件。如果满足某个条件，thunk 则可以用来延迟 action 的派发(dispatch)，这可以处理异步 action 的派发(dispatch)。

##何为纯函数(pure function)
一个纯函数是一个不依赖于且不改变其作用域之外的变量状态的函数，这也意味着一个纯函数对于同样的参数总是返回同样的结果。
















