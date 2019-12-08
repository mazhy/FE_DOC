#	Object
Object 构造函数创建一个对象包装器。

##	基础

###	语法
```
// 对象初始化器（Object initialiser）或对象字面量（literal）
{ [ nameValuePair1[, nameValuePair2[, ...nameValuePairN] ] ] }

// 以构造函数形式来调用
new Object([value])
```

###	参数
*nameValuePair1, nameValuePair2, ... nameValuePairN*
成对的名称（字符串）与值（任何值），其中名称通过冒号与值分隔。
value
任何值。

###	描述
Object 构造函数为给定值创建一个对象包装器。如果给定值是 null 或 undefined，将会创建并返回一个空对象，否则，将返回一个与给定值对应类型的对象。

当以非构造函数形式被调用时，Object 等同于 new Object()。

###	Object 构造函数的属性
+	Object.length: 值为 1。
+	Object.prototype 可以为所有 Object 类型的对象添加属性。

###	Object 实例和 Object 原型对象
JavaScript中的所有对象都来自 Object；所有对象从Object.prototype继承方法和属性，尽管它们可能被覆盖。例如，其他构造函数的原型将覆盖 constructor 属性并提供自己的 toString() 方法。Object 原型对象的更改将传播到所有对象，除非受到这些更改的属性和方法将沿原型链进一步覆盖。

###	eq
+	给定 undefined 和 null 类型使用 Object
	-	下面的例子将一个空的 Object 对象存到 o 中：

```js
var o = new Object();
var o = new Object(undefined);
var o = new Object(null);
```

+	使用 Object 生成布尔对象
	-	下面的例子将Boolean 对象存到 o 中：

```js
// 等价于 o = new Boolean(true);
var o = new Object(true);
// 等价于 o = new Boolean(false);
var o = new Object(Boolean());
```

###	constructor
返回创建实例对象的 Object 构造函数的引用。注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。对原始类型来说，如1，true和"test"，该值只可读。

####	描述
+	所有对象都会从它的原型上继承一个 constructor 属性：

```js
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true
```

####	eq
+	打印一个对象的构造函数
	-	以下示例创建一个原型，Tree，以及该类型的对象，即theTree。 然后打印theTree对象的constructor属性。

```js
function Tree(name) {
   this.name = name;
}

var theTree = new Tree("Redwood");
console.log( "theTree.constructor is " + theTree.constructor );
打印输出：

theTree.constructor is function Tree(name) {
    this.name = name;
}
```

+	改变对象的 constructor
	-	下面的例子展示了如何修改基本类型对象的 constructor 属性的值。只有 true, 1 和 "test" 的不受影响，因为创建他们的是只读的原生构造函数（native constructors）。这个例子也说明了依赖一个对象的 constructor 属性并不安全。

```js
function Type() { };

var	types = [
	new Array,
    [],
	new Boolean,
    true,        // remains unchanged
	new Date,
	new Error,
	new Function,
	function(){},
	Math,	
	new Number,
	1,           // remains unchanged
	new Object,
	{},
	new RegExp,
	/(?:)/,
	new String,
	"test"       // remains unchanged
];

for(var i = 0; i < types.length; i++) {
	types[i].constructor = Type;
	types[i] = [ types[i].constructor, types[i] instanceof Type, types[i].toString() ];
};
```
```js
console.log( types.join("\n") );
此示例显示以下输出：

function Type() {},false,
function Type() {},false,
function Type() {},false,false
function Boolean() {
    [native code]
},false,true
function Type() {},false,Mon Sep 01 2014 16:03:49 GMT+0600
function Type() {},false,Error
function Type() {},false,function anonymous() {

}
function Type() {},false,function () {}
function Type() {},false,[object Math]
function Type() {},false,0
function Number() {
    [native code]
},false,1
function Type() {},false,[object Object]
function Type() {},false,[object Object]
function Type() {},false,/(?:)/
function Type() {},false,/(?:)/
function Type() {},false,
function String() {
    [native code]
},false,test
```

+	改变函数的 constructor
	-	大多数情况下，此属性用于定义一个构造函数，并使用new和继承原型链进一步调用它。

```js
function Parent() {}
Parent.prototype.parentMethod = function parentMethod() {};

function Child() {}
Child.prototype = Object.create(Parent.prototype); // re-define child prototype to Parent prototype

Child.prototype.constructor = Child; // return original constructor to Child
```

+	但为什么我们需要在这里执行最后一行？很不幸正确答案是 - 看情况而定。
+	让我们来尝试定义在哪些情况下，重新分配原始构造函数会发挥重要作用，以及在什么时候它就是额外的未使用的（无效的）代码行。
+	试想下一种情况：该对象具有创建自身的create方法。

```js
function Parent() {};
function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype);

CreatedConstructor.prototype.create = function create() {
  return new this.constructor();
}

new CreatedConstructor().create().create(); // error undefined is not a function since constructor === Parent
```

+	在上面的示例中，将显示异常，因为构造函数链接到Parent。
+	为了避免它，只需分配您将要使用的必要构造函数。

```js
function Parent() {}; 
function CreatedConstructor() {} 

CreatedConstructor.prototype = Object.create(Parent.prototype); 
CreatedConstructor.prototype.constructor = CreatedConstructor; // set right constructor for further using

CreatedConstructor.prototype.create = function create() { 
  return new this.constructor();
} 

new CreatedConstructor().create().create(); // it's pretty fine
```

+	好的，现在很清楚为什么更改构造函数会很有用。
+	让我们再考虑一个案例。

```js
function ParentWithStatic() {}

ParentWithStatic.startPosition = { x: 0, y:0 };
ParentWithStatic.getStartPosition = function getStartPosition() {
  return this.startPosition;
} 

function Child(x, y) {
  this.position = {
    x: x,
    y: y
  };
}

Child.prototype = Object.create(ParentWithStatic.prototype); 
Child.prototype.constructor = Child;

Child.prototype.getOffsetByInitialPosition = function getOffsetByInitialPosition() {
  var position = this.position;
  var startPosition = this.constructor.getStartPosition(); // error undefined is not a function, since the constructor is Child

  return {
    offsetX: startPosition.x - position.x,
    offsetY: startPosition.y - position.y
  }
};
```

+	对于此示例，我们需要保持父构造函数继续正常工作。
+	总结：手动设置或更新构造函数可能会导致不同且有时令人困惑的后果。为了防止它，只需在每个特定情况下定义构造函数的角色。在大多数情况下，不使用构造函数，并且不需要重新分配构造函数。

###	__ proto__
####	注意
+	已废弃:该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
+	警告: 通过现代浏览器的操作属性的便利性，可以改变一个对象的 [[Prototype]] 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作，使用这种方式来改变和继承属性是对性能影响非常严重的，并且性能消耗的时间也不是简单的花费在 obj.__proto__ = ... 语句上, 它还会影响到所有继承来自该 [[Prototype]] 的对象，如果你关心性能，你就不应该在一个对象中修改它的 [[Prototype]]。相反, 创建一个新的且可以继承 [[Prototype]] 的对象，推荐使用 Object.create()。
+	警告: 当Object.prototype.__proto__ 已被大多数浏览器厂商所支持的今天，其存在和确切行为仅在ECMAScript 2015规范中被标准+	Object.prototype 的 __proto__  属性是一个访问器属性（一个getter函数和一个setter函数）, 暴露了通过它访问的对象的内部[[Prototype]] (一个对象或 null)。
+	使用__proto__是有争议的，也不鼓励使用它。因为它从来没有被包括在EcmaScript语言规范中，但是现代浏览器都实现了它。__proto__属性已在ECMAScript 6语言规范中标准化，用于确保Web浏览器的兼容性，因此它未来将被支持。它已被不推荐使用, 现在更推荐使用Object.getPrototypeOf/Reflect.getPrototypeOf 和Object.setPrototypeOf/Reflect.setPrototypeOf（尽管如此，设置对象的[[Prototype]]是一个缓慢的操作，如果性能是一个问题，应该避免）。
+	__proto__ 属性也可以在对象文字定义中使用对象[[Prototype]]来创建，作为Object.create() 的一个替代。 请参阅： object initializer / literal syntax.

