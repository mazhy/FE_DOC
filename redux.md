#	redux
+	store.getState()
+ 	createStore
+  Provider
+  connect
+  mapStateToProps
+  mapDispatchToProps

##	redux 原理
```js
export function createStore(reducer, enhancer){
	// enhancer 就是中间件, 下面会解释
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let currentState = {}
    let currentListeners = []
    function getState(){
        return currentState
    }
    function subscribe(listener){
        currentListeners.push(listener)
    }
    function dispatch(action){
        currentState = reducer(currentState, action)
        currentListeners.forEach(v=>v())
        return action
    }
    dispatch({type:'@IMOOC/WONIU-REDUX'})
    // 返回三个方法
    return { getState, subscribe, dispatch}
}
```

```js
// 上面 enhancer(createStore)(reducer) 
export function applyMiddleware(...middlewares){
	// 返回一个createStore作为参数的函数
    return createStore=>(...args)=>{
    	 // ...args 就是 reducers
        const store = createStore(...args)
        let dispatch = store.dispatch
        
        // 封装state, 增强dispatch 的对象
        const midApi = {
            getState:store.getState,
            dispatch:(...args)=>dispatch(...args)
        }
        
        // 挨个调用中间件, 并将midApi传入, 将多个中间件转换成一个中间件链
        const middlewareChain = middlewares.map(middleware=>middleware(midApi))
        // 再一次增强dispatch, 将多个中间件, 转换成一个洋葱模型的函数
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
			...store,
			dispatch
		}
	}
}

```

```js
export function compose(...funcs){
    if (funcs.length==0) {
        return arg=>arg
    }
    if (funcs.length==1) {
        return funcs[0]
	}
    return funcs.reduce((ret,item)=> (...args)=>ret(item(...args)))
}
```