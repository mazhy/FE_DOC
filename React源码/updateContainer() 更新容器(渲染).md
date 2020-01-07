# updateContainer() 更新容器(渲染)
+	该函数最后返回ExpirationTime 
+ 	获取了一个当前时间, 和当前fiber 传入computeExpirationForFiber() 并返回一个过期时间(步骤一)
	-	当前上下文 正在工作,直接设置expirationTime
	- 	如果现在正在工作中
		+	如果正在提交阶段, 那么直接同步执行
		+ 	否则将ExpirationTime 设置成下一次渲染的ExpirationTime
	-	如果都不满足
		+	那么就需要重新计算过期时间
		+ 	React 中有两种类型的ExpirationTime，一个是Interactive的，另一种是普通的异步。
		+  Interactive的比如说是由事件触发的，那么他的响应优先级会比较高因为涉及到交互。
			-	交互事件获取的过期时间, 正在交互的事件优先级高
	    	-	React在高优先级下让两个相近（10ms内）的update得到相同的expirationTime
		+	计算异步更新的过期时间
			-	React在低优先级下让两个相近（25ms内）的update得到相同的expirationTime
      		-	是为了让非常相近的两次更新得到相同的expirationTime，然后在一次更新中完成，相当于一个自动的batchedUpdates
        	-	开发者不停地使用setState()更新ReactApp，如果不把相近的update合并的话，会严重影响性能
	
```js
function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): ExpirationTime {
  const current = container.current;
  const currentTime = requestCurrentTime();
  // 在React中，为防止某个update因为优先级的原因一直被打断而未能执行。React会设置一个ExpirationTime，当时间到了ExpirationTime的时候，如果某个update还未执行的话，React将会强制执行该update，这就是ExpirationTime的作用。
  const expirationTime = computeExpirationForFiber(currentTime, current);
  // 过期时间一到就更新container 生产10ms 开发25ms
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    callback,
  );
}

// 步骤一
let expirationContext: ExpirationTime = NoWork;

function computeExpirationForFiber(currentTime: ExpirationTime, fiber: Fiber) {
  let expirationTime;
  if (expirationContext !== NoWork) {
    expirationTime = expirationContext;
  } else if (isWorking) {
    if (isCommitting) {
      expirationTime = Sync;
    } else {
      expirationTime = nextRenderExpirationTime;
    }
  } else {
    if (fiber.mode & ConcurrentMode) {
      if (isBatchingInteractiveUpdates) {
        // 交互事件获取的过期时间, 正在交互的事件优先级高
        // React在高优先级下让两个相近（10ms内）的update得到相同的expirationTime
        expirationTime = computeInteractiveExpiration(currentTime);
      } else {
        // 一个是计算异步更新的过期时间
        // React在低优先级下让两个相近（25ms内）的update得到相同的expirationTime
        // 是为了让非常相近的两次更新得到相同的expirationTime，然后在一次更新中完成，相当于一个自动的batchedUpdates
        // 开发者不停地使用setState()更新ReactApp，如果不把相近的update合并的话，会严重影响性能
        expirationTime = computeAsyncExpiration(currentTime);
      }
      if (nextRoot !== null && expirationTime === nextRenderExpirationTime) {
        expirationTime += 1;
      }
    } else {
      expirationTime = Sync;
    }
  }
  if (isBatchingInteractiveUpdates) {
    if (expirationTime > lowestPriorityPendingInteractiveExpirationTime) {
      lowestPriorityPendingInteractiveExpirationTime = expirationTime;
    }
  }
  return expirationTime;
}
```

