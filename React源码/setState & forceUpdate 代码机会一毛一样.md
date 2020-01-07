# setState & forceUpdate 代码机会一毛一样
setState() 绑定在Compoment 的原型上

+	直接调用实例更新器的enqueueSetState 方法
	-	跟updateContainer 差不多, 计算过期时间, 并且根据过期时间创建一个Update
	- 	然后将update 加入到更新队列中
+	进行任务调度 scheduleWork



```js
// 入口
Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

// 步骤一
enqueueSetState(inst, payload, callback) {
	// inst 就是使用 this.setState 中的this
	// 整体流程跟updateContainer 差不多
	const fiber = ReactInstanceMap.get(inst);
	const currentTime = requestCurrentTime();
	const expirationTime = computeExpirationForFiber(currentTime, fiber);
	
	const update = createUpdate(expirationTime);
	update.payload = payload;
	if (callback !== undefined && callback !== null) {
	  update.callback = callback;
	}
	
	enqueueUpdate(fiber, update);
	scheduleWork(fiber, expirationTime);
}

// 步骤二
export function enqueueUpdate<State>(fiber: Fiber, update: Update<State>) {
  // 更新队列是延迟创建的
  // alternate(备用) 如果是刚初始化的fiber, alternate 是null, 所以第一次进来的时候alternate = null
  // current到alternate即workInProgress有一个映射关系
  // 所以要保证current和workInProgress的updateQueue是一致的
  const alternate = fiber.alternate;
  let queue1; // current队列
  let queue2; // alternate队列
  if (alternate === null) {
    // 初始化queue1 但是第一次fiber.updateQueue依然是null.
    queue1 = fiber.updateQueue;
    queue2 = null;
    if (queue1 === null) {
      // 初始化 queue1 和 fiber.updateQueue
      // createUpdateQueue() 是初始化一个queue对象(初始化更新队列)
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  } else {
    // 如果alternate不为空，则取各自的更新队列
    queue1 = fiber.updateQueue;
    queue2 = alternate.updateQueue;
    if (queue1 === null) {
      if (queue2 === null) {
        // 如果两个更新队列都是空的, 那么就分别初始化各自的更新队列.
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        queue2 = alternate.updateQueue = createUpdateQueue(
          alternate.memoizedState,
        );
      } else {
        // 如果queue2不为空, 就克隆一个队列给queue1.
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
      }
    } else {
      if (queue2 === null) {
        // 如果queue1不为空, 就克隆一个队列给queue2.
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
      } else {
        // Both owners have an update queue.
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // 如果queue2 是空, 或者两个队列其实是一个队列, 那么只更新queue1就可以了.
    appendUpdateToQueue(queue1, update);
  } else {
    // 不想多次将同一个update放入到队列中, 但是如果两个队列有空的,那么将update分别加到两个队列中
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update);
      appendUpdateToQueue(queue2, update);
    } else {
      // 两个队列都是非空的。两个列表的最新更新是相同的，
      // 因为结构共享。所以，只追加到一个列表。
      appendUpdateToQueue(queue1, update);
      // 在queue2中，将lastUpdate指向update
      queue2.lastUpdate = update;
    }
  }
}
```