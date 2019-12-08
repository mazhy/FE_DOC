<div data-v-6fd303ac="" class="entry-content article-content"><h1 class="heading" data-id="heading-0">JS 基础知识点及常考面试题（二）</h1>
<p>在这一章节中我们继续来了解 JS 的一些常考和容易混乱的基础知识点。</p>
<h2 class="heading" data-id="heading-1">== vs ===</h2>
<blockquote class="warning"><p>涉及面试题：== 和 === 有什么区别？
</p></blockquote><p>对于 <code>==</code> 来说，如果对比双方的类型<strong>不一样</strong>的话，就会进行<strong>类型转换</strong>，这也就用到了我们上一章节讲的内容。</p>
<p>假如我们需要对比 <code>x</code> 和 <code>y</code> 是否相同，就会进行如下判断流程：</p>
<ol>
<li>首先会判断两者类型是否<strong>相同</strong>。相同的话就是比大小了</li>
<li>类型不相同的话，那么就会进行类型转换</li>
<li>会先判断是否在对比 <code>null</code> 和 <code>undefined</code>，是的话就会返回 <code>true</code></li>
<li>判断两者类型是否为 <code>string</code> 和 <code>number</code>，是的话就会将字符串转换为 <code>number</code><pre><code class="hljs js" lang="js"><span class="hljs-number">1</span> == <span class="hljs-string">'1'</span>
      ↓
<span class="hljs-number">1</span> ==  <span class="hljs-number">1</span>
</code></pre></li>
<li>判断其中一方是否为 <code>boolean</code>，是的话就会把 <code>boolean</code> 转为 <code>number</code> 再进行判断<pre><code class="hljs js" lang="js"><span class="hljs-string">'1'</span> == <span class="hljs-literal">true</span>
        ↓
<span class="hljs-string">'1'</span> ==  <span class="hljs-number">1</span>
        ↓
 <span class="hljs-number">1</span>  ==  <span class="hljs-number">1</span>
</code></pre></li>
<li>判断其中一方是否为 <code>object</code> 且另一方为 <code>string</code>、<code>number</code> 或者 <code>symbol</code>，是的话就会把 <code>object</code> 转为原始类型再进行判断<pre><code class="hljs js" lang="js"><span class="hljs-string">'1'</span> == { <span class="hljs-attr">name</span>: <span class="hljs-string">'yck'</span> }
        ↓