####	语法
```js
let Circle = function () {};
let shape = {};
let circle = new Circle();
 
// 设置该对象的原型链引用
// 过时且不推荐使用的。这里只是举个例子，尽量不要在生产环境中这样做。
shape.__proto__ = circle;

// 判断该对象的原型链引用是否属于circle
console.log(shape.__proto__ === circle); // true
let shape = function () {};
let p = {
    a: function () {
        console.log('aaa');
    }
};
shape.prototype.__proto__ = p;

let circle = new shape();
circle.a();//aaa
console.log(shape.prototype === circle.__proto__);//true
```
```js
//或者
let shape = function () {};
var p = {
    a: function () {
        console.log('a');
    }
};

let circle = new shape();
circle.__proto__ = p;
circle.a(); //  a
console.log(shape.prototype === circle.__proto__);//false
```
```js
//或者
function test() {}
test.prototype.myname = function () {
    console.log('myname');
}
let a = new test()
console.log(a.__proto__ === test.prototype);//true
a.myname();//myname
```
```js
//或者
let fn = function () {};
fn.prototype.myname = function () {
    console.log('myname');
}

let obj = {
    __proto__: fn.prototype
};

obj.myname();//myname
注意：这是两个下划线，后面是五个字符的 “proto” ，后面再跟两个下划线。
```

####	描述
+	__proto__的读取器(getter)暴露了一个对象的内部 [[Prototype]] 。对于使用对象字面量创建的对象，这个值是 Object.prototype。对于使用数组字面量创建的对象，这个值是 Array.prototype。对于functions，这个值是Function.prototype。对于使用 new fun 创建的对象，其中fun是由js提供的内建构造器函数之一(Array, Boolean, Date, Number, Object, String 等等），这个值总是fun.prototype。对于用js定义的其他js构造器函数创建的对象，这个值就是该构造器函数的prototype属性。
+	__proto__ 的设置器(setter)允许对象的 [[Prototype]]被变更。前提是这个对象必须通过 Object.isExtensible() 判断为是可扩展的，如果不可扩展，则会抛出一个 TypeError 错误。要变更的值必须是一个object或null，提供其它值将不起任何作用。
+	要理解原型如何被使用，请查看相关文章：Inheritance and the prototype chain。
+	.__proto__属性是Object.prototype 一个简单的访问器属性，其中包含了get（获取）和set（设置）的方法，任何一个__proto__的存取属性都继承于Object.prototype，但一个访问属性如果不是来源于Object.prototype就不拥有.__proto__属性，譬如一个元素设置了其他的.__proto__属性在Object.prototype之前，将会覆盖原有的Object.prototype。

###	prototype
+	Object.prototype 属性表示 Object 的原型对象。
+	Object.prototype 属性的属性特性：

|     |       |
| :-- | :---- |
|  writable   | true |
|  enumerable   | false |
|  configurable   | true |
	
####	描述
+	几乎所有的 JavaScript 对象都是 Object 的实例；一个典型的对象继承了Object.prototype的属性（包括方法），尽管这些属性可能被遮蔽（亦称为覆盖）。但是有时候可能故意创建不具有典型原型链继承的对象，比如通过Object.create(null)创建的对象，或者通过Object.setPrototypeOf方法改变原型链。
+	改变Object原型，会通过原型链改变所有对象；除非在原型链中进一步覆盖受这些变化影响的属性和方法。这提供了一个非常强大的、但有潜在危险的机制来覆盖或扩展对象行为。

####	eq
+	当改变现有的 Object.prototype method(方法)的行为时，考虑在现有逻辑之前或之后通过封装你的扩展来注入代码。例如,此(未测试的)代码将在内置逻辑或其他人的扩展执行之前 pre-conditionally（预条件地）执行自定义逻辑。
+	当一个函数被调用时,调用的参数被保留在类似数组 "变量" 的参数中。例如, 在调用 "myFn (a、b、c)"时, 在myFn 的主体内的参数将包含 3个类似数组的元素对应于 (a、b、c)。 使用钩子修改原型时,只需通过调用该函数的 apply ()，将 this 与参数 (调用状态) 传递给当前行为。这种模式可以用于任何原型，如 Node.prototype、 Function.prototype 等.

```js
var current = Object.prototype.valueOf;

// 由于我的属性 "-prop-value"是交叉性的, 并不总是
// 在同一个原型链上，我想要修改 Object.prototype: 
Object.prototype.valueOf = function() {
  if (this.hasOwnProperty('-prop-value')) {
    return this['-prop-value'];
  } else {
    // 它看起来不像我的对象之一，因此，让我们退回到 
    // 默认行为，通过尽可能地复制当前行为来实现.
    // 此apply的行为类似于其他语言中的"super".
    // 即使 valueOf() 不带参数, 其他的钩子可能会带有.
    return current.apply(this, arguments);
  }
}
```

+	由于 JavaScript 并不完全具有子类对象, 所以原型是一种有用的变通方法, 可以使用某些函数的 "基类" 对象来充当对象。例如:

```js
var Person = function(name) {
  this.name = name;
  this.canTalk = true;
};

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

var Employee = function(name, title) {
  Person.call(this, name);
  this.title = title;
};
```
```js
Employee.prototype = Object.create(Person.prototype);

Employee.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name + ', the ' + this.title);
  }
};

var Customer = function(name) {
  Person.call(this, name);
};
```
```js
Customer.prototype = Object.create(Person.prototype);

var Mime = function(name) {
  Person.call(this, name);
  this.canTalk = false;
};
```
```js
Mime.prototype = Object.create(Person.prototype);

var bob = new Employee('Bob', 'Builder');
var joe = new Customer('Joe');
var rg = new Employee('Red Green', 'Handyman');
var mike = new Customer('Mike');
var mime = new Mime('Mime');
```
```js
bob.greet();
// Hi, I am Bob, the Builder

joe.greet();
// Hi, I am Joe

rg.greet();
// Hi, I am Red Green, the Handyman

mike.greet();
// Hi, I am Mike

mime.greet();
```

##	方法
###	assign
Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

####	语法
Object.assign(target, ...sources)

####	参数
+	target: 目标对象。
+	sources: 源对象。

####	返回值
目标对象。

####	描述
+	如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
+	Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
+	String类型和 Symbol 类型的属性都会被拷贝。
+	在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。
+	注意，Object.assign 不会在那些source对象值为 null 或 undefined 的时候抛出错误。

####	eq
+	复制一个对象

```js
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

+	深拷贝问题
	-	针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。

```js
let obj1 = { a: 0 , b: { c: 0}}; 
let obj2 = Object.assign({}, obj1); 
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

obj1.a = 1; 
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} 
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

obj2.a = 2; 
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} 
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
 
obj2.b.c = 3; 
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}} 
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}} 

// Deep Clone 
obj1 = { a: 0 , b: { c: 0}}; 
let obj3 = JSON.parse(JSON.stringify(obj1)); 
obj1.a = 4; 
obj1.b.c = 4; 
console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
```

+	合并对象

```js
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
```

+	合并具有相同属性的对象

```js
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
// 属性被后续参数中具有相同属性的其他对象覆盖。
```

+	拷贝 symbol 类型的属性

```js
const o1 = { a: 1 };
const o2 = { [Symbol('foo')]: 2 };

const obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
```

+	继承属性和不可枚举属性是不能拷贝的

```js
const obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }
```

+	原始类型会被包装为对象

```js
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo")

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4); 
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

+	异常会打断后续拷贝任务

```js
const target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
}); // target 的 foo 属性是个只读属性。

Object.assign(target, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
// TypeError: "foo" is read-only
// 注意这个异常是在拷贝第二个源对象的第二个属性时发生的。

console.log(target.bar);  // 2，说明第一个源对象拷贝成功了。
console.log(target.foo2); // 3，说明第二个源对象的第一个属性也拷贝成功了。
console.log(target.foo);  // 1，只读属性不能被覆盖，所以第二个源对象的第二个属性拷贝失败了。
console.log(target.foo3); // undefined，异常之后 assign 方法就退出了，第三个属性是不会被拷贝到的。
console.log(target.baz);  // undefined，第三个源对象更是不会被拷贝到的。
```

