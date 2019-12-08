# ES6
## let & const
1.	在es5 只有两个作用域
	1.	全局作用域
	2. 函数作用域
2.	在es6,新增了一个作用域
	1.	块作用域

###	let
1.	有{}包围的就是一个块级作用域,当使用let定义变量,只会在{}有效
2. 同一个变量不能多次定义

###	const
1.	同时具有块作用域
2.	用const声明一个常量(不能修改)
3. 声明时必须赋值
4. 数值不能修改,引用类型对象本身可以变

## 解构赋值
###	什么是解构赋值

###	解构赋值的分类
####1.	数组解构赋值
1.	let [a,b] = [1,2]
2. let [a,b,...rest] = [1,2,3,4,5]
3. let [a,b,c=1]=[1,2] => c没有默认赋值的话是undefined
4. let [a,b] = [b,a] => 变量交换
5. let [a,,,b] = [1,2,3,4,5] => 选择想要的值
6. let [a, ...b] = [1,2,3,4,5] => 其他的赋值数组

####2. 对象解构赋值
1.	let {a,b} = {a:1,b:2}
2. let {title:esTitle,test:[{title:cnTitle}]} = data  => 解构重命名

##	字符串扩展
1.	str.include('c') => 是否包含
2. str.startWith('s') => 是否s开头
3. str.endWith('s') => 是否s结尾
4. str.repat(2) => 复制两倍 (abcabc)
5. 模板字符串: `${title}`
6. '1'.padStart(2,'0'),长度不够前面补0
7. '1'.padEnd(2,'0'),长度不够后面补0

## 数值扩展
1.	Number.isNaN => 是否有效
2. Number.isFinite => 用来检查一个数值是否为有限
3. Number.isInteger => 是否是个整数(不能是字符串)
4. Number.isSafeInteger => 是否是个安全的数
5. Math.trunc() => 取小数的整数部分
6. Math.sign() => 判断是否正数负数或者0('50' 转换成50 在判断)

## 数组扩展
###1.	Array.from	
1.	伪数组转换成真数组
2. map功能Array.from([1,2,3],function(item){ return item * 2}) => [2,4,6]
###2. Array.of(3,4,5,6)
1.	生成一个数组,没有参数就是空数组,
###3. copyWithin
1.	[1,2,3,4,5,6].copyWithin(0, 3, 4) => 
2. 把第0位置开始的数字换成从第三位到第四位之间的数字
###4. find/findIndex
1.	[1,2,3,4,5].find(function(item){return item > 3}) => 返回item大于3的第一个数字
2. [1,2,3,4,5].findIndex(function(item){return item > 3}) => 返回item大于3的第一个数字的索引
###5. fill
1.	[1,'a',undefined].fill(7) => 每个都赋值成7
2. ['a','b','c'].fill(7,1,3) => 从下标第1个开始长度为3,赋值为7
###6. entries/keys/values
1.	[1,2,3].keys() => 0 1 2
2. [1,2,3].values() => 1 2 3
3. [1,2,3].entries() => 0 1, 1 2 ,2 3
###7. inludes
1.	[1,2,3].includes(1) => 数组中是否包含这个值

## 函数扩展
###	参数默认值
```js
{
  function test(x, y = 'world'){
    console.log('默认值',x,y);
  }
  test('hello');
  test('hello','kill');
}
```

###	rest参数
```js
{
  function test3(...arg){
    for(let v of arg){
      console.log('rest',v);
    }
  }
  test3(1,2,3,4,'a');//=>转成数组arg
}

{
  console.log(...[1,2,4]);	// => 解开打印
  console.log('a',...[1,2,4]);
}
```

###	剪头函数
```js
{
  let arrow = v => v*2;
  let arrow2 = () => 5;
  console.log('arrow',arrow(3));
  console.log(arrow2());
}
```

###	尾调用
```js
{
  function tail(x){
    console.log('tail',x);
  }
  function fx(x){
    return tail(x)
  }
  fx(123)
}
```

## 对象扩展
###	简洁表示法
```js
{
  // 简洁表示法
  let o=1;
  let k=2;
  let es5={
    o:o,
    k:k
  };
  //	简洁表示
  let es6={
    o,
    k
  };
  console.log(es5,es6);

  let es5_method={
    hello:function(){
      console.log('hello');
    }
  };
  //简洁表示
  let es6_method={
    hello(){
      console.log('hello');
    }
  };
  console.log(es5_method.hello(),es6_method.hello());
}
```

###	属性表达式
```js
{
  // 属性表达式
  let a='b';
  let es5_obj={
    a:'c',
    b:'c'
  };
	
  let es6_obj={
    [a]:'c'
  }
  console.log(es5_obj,es6_obj);
}
```