<span class="hljs-string">'1'</span> == <span class="hljs-string">'[object Object]'</span>
</code></pre></li>
</ol>
<blockquote class="warning"><p>思考题：看完了上面的步骤，对于 [] == ![] 你是否能正确写出答案呢？
</p></blockquote><p>如果你觉得记忆步骤太麻烦的话，我还提供了流程图供大家使用：</p>
<p></p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/12/19/167c4a2627fe55f1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="1005" data-height="426" src="./前端面试之道 - yck - 掘金小册_files/167c4a2627fe55f1"><figcaption></figcaption></figure><p></p>
<p>当然了，这个流程图并没有将所有的情况都列举出来，我这里只将常用到的情况列举了，如果你想了解更多的内容可以参考 <a target="_blank" href="https://link.juejin.im/?target=https%3A%2F%2Fwww.ecma-international.org%2Fecma-262%2F5.1%2F%23sec-11.9.1" rel="nofollow noopener noreferrer">标准文档</a>。</p>
<p>对于 <code>===</code> 来说就简单多了，就是判断两者类型和值是否相同。</p>
<p>更多的对比可以阅读这篇 <a target="_blank" href="https://link.juejin.im/?target=https%3A%2F%2Ffelix-kling.de%2Fjs-loose-comparison%2F" rel="nofollow noopener noreferrer">文章</a></p>
<h2 class="heading" data-id="heading-2">闭包</h2>
<blockquote class="warning"><p>涉及面试题：什么是闭包？
</p></blockquote><p>闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。</p>
<pre><code class="hljs js" lang="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> a = <span class="hljs-number">1</span>
  <span class="hljs-built_in">window</span>.B = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(a)
  }
}
A()
B() <span class="hljs-comment">// 1</span>
</code></pre><p>很多人对于闭包的解释可能是函数嵌套了函数，然后返回一个函数。其实这个解释是不完整的，就比如我上面这个例子就可以反驳这个观点。</p>
<p>在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。</p>
<blockquote class="warning"><p>经典面试题，循环中使用闭包解决 `var` 定义函数的问题
</p></blockquote><pre><code class="hljs Js" lang="Js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i)
  }, i * <span class="hljs-number">1000</span>)
}
</code></pre><p>首先因为 <code>setTimeout</code> 是个异步函数，所以会先把循环全部执行完毕，这时候 <code>i</code> 就是 6 了，所以会输出一堆 6。</p>
<p>解决办法有三种，第一种是使用闭包的方式</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
  ;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(j)
    }, j * <span class="hljs-number">1000</span>)
  })(i)
}
</code></pre><p>在上述代码中，我们首先使用了立即执行函数将 <code>i</code> 传入函数内部，这个时候值就被固定在了参数 <code>j</code> 上面不会改变，当下次执行 <code>timer</code> 这个闭包的时候，就可以使用外部函数的变量 <code>j</code>，从而达到目的。</p>
<p>第二种就是使用 <code>setTimeout</code> 的第三个参数，这个参数会被当成 <code>timer</code> 函数的参数传入。</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
  setTimeout(
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params">j</span>) </span>{
      <span class="hljs-built_in">console</span>.log(j)
    },
    i * <span class="hljs-number">1000</span>,
    i
  )
}
</code></pre><p>第三种就是使用 <code>let</code> 定义 <code>i</code> 了来解决问题了，这个也是最为推荐的方式</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-number">5</span>; i++) {
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timer</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(i)
  }, i * <span class="hljs-number">1000</span>)
}
</code></pre><h2 class="heading" data-id="heading-3">深浅拷贝</h2>
<blockquote class="warning"><p>涉及面试题：什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？
</p></blockquote><p>在上一章节中，我们了解了对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都被改变的情况。通常在开发中我们不希望出现这样的问题，我们可以使用浅拷贝来解决这个情况。</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">age</span>: <span class="hljs-number">1</span>
}
<span class="hljs-keyword">let</span> b = a
a.age = <span class="hljs-number">2</span>
<span class="hljs-built_in">console</span>.log(b.age) <span class="hljs-comment">// 2</span>
</code></pre><h3 class="heading" data-id="heading-4">浅拷贝</h3>
<p>首先可以通过 <code>Object.assign</code> 来解决这个问题，很多人认为这个函数是用来深拷贝的。其实并不是，<code>Object.assign</code> 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">age</span>: <span class="hljs-number">1</span>
}
<span class="hljs-keyword">let</span> b = <span class="hljs-built_in">Object</span>.assign({}, a)
a.age = <span class="hljs-number">2</span>
<span class="hljs-built_in">console</span>.log(b.age) <span class="hljs-comment">// 1</span>
</code></pre><p>另外我们还可以通过展开运算符 <code>...</code> 来实现浅拷贝</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">age</span>: <span class="hljs-number">1</span>
}
<span class="hljs-keyword">let</span> b = { ...a }
a.age = <span class="hljs-number">2</span>
<span class="hljs-built_in">console</span>.log(b.age) <span class="hljs-comment">// 1</span>
</code></pre><p>通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况就可能需要使用到深拷贝了</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">age</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">jobs</span>: {
    <span class="hljs-attr">first</span>: <span class="hljs-string">'FE'</span>
  }
}
<span class="hljs-keyword">let</span> b = { ...a }
a.jobs.first = <span class="hljs-string">'native'</span>
<span class="hljs-built_in">console</span>.log(b.jobs.first) <span class="hljs-comment">// native</span>
</code></pre><p>浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了。</p>
<h3 class="heading" data-id="heading-5">深拷贝</h3>
<p>这个问题通常可以通过 <code>JSON.parse(JSON.stringify(object))</code> 来解决。</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">age</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">jobs</span>: {
    <span class="hljs-attr">first</span>: <span class="hljs-string">'FE'</span>
  }
}
<span class="hljs-keyword">let</span> b = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(a))
a.jobs.first = <span class="hljs-string">'native'</span>
<span class="hljs-built_in">console</span>.log(b.jobs.first) <span class="hljs-comment">// FE</span>
</code></pre><p>但是该方法也是有局限性的：</p>
<ul>
<li>会忽略 <code>undefined</code></li>
<li>会忽略 <code>symbol</code></li>
<li>不能序列化函数</li>
<li>不能解决循环引用的对象</li>
</ul>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">b</span>: {
    <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">d</span>: <span class="hljs-number">3</span>,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