+	拷贝访问器

```js
const obj = {
  foo: 1,
  get bar() {
    return 2;
  }
};

let copy = Object.assign({}, obj); 
console.log(copy); // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值

// 下面这个函数会拷贝所有自有属性的属性描述符
function completeAssign(target, ...sources) {
  sources.forEach(source => {
    let descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    // Object.assign 默认也会拷贝可枚举的Symbols
    Object.getOwnPropertySymbols(source).forEach(sym => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

copy = completeAssign({}, obj);
console.log(copy);
// { foo:1, get bar() { return 2 } }
```

###	Object.create()
方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 

####	语法
Object.create(proto[, propertiesObject])

####	参数
+	proto: 新创建对象的原型对象。
+	propertiesObject:可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。

####	返回值
一个新对象，带着指定的原型对象和属性。

####	例外
如果propertiesObject参数是 null 或非原始包装对象，则抛出一个 TypeError 异常。

####	eq
+	用 Object.create实现类式继承

```js
下面的例子演示了如何使用Object.create()来实现类式继承。这是一个所有版本JavaScript都支持的单继承。

// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

+	如果你希望能继承到多个对象，则可以使用混入的方式。

```js
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```

+	Object.assign 会把  OtherSuperClass原型上的函数拷贝到 MyClass原型上，使 MyClass 的所有实例都可用 OtherSuperClass 的方法。Object.assign 是在 ES2015 引入的，且可用 polyfilled。要支持旧浏览器的话，可用使用 jQuery.extend() 或者 _.assign()。

+	使用 Object.create 的 propertyObject参数

```js
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});


function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, {
  p: {
    value: 42, 
    writable: true,
    enumerable: true,
    configurable: true 
  } 
});
```

###	Object.defineProperties() 
直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

####	语法
Object.defineProperties(obj, props)

####	参数
+	obj:	在其上定义或修改属性的对象。
+	props:	要定义其可枚举属性或修改的属性描述符的对象。对象中存在的属性描述符主要有两种：数据描述符和访问器描述符（更多详情，请参阅Object.defineProperty()）。描述符具有以下键：
	-	configurable:true 当且仅当该属性描述符的类型可以被改变并且该属性可以从对应对象中删除。默认为 false
	-	enumerable:true 当且仅当在枚举相应对象上的属性时该属性显现。默认为 false
	-	value:与属性关联的值。可以是任何有效的JavaScript值（数字，对象，函数等）。默认为 undefined.
	-	writable:true当且仅当与该属性相关联的值可以用assignment operator改变时。默认为 false
	-	get:作为该属性的 getter 函数，如果没有 getter 则为undefined。函数返回值将被用作属性的值。默认为 undefined
	-	set:作为属性的 setter 函数，如果没有 setter 则为undefined。函数将仅接受参数赋值给该属性的新值。 默认为 undefined

####	返回值
传递给函数的对象。

####	描述
Object.defineProperties本质上定义了obj 对象上props的可枚举属性相对应的所有属性。

####	eq
```js
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```

###	Object.defineProperty() 
会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

####	语法
Object.defineProperty(obj, prop, descriptor)

####	参数
+	obj:要在其上定义属性的对象。
+	prop:要定义或修改的属性的名称。
+	descriptor:将被定义或修改的属性描述符。

####	返回值
被传递给函数的对象。

####	注意
在ES6中，由于 Symbol类型的特殊性，用Symbol类型的值来做对象的key与常规的定义或修改不同，而Object.defineProperty 是定义key为Symbol的属性的方法之一。

####	描述
该方法允许精确添加或修改对象的属性。通过赋值操作添加的普通属性是可枚举的，能够在属性枚举期间呈现出来（for...in 或 Object.keys 方法）， 这些属性的值可以被改变，也可以被删除。这个方法允许修改默认的额外选项（或配置）。默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改的。

####	属性描述符
+	对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由getter-setter函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。
+	数据描述符和存取描述符均具有以下可选键值(默认值是在使用Object.defineProperty()定义属性的情况下)：
	-	configurable:当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
	-	enumerable:当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
+	数据描述符同时具有以下可选键值：
	-	value:该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
	-	writable:当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
+	存取描述符同时具有以下可选键值：
	-	get:一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为 undefined。
	-	set:一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。:默认为 undefined。

+	描述符可同时具有的键值

|     | configurable | enumerable | value | writable |   get    |    set   |
| :-- | :---- | :---: | :---: | :---: | :---: | :---: |
|数据描述符|	Yes	|Yes|	Yes|	Yes|	No|	No|
|存取描述符	|Yes|	Yes|	No|	No	|Yes	|Yes|

+	如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。
+	记住，这些选项不一定是自身属性，如果是继承来的也要考虑。为了确认保留这些默认值，你可能要在这之前冻结 Object.prototype，明确指定所有的选项，或者通过 Object.create(null)将__proto__属性指向null。

```js
// 使用 __proto__
var obj = {};
var descriptor = Object.create(null); // 没有继承的属性
// 默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);
// 显式
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});
// 循环使用同一对象
function withValue(value) {
  var d = withValue.d || (
    withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value: null
    }
  );
  d.value = value;
  return d;
}
// ... 并且 ...
Object.defineProperty(obj, "key", withValue("static"));

// 如果 freeze 可用, 防止代码添加或删除对象原型的属性
// （value, get, set, enumerable, writable, configurable）
(Object.freeze||Object)(Object.prototype);
```

####	eq
+	创建属性
	-	如果对象中不存在指定的属性，Object.defineProperty()就创建这个属性。当描述符中省略某些字段时，这些字段将使用它们的默认值。拥有布尔值的字段的默认值都是false。value，get和set字段的默认值为undefined。一个没有get/set/value/writable定义的属性被称为“通用的”，并被“键入”为一个数据描述符。

```js
var o = {}; // 创建一个新对象
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(o, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});

// 对象o拥有了属性a，值为37

// 在对象中添加一个属性与存取描述符的示例
var bValue;
Object.defineProperty(o, "b", {
  get : function(){
    return bValue;
  },
  set : function(newValue){
    bValue = newValue;
  },
  enumerable : true,
  configurable : true
});

o.b = 38;
// 对象o拥有了属性b，值为38

// o.b的值现在总是与bValue相同，除非重新定义o.b

// 数据描述符和存取描述符不能混合使用
Object.defineProperty(o, "conflict", {
  value: 0x9f91102, 
  get: function() { 
    return 0xdeadbeef; 
  } 
});
// throws a TypeError: value appears only in data descriptors, get appears only in accessor descriptors
```

+	修改属性
	-	如果属性已经存在，Object.defineProperty()将尝试根据描述符中的值以及对象当前的配置来修改这个属性。如果旧描述符将其configurable 属性设置为false，则该属性被认为是“不可配置的”，并且没有属性可以被改变（除了单向改变 writable 为 false）。当属性不可配置时，不能在数据和访问器属性类型之间切换。
	-	当试图改变不可配置属性（除了value和writable 属性之外）的值时会抛出TypeError，除非当前值和新值相同。
+	Writable 属性
	-	当writable属性设置为false时，该属性被称为“不可写”。它不能被重新分配。

```js
var o = {}; // Creates a new object

Object.defineProperty(o, 'a', {
  value: 37,
  writable: false
});

console.log(o.a); // logs 37
o.a = 25; // No error thrown
// (it would throw in strict mode,
// even if the value had been the same)
console.log(o.a); // logs 37. The assignment didn't work.

// strict mode
(function() {
  'use strict';
  var o = {};
  Object.defineProperty(o, 'b', {
    value: 2,
    writable: false
  });
  o.b = 3; // throws TypeError: "b" is read-only
  return o.b; // returns 2 without the line above
}());
如示例所示，试图写入非可写属性不会改变它，也不会引发错误。
```

+	Enumerable 特性
	-	enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。

```js
var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable:true });
Object.defineProperty(o, "b", { value : 2, enumerable:false });
Object.defineProperty(o, "c", { value : 3 }); // enumerable defaults to false
o.d = 4; // 如果使用直接赋值的方式创建对象的属性，则这个属性的enumerable为true

