#	Function
Function 构造函数 创建一个新的Function对象。 在 JavaScript 中, 每个函数实际上都是一个Function对象。

##	语法
new Function ([arg1[, arg2[, ...argN]],] functionBody)

##	参数
+	arg1, arg2, ... argN:被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的JavaScript标识符的字符串，或者一个用逗号分隔的有效字符串的列表;例如“×”，“theValue”，或“A，B”。
+	functionBody: 一个含有包括函数定义的JavaScript语句的字符串。

##	描述
+	使用Function构造器生成的Function对象是在函数创建时解析的。这比你使用函数声明或者函数表达式(function)并在你的代码中调用更为低效，因为使用后者创建的函数是跟其他代码一起解析的。
+	所有被传递到构造函数中的参数，都将被视为将被创建的函数的参数，并且是相同的标示符名称和传递顺序。
+	注意: 使用Function构造器生成的函数，并不会在创建它们的上下文中创建闭包；它们一般在全局作用域中被创建。当运行这些函数的时候，它们只能访问自己的本地变量和全局变量，不能访问Function构造器被调用生成的上下文的作用域。这和使用带有函数表达式代码的 eval 不同。
+	以调用函数的方式调用Function的构造函数 (不是用new关键字) 跟以构造函数来调用是一样的.

##	属性和方法
全局的Function对象没有自己的属性和方法, 但是, 因为它本身也是函数，所以它也会通过原型链从Function.prototype上继承部分属性和方法。


##	属性
###	length
length 属性指明函数的形参个数。

####	描述
+	length 是函数对象的一个属性值，指该函数有多少个必须要传入的参数，即形参的个数。
+	形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
+	与之对比的是，  arguments.length 是函数被调用时实际传参的个数。

####	Function 构造器的属性
Function 构造器本身也是个Function。他的 length 属性值为 1 。该属性 Writable: false, Enumerable: false, Configurable: true.

####	Function.prototype 对象的属性
Function.prototype  对象的 length 属性值为 0 。

####	eq
```js
console.log(Function.length); /* 1 */

console.log((function()        {}).length); /* 0 */
console.log((function(a)       {}).length); /* 1 */
console.log((function(a, b)    {}).length); /* 2 etc. */

console.log((function(...args) {}).length); 
// 0, rest parameter is not counted

console.log((function(a, b = 1, c) {}).length);
// 1, only parameters before the first one with 
// a default value is counted
```

##	方法
###	apply
调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

####	注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

####	语法
func.apply(thisArg, [argsArray])

####	参数
+	thisArg: 可选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
+	argsArray: 可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数。

####	返回值
调用有指定this值和参数的函数的结果。

####	描述节
+	在调用一个存在的函数时，你可以为其指定一个 this 对象。 this 指当前对象，也就是正在调用这个函数的对象。 使用 apply， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。
+	apply 与 call() 非常相似，不同之处在于提供参数的方式。apply 使用参数数组而不是一组参数列表。apply 可以使用数组字面量（array literal），如 fun.apply(this, ['eat', 'bananas'])，或数组对象， 如  fun.apply(this, new Array('eat', 'bananas'))。
+	你也可以使用 arguments对象作为 argsArray 参数。 arguments 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。 你可以使用arguments来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。
+	从 ECMAScript 第5版开始，可以使用任何种类的类数组对象，就是说只要有一个 length 属性和(0..length-1)范围的整数属性。例如现在可以使用 NodeList 或一个自己定义的类似 {'length': 2, '0': 'eat', '1': 'bananas'} 形式的对象。

####	eq
+	用 apply 将数组添加到另一个数组: 我们可以使用push将元素追加到数组中。并且，因为push接受可变数量的参数，我们也可以一次推送多个元素。但是，如果我们传递一个数组来推送，它实际上会将该数组作为单个元素添加，而不是单独添加元素，因此我们最终得到一个数组内的数组。如果那不是我们想要的怎么办？在这种情况下，concat确实具有我们想要的行为，但它实际上并不附加到现有数组，而是创建并返回一个新数组。

```js
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

+	使用apply和内置函数: 聪明的apply用法允许你在某些本来需要写成遍历数组变量的任务中使用内建的函数。在接下里的例子中我们会使用Math.max/Math.min来找出一个数组中的最大/最小值。

```js
/* 找出数组中最大/小的数字 */
var numbers = [5, 6, 2, 3, 7];

