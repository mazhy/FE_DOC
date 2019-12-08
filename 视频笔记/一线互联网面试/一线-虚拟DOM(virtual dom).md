
#	虚拟DOM(virtual dom)

1.	vdom是vue和React的核心
2. vdom比较独立,使用也比较简单
3. 面试问到vue和React的实现,免不了问vdom

## 问题
1.	vdom是什么? 为何会存在vdom
2. vdom如何应用,核心API是什么
3. 介绍一下diff算法

###	什么是vdom,为何使用vdom
####	什么是vdom
1.	virtual dom,虚拟dom
2. 用js模拟D OM结构
3. DOM变化的对比,放在js层来做(图灵完备语言:能实现各种逻辑的语言)
4. 提高重绘性能
5. DOM操作非常昂贵

####	设计一个需求场景
1.	初始化一个表格,并初始化数据
2. js更改某些数据


####	用jQuery实现

```js
<body>
    <div id="container"></div>
    <button id="btn-change">change</button>
    <script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.0/jquery.js"></script>
    <script type="text/javascript">
        var data = [
            {
                name: '张三',
                age: '20',
                address: '北京'
            },
            {
                name: '李四',
                age: '21',
                address: '上海'
            },
            {
                name: '王五',
                age: '22',
                address: '广州'
            }
        ]
        // 渲染函数
        function render(data) {
            var $container = $('#container')
            // 清空容器，重要！！！
            $container.html('')
            // 拼接 table
            var $table = $('<table>')
            $table.append($('<tr><td>name</td><td>age</td><td>address</td>/tr>'))
            data.forEach(function (item) {
                $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td>/tr>'))
            })
            // 渲染到页面
            $container.append($table)
        }
        $('#btn-change').click(function () {
            data[1].age = 30
            data[2].address = '深圳'
            // re-render  再次渲染
            render(data)
        })
        // 页面加载完立刻执行（初次渲染）
        render(data)
    </script>
</body>
```

####	遇到的问题
1.	DOM操作是 "昂贵" 的,js运行效率高
2. 尽量减少DOM操作,而不是	"推倒重来"
3. 项目越复杂,影响就越严重
4. vdom即可解决这个问题


###	vdom的如何应用,核心API是什么
####	介绍snabbdom(实现vdom)
```js
  <body>
    <div id="container"></div>
    <button id="btn-change">change</button>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
    <script>
      var container = document.getElementById('container')
      var snabbdom = window.snabbdom
      //定义patch
      var patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
      ])
      //定义h
      var h = snabbdom.h
      //生成vnode
      var vnode = h('ul#list',{},[
        h('li.item',{},'Item 1'),
        h('li.item',{},'Item 2')
      ])
      patch(container, vnode)
      document.getElementById('btn-change')
      .addEventListener('click',function(){
        //生成newVnode
        var newVnode = h('ul#list',{},[
          h('li.item',{},'Item 1'),
          h('li.item',{},'Item A'),
          h('li.item',{},'Item B')
        ])
        patch(vnode,newVnode)
      })
    </script>
  </body>
```

1.	最核心的两个函数h和patch
2. h函数用于生成vdom节点,patch用于渲染dom和对比新旧vnode节点,并渲染dom

####	重写jQuery实现的例子
```js
<body>
    <div id="container"></div>
    <button id="btn-change">change</button>

    <script src="https://cdn.bootcss.com/snabbdom/0.7.0/snabbdom.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.0/snabbdom-class.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.0/snabbdom-props.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.0/snabbdom-style.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.0/snabbdom-eventlisteners.js"></script>
    <script src="https://cdn.bootcss.com/snabbdom/0.7.0/h.js"></script>
    <script type="text/javascript">
        var snabbdom = window.snabbdom
        // 定义关键函数 patch
        var patch = snabbdom.init([
            snabbdom_class,
            snabbdom_props,
            snabbdom_style,
            snabbdom_eventlisteners
        ])

        // 定义关键函数 h
        var h = snabbdom.h

        // 原始数据
        var data = [
            {
                name: '张三',
                age: '20',
                address: '北京'
            },
            {
                name: '李四',
                age: '21',
                address: '上海'
            },
            {
                name: '王五',
                age: '22',
                address: '广州'
            }
        ]
        // 把表头也放在 data 中
        data.unshift({
            name: '姓名',
            age: '年龄',
            address: '地址'
        })

        var container = document.getElementById('container')

        // 渲染函数
        var vnode
        function render(data) {
            var newVnode = h('table', {}, data.map(function (item) {
                var tds = []
                var i
                for (i in item) {
                    if (item.hasOwnProperty(i)) {
                        tds.push(h('td', {}, item[i] + ''))
                    }
                }
                return h('tr', {}, tds)
            }))

            if (vnode) {
                // re-render
                patch(vnode, newVnode)
            } else {
                // 初次渲染
                patch(container, newVnode)
            }

            // 存储当前的 vnode 结果
            vnode = newVnode
        }

        // 初次渲染
        render(data)

        var btnChange = document.getElementById('btn-change')
        btnChange.addEventListener('click', function () {
            data[1].age = 30
            data[2].address = '深圳'
            // re-render
            render(data)
        })

    </script>
</body>
```

#### 核心API
1.	h('标签名', {属性}, [...子元素数组...])
2. h('标签名', {属性}, '...字符串')
3. patch(container,vnode)
4. patch(vnode, newVnode)

###	问题解答
1.	如何使用,可用snabbdom的用法来举例
2. 核心API, h函数, patch函数

###	diff算法
1.	什么是diff算法
2. 去繁就简
3. vdom为什么用diff算法
4. diff算法的实现流程

#### 什么是diff算法

#### 去繁就简
1.	diff算法非常复杂,实现难度很大,源码量很大
2. 去繁就简,讲明白核心流程,不关心细节
3. 面试官也大部分都不清楚细节,但是很关心核心流程
4. 去繁就简之后,依然具有很大挑战性,并不简单

#### vdom为何使用diff算法
1.	DOM操作是"昂贵"的,因此尽量减少DOM操作
2. 找出本次DOM必须更新的节点来更新,其他的不更新
3. 这个 "找出" 的过程,就需要diff算法

####	diff实现过程
1.	patch(container,vnode)
2. patch(vnode, newVnode)

#### 问题解答
1.	知道什么是diff算法,是linux的基础命令
2. vdom中应用diff算法是为了找出需要更新的节点
3. diff算法的实现,patch方法
4. 核心逻辑就是createElement,和updateChildren

##	总结
1.	vdom是什么? 为何会存在vdom?
	1.	virtual dom 虚拟dom
	2. 用js模拟DOM结构
	3. DOM操作非常昂贵
	4. 将DOM对比操作放在js层,提高效率
2. vdom如何应用,核心API是什么
	1.	用snabbdom的用法举例
	2. 核心api,h函数,patch函数
3. 介绍一下diff算法
	1.	知道什么是diff算法,是linux的基础命令
	2. vdom中应用diff算法是为了找出需要更新的节点
	3. diff算法的实现,patch方法
	4. 核心逻辑就是createElement,和updateChildren