for (var i in o) {    
  console.log(i);  
}
// 打印 'a' 和 'd' (in undefined order)

Object.keys(o); // ["a", "d"]

o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false
```

+	Configurable 特性
	-	configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改。

```js
var o = {};
Object.defineProperty(o, "a", { get : function(){return 1;}, 
                                configurable : false } );

// throws a TypeError
Object.defineProperty(o, "a", {configurable : true}); 
// throws a TypeError
Object.defineProperty(o, "a", {enumerable : true}); 
// throws a TypeError (set was undefined previously) 
Object.defineProperty(o, "a", {set : function(){}}); 
// throws a TypeError (even though the new get does exactly the same thing) 
Object.defineProperty(o, "a", {get : function(){return 1;}});
// throws a TypeError
Object.defineProperty(o, "a", {value : 12});

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1
如果o.a的configurable属性为true，则不会抛出任何错误，并且该属性将在最后被删除。
```

+	添加多个属性和默认值
	-	考虑特性被赋予的默认特性值非常重要，通常，使用点运算符和Object.defineProperty()为对象的属性赋值时，数据描述符中的属性默认值是不同的，如下例所示。

```js
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});


// 另一方面，
Object.defineProperty(o, "a", { value : 1 });
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : false,
  configurable : false,
  enumerable : false
});
```

+	一般的 Setters 和 Getters
	-	下面的例子展示了如何实现一个自存档对象。 当设置temperature 属性时，archive 数组会获取日志条目。

```js
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function() {
      console.log('get!');
      return temperature;
    },
    set: function(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
或

var pattern = {
    get: function () {
        return 'I alway return this string,whatever you have assigned';
    },
    set: function () {
        this.myname = 'this is my name string';
    }
};


function TestDefineSetAndGet() {
    Object.defineProperty(this, 'myproperty', pattern);
}


var instance = new TestDefineSetAndGet();
instance.myproperty = 'test';

// 'I alway return this string,whatever you have assigned'
console.log(instance.myproperty);
// 'this is my name string'
console.log(instance.myname);继承属性
```

+	继承属性
	-	如果访问者的属性是被继承的，它的 get 和set 方法会在子对象的属性被访问或者修改时被调用。如果这些方法用一个变量存值，该值会被所有对象共享。

```js
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1
```

+	这可以通过将值存储在另一个属性中解决。在 get 和 set 方法中，this 指向某个被访问和修改属性的对象。

```js
function myclass() {
}

Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this.stored_x;
  },
  set(x) {
    this.stored_x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // undefined
```

+	不像访问者属性，值属性始终在对象自身上设置，而不是一个原型。然而，如果一个不可写的属性被继承，它仍然可以防止修改对象的属性。

```js
function myclass() {
}
myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});
var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1
```

###	Object.entries()
返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）

####	语法
Object.entries(obj)

####	参数
obj 可以返回其可枚举属性的键值对的对象。

####	返回值
给定对象自身可枚举属性的键值对数组。

####	描述
Object.entries()返回一个数组，其元素是与直接在object上找到的可枚举属性键值对相对应的数组。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。

####	eq
```js
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// array like object
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(obj)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

// array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo is property which isn't enumerable
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]

// non-object argument will be coerced to an object
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

// iterate through key-value gracefully
const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

// Or, using array extras
Object.entries(obj).forEach(([key, value]) => {
console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
});
```

+	将Object转换为Map
	-	new Map() 构造函数接受一个可迭代的entries。借助Object.entries方法你可以很容易的将Object转换为Map:

```js
var obj = { foo: "bar", baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

###	Object.freeze() 
可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

####	语法
Object.freeze(obj)

####	参数
obj: 要被冻结的对象。

####	返回值
被冻结的对象

####	描述
+	被冻结对象自身的所有属性都不可能以任何方式被修改。任何修改尝试都会失败，无论是静默地还是通过抛出TypeError异常（最常见但不仅限于strict mode）。
+	数据属性的值不可更改，访问器属性（有getter和setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。数组作为一种对象，被冻结，其元素不能被修改。没有数组元素可以被添加或移除。
+	这个方法返回传递的对象，而不是创建一个被冻结的副本。

####	eq
+	冻结对象

```js
var obj = {
  prop: function() {},
  foo: 'bar'
};

// 新的属性会被添加, 已存在的属性可能
// 会被修改或移除
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// 作为参数传递的对象与返回的对象都被冻结
// 所以不必保存返回的对象（因为两个对象全等）
var o = Object.freeze(obj);

o === obj; // true
Object.isFrozen(obj); // === true

// 现在任何改变都会失效
obj.foo = 'quux'; // 静默地不做任何事
// 静默地不添加此属性
obj.quaxxor = 'the friendly duck';

// 在严格模式，如此行为将抛出 TypeErrors
function fail(){
  'use strict';
  obj.foo = 'sparky'; // throws a TypeError
  delete obj.quaxxor; // 返回true，因为quaxxor属性从来未被添加
  obj.sparky = 'arf'; // throws a TypeError
}

fail();

// 试图通过 Object.defineProperty 更改属性
// 下面两个语句都会抛出 TypeError.
Object.defineProperty(obj, 'ohai', { value: 17 });
Object.defineProperty(obj, 'foo', { value: 'eit' });

// 也不能更改原型
// 下面两个语句都会抛出 TypeError.
Object.setPrototypeOf(obj, { x: 20 })
obj.__proto__ = { x: 20 }
```

+	冻结数组

```js
let a = [0];
Object.freeze(a); // 现在数组不能被修改了.

a[0]=1; // fails silently
a.push(2); // fails silently

// In strict mode such attempts will throw TypeErrors
function fail() {
  "use strict"
  a[0] = 1;
  a.push(2);
}

fail();
```

+	被冻结的对象是不可变的。但也不总是这样。下例展示了冻结对象不是常量对象（浅冻结）。

```js
obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

obj1.internal.a // 'aValue'
```

+	对于一个常量对象，整个引用图（直接和间接引用其他对象）只能引用不可变的冻结对象。冻结的对象被认为是不可变的，因为整个对象中的整个对象状态（对其他对象的值和引用）是固定的。注意，字符串，数字和布尔总是不可变的，而函数和数组是对象。
+	要使对象不可变，需要递归冻结每个类型为对象的属性（深冻结）。当你知道对象在引用图中不包含任何 环 (循环引用)时，将根据你的设计逐个使用该模式，否则将触发无限循环。对 deepFreeze()  的增强将是具有接收路径（例如Array）参数的内部函数，以便当对象进入不变时，可以递归地调用 deepFreeze() 。你仍然有冻结不应冻结的对象的风险，例如[window]。

```js
// 深冻结函数.
function deepFreeze(obj) {

  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined
```

+	在ES5中，如果这个方法的参数不是一个对象（一个原始值），那么它会导致 TypeError。在ES2015中，非对象参数将被视为要被冻结的普通对象，并被简单地返回。

```js
> Object.freeze(1)
TypeError: 1 is not an object // ES5 code

> Object.freeze(1)
1                             // ES2015 code
```

+	对比 Object.seal()
	-	用Object.seal()密封的对象可以改变它们现有的属性。使用Object.freeze() 冻结的对象中现有属性是不可变的。

###	Object.fromEntries() 
把键值对列表转换为一个对象。

####	语法
Object.fromEntries(iterable);

####	参数
iterable: 可迭代对象，类似 Array 、 Map 或者其它实现了可迭代协议的对象。

####	返回值
一个由该迭代对象条目提供对应属性的新对象。

####	描述
+	Object.fromEntries() 方法接收一个键值对的列表参数，并返回一个带有这些键值对的新对象。这个迭代参数应该是一个能够实现@iterator方法的的对象，返回一个迭代器对象。它生成一个具有两个元素的类数组的对象，第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。
+	Object.fromEntries() 是 Object.entries 的反转。

####	eq
+	Map 转化为 Object
	-	通过 Object.fromEntries， 可以将 Map 转化为 Object:

```js
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

+	Array 转化为 Object
	-	通过 Object.fromEntries， 可以将 Array 转化为 Object:

```js
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

+	对象转换

```js
Object.fromEntries 是 Object.entries() 的反转函数， 借用 数组处理函数 可以转换对象，如下：

const object1 = { a: 1, b: 2, c: 3 };

const object2 = Object.fromEntries(
  Object.entries(object1)
  .map(([ key, val ]) => [ key, val * 2 ])
);

console.log(object2);
// { a: 2, b: 4, c: 6 }
```

###	Object.getOwnPropertyDescriptor() 
返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

####	语法
Object.getOwnPropertyDescriptor(obj, prop)

####	参数
+	obj 需要查找的目标对象
+	prop 目标对象内属性名称

####	返回值
如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

####	描述
+	该方法允许对一个属性的描述进行检索。在 Javascript 中， 属性 由一个字符串类型的“名字”（name）和一个“属性描述符”（property descriptor）对象构成。更多关于属性描述符类型以及他们属性的信息可以查看：Object.defineProperty.
+	一个属性描述符是一个记录，由下面属性当中的某些组成的：
	-	value 该属性的值(仅针对数据属性描述符有效)
	-	writable 当且仅当属性的值可以被改变时为true。(仅针对数据属性描述有效)
	-	get 获取该属性的访问器函数（getter）。如果没有访问器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
	-	set 获取该属性的设置器函数（setter）。 如果没有设置器， 该值为undefined。(仅针对包含访问器或设置器的属性描述有效)
	-	configurable 当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为true。
	-	enumerable 当且仅当指定对象的属性可以被枚举出时，为 true。

####	eq
```js
var o, d;

o = { get foo() { return 17; } };
d = Object.getOwnPropertyDescriptor(o, "foo");
// d {
//   configurable: true,
//   enumerable: true,
//   get: /*the getter function*/,
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
// d {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

o = {};
Object.defineProperty(o, "baz", {
  value: 8675309,
  writable: false,
  enumerable: false
});
d = Object.getOwnPropertyDescriptor(o, "baz");
// d {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

###	Object.getOwnPropertyDescriptors() 
用来获取一个对象的所有自身属性的描述符。

####	语法
Object.getOwnPropertyDescriptors(obj)

####	参数
obj 任意对象

####	返回值
所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

####	eq
+	浅拷贝一个对象节
+	Object.assign() 方法只能拷贝源对象的可枚举的自身属性，同时拷贝时无法拷贝属性的特性们，而且访问器属性会被转换成数据属性，也无法拷贝源对象的原型，该方法配合 Object.create() 方法可以实现上面说的这些。
+ 
```js
Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
);
```

+	创建子类
+	创建子类的典型方法是定义子类，将其原型设置为超类的实例，然后在该实例上定义属性。这么写很不优雅，特别是对于 getters 和 setter 而言。 相反，您可以使用此代码设置原型：

```js
function superclass() {}
superclass.prototype = {
  // 在这里定义方法和属性
};
function subclass() {}
subclass.prototype = Object.create(superclass.prototype, Object.getOwnPropertyDescriptors({
  // 在这里定义方法和属性
}));
```

###	Object.getOwnPropertyNames()
返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。

####	语法
Object.getOwnPropertyNames(obj)

####	参数
obj 一个对象，其自身的可枚举和不可枚举属性的名称被返回。

####	返回值
在给定对象上找到的自身属性对应的字符串数组。

####	描述
Object.getOwnPropertyNames() 返回一个数组，该数组对元素是 obj自身拥有的枚举或不可枚举属性名称字符串。 数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义

####	eq
+	使用 Object.getOwnPropertyNames()

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

// 类数组对象
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]

// 使用Array.forEach输出属性名和属性值
Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
  console.log(val + " -> " + obj[val]);
});
// 输出
// 0 -> a
// 1 -> b
// 2 -> c

//不可枚举属性
var my_obj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
my_obj.foo = 1;

console.log(Object.getOwnPropertyNames(my_obj).sort()); // ["foo", "getFoo"]
```

