#	数组Array
##	Array
JavaScript的 Array 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。

###	语法
[element0, element1, ..., elementN]
new Array(element0, element1[, ...[, elementN]])
new Array(arrayLength)

###	参数
+	elementN: Array 构造器会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 arrayLength 参数）。注意，后面这种情况仅适用于用 Array 构造器创建数组，而不适用于用方括号创建的数组字面量。
+	arrayLength:一个范围在 0 到 232-1 之间的整数，此时将返回一个 length 的值等于 arrayLength 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素，不能理所当然地认为它包含 arrayLength 个值为 undefined 的元素）。如果传入的参数不是有效值，则会抛出 RangeError 异常。

###	描述
数组是一种类列表对象，它的原型中提供了遍历和修改元素的相关操作。JavaScript 数组的长度和元素类型都是非固定的。因为数组的长度可随时改变，并且其数据在内存中也可以不连续，所以 JavaScript 数组不一定是密集型的，这取决于它的使用方式。一般来说，数组的这些特性会给使用带来方便，但如果这些特性不适用于你的特定使用场景的话，可以考虑使用类型数组 TypedArray。

只能用整数作为数组元素的索引，而不能用字符串。后者称为关联数组。使用非整数并通过方括号或点号来访问或设置数组元素时，所操作的并不是数组列表中的元素，而是数组对象的属性集合上的变量。数组对象的属性和数组元素列表是分开存储的，并且数组的遍历和修改操作也不能作用于这些命名属性。

###	eq
+	访问数组元素
+	JavaScript 数组的索引是从0开始的，第一个元素的索引为0，最后一个元素的索引等于该数组的长度减1。如果指定的索引是一个无效值，JavaScript 数组并不会报错，而是会返回 undefined。

```js
var arr = ['this is the first element', 'this is the second element', 'this is the last element'];
console.log(arr[0]);              // 打印 'this is the first element'
console.log(arr[1]);              // 打印 'this is the second element'
console.log(arr[arr.length - 1]); // 打印 'this is the last element'
```

+	虽然数组元素可以看做是数组对象的属性，就像 toString 一样，但是下面的写法是错误的，运行时会抛出 SyntaxError 异常，而原因则是使用了非法的属性名：

```js
console.log(arr.0); // a syntax error
```

+	并不是 JavaScript 数组有什么特殊之处，而是因为在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号。比如，如果一个对象有一个名为 3d 的属性，那么只能用方括号来引用它。下面是具体的例子：

```js
var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
console.log(years.0);   // 语法错误
console.log(years[0]);  // √
renderer.3d.setTexture(model, 'character.png');     // 语法错误
renderer['3d'].setTexture(model, 'character.png');  // √
```

+	注意在 3d 那个例子中，引号是必须的。你也可以将数组的索引用引号引起来，比如 years[2] 可以写成 years['2']。 years[2] 中的 2 会被 JavaScript 解释器通过调用 toString 隐式转换成字符串。正因为这样，'2' 和 '02' 在 years 中所引用的可能是不同位置上的元素。而下面这个例子也可能会打印 true：

```js
console.log(years['2'] != years['02']);
```

+	类似地，如果对象的属性名称是保留字（最好不要这么做！），那么就只能通过字符串的形式用方括号来访问（从 firefox 40.0a2 开始也支持用点号访问了）：

```js
var promise = {
  'var'  : 'text',
  'array': [1, 2, 3, 4]
};

console.log(promise['var']);
```

+	length 和数字下标之间的关系
+	JavaScript 数组的 length 属性和其数字下标之间有着紧密的联系。数组内置的几个方法（例如 join、slice、indexOf 等）都会考虑 length 的值。另外还有一些方法（例如 push、splice 等）还会改变 length 的值。

```js
var fruits = [];
fruits.push('banana', 'apple', 'peach');

console.log(fruits.length); // 3
```

+	使用一个合法的下标为数组元素赋值，并且该下标超出了当前数组的大小的时候，解释器会同时修改 length 的值：

```js
fruits[5] = 'mango';
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits));  // ['0', '1', '2', '5']
console.log(fruits.length); // 6
```

+	也可以显式地给 length 赋一个更大的值：

```js
fruits.length = 10;
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
```

+	而为 length 赋一个更小的值则会删掉一部分元素：

```js
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```

###	属性
+	Array.length Array 构造函数的 length 属性，其值为1（注意该属性为静态属性，不是数组实例的 length 属性）。
+	get Array[@@species] 返回 Array 构造函数。
+	Array.prototype 通过数组的原型对象可以为所有数组对象添加属性。

##		静态方法
###	Array.from()
从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例

####	描述
+	Array.from() 可以通过以下方式来创建数组对象：
	1.	伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
	2.	可迭代对象（可以获取对象中的元素,如 Map和 Set 等）
