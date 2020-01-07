#	Children
##	map & forEach(区别就是没有return result)
看一下map到底做了些什么? (map对应的是mapChildren方法)

+	第一步在mapChildren 中定义了一个 result 数组, 并且最后将他返回, 中间做了哪些操作呢
	-	会在一个池子里拿到一个上下文对象 (步骤一)
		+	这个池子的作用就是防止内存抖动
		+	如果池子里有对象那么就pop出来一个, 并将参数写入到这个对象中并返回
		+ 	如果池子里没有对象, 那么就返回一个新对象, 并将参数写入到这个对象中
	-	判断children的类型(步骤二)
		-	如果类型是undefined 或者 boolean 那么就执行回调函数
		- 	如果是string 或者 number 执行回调函数
		-  如果是对象,需要判断他的$$typeof 是否是REACT_ELEMENT_TYPE,REACT_PORTAL_TYPE,是的话执行回调
		-  执行 步骤三 直接返回
		-  如果都不是以上类型的
			+	如果children是个数组或者是个可迭代的对象, 那么就递归执行 步骤二
	-	执行回调函数 (步骤三)
		+	这里其实就是执行React.Children.map() 里的回调函数
		+ 	如果执行了回调函数, 返回的还是一个数组, 那么就会继续执行 步骤一
		+  如果他只是一个ReactElement的话, 那么就直接push到result中, 并替换key

```js
// 开始
function mapChildren(children, func, context) {
  // 没有children 直接返回了
  if (children == null) {
    return children;
  }
  const result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
// 步骤一
function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  // 处理字符串
  let escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  // 在连接池中获取一个连接, 将对应的值设置进去
  const traverseContext = getPooledTraverseContext(
    array,
    escapedPrefix,
    func,
    context,
  );
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  // 重置放回到连接池中
  releaseTraverseContext(traverseContext);
}

// 步骤二的第一步
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }
  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

// 步骤二
function traverseAllChildrenImpl(
  children,
  nameSoFar, // ''
  callback,
  traverseContext, // 在连接池中拿出来的
) {
  const type = typeof children;
  // 根据type的类型进行判断
  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  let invokeCallback = false;

  if (children === null) {
    // children为null, 直接调用回调函数
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        // children 是文字或者数字,可以执行回调函数
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          // children 是对象并且被标记(REACT_ELEMENT_TYPE,REACT_PORTAL_TYPE ),可以执行回调函数
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }
  // 文字, 数字, 对象(REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE) 可执行回调函数
  if (invokeCallback) {
    // callback => mapSingleChildIntoContext
    callback(
      traverseContext,
      children,
      // 如果它是惟一的子元素，则将名称视为包装在数组中 所以如果孩子的数量增加，这是一致的。
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
    );
    return 1;
  }

  let child;
  let nextName;
  let subtreeCount = 0; // Count of children found in the current subtree.
  const nextNamePrefix =
    nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    // 如果children是数组 就遍历数组的每一项重新调用traverseAllChildrenImpl(当前函数, 递归)
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(
        child,
        nextName,
        callback,
        traverseContext,
      );
    }
  } else {
    // 同上, 可迭代的继续递归
    const iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      const iterator = iteratorFn.call(children);
      let step;
      let ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(
          child,
          nextName,
          callback,
          traverseContext,
        );
      }
    } else if (type === 'object') {
      // 如果是对象做为React的子对象无效
      let addendum = '';
      const childrenString = '' + children;
      invariant(
        false,
        'Objects are not valid as a React child (found: %s).%s',
        childrenString === '[object Object]'
          ? 'object with keys {' + Object.keys(children).join(', ') + '}'
          : childrenString,
        addendum,
      );
    }
  }

  return subtreeCount;
}

// 步骤三
function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  const {result, keyPrefix, func, context} = bookKeeping;

  let mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, c => c);
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(
        mappedChild,
        // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        keyPrefix +
          (mappedChild.key && (!child || child.key !== mappedChild.key)
            ? escapeUserProvidedKey(mappedChild.key) + '/'
            : '') +
          childKey,
      );
    }
    result.push(mappedChild);
  }
}


// 其余用到的函数
const POOL_SIZE = 10;
// 连接池的概念, 防止内存抖动
const traverseContextPool = [];
// 这块防止内存抖动问题
function getPooledTraverseContext(
  mapResult,
  keyPrefix,
  mapFunction,
  mapContext,
) {
  // traverseContextPool内有值,直接pop一个, 将参数赋值到这个对象中, 并返回
  if (traverseContextPool.length) {
    const traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    // 如果traverseContextPool 为空, 直接返回一个对象
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0,
    };
  }
}

// 将traverseContext 都置空,
// 然后判断traverseContextPool长度是否小于规定的长度, 是的话push进这个重置的对象
function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}
```