### 扩展运算符
```js
{
  // 扩展运算符
  let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
  c={
    c:'ddd',
    d:'ccc'
  }
}
```

### Object新增方法
```js
{
  // 新增API
  console.log('字符串',Object.is('abc','abc'),'abc'==='abc');
  console.log('数组',Object.is([],[]),[]===[]);

  console.log('拷贝',Object.assign({a:'a'},{b:'b'})); // 浅复制

  let test={k:123,o:456};
  for(let [key,value] of Object.entries(test)){
    console.log([key,value]);
  }
}
```


##	Symbol
###	Symbol声明
1.	Symbol声明的变量独一无二(for in 取不到Symbol的值)

```js
{
  // 声明
  let a1=Symbol();
  let a2=Symbol();
  console.log(a1===a2); //false
  let a3=Symbol.for('a3');//先检查全局是否注册过key为a3的值,有的话就返回,没有就定义
  let a4=Symbol.for('a3');
  console.log(a3===a4); //true
}

{
  let a1=Symbol.for('abc');
  let obj={
    [a1]:'123',
    'abc':345,
    'c':456
  };
  console.log('obj',obj);

  for(let [key,value] of Object.entries(obj)){
    console.log('let of',key,value);
  }
  // 用这个api只取Symbol值
  Object.getOwnPropertySymbols(obj).forEach(function(item){
    console.log(obj[item]);
  })
  //所有的key,value取出来
  Reflect.ownKeys(obj).forEach(function(item){
    console.log('ownkeys',item,obj[item]);
  })
}
```

##	数据结构
###	Set
```js
{
  let list = new Set();
  list.add(5);
  list.add(7);
  console.log('size',list.size);
}

{
  let arr = [1,2,3,4,5];
  let list = new Set(arr);
  console.log('size',list.size);
}
{
// 添加重复元素不报错,也不会添加
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);

  console.log('list',list);
	//去重
  let arr=[1,2,3,1,'2'];//数据类型不会转换
  let list2=new Set(arr);

  console.log('unique',list2);
}
{
	//Set有这四种方法
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);

  console.log('has',list.has('add'));
  console.log('delete',list.delete('add'),list);
  list.clear();
  console.log('list',list);
}

{
	//Set的遍历
  let arr=['add','delete','clear','has'];
  let list=new Set(arr);
	//key value 值都是一样的
  for(let key of list.keys()){
    console.log('keys',key);
  }
  for(let value of list.values()){
    console.log('value',value);
  }
  for(let [key,value] of list.entries()){
    console.log('entries',key,value);
  }

  list.forEach(function(item){console.log(item);})
}
```

###	WeakSet
1.	支持的数据类型,WeakSet的值必须是对象
2. 不会检测被没被垃圾回收
3.	没有size属性没有clear(),只能接受对象

```js
{
  let weakList=new WeakSet();
  let arg={};
  weakList.add(arg);
  console.log('weakList',weakList);
}
```

###	Map
```js
{
  let map = new Map();
  let arr=['123'];
  map.set(arr,456);//数组可以作为key
  console.log('map',map,map.get(arr));
}

{
  let map = new Map([['a',123],['b',456]]);
  console.log('map args',map);
  console.log('size',map.size);
  console.log('delete',map.delete('a'),map);
  console.log('clear',map.clear(),map);
}
```

###	WeakMap
```js
{
  let weakmap=new WeakMap();

  let o={};
  weakmap.set(o,123);//没有size属性没有clear(),只能接受对象
  console.log(weakmap.get(o));
}
```

###	Map和Array的对比
```js
{
  //数据结构的横向对比,增删改查
  let map = new Map()
  let array = []
  //增
  map.set('t',1)
  array.push({t:1})
  //查
  let map_exist = map.has('t')
  let arr_exist = array.find(item => item.t)
  //改
  map.set({t:2})
  array.forEach(item => item.t ? item.t = 2: '')
  //删
  map.delete('t')
  let index = array.findIndex(item => item.t)
  array.splice(index , 1)
}
```

###	Set和Array的对比
```js
{
  let set = new Set()
  let array = []
  //增
  set.add({t:1})
  //删
  set.forEach(item => item.t? set.delete(item): '')
  //改
  set.forEach(item => item.t? item.t = 2: '')
  //查
  let set_exist = set.has({t:1}) // 返回肯定是false
}
```

###	Map和Object的对比 + Set和Object的对比
```js
{
  let item = {t:1}
  let map = new Map()
  let set = new Set()
  let obj = {}
  //增
  map.set('t',1)
  set.add(item)
  obj['t'] = 1
  //删
  map.delete('t')
  set.forEach(item => item.t? set.delete(item): '')
  delete obj['t']
  //改
  map.set('t',1)
  item.t = 2 //因为是对象,可以直接修改对象的属性
  obj['t'] = 2
  //查
  console.log(map.has('t'))
  console.log(set.has('t'))
  console.log('t' in obj)
}
```