+	Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。也就是说	Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 除非创建的不是可用的中间数组。 这对一些数组的子类,如  typed arrays 来说很重要, 因为中间数组的值在调用 map() 时需要是适当的类型。

####	语法
Array.from(arrayLike[, mapFn[, thisArg]])

####	参数
+	arrayLike: 想要转换成数组的伪数组对象或可迭代对象。
+	mapFn (可选参数):如果指定了该参数，新数组中的每个元素会执行该回调函数。
+	thisArg (可选参数):可选参数，执行回调函数 mapFn 时 this 对象。

####	返回值
一个新的数组实例

####	eq
```js
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

Array.from('foo'); 
// ["f", "o", "o"]

let s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]

// 箭头函数
Array.from([1, 2, 3], x => x + x);  
// x => x + x代表这是一个函数，只是省略了其他的定义，这是一种Lambda表达式的写法
// 箭头的意思表示从当前数组中取出一个值，然后自加，并将返回的结果添加到新数组中    
// [2, 4, 6]
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]

// 数据去重合并
function combine(){ 
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));                     // [1, 2, 3]
```

###	Array.isArray()
Array.isArray() 用于确定传递的值是否是一个 Array。

####	语法
Array.isArray(obj)

####	参数
obj 为要检测的值

####	返回值
如果对象是 Array，则为true; 否则为false。

####	eq
```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
```

### Array.of()
+	Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
+	Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。

####	语法
Array.of(element0[, element1[, ...[, elementN]]])

####	参数
elementN: 任意个参数，将按顺序成为返回数组中的元素。

####	返回值
新的 Array 实例。

####	eq
```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

##		实例方法
###	concat
用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

####	语法
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])

####	参数
valueN可选: 将数组和/或值连接成新数组。

####	返回值
新的 Array 实例

####	描述
+	concat方法创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素（如果参数是数组）或参数本身（如果参数不是数组）。它不会递归到嵌套数组参数中。
+	concat方法不会改变this或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。 原始数组的元素将复制到新数组中，如下所示：
	1.	对象引用（而不是实际对象）：concat将对象引用复制到新数组中。 原始数组和新数组都引用相同的对象。 也就是说，如果引用的对象被修改，则更改对于新数组和原始数组都是可见的。 这包括也是数组的数组参数的元素。
	2.	数据类型如字符串，数字和布尔（不是String，Number 和 Boolean 对象）：concat将字符串和数字的值复制到新数组中。

####	eq
```js
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];
alpha.concat(numeric);
// result in ['a', 'b', 'c', 1, 2, 3]