+	如果你只要获取到可枚举属性，查看Object.keys或用for...in循环（还会获取到原型链上的可枚举属性，不过可以使用hasOwnProperty()方法过滤掉）。
+	下面的例子演示了该方法不会获取到原型链上的属性：

```js
function ParentClass() {}
ParentClass.prototype.inheritedMethod = function() {};

function ChildClass() {
  this.prop = 5;
  this.method = function() {};
}

ChildClass.prototype = new ParentClass;
ChildClass.prototype.prototypeMethod = function() {};

console.log(
  Object.getOwnPropertyNames(
    new ChildClass()  // ["prop", "method"]
  )
);
```

+	只获取不可枚举的属性
+	下面的例子使用了 Array.prototype.filter() 方法，从所有的属性名数组（使用Object.getOwnPropertyNames()方法获得）中去除可枚举的属性（使用Object.keys()方法获得），剩余的属性便是不可枚举的属性了：

```js
var target = myObject;
var enum_and_nonenum = Object.getOwnPropertyNames(target);
var enum_only = Object.keys(target);
var nonenum_only = enum_and_nonenum.filter(function(key) {
    var indexInEnum = enum_only.indexOf(key);
    if (indexInEnum == -1) {
        // 没有发现在enum_only健集中意味着这个健是不可枚举的,
        // 因此返回true 以便让它保持在过滤结果中
        return true;
    } else {
        return false;
    }
});

console.log(nonenum_only);
注：Array.filter(filt_func)方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
```

####	提示
在 ES5 中，如果参数不是一个原始对象类型，将抛出一个 TypeError  异常。在 ES2015 中，非对象参数被强制转换为对象 。

```js
Object.getOwnPropertyNames('foo');
// TypeError: "foo" is not an object (ES5 code)

Object.getOwnPropertyNames('foo');
// ['length', '0', '1', '2']  (ES2015 code)
```

###	Object.getOwnPropertySymbols() 
返回一个给定对象自身的所有 Symbol 属性的数组。

####	语法
Object.getOwnPropertySymbols(obj)

####	参数
obj 要返回 Symbol 属性的对象。

####	 返回值
在给定对象自身上找到的所有 Symbol 属性的数组。

####	描述
+	与Object.getOwnPropertyNames()类似，您可以将给定对象的所有符号属性作为 Symbol 数组获取。 请注意，Object.getOwnPropertyNames()本身不包含对象的 Symbol 属性，只包含字符串属性。
+	因为所有的对象在初始化的时候不会包含任何的 Symbol，除非你在对象上赋值了 Symbol 否则Object.getOwnPropertySymbols()只会返回一个空的数组。

####	eq
```js
var obj = {};
var a = Symbol("a");
var b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols)         // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0])      // Symbol(a)
```

###	Object.getPrototypeOf() 
返回指定对象的原型（内部[[Prototype]]属性的值）。

####	语法
Object.getPrototypeOf(object)

####	参数
obj 要返回其原型的对象。

####	返回值
给定对象的原型。如果没有继承属性，则返回 null 。

####	eq
```js
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true

var reg = /a/;
Object.getPrototypeOf(reg) === RegExp.prototype; // true
```

+	说明
	-	Object.getPrototypeOf(Object)  不是  Object.prototype

```js
JavaScript中的 Object 是构造函数（创建对象的包装器）。
一般用法是：
var obj = new Object();

所以：
Object.getPrototypeOf( Object );               // ƒ () { [native code] }
Object.getPrototypeOf( Function );             // ƒ () { [native code] }

Object.getPrototypeOf( Object ) === Function.prototype;        // true

Object.getPrototypeOf( Object )是把Object这一构造函数看作对象，
返回的当然是函数对象的原型，也就是 Function.prototype。

正确的方法是，Object.prototype是构造出来的对象的原型。
var obj = new Object();
Object.prototype === Object.getPrototypeOf( obj );              // true

Object.prototype === Object.getPrototypeOf( {} );               // true
```

+	在 ES5 中，如果参数不是一个对象类型，将抛出一个TypeError异常。在 ES2015 中，参数会被强制转换为一个 Object。

```js
Object.getPrototypeOf('foo');
// TypeError: "foo" is not an object (ES5 code)
Object.getPrototypeOf('foo');
// String.prototype                  (ES2015 code)
```

