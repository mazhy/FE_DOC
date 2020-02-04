#	scheduleWork
###		scheduleWorkToRoot 做了什么
+	找到当前Fiber的 root
+	给更新节点的父节点链上的每个节点的expirationTime设置为这个update的expirationTime，除非他本身时间要小于expirationTime, 比他小说明优先级更高
+	给更新节点的父节点链上的每个节点的childExpirationTime设置为这个update的expirationTime，除非他本身时间要小于expirationTime
	-	当一个节点需要更新, 那么会遍历他向上找到所有的parentFiber, 并且更新他的childExpirationTime, 
	- 	说明当前更新来自于他的子孙节点
+	最终返回 root 节点的Fiber对象

###	继续 一个判断
+	isWorking代表是否正在工作，在开始renderRoot和commitRoot的时候会设置为 true，也就是在render和commit两个阶段都会为true
+	nextRenderExpirationTime在是新的renderRoot的时候会被设置为当前任务的expirationTime，而且一旦他被设置，只有当下次任务是NoWork的时候他才会被再次设置为NoWork，当然最开始也是NoWork
+ 	目前没有任何任务在执行，并且之前有执行过任务，同时当前的任务比之前执行的任务过期时间要早（也就是优先级要高）
	-	上一个任务是异步任务（优先级很低，超时时间是 502ms），并且在上一个时间片（初始是 33ms）任务没有执行完，而且等待下一次requestIdleCallback的时候新的任务进来了，并且超时时间很短（52ms 或者 22ms 甚至是 Sync），那么优先级就变成了先执行当前任务，也就意味着上一个任务被打断了（interrupted）
+	被打断的任务会从当前节点开始往上推出context，因为在 React 只有一个stack，而下一个任务会从头开始的，所以在开始之前需要清空之前任务的的stack。
	-	重置全局变量

###	markPendingPriorityLevel
+	这个方法会记录当前的expirationTime到pendingTime，让expirationTime处于earliestPendingTime和latestPendingTime之间
+	并且会设置root.nextExpirationTimeToWorkOn和root.expirationTime = expirationTime分别是：
+	最早的pendingTime或者pingedTime，如果都没有则是lastestSuspendTime
+	suspendedTime和nextExpirationTimeToWorkOn中较早的一个

###	调用requestWork
+	这个判断条件就比较简单了，!isWorking || isCommitting简单来说就是要么处于没有 work 的状态，要么只能在 render 阶段，不能处于 commit 阶段（比较好奇什么时候会在 commit 阶段有新的任务进来，commit 都是同步的无法打断）。还有一个选项nextRoot !== root，这个的意思就是你的 APP 如果有两个不同的 root，这时候也符合条件。
+	在符合条件之后就requestWork了



###	源码
```js
function scheduleWork(fiber: Fiber, expirationTime: ExpirationTime) {
  // 获取当前fiber的FiberRoot
  // 找root的过程中更新了所有的过期时间(找到当前fiber的root)
  const root = scheduleWorkToRoot(fiber, expirationTime);
  if (root === null) {
    return;
  }
  // 新的优先级高的任务打断老的优先级低的任务
  // isWorking 用来标志是否当前有更新正在进行，不区分阶段
  // 目前没有任何任务在执行，并且之前有执行过任务，同时当前的任务比之前执行的任务过期时间要早（也就是优先级要高）
  if (
    // 任务已经中断
    // isWorking代表是否正在工作，在开始renderRoot和commitRoot的时候会设置为 true，
    // 也就是在render和commit两个阶段都会为true
    !isWorking &&
    // 下一个将要渲染的root节点和下一个要渲染的任务的
    nextRenderExpirationTime !== NoWork &&
    expirationTime < nextRenderExpirationTime
  ) {
    // This is an interruption. (Used for performance tracking.)
    interruptedBy = fiber;
    // 现在没有在工作, 并且之前有过任务, 但是任务的优先级比现在的update优先级低
    // 任务被终端, 并且重置堆栈
    resetStack();
  }
  markPendingPriorityLevel(root, expirationTime);
  if (
    // 没有正在工作的, 或者没有正在提交的
    !isWorking ||
    isCommitting ||
    // 一般情况下他俩是相等的
    nextRoot !== root
  ) {
    const rootExpirationTime = root.expirationTime;
    requestWork(root, rootExpirationTime);
  }
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    // Reset this back to zero so subsequent updates don't throw.
    nestedUpdateCount = 0;
    invariant(
      false,
      'Maximum update depth exceeded. This can happen when a ' +
        'component repeatedly calls setState inside ' +
        'componentWillUpdate or componentDidUpdate. React limits ' +
        'the number of nested updates to prevent infinite loops.',
    );
  }
}
```

##	requestWork
+	addRootToSchedule把 root 加入到调度队列，但是要注意一点，不会存在两个相同的 root 前后出现在队列中
+	可以看出来，如果第一次调用addRootToSchedule的时候，nextScheduledRoot是null，这时候公共变量firstScheduledRoot和lastScheduledRoot也是null，所以会把他们都赋值成root，同时root.nextScheduledRoot = root。然后第二次进来的时候，如果前后root是同一个，那么之前的firstScheduledRoot和lastScheduledRoot都是 root，所以lastScheduledRoot.nextScheduledRoot = root就等于root.nextScheduledRoot = root
+	这么做是因为同一个root不需要存在两个，因为前一次调度如果中途被打断，下一次调度进入还是从同一个root开始，就会把新的任务一起执行了。
+	之后根据expirationTime调用performSyncWork还是scheduleCallbackWithExpirationTime
+	scheduleCallbackWithExpirationTime是根据时间片来执行任务的，会涉及到requestIdleCallback
+	isBatchingUpdates和isUnbatchingUpdates涉及到事件系统
+	他们最终都要调用performWork



###	源码
```js
function requestWork(root: FiberRoot, expirationTime: ExpirationTime) {
  addRootToSchedule(root, expirationTime);
  // 正在渲染
  if (isRendering) {
    return;
  }

  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should
      // flush it now.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, true);
    }
    return;
  }
  // 同步执行还是异步执行
  if (expirationTime === Sync) {
    performSyncWork();
  } else {
    scheduleCallbackWithExpirationTime(root, expirationTime);
  }
}

function addRootToSchedule(root: FiberRoot, expirationTime: ExpirationTime) {
  if (root.nextScheduledRoot === null) {
    root.expirationTime = expirationTime;
    // 将root 插入到调度队列里
    if (lastScheduledRoot === null) {
      firstScheduledRoot = lastScheduledRoot = root;
      root.nextScheduledRoot = root;
    } else {
      lastScheduledRoot.nextScheduledRoot = root;
      lastScheduledRoot = root;
      lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
    }
  } else {
    // 这个root已经被调度，但是它的优先级可能增加了。
    const remainingExpirationTime = root.expirationTime;
    if (
      remainingExpirationTime === NoWork ||
      expirationTime < remainingExpirationTime
    ) {
      // Update the priority.
      root.expirationTime = expirationTime;
    }
  }
}
```