var alpha = ['a', 'b', 'c'];
var alphaNumeric = alpha.concat(1, [2, 3]);
console.log(alphaNumeric); 
// results in ['a', 'b', 'c', 1, 2, 3]
```

###	entries() 
返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对

####	语法
arr.entries()

####	返回值
一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。]

####	eq
```js
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);
// 返回的是一个Iterator
/*Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/

var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());

/*{value: Array(2), done: false}
          done:false
          value:(2) [0, "a"]
           __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key","value"]的数组，是返回的迭代器中的元素值。

var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];
// for(var i=0; i< arr.length; i++){   // 实际使用的是这个 
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}
    
console.log(a);                         // 遍历完毕，输出next.value的数组

// for of循环
var arr = ["a", "b", "c"];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```

###	every() 
1.	测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值
2.	若收到一个空数组，此方法在一切情况下都会返回 true

####	语法
arr.every(callback[, thisArg])

####	参数
+	callback
	-	用来测试每个元素的函数，它可以接收三个参数：
		1.	element: 用于测试的当前值。
		2.	index可选: 用于测试的当前值的索引。
		3.	array可选:	调用 every 的当前数组。
+	thisArg: 执行 callback 时使用的 this 值。

####	返回值
如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false。

####	描述
+	every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个会使 callback 返回 falsy 的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true，every 就会返回 true。
+	callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。
+	callback 在被调用时可传入三个参数：元素值，元素的索引，原数组。
+	如果为 every 提供一个 thisArg 参数，则该参数为调用 callback 时的 this 值。如果省略该参数，则 callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。
+	every 不会改变原数组。
+	every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到。如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。
+	every 和数学中的"所有"类似，当所有的元素都符合条件才会返回true。正因如此，若传入一个空数组，无论如何都会返回 true。（这种情况属于无条件正确：正因为一个空集合没有元素，所以它其中的所有元素都符合给定的条件。)

####	eq
```js
// 是否都大于10
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
// 箭头函数
[12, 5, 8, 130, 44].every(x => x >= 10); // false
[12, 54, 18, 130, 44].every(x => x >= 10); // true
```

###	fill() 
用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

####	语法
arr.fill(value[, start[, end]])

####	参数
1.	value: 用来填充数组元素的值。
2.	start 可选: 起始索引，默认值为0。
3.	end 可选: 终止索引，默认值为 this.length。

####	返回值
修改后的数组。

####	描述
+	fill 方法接受三个参数 value, start 以及 end. start 和 end 参数是可选的, 其默认值分别为 0 和 this 对象的 length 属性值。
+	如果 start 是个负数, 则开始索引会被自动计算成为 length+start, 其中 length 是 this 对象的 length 属性值。如果 end 是个负数, 则结束索引会被自动计算成为 length+end。
+	fill 方法故意被设计成通用方法, 该方法不要求 this 是数组对象。
+	fill 方法是个可变方法, 它会改变调用它的 this 对象本身, 然后返回它, 而并不是返回一个副本。
+	当一个对象被传递给 fill方法的时候, 填充数组的是这个对象的引用。

####	eq
```js
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}

// Objects by reference.
var arr = Array(3).fill({}) // [{}, {}, {}];
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

###	filter() 
创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

####	语法
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

####	参数
+	callback:	用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
	1.	element:数组中当前正在处理的元素。
	2.	index可选:正在处理的元素在数组中的索引。
	3.	array可选:调用了 filter 的数组本身。
+	thisArg可选: 执行 callback 时，用于 this 的值

####	返回值
一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

####	描述
+	filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。
+	callback 被调用时传入三个参数：
	1.	元素的值
	2.	元素的索引
	3.	被遍历的数组本身
+	如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。callback 函数最终观察到的 this 值是根据通常函数所看到的 "this"的规则确定的。
+	filter 不会改变原数组，它返回过滤后的新数组。
+	filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

####	eq
```js
// 返回大于10的新数组
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44] 
```


###	 find() 
返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

####	语法
arr.find(callback[, thisArg])

####	参数
+	callback:	在数组每一项上执行的函数，接收 3 个参数：
	1.	element:	当前遍历到的元素。
	2.	index可选:	当前遍历到的索引。
	3.	array可选:	数组本身。
+	thisArg可选:	执行回调时用作this 的对象。

####	返回值
数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。

####	描述
+	find方法对数组中的每一项元素执行一次 callback 函数，直至有一个 callback 返回 true。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。注意 callback 函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法。
+	callback函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。
+	如果提供了 thisArg参数，那么它将作为每次 callback函数执行时的this ，如果未提供，则使用 undefined。
+	find方法不会改变数组。
+	在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到，但是其值已经是undefined了。

####	eq
```js
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];
function findCherries(fruit) { 
    return fruit.name === 'cherries';
}
console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }

```

###	findIndex()
返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

####	语法
arr.findIndex(callback[, thisArg])

####	参数
+	callback:	针对数组中的每个元素, 都会执行该回调函数, 执行时会自动传入下面三个参数:
	1.	element:	当前元素。
	2.	index: 当前元素的索引。
	3.	array:调用findIndex的数组。
+	thisArg:	可选。执行callback时作为this对象的值.

####	返回值
数组中通过提供测试函数的第一个元素的索引。否则，返回-1

####	描述
+	findIndex方法对数组中的每个数组索引0..length-1（包括）执行一次callback函数，直到找到一个callback函数返回真实值（强制为true）的值。如果找到这样的元素，findIndex会立即返回该元素的索引。如果回调从不返回真值，或者数组的length为0，则findIndex返回-1。 与某些其他数组方法（如Array#some）不同，在稀疏数组中，即使对于数组中不存在的条目的索引也会调用回调函数。
+	回调函数调用时有三个参数：元素的值，元素的索引，以及被遍历的数组。
+	如果一个 thisArg 参数被提供给 findIndex, 它将会被当作this使用在每次回调函数被调用的时候。如果没有被提供，将会使用undefined。
+	findIndex不会修改所调用的数组。
+	在第一次调用callback函数时会确定元素的索引范围，因此在findIndex方法开始执行之后添加到数组的新元素将不会被callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍然会被访问到。

####	eq
```js
//以下示例查找数组中素数的元素的索引（如果不存在素数，则返回-1）。
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}
console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

###	flat()  (Edge 不支持)
会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

####	语法
var newArray = arr.flat([depth])

####	参数
depth 可选: 指定要提取嵌套数组的结构深度，默认值为 1。

####	返回值
一个包含将数组与子数组中所有元素的新数组。

####	eq
```js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]

// flat() 方法会移除数组中的空项:
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]

```

###	flatMap() 
首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。

####	语法
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])

####	参数
+	callback:	可以生成一个新数组中的元素的函数，可以传入三个参数：
	1.	currentValue: 当前正在数组中处理的元素
	2.	index可选: 可选的。数组中正在处理的当前元素的索引。
	3.	array可选: 可选的。被调用的 map 数组
+	thisArg可选:	可选的。执行 callback 函数时 使用的this 值。

####	返回值
 一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。

####	eq
```js
var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
```

###	forEach() 
对数组的每个元素执行一次提供的函数。

####	语法
arr.forEach(callback[, thisArg]);

####	参数
+	callback:	为数组中每个元素执行的函数，该函数接收三个参数：
	1.	currentValue:数组中正在处理的当前元素。
	2.	index可选:数组中正在处理的当前元素的索引。
	3.	array可选:forEach() 方法正在操作的数组。
+	thisArg可选:	可选参数。当执行回调函数时用作 this 的值(参考对象)。

####	返回值
undefined

####	注意
没有办法中止或者跳出 forEach() 循环，除了抛出一个异常。如果你需要这样，使用 forEach() 方法是错误的。

####	描述
+	forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。
+	callback 函数会被依次传入三个参数：
	1.	数组当前项的值
	2.	数组当前项的索引
	3.	数组对象本身
+	如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象。callback 函数最终可观察到 this 值，这取决于函数观察到 this 的常用规则。
+	forEach 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。已删除的项不会被遍历到。如果已访问的元素在迭代时被删除了（例如使用 shift()），之后的元素将被跳过 - 参见下面的示例。
+	forEach() 为每个数组元素执行callback函数；不像 map() 或者 reduce()，它总是返回 undefined 值，并且不可链式调用。典型用例是在一个链的最后执行副作用。
+	forEach() 被调用时，不会改变原数组（即调用它的数组），即使传递的参数里的 callback被调用时可能会改变原数组。（译注：此处说法似不够准确，可参考EMCA语言规范：'forEach does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.'，即forEach不直接改变调用它的对象，但是对象可能会被callback改变。）

####	eq
```js
const items = ['item1', 'item2', 'item3'];
const copy = [];

// before
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}

// after
items.forEach(function(item){
  copy.push(item);
});

//2
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}
// 注意索引 2 被跳过了，因为在数组的这个位置没有项
[2, 5, , 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
```

###	includes() 
用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false

#### 注意
*对象数组不能使用includes方法来检测。*

####	语法
arr.includes(valueToFind[, fromIndex])

####	参数
+	valueToFind:需要查找的元素值。
	-	Note:  使用 includes()比较字符串和字符时是区分大小写。
+	fromIndex 可选
	-	从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

####	返回值
返回一个布尔值 Boolean ，如果在数组中找到了（如果传入了 fromIndex ，表示在 fromIndex 指定的索引范围中找到了）则返回 true 。

####	eq
```js
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true

//如果 fromIndex 大于等于数组的长度，则会返回 false，且该数组不会被搜索。
var arr = ['a', 'b', 'c'];
arr.includes('c', 3);   // false
arr.includes('c', 100); // false

//如果 fromIndex 为负值，计算出的索引将作为开始搜索searchElement的位置。如果计算出的索引小于 0，则整个数组都会被搜索。
// array length is 3
// fromIndex is -100
// computed index is 3 + (-100) = -97
var arr = ['a', 'b', 'c'];
arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
arr.includes('a', -2); // false

// includes() 方法有意设计为通用方法。它不要求this值是数组对象，
//	所以它可以被用于其他类型的对象 (比如类数组对象)。
//	下面的例子展示了在函数的 arguments 对象上调用的 includes() 方法。
(function() {
  console.log([].includes.call(arguments, 'a')); // true
  console.log([].includes.call(arguments, 'd')); // false
})('a','b','c');
```

###	indexOf()
返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

####	语法
+	arr.indexOf(searchElement)
+	arr.indexOf(searchElement[, fromIndex = 0])

####	参数
+	searchElement:要查找的元素
+	fromIndex:	开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

####	返回值
首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

####	eq
```js
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```

###	join()
将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

####	语法
arr.join([separator])

####	参数
+	separator :指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略()，数组元素用逗号分隔。默认为 ","。如果separator是空字符串("")，则所有元素之间都没有任何字符。

####	返回值
一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串。

####	描述
+	所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。
+	如果一个元素为 undefined 或 null，它会被转换为空字符串。

####	eq
```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
```

###	keys() 
返回一个包含数组中每个索引键的Array Iterator对象。

####	语法
arr.keys()

####	返回值
一个新的 Array 迭代器对象。

####	eq
```js
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```

###	lastIndexOf() 
返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

####	语法
arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])

####	参数
+	searchElement:被查找的元素。
+	fromIndex:从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

####	返回值
数组中最后一个元素的索引，如未找到返回-1

####	eq
```js
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3
```

###	map() 
创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

####	语法
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])

####	参数
+	callback:生成新数组元素的函数，使用三个参数：
	1.	currentValue:callback 数组中正在处理的当前元素。
	2.	index可选:	callback 数组中正在处理的当前元素的索引。
	3.	array可选:callback  map 方法被调用的数组。
+	thisArg可选:执行 callback 函数时使用的this 值。

####	返回值
一个新数组，每个元素都是回调函数的结果。

####	描述
+	map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
+	callback 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。
+	如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象 。
+	map 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）。
+	使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了。在 map 方法执行的过程中：原数组中新增加的元素将不会被 callback 访问到；若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

####	eq
```js
//求数组中每个元素的平方根
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]

var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
```

###	pop()
从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

####	语法
arr.pop()

#### 返回值
从数组中删除的元素(当数组为空时返回undefined)。

####	描述
+	pop 方法从一个数组中删除并返回最后一个元素。
+	pop 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined。
+	如果你在一个空数组上调用 pop()，它返回  undefined。

####	eq
```js
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish); 
// ["angel", "clown", "mandarin"]

console.log(popped); 
// surgeon
```

###	push()
将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

####	语法
arr.push(element1, ..., elementN)

####	参数
elementN: 被添加到数组末尾的元素。

####	返回值
当调用该方法时，新的 length 属性值将被返回。

####	描述
+	push方法将值追加到数组中。
+	push 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
+	唯一的原生类数组（array-like）对象是 Strings，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

####	eq
```js
// 添加元素
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports); 
// ["soccer", "baseball", "football", "swimming"]

console.log(total);  
// 4

// 合并数组
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables); 
// ['parsnip', 'potato', 'celery', 'beetroot']
```

###	reverse() 
+	将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组。
+	reverse 方法颠倒数组中元素的位置，并返回该数组的引用。

####	语法
 arr.reverse()

####	eq
```js
var sourceArray = ['one', 'two', 'three'];
var reverseArray = sourceArray.reverse();

console.log(sourceArray ) // ['three', 'two', 'one']
console.log(sourceArray === reverseArray); // true
```

###	reduce() 
对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

####	语法
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

####	参数
+	callback:	执行数组中每个值的函数，包含四个参数：
	1.	accumulator:累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。
	2.	currentValue:	数组中正在处理的元素。
	3.	currentIndex可选:	数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
	4.	array可选:调用reduce()的数组
+	initialValue可选:	作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

####	返回值
函数累计处理的结果

####	描述
+	reduce为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：:
	1.	Accumulator (acc) (累计器)
	2.	Current Value (cur) (当前值)
	3.	Current Index (idx) (当前索引)
	4.	Source Array (src) (源数组)
+	您的 reducer 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。
+	回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。

####	注意
+	如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。
+  如果数组为空且没有提供initialValue，会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。

####	eq
```js
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );
                        
// 数组求和
var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
// 和为 6
var total = [ 0, 1, 2, 3 ].reduce(
  ( acc, cur ) => acc + cur,
  0
);

//累加对象数组里的值
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
},initialValue)

console.log(sum) // logs 6

var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    ,initialValue
);

console.log(sum) // logs 6

//将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
 ( acc, cur ) => acc.concat(cur),
 []
);

//计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

// 数组去重
let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```

###	reduceRight() 
接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

####	语法
arr.reduceRight(callback[, initialValue])

####	参数
+	callback:	一个回调函数，用来操作数组中的每个元素，可接受四个参数：
	1.	previousValue:上一次调用回调的返回值，或提供的 initialValue
	2.	currentValue:当前被处理的元素
	3.	index:	当前处理元素的索引
	4.	array:调用 reduce 的数组
+	initialValue 可作为第一次调用回调 callback 的第一个参数

####	返回值
执行之后的返回值

####	描述
+	reduceRight 为数组中每个元素调用一次 callback 回调函数，但是数组中被删除的索引或从未被赋值的索引会跳过。回调函数接受四个参数：初始值（或上次调用回调的返回值）、当前元素值、当前索引，以及调用 reduce 的数组。
+	可以像下面这样调用 reduceRight 的回调函数 callback：

```js
array.reduceRight(function(previousValue, currentValue, index, array) {
    // ...
});
```

+	首次调用回调函数时，previousValue 和 currentValue 可以是两个值之一。如果调用 reduceRight 时提供了 initialValue 参数，则 previousValue 等于 initialValue，currentValue 等于数组中的最后一个值。如果没有提供 initialValue 参数，则 previousValue 等于数组最后一个值， currentValue 等于数组中倒数第二个值。
+	如果数组为空，且没有提供 initialValue 参数，将会抛出一个 TypeError 错误。如果数组只有一个元素且没有提供 initialValue 参数，或者提供了 initialValue 参数，但是数组为空将会直接返回数组中的那一个元素或 initialValue 参数，而不会调用 callback。
+	该函数的完整执行过程见下例：

```js
[0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
});
```

+	如果提供了一个 initialValue 参数，则结果如下：

```js
[0, 1, 2, 3, 4].reduceRight(function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
}, 10);
```

####	eq
```js
// 扁平化（flatten）一个元素为数组的数组
var flattened = [[0, 1], [2, 3], [4, 5]].reduceRight(function(a, b) {
    return a.concat(b);
}, []);
// flattened is [4, 5, 2, 3, 0, 1]

//reduce 与 reduceRight 之间的区别
var a = ['1', '2', '3', '4', '5']; 
var left  = a.reduce(function(prev, cur)      { return prev + cur; }); 
var right = a.reduceRight(function(prev, cur) { return prev + cur; }); 

console.log(left);  // "12345"
console.log(right); // "54321"
```

###	shift() 
从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

####	返回值
从数组中删除的元素; 如果数组为空则返回undefined 。 

####	语法
arr.shift()

####	描述
+	shift 方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。如果 length 属性的值为 0 (长度为 0)，则返回 undefined。
+	shift 方法并不局限于数组：这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

####	eq
```js
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 shift 之前: ' + myFish);
// "调用 shift 之前: angel,clown,mandarin,surgeon"

var shifted = myFish.shift(); 

console.log('调用 shift 之后: ' + myFish); 
// "调用 shift 之后: clown,mandarin,surgeon" 

console.log('被删除的元素: ' + shifted); 
// "被删除的元素: angel"
```

###	slice()
返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

####	语法
arr.slice([begin[, end]])

####	参数
+	begin 可选
	-	提取起始处的索引，从该索引开始提取原数组元素，默认为 0。
	-	如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
	-	如果省略 begin，则 slice 从索引 0 开始。
	-	如果 begin 大于原数组的长度，则会返回空数组。
+	end 可选
	-	提取终止处的索引，在该索引处结束提取原数组元素，默认为 0。slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
	-	slice(1,4) 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。
	-	如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
	-	如果 end 被省略，则slice 会一直提取到原数组末尾。
	-	如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。

####	返回值
一个含有被提取元素的新数组。

####	描述
+	slice 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：
	-	如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
	-	对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。
+	如果向两个数组任一中添加了新元素，则另一个不会受到影响。

####	eq
```js
//	返回现有数组的一部分
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']

//slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。你只需将该方法绑定到这个对象上。
// 一个函数中的  arguments 就是一个类数组对象的例子。
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
//	除了使用 Array.prototype.slice.call(arguments)，
//	你也可以简单的使用 [].slice.call(arguments) 来代替。另外，你可以使用 bind 来简化该过程。

var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);

function list() {
  return slice(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

###	some() 
+	测试数组中是不是有元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
+ 	如果用一个空数组进行测试，在任何情况下它返回的都是false。

####	语法
arr.some(callback(element[, index[, array]])[, thisArg])

####	参数
+	callback:	用来测试每个元素的函数，接受三个参数：
	-	element:数组中正在处理的元素。
	-	index 可选:	数组中正在处理的元素的索引值。
	-	array可选:	some()被调用的数组。
+	thisArg可选:执行 callback 时使用的 this 值。

####	返回值
只要数组中有一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false

####	描述
+	some() 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，some() 将会立即返回 true。否则，some() 返回 false。callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
+	callback 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。
+	将会把它传给被调用的 callback，作为 this 值。否则，在非严格模式下将会是全局对象，严格模式下是 undefined。
+	some() 被调用时不会改变数组。
+	some() 遍历的元素的范围在第一次调用 callback. 时就已经确定了。在调用 some() 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some() 访问到它那一刻的值。

####	eq
```js
//测试数组元素的值
//下面的例子检测在数组中是否有元素大于 10。

function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
//使用箭头函数测试数组元素的值
//箭头函数 可以通过更简洁的语法实现相同的用例.

[2, 5, 8, 1, 4].some(x => x > 10);  // false
[12, 5, 8, 1, 4].some(x => x > 10); // true
//判断数组元素中是否存在某个值
//此例中为模仿 includes()  方法, 若元素在数组中存在, 则回调函数返回值为 true :

var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return arr.some(function(arrVal) {
    return val === arrVal;
  });
}

checkAvailability(fruits, 'kela');   // false
checkAvailability(fruits, 'banana'); // true

//使用箭头函数判断数组元素中是否存在某个值
var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
  return arr.some(arrVal => val === arrVal);
}

checkAvailability(fruits, 'kela');   // false
checkAvailability(fruits, 'banana'); // true

//将任意值转换为布尔类型
var TRUTHY_VALUES = [true, 'true', 1];

function getBoolean(value) {
  'use strict';
   
  if (typeof value === 'string') { 
    value = value.toLowerCase().trim();
  }

  return TRUTHY_VALUES.some(function(t) {
    return t === value;
  });
}

getBoolean(false);   // false
getBoolean('false'); // false
getBoolean(1);       // true
getBoolean('true');  // true
```

####	toString() 
一个字符串，表示指定的数组及其元素。

####	语法
arr.toString()

####	返回值
一个表示指定的数组及其元素的字符串。

####	描述
+	Array对象覆盖了Object的 toString 方法。对于数组对象，toString 方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。
+	当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。

###	unshift() 
将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

####	语法
arr.unshift(element1, ..., elementN)

####	参数列表
elementN: 要添加到数组开头的元素或多个元素。

####	返回值
当一个对象调用该方法时，返回其 length 属性值。

####	描述
+	unshift 方法会在调用它的类数组对象的开始位置插入给定的参数。
+	unshift 特意被设计成具有通用性；这个方法能够通过 call 或 apply 方法作用于类数组对象上。不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。
+	注意, 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致。 于是，传入多个参数调用一次 unshift ，和传入一个参数调用多次 unshift (例如，循环调用)，它们将得到不同的结果

####	eq
```js
let arr = [4,5,6];
arr.unshift(1,2,3);
console.log(arr); // [1, 2, 3, 4, 5, 6]

arr = [4,5,6]; // 重置数组
arr.unshift(1);
arr.unshift(2);
arr.unshift(3);
console.log(arr); // [3, 2, 1, 4, 5, 6]

let arr = [1, 2];

arr.unshift(0); // result of the call is 3, which is the new array length
// arr is [0, 1, 2]

arr.unshift(-2, -1); // the new array length is 5
// arr is [-2, -1, 0, 1, 2]

arr.unshift([-4, -3]); // the new array length is 6
// arr is [[-4, -3], -2, -1, 0, 1, 2]

arr.unshift([-7, -6], [-5]); // the new array length is 8
// arr is [ [-7, -6], [-5], [-4, -3], -2, -1, 0, 1, 2 ]
```

###	values() && @@iterator
+	返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
+	@@iterator 属性和 Array.prototype.values() 属性的初始值均为同一个函数对象。

####	语法
arr.values()

####	eq
```js
// 使用 for...of 循环进行迭代
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
// 您的浏览器必须支持 for..of 循环
// 以及 let —— 将变量作用域限定在 for 循环中
for (let letter of eArr) {
  console.log(letter);
}
// 另一种迭代方式
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
console.log(eArr.next().value); // k
console.log(eArr.next().value); // o
console.log(eArr.next().value); // p

```

###	sort() 
+	用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的
+	由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。

####	语法
arr.sort([compareFunction])

####	参数
+	compareFunction 可选: 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
	-	firstEl:第一个用于比较的元素。
	-	secondEl:第二个用于比较的元素。

####	返回值
排序后的数组。请注意，数组已原地排序，并且不进行复制。

####	描述
+	如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
+	如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：
+	如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
+	如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
+	如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
+	compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
+	所以，比较函数格式如下：

```js
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
//要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

function compareNumbers(a, b) {
  return a - b;
}
```
```js
//sort 方法可以使用 函数表达式 方便地书写：

var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

//也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);

// [1, 2, 3, 4, 5]
```
```js
//对象可以按照某个属性排序：

var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});

// sort by name
items.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  
// names must be equal

  return 0;
});
```

####	eq
```js
//	创建、显示及排序数组
//	下述示例创建了四个数组，并展示原数组。之后对数组进行排序。对比了数字数组分别指定与不指定比较函数的结果。

var stringArray = ["Blue", "Humpback", "Beluga"];
var numericStringArray = ["80", "9", "700"];
var numberArray = [40, 1, 5, 200];
var mixedNumericArray = ["80", "9", "700", 40, 1, 5, 200];

function compareNumbers(a, b)
{
  return a - b;
}

console.log('stringArray:' + stringArray.join());
console.log('Sorted:' + stringArray.sort());

console.log('numberArray:' + numberArray.join());
console.log('Sorted without a compare function:'+ numberArray.sort());
console.log('Sorted with compareNumbers:'+ numberArray.sort(compareNumbers));

console.log('numericStringArray:'+ numericStringArray.join());
console.log('Sorted without a compare function:'+ numericStringArray.sort());
console.log('Sorted with compareNumbers:'+ numericStringArray.sort(compareNumbers));

console.log('mixedNumericArray:'+ mixedNumericArray.join());
console.log('Sorted without a compare function:'+ mixedNumericArray.sort());
console.log('Sorted with compareNumbers:'+ mixedNumericArray.sort(compareNumbers));
```
```js
// 该示例的返回结果如下。输出显示，当使用比较函数后，数字数组会按照数字大小排序。

stringArray: Blue,Humpback,Beluga
Sorted: Beluga,Blue,Humpback

numberArray: 40,1,5,200
Sorted without a compare function: 1,200,40,5
Sorted with compareNumbers: 1,5,40,200

numericStringArray: 80,9,700
Sorted without a compare function: 700,80,9
Sorted with compareNumbers: 9,80,700

mixedNumericArray: 80,9,700,40,1,5,200
Sorted without a compare function: 1,200,40,5,700,80,9
Sorted with compareNumbers: 1,5,9,40,80,200,700
```

```js
//对非 ASCII 字符排序
//当排序非 ASCII 字符的字符串（如包含类似 e, é, è, a, ä 等字符的字符串）。
//一些非英语语言的字符串需要使用 String.localeCompare。这个函数可以将函数排序到正确的顺序。

var items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];
items.sort(function (a, b) {
  return a.localeCompare(b);
});

// items is ['adieu', 'café', 'cliché', 'communiqué', 'premier', 'réservé']
```
```js
//使用映射改善排序
//compareFunction 可能需要对元素做多次映射以实现排序，尤其当 compareFunction 较为复杂，
//且元素较多的时候，某些 compareFunction 可能会导致很高的负载。
//使用 map 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index];
});
```

###	splice() 
通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

####	语法
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

####	参数
+	start​:指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
+	deleteCount 可选:
	1.	整数，表示要移除的数组元素的个数。
	2.	如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
	3.	如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
	4.	如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。
+	item1, item2, ... 可选:要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

####	返回值
由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

####	描述
如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

####	eq
```js
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

```

```js
从第 2 位开始删除 0 个元素，插入“drum”
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```
```js
从第 2 位开始删除 0 个元素，插入“drum” 和 "guitar"
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum', 'guitar');

// 运算后的 myFish: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```
```js
从第 3 位开始删除 1 个元素
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素: ["mandarin"]
```
```js
从第 2 位开始删除 1 个元素，插入“trumpet”
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");

// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]
// 被删除的元素: ["drum"]
```
```js
从第 0 位开始删除 2 个元素，插入"parrot"、"anemone"和"blue"
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

// 运算后的 myFish: ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// 被删除的元素: ["angel", "clown"]
```
```js
从第 2 位开始删除 2 个元素
var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = myFish.splice(myFish.length - 3, 2);

// 运算后的 myFish: ["parrot", "anemone", "sturgeon"]
// 被删除的元素: ["blue", "trumpet"]
```
```js
从倒数第 2 位开始删除 1 个元素
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(-2, 1);

// 运算后的 myFish: ["angel", "clown", "sturgeon"]
// 被删除的元素: ["mandarin"]
```
```js
从第 2 位开始删除所有元素
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]
```

###	copyWithin() 
浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

####	语法
arr.copyWithin(target[, start[, end]])

####	参数
+	target
	1.	0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
	2.	如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
+	start
	1.	0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
	2.	如果 start 被忽略，copyWithin 将会从0开始复制。
+	end
	1.	0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
	2.	如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。

####	返回值
改变后的数组。

####	描述
+	参数 target、start 和 end 必须为整数。
+	如果 start 为负，则其指定的索引位置等同于 length+start，length 为数组的长度。end 也是如此。
+	copyWithin 方法不要求其 this 值必须是一个数组对象；除此之外，copyWithin 是一个可变方法，它可以改变 this 对象本身，并且返回它，而不仅仅是它的拷贝。
+	copyWithin 就像 C 和 C++ 的 memcpy 函数一样，且它是用来移动 Array 或者 TypedArray 数据的一个高性能的方法。复制以及粘贴序列这两者是为一体的操作;即使复制和粘贴区域重叠，粘贴的序列也会有拷贝来的值。
+	copyWithin 函数被设计为通用式的，其不要求其 this 值必须是一个数组对象。
+	copyWithin 是一个可变方法，它不会改变 this 的长度 length，但是会改变 this 本身的内容，且需要时会创建新的属性。

####	eq
```js
var array1 = ['a', 'b', 'c', 'd', 'e'];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```

```js
let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2);
// [1, 2, 3, 1, 2]

numbers.copyWithin(0, 3);
// [4, 5, 3, 4, 5]

numbers.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

numbers.copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}

// ES2015 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES2015 compliant: 
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```




