###	Object.is() 
判断两个值是否是相同的值。

####	语法
Object.is(value1, value2);

####	参数
+	value1 第一个需要比较的值。
+	value2 第二个需要比较的值。

####	返回值
表示两个参数是否相同的布尔值 。

####	描述
+	Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：
	-	两个值都是 undefined
	-	两个值都是 null
	-	两个值都是 true 或者都是 false
	-	两个值是由相同个数的字符按照相同的顺序组成的字符串
	-	两个值指向同一个对象
	-	两个值都是数字并且
		+	都是正零 +0
		+	都是负零 -0
		+	都是 NaN
		+	都是除零和 NaN 外的其它同一个数字
+	这种相等性判断逻辑和传统的 == 运算不同，== 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。
+	这与 === 运算符的判定方式也不一样。=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。

####	eq
```js
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false

Object.is(null, null);       // true

// 特例
Object.is(0, -0);            // false
Object.is(0, +0);            // true
Object.is(-0, -0);           // true
Object.is(NaN, 0/0);         // true
```

###	Object.isExtensible() 
判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

####	语法
Object.isExtensible(obj)

####	参数
obj 需要检测的对象

####	返回值
表示给定对象是否可扩展的一个Boolean 。

####	描述
+	默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 __ proto__ 属性可以被更改。Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）。

####	eq
```js
// 新对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty); // === true

// ...可以变的不可扩展.
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false

// 密封对象是不可扩展的.
var sealed = Object.seal({});
Object.isExtensible(sealed); // === false

// 冻结对象也是不可扩展.
var frozen = Object.freeze({});
Object.isExtensible(frozen); // === false
```

####	注意
在 ES5 中，如果参数不是一个对象类型，将抛出一个 TypeError 异常。在 ES6 中， non-object 参数将被视为一个不可扩展的普通对象，因此会返回 false 。

```js
Object.isExtensible(1);
// TypeError: 1 is not an object (ES5 code)

Object.isExtensible(1);
// false                         (ES6 code)
```

###	Object.isFrozen()
判断一个对象是否被冻结。

####	语法
Object.isFrozen(obj)

####	参数
obj 被检测的对象。

####	返回值
表示给定对象是否被冻结的Boolean。

####	描述
一个对象是冻结的是指它不可扩展，所有属性都是不可配置的，且所有数据属性（即没有getter或setter组件的访问器的属性）都是不可写的。

####	eq
```js
// 一个对象默认是可扩展的,所以它也是非冻结的.
Object.isFrozen({}); // === false

// 一个不可扩展的空对象同时也是一个冻结对象.
var vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen) //=== true;

// 一个非空对象默认也是非冻结的.
var oneProp = { p: 42 };
Object.isFrozen(oneProp) //=== false
```

```js
// 让这个对象变的不可扩展,并不意味着这个对象变成了冻结对象,
// 因为p属性仍然是可以配置的(而且可写的).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp) //=== false

// 此时,如果删除了这个属性,则它会成为一个冻结对象.
delete oneProp.p;
Object.isFrozen(oneProp) //=== true
```
```js
// 一个不可扩展的对象,拥有一个不可写但可配置的属性,则它仍然是非冻结的.
var nonWritable = { e: "plep" };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, "e", { writable: false }); // 变得不可写
Object.isFrozen(nonWritable) //=== false

// 把这个属性改为不可配置,会让这个对象成为冻结对象.
Object.defineProperty(nonWritable, "e", { configurable: false }); // 变得不可配置
Object.isFrozen(nonWritable) //=== true
```
```js
// 一个不可扩展的对象,拥有一个不可配置但可写的属性,则它仍然是非冻结的.
var nonConfigurable = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, "release", { configurable: false });
Object.isFrozen(nonConfigurable) //=== false

// 把这个属性改为不可写,会让这个对象成为冻结对象.
Object.defineProperty(nonConfigurable, "release", { writable: false });
Object.isFrozen(nonConfigurable) //=== true
```
```js
// 一个不可扩展的对象,值拥有一个访问器属性,则它仍然是非冻结的.
var accessor = { get food() { return "yum"; } };
Object.preventExtensions(accessor);
Object.isFrozen(accessor) //=== false

// ...但把这个属性改为不可配置,会让这个对象成为冻结对象.
Object.defineProperty(accessor, "food", { configurable: false });
Object.isFrozen(accessor) //=== true
```
```js
// 使用Object.freeze是冻结一个对象最方便的方法.
var frozen = { 1: 81 };
Object.isFrozen(frozen) //=== false
Object.freeze(frozen);
Object.isFrozen(frozen) //=== true

// 一个冻结对象也是一个密封对象.
Object.isSealed(frozen) //=== true

// 当然,更是一个不可扩展的对象.
Object.isExtensible(frozen) //=== false
```

####	注意
在 ES5 中，如果参数不是一个对象类型，将抛出一个TypeError异常。在 ES2015 中，非对象参数将被视为一个冻结的普通对象，因此会返回true。

```js
Object.isFrozen(1);
// TypeError: 1 is not an object (ES5 code)

Object.isFrozen(1);
// true                          (ES2015 code)
```

###	Object.isSealed()
判断一个对象是否被密封。

####	语法
Object.isSealed(obj)

####	参数
obj 要被检查的对象。

####	返回值
表示给定对象是否被密封的一个Boolean 。

####	描述
如果这个对象是密封的，则返回 true，否则返回 false。密封对象是指那些不可 扩展 的，且所有自身属性都不可配置且因此不可删除（但不一定是不可写）的对象。

####	例子
```js
// 新建的对象默认不是密封的.
var empty = {};
Object.isSealed(empty); // === false

// 如果你把一个空对象变的不可扩展,则它同时也会变成个密封对象.
Object.preventExtensions(empty);
Object.isSealed(empty); // === true

// 但如果这个对象不是空对象,则它不会变成密封对象,因为密封对象的所有自身属性必须是不可配置的.
var hasProp = { fee: "fie foe fum" };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // === false

// 如果把这个属性变的不可配置,则这个对象也就成了密封对象.
Object.defineProperty(hasProp, "fee", { configurable: false });
Object.isSealed(hasProp); // === true
```
```js
// 最简单的方法来生成一个密封对象,当然是使用Object.seal.
var sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // === true

// 一个密封对象同时也是不可扩展的.
Object.isExtensible(sealed); // === false

// 一个密封对象也可以是一个冻结对象,但不是必须的.
Object.isFrozen(sealed); // === true ，所有的属性都是不可写的
var s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // === false， 属性"p"可写

var s3 = Object.seal({ get p() { return 0; } });
Object.isFrozen(s3); // === true ，访问器属性不考虑可写不可写,只考虑是否可配置
```

####	注意
在ES5中，如果这个方法的参数不是一个对象（一个原始类型），那么它会导致TypeError。在ES2015中，非对象参数将被视为是一个密封的普通对象，只返回true。

```js
Object.isSealed(1);
// TypeError: 1 is not an object (ES5 code)

Object.isSealed(1);
// true                          (ES2015 code)

```

###	Object.keys() 
会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。如果对象的键-值都不可枚举，那么将返回由键组成的数组。

####	语法
Object.keys(obj)

####	参数
obj 要返回其枚举自身属性的对象。

####	返回值
一个表示给定对象的所有可枚举属性的字符串数组。

####	描述
Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的object上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。

####	eq
```js
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```

如果你想获取一个对象的所有属性,，甚至包括不可枚举的，请查看Object.getOwnPropertyNames。

####	注意
在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在ES2015中，非对象的参数将被强制转换为一个对象。

```js
Object.keys("foo");
// TypeError: "foo" is not an object (ES5 code)

Object.keys("foo");
// ["0", "1", "2"]                   (ES2015 code)

```

###	Object.preventExtensions()
让一个对象变的不可扩展，也就是永远不能再添加新的属性。

####	语法
Object.preventExtensions(obj)

####	参数
obj 将要变得不可扩展的对象。

####	返回值
已经不可扩展的对象。

