# MVVM 和 VUE
1.	如何理解mvvm
2.	如何实现mvvm
3.	是否解读过vue源码
4.	说一下使用jquery和使用框架的区别
5.	说一下对mvvm的理解
6.	vue中如何实现响应式
7.	vue如何解析模板
8.	vue的整个实现流程

## 说一下使用jquery和使用框架的区别
###	jquery实现todo-list

```js
  <body>
      <input type="text" id="title">
      <button id="btn">submit</button>
      <ul id="list"></ul>
      <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
      <script>
        let $title = $('#title')
        let $btn = $('#btn')
        let $list = $('#list')
        $btn.click(function(){
          let title = $title.val()
          if(!title) return 
          let li = $('<li>'+title+'</li>')
          $list.append(li)
          $title.val('')
        })
      </script>
  </body>
```
###	vue实现todo-list

```js
    <div  id="app">
        <input type="text" v-model="title">
        <button @click="add">submit</button>
        <ul >
          <li v-for="item in list">{{item}}</li>
        </ul>
    </div>
   
    <script src="https://cdn.bootcss.com/vue/2.6.6/vue.js"></script>
    <script>
      let vm = new Vue({
        el: '#app',
        data: {
          title:'',
          list:[]
        },
        methods:{
          add: function() {
            this.list.push(this.title)
            this.title = ''
          }
        }
      })
    </script>
```
###	jquery和框架的区别
1.	数据和视图的分离
2. 以数据驱动视图

####	jquery
1.	数据和视图没有分离,通过jquery操作dom,数据和视图混合到了一块
2. jquery完全违背以数据驱动视图,例子:用append将新的增加到容器里,这是直接改视图

####	vue
1.	数据放在了data里,视图与数据分离
2. 修改了数据,视图自动改变,以数据驱动视图

####	问题解答
1.	数据和视图的分离,解耦(开放封闭原则)
2. 以数据驱动视图,只关心数据变化,DOM操作被封装

###	收一下对MVVM的理解
#### MVC
1.	model-view-Controller
2.	view层调用controller,从而使model发生变化,view渲染
3. 人直接调用controller,使model发生变化,view渲染 


#### MVVM
1.	Model- 模型,数据
2. View- 视图,模板(视图和模型是分离的)
3. ViewModel,连接Model和View
4. vm的作用: view通过vm对DOM的监听,改变model
5. model通过vm的数据绑定渲染view 


#### 关于ViewModel
1. MVVM不算是一种创新
2. 但其中的ViewModel确实是一种创新
3. 真正结合前端场景应用的创建 

#### 问题解答
1.	MVVM: -Model-View-ViewModel
2. 三者之间的联系,以及如何对应到各段代码
3. ViewModel的理解,联系View和Model

###	MVVM框架的三大要素
1.	响应式:vue如何监听到data的每一个属性的变化
2. 模板引擎: vue的模板如何被解析,指令如何处理
3. 渲染:vue的模板如何被渲染成html,以及渲染过程

####	vue中如何实现响应式
#####	什么是响应式
1.	修改data属性之后,vue立刻监听到
2. data属性被代理到vm上
3.	在控制台上对vm操作data, 一敲回车,页面上的数据也同时发生变化

#####	Object.defineProperty
1.	通过Object.defineProperty监听属性的get,set
2. 属性的读取和赋值都是通过函数来处理的,所以可以增加自定义的监听

```js
var obj = {}
      var _name = 'zhangsan'
      Object.defineProperty(obj,'name',{
        get:function(){
          console.log('get ',_name)
          return _name
        },
        set: function(newVal){
          console.log('set ', newVal)
          _name = newVal
        }
      })
```


##### 模拟(响应式模拟)
1.	vue是怎么把data的数据绑定到vm上
2. 修改data属性,vue是如何监听的

```js
      var data = {
        name: 'zhangsan',
        age: 22
      }
      var vm  = {}
      var key
      for(key in data) {
        (function(key){
          Object.defineProperty(vm,key,{
            get:function(){
              console.log('get ',data[key]) //获取监听
              return data[key]
            },
            set:function(newVal) {
              console.log('set ',newVal)  //修改监听
              data[key] = newVal
            }
          })
        })(key)
      }
```

####	问题解答
1.	关键是理解Object.defineProperty
2.	将data的属性代理到vm上

####	vue中如何解析模板
1.	模板是什么
2. render函数
3. render函数与vdom

#####	模板是什么
1.	本质:字符串
2. 有逻辑,如v-if,v-for等
3. 与html格式很像,但有很大区别
4. 最终还要转换伪html来显示
5.	模板最终必须转换成JS代码
	1.	有逻辑(v-if,v-for),必须用js才能实现(图灵完备)
	2. 转换伪html渲染页面,必须用js才能实现
	3. 因此,模板最终要转换成一个JS函数(render函数)

####render函数
1.	模板中所有信息都包含在了render函数中
2. this === vm
3. price===this.price ===vm.price,既data中的price
4. _c既this._c既vm._c

```js
<div id="app">
  <p>{{price}}</p>
</div>
<script>
  var vm = new Vue({
    el:'#app',
    data: {
      price: 100
    }
  })
  function render(){
    with(this){
      return _c(
        'div',
        {
          attrs:{
            id: 'app'
          }
        },
        [
          _c('p',[_v(_s(price))])
        ]
      )
    }
  }
</script>
```

####	问题解答
1.	模板: 字符串,有逻辑,嵌入js变量
2. 模板必须转换伪js代码(有逻辑,渲染HTML,js变量)
3. render函数是什么样子
4. render函数执行返回vnode
5. updateComponent

## vue的整个实现流程
1.	第一步: 解析模板生成render函数
2. 第二步: 响应式开始监听
3. 第三步: 首次渲染,显示页面,且绑定依赖
4. 第四步: data属性变化,触发rerender

###	第一步
1.	把模板,相当于html那一部分生成render函数,返回vnode,render函数就是生成节点的过程
2. vue用了with
3. 模板中的所有信息都被render函数包含
4. 模板中用到的data中的属性,都变成了js变量
5. 模板中的v-model, v-for,v-on都变成了js逻辑
6. render函数返回vnode

###	第二步
1.	通过Object.defineProperty
2. 将data的属性代理到vm上

###	第三步
1.	从render函数获取vnode
2. 进行渲染,如果之前没有旧的节点,那么用patch函数进行挂载
3. 如果有旧的节点,那么用patch函数对两个vnode进行对比,在渲染

####	初次渲染
1.	初次渲染,执行updateComponent,执行 vm.render()
2. 执行render函数,会访问到vm.list和vm.title
3. 会被响应式的get方法监听到
4. 执行updateComponent,会走到vdom的patch方法
5. patch将vnode渲染成dom,初次渲染完成

####	为什么要监听get,不直接监听set
1.	data中有很多属性,有些被用到,有些可能不被用到
2. 被用到的会走到get,不被用到的不会走到get
3. 未走到get中的属性,set的时候我们也无需关心
4. 避免不必要的重新渲染

### 第四步
1.	修改属性被响应式的set监听到
2. set中执行updateComponent
3. updateComponent重新执行vm.render()
4. 生成的vnode和preVnode用过patch对比
5. 渲染到html上



























