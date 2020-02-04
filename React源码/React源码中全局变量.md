##	 isHostCallbackScheduled
是否已经开始调度了，在ensureHostCallbackIsScheduled设置为true，在结束执行callback之后设置为false

##  scheduledHostCallback
在requestHostCallback设置，值一般为flushWork，代表下一个调度要做的事情

##  isMessageEventScheduled
是否已经发送调用idleTick的消息，在animationTick中设置为true

##  timeoutTime
表示过期任务的时间，在idleTick中发现第一个任务的时间已经过期的时候设置

##  isAnimationFrameScheduled
是否已经开始调用requestAnimationFrame

##  activeFrameTime
给一帧渲染用的时间，默认是 33，也就是 1 秒 30 帧

##  frameDeadline
记录当前帧的到期时间，他等于currentTime + activeFraeTime，也就是requestAnimationFrame回调传入的时间，加上一帧的时间。

##  isFlushingHostCallback
是否正在执行callback

##	在 FiberScheduler 中的全局变量
###		lastUniqueAsyncExpiration
在createBatch中有调用，但是没发现createBatch在哪里被调用，所以，目前没发现什么作用。

```js
function computeUniqueAsyncExpiration(): ExpirationTime {
  const currentTime = requestCurrentTime()
  let result = computeAsyncExpiration(currentTime)
  if (result <= lastUniqueAsyncExpiration) {
    result = lastUniqueAsyncExpiration + 1
  }
  lastUniqueAsyncExpiration = result
  return lastUniqueAsyncExpiration
}
```

###	expirationContext
保存创建expirationTime的上下文，在syncUpdates和deferredUpdates中分别被设置为Sync和AsyncExpirationTime，在有这个上下文的时候任何更新计算出来的过期时间都等于expirationContext。

比如调用ReactDOM.flushSync的时候，他接受的回调中的setState

###	isWorking
commitRoot和renderRoot开始都会设置为true，然后在他们各自阶段结束的时候都重置为false

用来标志是否当前有更新正在进行，不区分阶段

###	isCommitting
commitRoot开头设置为true，结束之后设置为false

用来标志是否处于commit阶段

###	nextUnitOfWork
用于记录render阶段Fiber树遍历过程中下一个需要执行的节点。

在resetStack中分别被重置

他只会指向workInProgress

###	nextRoot & nextRenderExpirationTime
用于记录下一个将要渲染的root节点和下一个要渲染的任务的

在renderRoot开始的时候赋值，需要符合如下条件才会重新赋值

```js
if (
  expirationTime !== nextRenderExpirationTime ||
  root !== nextRoot ||
  nextUnitOfWork === null
) {
  resetStack()
  nextRoot = root
  nextRenderExpirationTime = expirationTime
  nextUnitOfWork = createWorkInProgress(
    nextRoot.current,
    null,
    nextRenderExpirationTime,
  )
}
```

解释一下就是说，只有这一次调用renderRoot的时候，有

新的root要渲染
相同的root但是任务有不同优先级的任务要渲染
或者在老的任务上没有下一个节点需要渲染了
nextLatestAbsoluteTimeoutMs
用来记录Suspense组件何时重新尝试渲染，涉及复杂的公式，这里就不详细说了。

可以看renderRoot

###	nextRenderDidError
用于记录当前render流程是否有错误产生

resetStack重置为false

在throwException中如果发现了不能直接处理的错误（除了 Promise 之外），那么就调用renderDidError设置为true

###	nextEffect
用于commit阶段记录firstEffect -> lastEffect链遍历过程中的每一个Fiber

###	interruptedBy
给开发工具用的，用来展示被哪个节点打断了异步任务

##	 跟调度有关的全局变量
###	firstScheduledRoot & lastScheduledRoot
用于存放有任务的所有root的单列表结构

在findHighestPriorityRoot用来检索优先级最高的root
在addRootToSchedule中会修改
在findHighestPriorityRoot中会判断root的expirationTime，并不会直接删除root

###	callbackExpirationTime & callbackID
记录请求ReactScheduler的时候用的过期时间，如果在一次调度期间有新的调度请求进来了，而且优先级更高，那么需要取消上一次请求，如果更低则无需再次请求调度。

callbackID是ReactScheduler返回的用于取消调度的 ID

###	isRendering
performWorkOnRoot开始设置为true，结束的时候设置为false，表示进入渲染阶段，这是包含render和commit阶段的。

###	nextFlushedRoot & nextFlushedExpirationTime
用来标志下一个需要渲染的root和对应的expirtaionTime，注意：

通过findHighestPriorityRoot找到最高优先级的
通过flushRoot会直接设置指定的，不进行筛选
###	lowestPriorityPendingInteractiveExpirationTime
类似expirationContext，用来存储interactiveUpdates产生的最小的expirationTime，在下一次外部指定的interactiveUpdates情况下会强制输出上一次的interactiveUpdates，因为interactiveUpdates主要是用户输入之类的操作，如果不及时输出会给用户造成断层感
可以通过调用ReactDOM.unstable_interactiveUpdates来实现以上目的

###	deadline & deadlineDidExpire
deadline是ReactScheduler中返回的时间片调度信息对象
用于记录是否时间片调度是否过期，在shouldYield根据deadline是否过期来设置

###	hasUnhandledError & unhandledError
Profiler调试相关

###	isBatchingUpdates & isUnbatchingUpdates & isBatchingInteractiveUpdates
batchedUpdates、unBatchedUpdates，deferredUpdates、interactiveUpdates等这些方法用来存储更新产生的上下文的变量

###	originalStartTimeMs
固定值，js 加载完一开始计算的结果

###	currentRendererTime & currentSchedulerTime
计算从页面加载到现在为止的毫秒数，后者会在isRendering === true的时候用作固定值返回，不然每次requestCurrentTime都会重新计算新的时间。

###	nestedUpdateCount & lastCommittedRootDuringThisBatch
用来记录是否有嵌套得再生命周期方法中产生更新导致应用无限循环更新得计数器，用于提醒用户书写的不正确的代码。