####	描述
+	如果一个对象可以添加新的属性，则这个对象是可扩展的。Object.preventExtensions()将对象标记为不再可扩展，因此它将永远不会具有超出它被标记为不可扩展的属性。注意，一般来说，不可扩展对象的属性可能仍然可被删除。尝试将新属性添加到不可扩展对象将静默失败或抛出TypeError（最常见但不排除其他情况，如在strict mode中）。
+	Object.preventExtensions()仅阻止添加自身的属性。但属性仍然可以添加到对象原型。
+	一旦使其不可扩展，就无法再对象进行扩展。

####	eq
```js
// Object.preventExtensions将原对象变的不可扩展,并且返回原对象.
var obj = {};
var obj2 = Object.preventExtensions(obj);
obj === obj2;  // true
 
// 字面量方式定义的对象默认是可扩展的.
var empty = {};
Object.isExtensible(empty) //=== true
 
// ...但可以改变.
Object.preventExtensions(empty);
Object.isExtensible(empty) //=== false
```
```js
// 使用Object.defineProperty方法为一个不可扩展的对象添加新属性会抛出异常.
var nonExtensible = { removable: true };
Object.preventExtensions(nonExtensible);
Object.defineProperty(nonExtensible, "new", { value: 8675309 }); // 抛出TypeError异常
 
// 在严格模式中,为一个不可扩展对象的新属性赋值会抛出TypeError异常.
function fail()
{
  "use strict";
  nonExtensible.newProperty = "FAIL"; // throws a TypeError
}
fail();
 
// 一个不可扩展对象的原型是不可更改的,__proto__是个非标准魔法属性,可以更改一个对象的原型.
var fixed = Object.preventExtensions({});
fixed.__proto__ = { oh: "hai" }; // 抛出TypeError异常

```

+	在 ES5 中，如果参数不是一个对象类型，将抛出一个TypeError异常。在 ES2015 中，非对象参数将被视为一个不可扩展的普通对象，因此会被直接返回。

```js
Object.preventExtensions(1);
// TypeError: 1 is not an object (ES5 code)

Object.preventExtensions(1);
// 1                             (ES2015 code)
```

###	hasOwnProperty() 
会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

####	语法
obj.hasOwnProperty(prop)

####	参数
prop 要检测的属性的 String 字符串形式表示的名称，或者 Symbol。

####	返回值
用来判断某个对象是否含有指定的属性的布尔值 Boolean。

####	描述
所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

####	备注
即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。

```js
o = new Object();
o.propOne = null;
o.hasOwnProperty('propOne'); // 返回 true
o.propTwo = undefined;  
o.hasOwnProperty('propTwo'); // 返回 true
```

####	eq
+	使用 hasOwnProperty 方法判断属性是否存在
	-	下面的例子检测了对象 o 是否含有自身属性 prop：

```js
o = new Object();
o.hasOwnProperty('prop'); // 返回 false
o.prop = 'exists';
o.hasOwnProperty('prop'); // 返回 true
delete o.prop;
o.hasOwnProperty('prop'); // 返回 false
```

+	自身属性与继承属性
	-	下面的例子演示了 hasOwnProperty 方法对待自身属性和继承属性的区别：

```js
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
```

+	遍历一个对象的所有自身属性
	-	下面的例子演示了如何在遍历一个对象的所有属性时忽略掉继承属性，注意这里 for...in  循环只会遍历可枚举属性，所以不应该基于这个循环中没有不可枚举的属性而得出 hasOwnProperty 是严格限制于可枚举项目的（如同 Object.getOwnPropertyNames()）。

```js
var buz = {
  fog: 'stack'
};

for (var name in buz) {
  if (buz.hasOwnProperty(name)) {
    console.log('this is fog (' + 
      name + ') for sure. Value: ' + buz[name]);
  }
  else {
    console.log(name); // toString or something else
  }
}
```

+	使用 hasOwnProperty 作为属性名
	-	JavaScript 并没有保护 hasOwnProperty 这个属性名，因此，当某个对象可能自有一个占用该属性名的属性是，就需要使用外部的hasOwnProperty 获得正确的结果：

```js
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，
// 可以直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```

+	注意，只有在最后一种情况下，才不会新建任何对象。

###	isPrototypeOf() 
用于测试一个对象是否存在于另一个对象的原型链上。

####	注意
isPrototypeOf() 与 instanceof 运算符不同。在表达式 "object instanceof AFunction"中，object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。

####	语法
prototypeObj.isPrototypeOf(object)

####	参数
object 在该对象的原型链上搜寻

####	返回值
Boolean，表示调用对象是否在另一个对象的原型链上。

####	报错
TypeError
如果 prototypeObj 为 undefined 或 null，会抛出 TypeError。

####	描述
isPrototypeOf() 方法允许你检查一个对象是否存在于另一个对象的原型链上。

####	eq
+	本示例展示了 Baz.prototype, Bar.prototype, Foo.prototype 和 Object.prototype 在 baz 对象的原型链上：

```js
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

+	如果你有段代码只在需要操作继承自一个特定的原型链的对象的情况下执行，同 instanceof 操作符一样 isPrototypeOf() 方法就会派上用场，例如，为了确保某些方法或属性将位于对象上。
+	例如，检查 baz 对象是否继承自 Foo.prototype：

```js
if (Foo.prototype.isPrototypeOf(baz)) {
  // do something safe
}
```

###	propertyIsEnumerable() 
返回一个布尔值，表示指定的属性是否可枚举。

####	语法
obj.propertyIsEnumerable(prop)

####	参数
prop 需要测试的属性名。

####	返回值
用来表示指定的属性名是否可枚举的Boolean 。

####	描述
每个对象都有一个propertyIsEnumerable方法。此方法可以确定对象中指定的属性是否可以被for...in循环枚举，但是通过原型链继承的属性除外。如果对象没有指定的属性，则此方法返回false。

####	eq
+	propertyIsEnumerable方法的基本用法
	-	下面的例子演示了propertyIsEnumerable方法在普通对象和数组上的基本用法:

```js
var o = {};
var a = [];
o.prop = 'is enumerable';
a[0] = 'is enumerable';

o.propertyIsEnumerable('prop');   //  返回 true
a.propertyIsEnumerable(0);        // 返回 true
```

+	用户自定义对象和引擎内置对象
	-	下面的例子演示了用户自定义对象和引擎内置对象上属性可枚举性的区别.

```js
var a = ['is enumerable'];

a.propertyIsEnumerable(0);          // 返回 true
a.propertyIsEnumerable('length');   // 返回 false

Math.propertyIsEnumerable('random');   // 返回 false
this.propertyIsEnumerable('Math');     // 返回 false
```

+	自身属性和继承属性

```js
var a = [];
a.propertyIsEnumerable('constructor');         // 返回 false

function firstConstructor() {
  this.property = 'is not enumerable';
}

firstConstructor.prototype.firstMethod = function() {};

function secondConstructor() {
  this.method = function method() { return 'is enumerable'; };
}

secondConstructor.prototype = new firstConstructor;
secondConstructor.prototype.constructor = secondConstructor;

var o = new secondConstructor();
o.arbitraryProperty = 'is enumerable';

o.propertyIsEnumerable('arbitraryProperty');   // 返回 true
o.propertyIsEnumerable('method');              // 返回 true
o.propertyIsEnumerable('property');            // 返回 false

o.property = 'is enumerable';

o.propertyIsEnumerable('property');            // 返回 true

