# 什么是W3C标准
我最怕看到你，代码乱的不行，标准是程序员的规范，必须遵守！
##什么是DOCTYPE
DOCTYPE是document type(文档类型)的简写，用来说明你用的XHTML或者HTML是什么版本。其中的DTD(例如xhtml1-transitional.dtd)叫文档类型定义，里面包含了文档的规则，浏览器就根据你定义的DTD来解释你页面的标识，并展现出来。要建立符合标准的网页，DOCTYPE声明是必不可少的关键组成部分；除非你的XHTML确定了一个正确的DOCTYPE，否则你的标识和CSS都不会生效。
XHTML 1.0 提供了三种DTD声明可供选择：

+	过渡的(Transitional)：要求非常宽松的DTD，它允许你继续使用HTML4.01的标识(但是要符合xhtml的写法)。 
完整代码如下：

```js
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

+	严格的(Strict)：要求严格的DTD，你不能使用任何表现层的标识和属性，例如br。 完整代码如下：

```js
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

+	框架的(Frameset)：专门针对框架页面设计使用的DTD，如果你的页面中包含有框架，需要采用这种DTD。
完整代码如下：

```js
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

注：DOCTYPE声明必须放在每一个XHTML文档最顶部，在所有代码和标识之上。

##名字空间 namespace
```js
<html xmlns="http://www.w3.org/1999/xhtml" lang="gb2312">
```

通常我们HTML4.0的代码只是html，这里的"xmlns"是什么呢？
这个“xmlns”是XHTML namespace的缩写，叫做“名字空间”声明。XHTML是HTML向XML过渡的标识语言，它需要符合XML文档规则，因此也需要定义名字空间。又因为XHTML1.0不能自定义标识，所以它的名字空间都相同，就是"http://www.w3.org/1999/xhtml"。目前阶段我们只要照抄代码就可以了。

##定义语言编码
```js
<meta http-equiv=“Content-Type” content=“text/html; charset=gb2312” />
```

为了被浏览器正确解释和通过W3C代码校验，所有的XHTML文档都必须声明它们所使用的编码语言，我们一般使用gb2312(简体中文)，制作多国语言页面也有可能用Unicode、ISO-8859-1等，根据你的需要定义。
注：如果忘记了定义语言编码,可能就会出现,你在DW(dreamweaver)做完一个页面，第二次打开时所有的中文变成了乱码。
##	javascript定义
```js
Js必须要用  <script language="javascript" type="text/javascript">
来开头定义，而不是原来的  <script language=javascript>  或干脆直接  <script>，
并且需要加个注释符   <!--   -->，  以保证不在不支持js的浏览器上直接显示出代码来。 

<script language="javascript" type="text/javascript"> 
//<![CDATA[ 
function show_layout(selObj){ 
var n = selObj.options[selObj.selectedIndex].value; 
document.getElementById('stylesheet').href = n; 
} 
//]]> 
</script> 
```
##CSS定义
```js
CSS必须要用<style type=“text/css”>开头来定义，而不是原来的直接<style>，
也不建议直接写在内容代码里如：<div style=”padding-left:20px;”></div>，并需要加个注释符<!-- --> 

为保证各浏览器的兼容性，在写CSS时请都写上数量单位，
例如：错误：.space_10{padding-left:10} 正确：.space_10 {padding-left:10px}

<style type="text/css" media="screen"> 
<!-- 
body {margin:0px;padding:0px;font-size:12px;text-align:center} 
--> 
</style>
```
##不要在注释内容中使用“--”
```js
“--”只能发生在XHTML注释的开头和结束，也就是说，在内容中它们不再有效。
例如下面的代码是无效的：<!--这里是注释-----------这里是注释-->
正确的应用等号或者空格替换内部的虚线。<!--这里是注释============这里是注释-->
```
##所有标签的元素和属性的名字都必须使用小写
```js
与HTML不一样，XHTML对大小写是敏感的，<title>和<TITLE>是不同的标签。
XHTML要求所有的标签和属性的名字都必须使用小写。
例如：<BODY>必须写成<body>。大小写夹杂也是不被认可的，
通常dreamweaver自动生成的属性名字"onMouseOver"也必须修改成"onmouseover"。
```
##所有的属性必须用引号""括起来
```js
在HTML中，你可以不需要给属性值加引号，但是在XHTML中，它们必须被加引号。
例如：<height=80>必须修改为：<height="80">。
特殊情况，你需要在属性值里使用双引号，你可以用"，单引号可以使用&apos;，例如：<alt="say&apos;hello&apos;">
```
##把所有<和&特殊符号用编码表示
```js
任何小于号（<），不是标签的一部分，都必须被编码为 &lt;
任何大于号（>），不是标签的一部分，都必须被编码为 &gt;
任何与号（&），不是实体的一部分的，都必须被编码为 &amp; 
错误：
http://club.china.alibaba.com/forum/thread/search_forum.html?action=SearchForum&doSearchForum=true&main=1&catcount=10&keywords=mp3 
正确：
http://club.china.alibaba.com/forum/thread/search_forum.html?action=SearchForum&amp;doSearchForum=true&amp;main=1&amp;catcount=10&amp;keywords=mp3
```
##给所有属性赋一个值
```js
XHTML规定所有属性都必须有一个值，没有值的就重复本身。例如： 
<td nowrap><input type="checkbox" name="shirt" value="medium" checked>必须修改为：
<td nowrap="nowrap"><input type="checkbox" name="shirt" value="medium" checked="checked" />
```
##所有的标记都必须要有一个相应的结束标记
```js
以前在HTML中，你可以打开许多标签，例如<p>和<li>而不一定写对应的</p>和</li>来关闭它们。
但在XHTML中这是不合法的。XHTML要求有严谨的结构，所有标签必须关闭。如果是单独不成对的标签，在标签最后加一个"/"来关闭它。 
```
##所有的标记都必须合理嵌套 
```js
同样因为XHTML要求有严谨的结构，因此所有的嵌套都必须按顺序，以前我们这样写的代码： 
<p><b></p></b>必须修改为：<p><b></b></p> 
```
##图片添加有意义的alt属性
```js
例如：<img src="logo.gif" width="100" height="100" align="middle" boder="0" alt="w3cschool" />
尽可能的让作为内容的图片都带有属于自己的alt属性。
同理：添加文字链接的title属性。
<a href="#" target="_blank" title="新闻新闻新闻新闻">新闻新闻…</a>，在一些限定字数的内容展示尤为重要，帮助显示不完成的内容显示完整，而不用考虑页面会因此而撑大
```

##在form表单中增加lable，以增加用户友好度 
```js
<form action="http://somesite.com/prog/adduser" method="post">
  <label for="firstname">first name: </label>
  <input type="text" id="firstname" />
  <label for="lastname">last name: </label>
  <input type="text" id="lastname" />
</form>

```