### 总结
1.	优先使用map
2. 唯一性使用set

##	Proxy 和 Reflect
###	Proxy
```js
{
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  let monitor=new Proxy(obj,{
    // 拦截对象属性的读取,target: 被代理的对象,key:被调用的属性
    get(target,key){	
      return target[key].replace('2017','2018')
    },
    // 拦截对象设置属性
    set(target,key,value){
      if(key==='name'){
        return target[key]=value;
      }else{
        return target[key];
      }
    },
    // 拦截key in object操作
    has(target,key){
      if(key==='name'){
        return target[key]
      }else{
        return false;
      }
    },
    // 拦截delete
    deleteProperty(target,key){
      if(key.indexOf('_')>-1){
        delete target[key];
        return true;
      }else{
        return target[key]
      }
    },
    // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
    ownKeys(target){
      return Object.keys(target).filter(item=>item!='time')
    }
  });
  //获取
  console.log('get',monitor.time);
  //修改
  monitor.time='2018';
  monitor.name='mukewang';
  console.log('set',monitor.time,monitor);
  
  // in 操作
  console.log('has','name' in monitor,'time' in monitor);

  // 删除操作
  // delete monitor.time;
  // console.log('delete',monitor);
  //
  // delete monitor._r;
  // console.log('delete',monitor);
  console.log('ownKeys',Object.keys(monitor));

}
```
### Reflect
1.	proxy有的方法Reflect都有
2. 用法也一样

```js
{
  let obj={
    time:'2017-03-11',
    name:'net',
    _r:123
  };

  console.log('Reflect get',Reflect.get(obj,'time'));
  Reflect.set(obj,'name','mukewang');
  console.log(obj);
  console.log('has',Reflect.has(obj,'name'));
}
```

###	校验
```js
{
  function validator(target, validator) {
    return new Proxy(target, {
      _validator : validator,
      set(target,key,value,proxy) {
        if(target.hasOwnProperty(key)){
          let va = this._validator[key]
          if(!!va(value)) {
            return Reflect.set(target,key,value,proxy)
          }else{
            throw Error(`不能设置${key}到${value}`)
          }
        }else{
          throw Error(`${key} 不存在`)
        }
      }
    })
  }
  const personValidator = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    }
  }

  class Person{
    constructor(name,age) {
      this.name = name
      this.age = age
      return validator(this,personValidator)
    }
  }
  const person = new Person('zhangsan',30)
  console.info(person)
  person.age = 16
  console.info(person)
  person.name = 333
  console.info(person)
}
```

##	类
```js
{
  // 基本定义和生成实例
  class Parent{
    constructor(name='zhangsan'){
      this.name=name;
    }
  }
  let v_parent=new Parent('v');
  console.log('构造函数和实例',v_parent);
}

{
  // 继承
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }
  class Child extends Parent{

  }
  console.log('继承',new Child());
}

{
  // 继承传递参数
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }
  class Child extends Parent{
    constructor(name='child'){
      super(name);
      this.type='child';
    }
  }
  console.log('继承传递参数',new Child('hello'));
}

{
  // getter,setter
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
    //这不是方法 是属性
    get longName(){
      return 'mk'+this.name
    }
    set longName(value){
      this.name=value;
    }
  }
  let v=new Parent();
  console.log('getter',v.longName);
  v.longName='hello';
  console.log('setter',v.longName);
}

{
  // 静态方法
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){
      console.log('tell');
    }
  }
  Parent.tell();
}
{
  // 静态属性
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){
      console.log('tell');
    }
  }
  Parent.type='test';
  console.log('静态属性',Parent.type);
}
```

## Promise
```js
{
  // 基本定义
  let ajax=function(callback){
    console.log('执行');
    setTimeout(function () {
      callback&&callback.call()
    }, 1000);
  };
  ajax(function(){
    console.log('timeout1');
  })
}

{
  let ajax=function(){
    console.log('执行2');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax().then(function(){
    console.log('promise','timeout2');
  })
}

{
  let ajax=function(){
    console.log('执行3');
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 1000);
    })
  };

  ajax()
    .then(function(){
    return new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve()
      }, 2000);
    });
  })
    .then(function(){
    console.log('timeout3');
  })
}

{
  let ajax=function(num){
    console.log('执行4');
    return new Promise(function(resolve,reject){
      if(num>5){
        resolve()
      }else{
        throw new Error('出错了')
      }
    })
  }

  ajax(6).then(function(){
    console.log('log',6);
  }).catch(function(err){
    console.log('catch',err);
  });

  ajax(3).then(function(){
    console.log('log',3);
  }).catch(function(err){
    console.log('catch',err);
  });
}

```