<span class="hljs-keyword">let</span> newObj = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj))
<span class="hljs-built_in">console</span>.log(newObj)
</code></pre><p>如果你有这么一个循环引用对象，你会发现并不能通过该方法实现深拷贝</p>
<p></p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/3/28/1626b1ec2d3f9e41?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="840" data-height="100" src="./前端面试之道 - yck - 掘金小册_files/1626b1ec2d3f9e41"><figcaption></figcaption></figure><p></p>
<p>在遇到函数、 <code>undefined</code> 或者 <code>symbol</code> 的时候，该对象也不能正常的序列化</p>
<pre><code class="hljs js" lang="js"><span class="hljs-keyword">let</span> a = {
  <span class="hljs-attr">age</span>: <span class="hljs-literal">undefined</span>,
  <span class="hljs-attr">sex</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'male'</span>),
  <span class="hljs-attr">jobs</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
  <span class="hljs-attr">name</span>: <span class="hljs-string">'yck'</span>
}
<span class="hljs-keyword">let</span> b = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(a))
<span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">// {name: "yck"}</span>
</code></pre><p>你会发现在上述情况中，该方法会忽略掉函数和 <code>undefined</code> 。</p>
<p>但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题。</p>
<p>如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 <code>MessageChannel</code></p>
<pre><code class="hljs js" lang="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">structuralClone</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> { port1, port2 } = <span class="hljs-keyword">new</span> MessageChannel()
    port2.onmessage = <span class="hljs-function"><span class="hljs-params">ev</span> =&gt;</span> resolve(ev.data)
    port1.postMessage(obj)
  })
}

<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">b</span>: {
    <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>
  }
}

obj.b.d = obj.b

<span class="hljs-comment">// 注意该方法是异步的</span>
<span class="hljs-comment">// 可以处理 undefined 和循环引用对象</span>
<span class="hljs-keyword">const</span> test = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> clone = <span class="hljs-keyword">await</span> structuralClone(obj)
  <span class="hljs-built_in">console</span>.log(clone)
}
test()
</code></pre><p>当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，比如原型链如何处理、DOM 如何处理等等，所以这里我们实现的深拷贝只是简易版，并且我其实更推荐使用 <a target="_blank" href="https://link.juejin.im/?target=https%3A%2F%2Flodash.com%2Fdocs%23cloneDeep" rel="nofollow noopener noreferrer">lodash 的深拷贝函数</a>。</p>
<pre><code class="hljs js" lang="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepClone</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isObject</span>(<span class="hljs-params">o</span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">typeof</span> o === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> o === <span class="hljs-string">'function'</span>) &amp;&amp; o !== <span class="hljs-literal">null</span>
  }

  <span class="hljs-keyword">if</span> (!isObject(obj)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'非对象'</span>)
  }

  <span class="hljs-keyword">let</span> isArray = <span class="hljs-built_in">Array</span>.isArray(obj)
  <span class="hljs-keyword">let</span> newObj = isArray ? [...obj] : { ...obj }
  <span class="hljs-built_in">Reflect</span>.ownKeys(newObj).forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  <span class="hljs-keyword">return</span> newObj
}

