#	ReactDOM.render()
在 render 方法中 接收三个参数, 这三个参数, 就是在程序入口处传入的.

+	在容器上是否有_reactRootContainer 属性, 第一次肯定没有
	-	创建一个ReactRooter ( 步骤一 )
		+	是否需要合并, 服务器端渲染需要合并操作, 即不需要合并
		+ 	将容器内部的子节点都清除掉
		+  root节点不是异步的, 开始创建ReactRoot(步骤二) 
		+  最后创建一个FiberRoot 并返回
+	如果有回调函数, 那么就执行回调函数
+	第一次渲染, 不需要批量更新(初次渲染, 需要尽快执行)
+ 	并且没有父节点
+  直接执行步骤一返回的root 的 render方法 (步骤三), 进行更新流程.

```js
// 入口
const ReactDOM: Object = {
	// ReactDOM.render() 接收三个参数, element节点, container容器, callback渲染完的回调
  render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) {
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false, //render不会复用节点，因为是前端渲染
      callback,
    );
  }
}

// 参数 null, element, container, false, callback,
// 这个方法是初始化container
function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: DOMContainer,
  forceHydrate: boolean,
  callback: ?Function,
) {
  // 容器上是否有_reactRootContainer 属性, 第一次渲染的时候div上肯定没有这个, 所以root为undefined
  let root = container._reactRootContainer ;
  if (!root) {
    // 创建一个ReactRooter
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = DOMRenderer.getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    // 第一次没有必要进行批量更新
    DOMRenderer.unbatchedUpdates(() => {
      // parentComponent == null
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(
          parentComponent,
          children,
          callback,
        );
      } else {
        // 相当于DOMRenderer.updateContainer(children, root, null, work._onCommit);
        root.render(children, callback);
      }
    });
  } else {
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function() {
        const instance = DOMRenderer.getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    // Update
    if (parentComponent != null) {
      root.legacy_renderSubtreeIntoContainer(
        parentComponent,
        children,
        callback,
      );
    } else {
      root.render(children, callback);
    }
  }
  return DOMRenderer.getPublicRootInstance(root._internalRoot);
}

// 步骤一
// 参数: container, false
function legacyCreateRootFromDOMContainer( container: DOMContainer, forceHydrate: boolean ){
  // 这个是跟服务器渲染相关的, 可以略过
  //render的forceHydrate是false，所以会调用shouldHydrateDueToLegacyHeuristic方法来判断是否是服务端渲染
  const shouldHydrate =
    forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  // First clear any existing content.
  // 不需要合并的情况下, 清除掉容器内所有的内容, 只有服务器端渲染才会合并
  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }

  // root节点不能是异步的
  const isConcurrent = false;
  // new ReactRoot() 创建了一个FiberRoot 绑定到实例的_internalRoot属性上
  return new ReactRoot(container, isConcurrent, shouldHydrate);
}
// 步骤二
function ReactRoot(
  container: Container,
  isConcurrent: boolean,
  hydrate: boolean,
) {
  const root = DOMRenderer.createContainer(container, isConcurrent, hydrate);
  this._internalRoot = root;
}

function createContainer(
  containerInfo: Container,
  isConcurrent: boolean,
  hydrate: boolean,
): OpaqueRoot {
  return createFiberRoot(containerInfo, isConcurrent, hydrate);
}

function createFiberRoot(
  containerInfo: any,
  isConcurrent: boolean,
  hydrate: boolean,
): FiberRoot {

  const uninitializedFiber = createHostRootFiber(isConcurrent);

  let root;
  if (enableSchedulerTracing) {
    root = ({
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,

      interactionThreadID: unstable_getThreadID(),
      memoizedInteractions: new Set(),
      pendingInteractionMap: new Map(),
    }: FiberRoot);
  } else {
    root = ({
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,
    }: BaseFiberRootProperties);
  }

  uninitializedFiber.stateNode = root;

  return ((root: any): FiberRoot);
}

// 步骤三
ReactRoot.prototype.render = function(
  children: ReactNodeList,
  callback: ?() => mixed,
): Work {
  const root = this._internalRoot;
  const work = new ReactWork();
  callback = callback === undefined ? null : callback;

  if (callback !== null) {
    work.then(callback);
  }
  DOMRenderer.updateContainer(children, root, null, work._onCommit);
  return work;
};
```