###	all
```js
{
  //所有图片加载完再加载页面
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err){
        reject(err)
      }
    })
  }

  function showImgs(imgs) {
    imgs.forEach(img => {
      document.body.appendChild(img)
    });
  } 

  Promise.all([
    loadImg('https://user-gold-cdn.xitu.io/2018/12/22/167d517847c9115f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'),
    loadImg('https://user-gold-cdn.xitu.io/2018/12/22/167d517847c9115f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'),
    loadImg('https://user-gold-cdn.xitu.io/2018/12/22/167d517847c9115f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'),
  ]).then(showImgs)
}
```

### race
```js
{
  //有一个图片加载完就添加到页面上
  function loadImg(src) {
    return new Promise((resolve, reject) => {
      let img = document.createElement('img')
      img.src = src
      img.onload = function() {
        resolve(img)
      }
      img.onerror = function(err){
        reject(err)
      }
    })
  }

  function showImgs(img) {
    let p= document.createElement('p')
    p.appendChild(img)
    document.body.appendChild(p)
  } 

  Promise.race([
    loadImg('https://user-gold-cdn.xitu.io/2018/12/22/167d517847c9115f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'),
    loadImg('https://user-gold-cdn.xitu.io/2018/12/22/167d517847c9115f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'),
    loadImg('https://user-gold-cdn.xitu.io/2018/12/22/167d517847c9115f?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'),
  ]).then(showImgs)
}

```

## Iterator和 for...of循环
```js
{
  let arr=['hello','world'];
  let map=arr[Symbol.iterator]();
  console.log(map.next()); //{value:'hello',done:false}
  console.log(map.next());//{value:'world',done:false}
  console.log(map.next());//{value:undefined,done:true}
}

{
  let obj={
    start:[1,3,2],
    end:[7,9,8],
    [Symbol.iterator](){
      let self=this;
      let index=0;
      let arr=self.start.concat(self.end);
      let len=arr.length;
      return {
        next(){
          if(index<len){
            return {
              value:arr[index++],
              done:false
            }
          }else{
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
  }
  for(let key of obj){
    console.log(key);
  }
}

{
  let arr=['hello','world'];
  for(let value of arr){
    console.log('value',value);
  }
}
```

## Generator
```js
{
  // genertaor基本定义
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c'
  };

  let k=tell();

  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
  console.log(k.next());
}

{
  let obj={};
  obj[Symbol.iterator]=function* (){
    yield 1;
    yield 2;
    yield 3;
  }

  for(let value of obj){
    console.log('value',value);
  }
}

{
  let state=function* (){
    while(1){
      yield 'A';
      yield 'B';
      yield 'C';
    }
  }
  let status=state();
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
  console.log(status.next());
}
//抽奖实例
{
  let draw = function(count){
    console.info(`剩余${count}次!`)
  }

  let residue = function*(count){
    while(count > 0) {
      count --
      yield draw(count)
    }
  }

  let star = residue(5)
  let btn = document.createElement('button')
  btn.id = 'star'
  btn.textContent = "抽奖"
  document.body.appendChild(btn)
  document.getElementById('star').addEventListener('click',function(){
    star.next()
  },false)

}

//长轮询
{
  let ajax = function* (){
    yield new Promise(function(resolve,reject){
      setTimeout(function() {
        resolve({code: 1}) //code:0
      }, 200)
    })
  }

  let pull = function() {
    let genertaor = ajax()
    let step = genertaor.next()
    step.value.then(function(d) {
      if(d.code != 0) {
        setTimeout(function() {
          console.info('wait')
          pull()
        },1000)
      }else{
        console.info(d)
      }
    })
  }
  pull()
}
```

## Decorator-修饰器
1.	只能使用在类
2. 修改类的行为
3. decorator是个函数

```js
{
  let readonly=function(target,name,descriptor){
    descriptor.writable=false;
    return descriptor
  };

  class Test{
    @readonly
    time(){
      return '2017-03-11'
    }
  }

  let test=new Test();

  // test.time=function(){
  //   console.log('reset time');
  // };

  console.log(test.time());
}


{
  let typename=function(target,name,descriptor){
    target.myname='hello';
  }

  @typename
  class Test{

  }

  console.log('类修饰符',Test.myname);
  // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}
```


## 模块化
```js
// export let A=123;
//
// export function test(){
//   console.log('test');
// }
//
// export class Hello{
//   test(){
//     console.log('class');
//   }
// }

let A=123;
let test=function(){
  console.log('test');
}
class Hello{
  test(){
    console.log('class');
  }
}

export default {
  A,
  test,
  Hello
}

```












