/* 应用(apply) Math.min/Math.max 内置函数完成 */
var max = Math.max.apply(null, numbers); /* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);

/* 代码对比： 用简单循环完成 */
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i];
  if (numbers[i] < min) 
    min = numbers[i];
}
```

###	bind
创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

####	语法
function.bind(thisArg[, arg1[, arg2[, ...]]])

####	参数
+	thisArg:调用绑定函数时作为this参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用bind在setTimeout中创建一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。如果bind函数的参数列表为空，执行作用域的this将被视为新函数的thisArg。
+ 	arg1, arg2, ...: 当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。


####	返回值
返回一个原函数的拷贝，并拥有指定的this值和初始参数。

####	描述节
+	bind() 函数会创建一个新绑定函数（bound function，BF）。绑定函数是一个exotic function object（怪异函数对象，ECMAScript 2015中的术语），它包装了原函数对象。调用绑定函数通常会导致执行包装函数。
绑定函数具有以下内部属性：
	-	[[BoundTargetFunction]] - 包装的函数对象
	-	[[BoundThis]] - 在调用包装函数时始终作为this值传递的值。
	-	[[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
	-	[[Call]] - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。
+	当调用绑定函数时，它调用[[BoundTargetFunction]]上的内部方法[[Call]]，就像这样Call(boundThis, args)。其中，boundThis是[[BoundThis]]，args是[[BoundArguments]]加上通过函数调用传入的参数列表。
+	绑定函数也可以使用new运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的this值会被忽略，但前置参数仍会提供给模拟函数。

####	eq
#####	创建绑定函数
bind() 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：

```js
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

####	偏函数
bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为bind()的参数写在this后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37); 

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]

var result2 = addThirtySeven(5); 
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```

####	配合 setTimeout节
在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或global）对象。当类的方法中需要 this 指向类的实例时，你可能需要显式地把 this 绑定到回调函数，就不会丢失该实例的引用。

```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```
###	call
使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

####	语法
fun.call(thisArg, arg1, arg2, ...)

####	参数
+	thisArg:	在 fun 函数运行时指定的 this 值。if(thisArg == undefined|null) this = window，if(thisArg == number|boolean|string) this == new Number()|new Boolean()| new String()
+	arg1, arg2, ... :指定的参数列表。

####	返回值
使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

####	描述
+	call() 允许为不同的对象分配和调用属于一个对象的函数/方法。
+	call() 提供新的 this 值给当前调用的函数/方法。你可以使用 call 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

####	eq
#####	使用 call 方法调用父构造函数
在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，类似于 Java 中的写法。下例中，使用 Food 和 Toy 构造函数创建的对象实例都会拥有在 Product 构造函数中添加的 name 属性和 price 属性,但 category 属性是在各自的构造函数中定义的。

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

#####	使用 call 方法调用匿名函数
在下例中的 for 循环体内，我们创建了一个匿名函数，然后通过调用该函数的 call 方法，将每个数组元素作为指定的 this 值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个 print 方法，这个 print 方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为 this 值传入那个匿名函数（普通参数就可以），目的是为了演示 call 的用法。

```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
```

#####	使用 call 方法调用函数并且指定上下文的 'this'
在下面的例子中，当调用 greet 方法的时候，该方法的this值会绑定到 obj 对象。

```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

#####	使用 call 方法调用函数并且不指定第一个参数（argument）
在下面的例子中，我们调用了 display 方法，但并没有传递它的第一个参数。如果没有传递第一个参数，this 的值将会被绑定为全局对象。

```js
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
注意：在严格模式下，this 的值将会是 undefined。见下文。

'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call(); // Cannot read the property of 'sData' of undefined

```

###	toString
返回一个表示当前函数源代码的字符串。

####	语法
function.toString()

####	返回值
表示函数源代码的一个字符串

####	描述
+	Function对象覆盖了从Object继承来的toString 方法。对于用户定义的 Function 对象，toString方法返回一个字符串，其中包含用于定义函数的源文本段。
+	在Function需要转换为字符串时，通常会自动调用函数的 toString 方法。
+	若 this 不是 Function 对象，则 toString() 方法将抛出 TypeError  ("Function.prototype.toString called on incompatible object") 异常，比如 Proxy 对象就会抛出异常。
+	Function.prototype.toString.call('foo'); // TypeError
如果是在内置函数或由 Function.prototype.bind 返回的函数上调用 toString()，则toString() 返回原生代码字符串，如下
+	"function () {\n    [native code]\n}"
+	若是在由 Function 构造器生成的函数上调用 toString() ，则 toString() 返回创建后的函数源码，包括形参和函数体，函数名为 "anonymous"。










