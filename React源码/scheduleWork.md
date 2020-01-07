#	scheduleWork

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


































