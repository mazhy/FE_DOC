#	DOM
文档对象模型(DOM, Document Object Model) 主要用于对HTML文档的内容进行操作, DOM把html文档表达成一个节点树, 通过对节点进行操作, 实现对文档内容的增删改查的功能

##	DOM节点
+	DOM节点就是HTML上所有的内容
	-	文档节点
	- 	元素节点(标签)
	-  元素属性节点
	-  文本节点
	-  注释节点
	
###	新增节点
+	document.createElement 还能支持创建当前浏览器不支持的标签 名，在IE6-8下，这是一个著名的hack。

| 代码 | 描述 |
|:-- | :-- | 
| document.createElement('元素名') | 创建新的元素节点 |
| document.createAttribute('属性名') | 创建新的属性节点 |
| document.createTextNode('文本内容') | 创建新的文本节点 | 
| document.createComment('注释节点') | 创建新的注释节点 |
| document.createDocumentFragment() | 创建新的片段节点 |

```js
var comment = document.createComment("A comment");
var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;
for (var i = 0; i < 3; i++){
	li = document.createElement("li");
	li.appendChild(document.createTextNode("Item " + (i+1)));
	fragment.appendChild(li);
}
ul.appendChild(fragment);
document.body.insertBefore(comment, document.body.firstChild);
```

###	添加节点
+	appendChild() : 向父节点的最后一个子节点后追加新节点
+	p.appendChild(pText)

```js
var myUl = document.getElementById('myUl');
var txt = document.createTextNode('4');
var li = document.createElement('li');
var firstLi = myUl.firstElementChild;
li.appendChild(txt);
myUl.appendChild(li);
var returnedNode = myUl.appendChild(firstLi);

var myUl = document.getElementById('myUl');
var newNode = myUl.cloneNode(true);
console.log(newNode);

var myUl = document.getElementById('myUl');
var txt = document.createTextNode('4');
var liNew = document.createElement('li');
liNew.appendChild(txt);
myUl.insertBefore(liNew, myUl.lastElementChild);

var myUl = document.getElementById('myUl');
var txt = document.createTextNode('4');
var liNew = document.createElement('li');
liNew.appendChild(txt);
var li2 = myUl.children.item(1);
var returnNode = myUl.replaceChild(liNew, li2);
console.log(returnNode);

var div = document.createElement("div");
var textNode = document.createTextNode("DOM探索之节点操作篇");
div.appendChild(textNode);
document.body.appendChild(div);
var newNode = div.firstChild.splitText(5);
console.log(div.firstChild.nodeValue);
console.log(newNode.nodeValue);
console.log(div.childNodes.length);
```

###	查找节点
| 代码 | 描述 |
|:-- | :-- | 
| getElementById('id 属性值') | 返回拥有指定id的第一个对象的引用 |
| getElementsByName('name 属性值')| 返回拥有指定名称的对象结合 |
| getElementsByTagName('标签名')| 返回拥有指定标签名的对象集合| 
| getElementsByClassName('class属性值') | 返回拥有指定class的对象集合|
| querySelector('css选择器')| 仅返回第一个匹配的元素|
| querySelectorAll('css选择器')| 返回所有匹配的元素 |

```js
var myDiv = document.getElementById('myDiv');

var lis1 = ul.getElementsByClassName('light');
var lis2 = ul.getElementsByClassName('light dark');

var citys = document.getElementsByName('city');

var lis1 = document.getElementsByTagName('li');

var myDiv = document.getElementById('myDiv');
var ul = document.querySelector('#myUl');
var li = myDiv.querySelector('li:last-child');

var myDiv = document.getElementById('myDiv');
var ul = myDiv.querySelectorAll('ul');
var li = myDiv.querySelectorAll('li');
var span = myDiv.querySelectorAll('span');
```

```js
// 兼容性
var getElementsByClassName = function(opts) {
	var searchClass = opts.searchClass; // 存储要查找的类名
	var node = opts.node || document;  // 存储要出查找的范围
	var tag = opts.tag || '*'; // 存储一定范围内要查找的标签
	var result = [];
		// 判断浏览器支不支持getElementsByClassName方法
	if (document.getElementsByClassName) { // 如果浏览器支持
		var nodes = node.getElementsByClassName(searchClass);
		if (tag !== "*") {
			for (var i = 0; node = nodes[i++];) {
				if (node.tagName === tag.toUpperCase()) {
					result.push(node);
				}
			}
		} else { 
			result = nodes;
		}
		return result;
	} else { // 使用IE8以下的浏览器能够支持该属性
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var i, j;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) { // 检测正则表达式
				result[j] = els[i];
				j++;
			}
		}
		return result;
	}
}
```

###	删除节点
| 代码 | 描述 |
|:-- | :-- | 
|removeChild() | 删除子节点, 返回值为删除节点 |

```js
var myUl = document.getElementById('myUl');
console.log(myUl.childNodes.length);
var secondChild = myUl.removeChild(myUl.childNodes[1]);

var myUl = document.getElementById('myUl');
var removedNode = myUl.removeNode(true);

var myUl = document.getElementById('myUl');
myUl.parentNode.removeChild(myUl);
```

### 遍历节点
```js
// 1
var box = document.getElementById("box");
var nodes = box.childNodes;

function makeArray(nodeList){
  var arr = null;
  try {
    return Array.prototype.slice.call(nodeList);
  }catch (e){
    arr = new Array();
    for(var i = 0, len = nodeList.length; i < len; i++){
      arr.push(nodeList[i]);
    }
  }
  return arr;
}

var newNodeList = makeArray(nodes);

//2
var box = document.getElementById("box");
for(var i = 0, len = box.childElementCount; i < len; i++) {
  console.log(box.children[i]);
}
```


##	事件
事件就是文档或浏览器窗口中发生的一些特定的交互瞬间
 
###	HTML事件
+	语法 ```<tag 事件= "执行脚本"></tag>```
+ 	功能: 在html元素上绑定事件
+  说明: 执行脚本可以是一个函数的调用
+  缺点: 违反了结构与行为的分离

###	DOM0级事件
+	语法: 	ele.事件 = 执行脚本
+ 	功能: 	在DOM对象上绑定事件
+  	说明: 	执行脚本可以是一个匿名函数, 也可以是一个函数的调用
+   缺点: 虽然实现了结构和行为的分离, 但是只能绑定一个事件,再绑定就会覆盖掉之前的事件


##	DOM属性
###	property
固有属性
	
###	attribute
 
###	区别
+	attribute属性在html上设置, 会反应在html代码上, 两者同步, 而property属性则可以看做是COM对象的键值对, 用点(.)操作符对他们进行操作, 实际编程中,基本上的DOM操作都是使用property的点操作符, 只有以下两种情况使用attribute
	-	自定义HTML attributes, 因为他不能同步到DOM property上
	- 	访问内置 HTML attributes, 这些attribute不能从property 同步过来, 例如input标签的value值 
 
###	布尔属性
布尔属性只要有值就可以

+	checked
+ 	selected
+  readonly
+  disabled
+  multiple
+  hidden
+  contentEditable
+  async
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 