// 这些返回fasle，是因为，在原型链上propertyIsEnumerable不被考虑
// (尽管最后两个在for-in循环中可以被循环出来)。
o.propertyIsEnumerable('prototype');   // 返回 false (根据 JS 1.8.1/FF3.6)
o.propertyIsEnumerable('constructor'); // 返回 false
o.propertyIsEnumerable('firstMethod'); // 返回 false
```

###	toLocaleString() 
返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。

####	语法
obj.toLocaleString();

####	返回值
表示对象的字符串。

####	描述
+	Object toLocaleString 返回调用 toString() 的结果。
+	该函数提供给对象一个通用的toLocaleString 方法，即使不是全部都可以使用它。 见下面的列表。

###	toString() 
法返回一个表示该对象的字符串。

####	语法
obj.toString()

####	返回值
一个表示该对象的字符串。

####	描述
+	每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。以下代码说明了这一点：

```js
var o = new Object();
o.toString(); // returns [object Object]
```

+	注意：如的ECMAScript 5 和随后的 Errata 中所定义，从 JavaScript 1.8.5 开始，toString() 调用 null 返回[object Null]，undefined 返回 [object Undefined]。请参阅下面的使用 toString() 检测对象类型。

####	eq
+	覆盖默认的 toString 方法
+	可以自定义一个方法，来取代默认的 toString() 方法。该 toString() 方法不能传入参数，并且必须返回一个字符串。自定义的 toString() 方法可以是任何我们需要的值，但如果它附带有关对象的信息，它将变得非常有用。
+	以下代码定义了 Dog 对象类型，并创建了一个 Dog 类型的 theDog 对象：

```js
function Dog(name,breed,color,sex) {
  this.name = name;
  this.breed = breed;
  this.color = color;
  this.sex = sex;
}

var theDog = new Dog("Gabby", "Lab", "chocolate", "female");
```

+	如果当前的对象调用了 toString() 方法，它将会返回从 Object继承而来的 toString() 方法的返回默认值：

``` theDog.toString(); // 返回 [object Object]```

+	下面的代码中定义了一个叫做 dogToString() 的方法来覆盖默认的 toString() 方法。这个方法生成一个 "property = value;" 形式的字符串，该字符串包含了当前对象的 name、breed、color 和 sex 的值。

```js
Dog.prototype.toString = function dogToString() {
 var ret = "Dog " + this.name + " is a " + this.sex + " " + this.color + " " + this.breed;
 return ret;
}
也可以这样写

Dog.prototype.toString = function dogToString() {
  return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`;
}
```

+	使用上述代码，任何时候在字符串上下文中使用 theDog.toString() 时，JavaScript 都会自动调用 dogToString() 方法（dogToString() 可以是一个匿名函数），并且返回以下字符串：

```"Dog Gabby is a female chocolate Lab"```

+	使用 toString() 检测对象类型
+	可以通过 toString() 来获取每个对象的类型。为了每个对象都能通过 Object.prototype.toString() 来检测，需要以 Function.prototype.call() 或者 Function.prototype.apply() 的形式来调用，传递要检查的对象作为第一个参数，称为 thisArg。

```js
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

###	valueOf() 
返回指定对象的原始值。

####	语法
object.valueOf()

####	返回值
返回值为该对象的原始值。

####	描述节
+	JavaScript调用valueOf方法将对象转换为原始值。你很少需要自己调用valueOf方法；当遇到要预期的原始值的对象时，JavaScript会自动调用它。
+	默认情况下，valueOf方法由Object后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。如果对象没有原始值，则valueOf将返回对象本身。
+	JavaScript的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的valueOf()方法的返回值和返回值类型均可能不同。

+	不同类型对象的valueOf()方法的返回值

|  对象   |   返回值    |
| :-- | :---- | 
|Array	|返回数组对象本身。|
|Boolean	|布尔值。|
|Date	|存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。|
|Function	|函数本身。|
|Number|	数字值。|
|Object	|对象本身。这是默认情况。|
|String|	字符串值。|
||Math 和 Error 对象没有 valueOf 方法。|

+	你可以在自己的代码中使用valueOf将内置对象转换为原始值。 创建自定义对象时，可以覆盖Object.prototype.valueOf()来调用自定义方法，而不是默认Object方法。

+	覆盖自定义对象的 valueOf方法
	-	你可以创建一个取代 valueOf方法的函数，你的方法必须不能传入参数。
	-	假设你有个对象叫 MyNumberType而你想为它创建一个valueOf方法。下面的代码为valueOf方法赋予了一个自定义函数：
	-	```MyNumberType.prototype.valueOf = function() { return customPrimitiveValue; };```
	-	有了这样的一个方法，下一次每当MyNumberType要被转换为原始类型值时，JavaScript 在此之前会自动调用自定义的valueOf方法。
	-	valueOf方法一般都会被 JavaScript 自动调用，但你也可以像下面代码那样自己调用：
	-	```myNumberType.valueOf()```

+	注意：字符串上下文中的对象通过 toString()方法转换，这与使用valueOf转换为原始字符串的String对象不同。所有对象都能转换成一个“[object 类型]”这种格式的字符串。但是很多对象不能转换为数字，布尔或函数。

####	eq
+	使用 valueOf

```js
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array);   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
console.log(date.valueOf());   // 1376838719230

// Number：返回数字值
var num =  15.26540;
console.log(num.valueOf());   // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
console.log(bool.valueOf() === bool);   // true
```
```js
// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
console.log(newBool.valueOf() == newBool);   // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
console.log(newBool.valueOf() === newBool);   // false

// Function：返回函数本身
function foo(){}
console.log( foo.valueOf() === foo );   // true
var foo2 =  new Function("x", "y", "return x + y;");
console.log( foo2.valueOf() );
/*
ƒ anonymous(x,y
) {
return x + y;
}
*/
```
```js
// Object：返回对象本身
var obj = {name: "张三", age: 18};
console.log( obj.valueOf() === obj );   // true

// String：返回字符串值
var str = "http://www.xyz.com";
console.log( str.valueOf() === str );   // true

// new一个字符串对象
var str2 = new String("http://www.xyz.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
console.log( str2.valueOf() === str2 );   // false
```

+	改写 .prototype.valueof

```js
function MyNumberType(n) {
    this.number = n;
}

MyNumberType.prototype.valueOf = function() {
    return this.number;
};

var myObj = new MyNumberType(4);
myObj + 3; // 7
```

###	Object.seal()
封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。

####	语法
Object.seal(obj)

####	参数
obj 将要被密封的对象。

####	返回值
被密封的对象。

####	描述
+	通常，一个对象是可扩展的（可以添加新的属性）。密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出TypeError（在严格模式 中最常见的，但不唯一）。
+	不会影响从原型链上继承的属性。但 __proto__ (  ) 属性的值也会不能修改。
+	返回被密封对象的引用。

####	eq
```js
var obj = {
  prop: function() {},
  foo: 'bar'
};

// New properties may be added, existing properties
// may be changed or removed.
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;
```
```js
var o = Object.seal(obj);

o === obj; // true
Object.isSealed(obj); // === true

// Changing property values on a sealed object
// still works.
obj.foo = 'quux';

// But you can't convert data properties to accessors,
// or vice versa.
Object.defineProperty(obj, 'foo', {
  get: function() { return 'g'; }
}); // throws a TypeError
```
```js
// Now any changes, other than to property values,
// will fail.
obj.quaxxor = 'the friendly duck';
// silently doesn't add the property
delete obj.foo;
// silently doesn't delete the property

// ...and in strict mode such attempts
// will throw TypeErrors.
function fail() {
  'use strict';
  delete obj.foo; // throws a TypeError
  obj.sparky = 'arf'; // throws a TypeError
}
fail();

// Attempted additions through
// Object.defineProperty will also throw.
Object.defineProperty(obj, 'ohai', {
  value: 17
}); // throws a TypeError
Object.defineProperty(obj, 'foo', {
  value: 'eit'
}); // changes existing property value

```

####	注意
+	在ES5中，如果这个方法的参数不是一个（原始）对象，那么它将导致TypeError。在ES2015中，非对象参数将被视为已被密封的普通对象，会直接返回它。

```js
Object.seal(1);
// TypeError: 1 is not an object (ES5 code)

Object.seal(1);
// 1                             (ES2015 code)
```

+	对比 Object.freeze()
使用Object.freeze()冻结的对象中的现有属性是不可变的。用Object.seal()密封的对象可以改变其现有属性。

###	Object.values()
返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

####	语法
Object.values(obj)

####	参数
obj 被返回可枚举属性值的对象。

####	返回值
一个包含对象自身的所有可枚举属性值的数组

####	描述
Object.values()返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与通过手动循环对象的属性值所给出的顺序相同。

####	eq
```js
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']

// array like object with random key ordering
// when we use numeric keys, the value returned in a numerical order according to the keys
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
var my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values('foo')); // ['f', 'o', 'o']
```