<span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">a</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
  <span class="hljs-attr">b</span>: {
    <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">d</span>: <span class="hljs-number">3</span>
  }
}
<span class="hljs-keyword">let</span> newObj = deepClone(obj)
newObj.b.c = <span class="hljs-number">1</span>
<span class="hljs-built_in">console</span>.log(obj.b.c) <span class="hljs-comment">// 2</span>
</code></pre><h2 class="heading" data-id="heading-6">原型</h2>
<blockquote class="warning"><p>涉及面试题：如何理解原型？如何理解原型链？
</p></blockquote><p>当我们创建一个对象时 <code>let obj = { age: 25 }</code>，我们可以发现能使用很多种函数，但是我们明明没有定义过它们，对于这种情况你是否有过疑惑？</p>
<p></p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/11/16/1671d15f45fcedea?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="800" data-height="600" src="./前端面试之道 - yck - 掘金小册_files/1671d15f45fcedea"><figcaption></figcaption></figure><p></p>
<p>当我们在浏览器中打印 <code>obj</code> 时你会发现，在 <code>obj</code> 上居然还有一个 <code>__proto__</code> 属性，那么看来之前的疑问就和这个属性有关系了。</p>
<p>其实每个 JS 对象都有 <code>__proto__</code> 属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 <code>[[prototype]]</code> 来实现的一个东西。</p>
<p>讲到这里好像还是没有弄明白什么是原型，接下来让我们再看看 <code>__proto__</code> 里面有什么吧。</p>
<p></p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/11/16/1671d2c5a6bcccc4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="383" data-height="271" src="./前端面试之道 - yck - 掘金小册_files/1671d2c5a6bcccc4"><figcaption></figcaption></figure><p></p>
<p>看到这里你应该明白了，原型也是一个对象，并且这个对象中包含了很多函数，所以我们可以得出一个结论：对于 <code>obj</code> 来说，可以通过 <code>__proto__</code> 找到一个原型对象，在该对象中定义了很多函数让我们来使用。</p>
<p>在上面的图中我们还可以发现一个 <code>constructor</code> 属性，也就是构造函数</p>
<p></p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/11/16/1671d329ec98ec0b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="581" data-height="404" src="./前端面试之道 - yck - 掘金小册_files/1671d329ec98ec0b"><figcaption></figcaption></figure><p></p>
<p>打开 <code>constructor</code> 属性我们又可以发现其中还有一个 <code>prototype</code> 属性，并且这个属性对应的值和先前我们在 <code>__proto__</code> 中看到的一模一样。所以我们又可以得出一个结论：原型的 <code>constructor</code> 属性指向构造函数，构造函数又通过 <code>prototype</code> 属性指回原型，但是并不是所有函数都具有这个属性，<code>Function.prototype.bind()</code> 就没有这个属性。</p>
<p>其实原型就是那么简单，接下来我们再来看一张图，相信这张图能让你彻底明白原型和原型链</p>
<p></p><figure><img class="lazyload inited loaded" data-src="https://user-gold-cdn.xitu.io/2018/11/16/1671d387e4189ec8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" data-width="618" data-height="781" src="./前端面试之道 - yck - 掘金小册_files/1671d387e4189ec8"><figcaption></figcaption></figure><p></p>
<p>看完这张图，我再来解释下什么是原型链吧。其实原型链就是多个对象通过 <code>__proto__</code> 的方式连接了起来。为什么 <code>obj</code> 可以访问到 <code>valueOf</code> 函数，就是因为 <code>obj</code> 通过原型链找到了 <code>valueOf</code> 函数。</p>
<p>对于这一小节的知识点，总结起来就是以下几点：</p>
<ul>
<li><code>Object</code> 是所有对象的爸爸，所有对象都可以通过 <code>__proto__</code> 找到它</li>
<li><code>Function</code> 是所有函数的爸爸，所有函数都可以通过 <code>__proto__</code> 找到它</li>
<li>函数的 <code>prototype</code> 是一个对象</li>
<li>对象的 <code>__proto__</code> 属性指向原型， <code>__proto__</code> 将对象和原型连接起来组成了原型链</li>
</ul>
<p>如果你还想深入学习原型这部分的内容，可以阅读我之前写的<a target="_blank" href="https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FKieSun%2FDream%2Fissues%2F2" rel="nofollow noopener noreferrer">文章</a></p>
<h2 class="heading" data-id="heading-7">小结</h2>
<p>以上就是全部的常考和容易混乱的基础知识点了，下一章节我们将会学习 ES6 部分的知识。如果大家对于这个章节的内容存在疑问，欢迎在评论区与我互动。</p>
</div>