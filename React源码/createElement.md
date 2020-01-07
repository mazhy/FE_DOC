#	createElement
众所周知, JSX语法的本身其实就是React.createElement(), 那么这个方法做了哪些操作呢?

+	第一步: 提取props 属性, 当你在这个组件上挂载了自定义的属性, 就会在这里解析出来
	-	把除了key, ref, __ self, __ source外, 其他的属性加入到props对象中
+	第二步: 处理children, 组件可以传入一个或者多个子组件
	-	当只有一个子组件的时候, props.children 就等于这个子组件
	- 	如果有多个子组件的时候, props.children 等于这些子组件的集合(转换为数组)
+	第三步: 处理默认属性```MyComponent.defaultProps={ name:'default name' }```
	-	当设置默认属性的时候, 如果这些值不为undefined, 那么都加入到props中
+	最后一步: 返回ReactElement 的包装对象
	-	将props , key, type, ref, _owner, $$typeof 包装成对象返回即ReactElement对象
	- 	$$typeof : 标识成,这个组件是一个(react.element) React组件(用于确定是否属于ReactElement)

###	源码
```js
function createElement(type, config, children) {
  // type: "div", config: {name:'xx', age: 22}, children: 标签内容,或者子组件
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 提取props
  if (config != null) {
    // 判断ref 和key 是否合法(不是undefined), 保存到变量中
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        // 过滤属性(key,ref,__self,__source) 将这四个属性过滤出去,其他的保存进props对象中
        props[propName] = config[propName];
      }
    }
  }

  // 提取子组件(子节点), arguments参数为 tag, props, child1, child2....
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    //  如果只有一个子节点, 直接保存进props.children
    props.children = children;
  } else if (childrenLength > 1) {
    // 如果有多个子节点, 都放到一个数组中,保存进props.children
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // 设置默认属性
  // 自定义组件可以设置defaultProps, 如果设置了将props中对应的属性进行初始化
  // class MyComponent extends React.Component { }
  // MyComponent.defaultProps={ name:'default name' };
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 最后将整理的属性传递给ReactElement,并返回结果(包装了一下)
  return ReactElement( type, key, ref, self, source, ReactCurrentOwner.current, props, );
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // 标识成,这个组件是一个(react.element) React组件
    $$typeof: REACT_ELEMENT_TYPE,
    // 设置内置属性
    type: type,
    key: key,
    ref: ref,
    props: props,
    // 谁创建的这个组件
    _owner: owner,
  };
  return element;
};

```