CSS 中类 (classes) 和 ID 的区别。
--------------------------

*   书写上的差别：class名用“.”号开头来定义，id名用“#”号开头来定义；
*   优先级不同（权重不同）
*   调用上的区别：在同一个html网页页面中class是可以被多次调用的（在不同的地方）。而id名作为标签的身份则是唯一的，id在页面中只能出现一次。在js脚本中经常会用到id来修改一个标签的属性
*   id作为元素的标签，用于区分不同结构和内容，而class作为一个样式，它可以应用到任何结构和内容上。
*   在布局思路上，一般坚持这样的原则：id是先确定页面的结构和内容，然后再为它定义样式：而class相反，它先定义好一类样式，然后再页面中根据需要把类样式应用到不同的元素和内容上面。
*   在实际应用时，class更多的被应用到文字版块以及页面修饰等方面，而id更多地被用来实现宏伟布局和设计包含块，或包含框的样式。

**一般原则：** 类应该应用于概念上相似的元素，这些元素可以出现在同一页面上的多个位置，而ID 应该应用于不同的唯一的元素

“resetting” 和 “normalizing” CSS 之间的区别？你会如何选择，为什么？
-------------------------------------------------

Normalize 相对「平和」，注重通用的方案，重置掉该重置的样式，保留有用的 user agent 样式，同时进行一些 bug 的修复，这点是 reset 所缺乏的。 Reset 相对「暴力」，不管你有没有用，统统重置成一样的效果，且影响的范围很大，讲求跨浏览器的一致性。 [http://jerryzou.com/posts/abo…](/go/?target=http%3A%2F%2Fjerryzou.com%2Fposts%2FaboutNormalizeCss%2F) Normalize.css是一种CSS reset的替代方案。它们的区别有：

*   Normalize.css 保护了有价值的默认值，Reset通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。相比之下，Normalize.css保持了许多默认的浏览器样式。这就意味着你不用再为所有公共的排版元素重新设置样式。当一个元素在不同的浏览器中有不同的默认值时，Normalize.css会力求让这些样式保持一致并尽可能与现代标准相符合。
*   Normalize.css 修复了浏览器的bug，它修复了常见的桌面端和移动端浏览器的bug。这往往超出了Reset所能做到的范畴。关于这一点，Normalize.css修复的问题包含了HTML5元素的显示设置、预格式化文字的font-size问题、在IE9中SVG的溢出、许多出现在各浏览器和操作系统中的与表单相关的bug。
*   Normalize.css 不会让你的调试工具变的杂乱
*   Normalize.css 是模块化的
*   Normalize.css 拥有详细的文档

选择Normalize.css ，主要是reset.css为几乎所有的元素施加默认样式，所以需要对所有公共的排版元素重新设置样式，这是一件很麻烦的工作。

请解释浮动 (Floats) 及其工作原理
---------------------

浮动出现的最开始出现的意义是用来让文字环绕图片而已。 float可以自动包裹元素。 float会导致父容器高度塌陷。float为什么会导致高度塌陷：元素含有浮动属性 –> 破坏inline box –> 破坏line box高度 –> 没有高度 –> 塌陷。什么时候会塌陷：当标签里面的元素只要样子没有实际高度时会塌陷。 浮动会脱离文档流。产生自己的块级格式化上下文。

描述z-index和叠加上下文是如何形成的。
----------------------

首先来看在CSS中叠加上下文形成的原因：

*   负边距:margin为负值时元素会依参考线向外偏移。margin-left/margin-top的参考线为左边的元素/上面的元素（如无兄弟元素则为父元素的左内侧/上内侧）,margin-right和margin-bottom的参考线为元素本身的border右侧/border下侧。一般可以利用负边距来就行布局，但没有计算好的话就可能造成元素重叠。堆叠顺序由元素在文档中的先后位置决定，后出现的会在上面。
*   position的relative/absolute/fixed定位:当为元素设置position值为relative/absolute/fixed后，元素发生的偏移可能产生重叠，且z-index属性被激活。z-index值可以控制定位元素在垂直于显示屏方向（Z 轴）上的堆叠顺序（stack order），值大的元素发生重叠时会在值小的元素上面。

\*\*z-index属性 ：\*\*z-index只能在position属性值为relative或absolute或fixed的元素上有效。 

**基本原理：\*\*z-index值可以控制定位元素在垂直于显示屏方向（Z 轴）上的堆叠顺序（stack order），值大的元素发生重叠时会在值小的元素上面。 \*\*使用相对性：**z-index值只决定同一父元素中的同级子元素的堆叠顺序。父元素的z-index值（如果有）为子元素定义了堆叠顺序（css版堆叠“拼爹”）。向上追溯找不到含有z-index值的父元素的情况下，则可以视为自由的z-index元素，它可以与父元素的同级兄弟定位元素或其他自由的定位元素来比较z-index的值，决定其堆叠顺序。同级元素的z-index值如果相同，则堆叠顺序由元素在文档中的先后位置决定，后出现的会在上面。所以如果当你发现一个z-index值较大的元素被值较小的元素遮挡了，请先检查它们之间的dom结点关系，多半是因为其父结点含有激活并设置了z-index值的position定位元素

请描述 BFC(Block Formatting Context) 及其如何工作？
-----------------------------------------

BFC:块级格式上下文。定义： 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的块级格式化上下文。 在一个块级格式化上下文里，盒子从包含块的顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。两个相邻的块级盒子的垂直外边距会发生叠加。 在块级格式化上下文中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘），即使存在浮动也是如此，除非这个盒子创建一个新的块级格式化上下文。

BFC详解： [http://www.cnblogs.com/lhb25/…](/go/?target=http%3A%2F%2Fwww.cnblogs.com%2Flhb25%2Fp%2Finside-block-formatting-ontext.html)

block，inline和inline-block的概念以及区别
--------------------------------

**display:block**

*   block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
*   block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
*   block元素可以设置margin和padding属性。

**display:inline**

*   inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
*   inline元素设置width,height属性无效。
*   inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top,
*   padding-bottom, margin-top, margin-bottom不会产生边距效果。

**display:inline-block** 就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。

备注：属性为inline-block元素之间的空格或者换行在浏览器上会是一个空白的间隙。且IE6和7是不支持这个属性的，需要通过display:inline;zoom:1做hack处理。

列举不同的清除浮动的技巧，并指出它们各自适用的使用场景
---------------------------

**添加新的元素、应用 clear：both**

    <div class="outer"> 
    <div class="div1">1</div> 
    <div class="div2">2</div> 
    <div class="div3">3</div> 
    <div class="clear"></div> 
    </div> 
    .clear{clear:both; height: 0; line-height: 0; font-size: 0} 
    

优点：简单，代码少，浏览器支持好，不容易出现怪问题 缺点：要增加很多无效布局，但这是清除浮动用的比较多的一种方法。

**父级div定义overflow：auto或者hidden**

    <div class="outer over-flow"> //这里添加了一个class 
    <div class="div1">1</div> 
    <div class="div2">2</div> 
    <div class="div3">3</div> 
    </div> 
    .over-flow{ 
        overflow: auto; zoom: 1; //zoom: 1; 是在处理兼容性问题 
    } 
    

原理：必须定义width或zoom:1，同时不能定义height，使用overflow属性来清除浮动有一点需要注意，overflow属性共有三个属性值：hidden,auto,visible。我们可以使用hiddent和auto值来清除浮动，但切记不能使用visible值，如果使用这个值将无法达到清除浮动效果。 优点：简单，代码少，浏览器支持好 缺点：使用auto时内部宽高超过父级div时，会出现滚动条，使用hidden时会被隐藏

**after 方法**

    <div class="outer"> 
    <div class="div1">1</div> 
    <div class="div2">2</div> 
    <div class="div3">3</div> 
    </div> 
    .outer {zoom:1;} /==for IE6/7 Maxthon2==/ 
    .outer :after {clear:both;content:’.’;display:block;width: 0;height: 0;visibility:hidden;}
    

其中clear:both;指清除所有浮动；content: ‘.’; display:block;对于FF/chrome/opera/IE8不能缺少，其中content（）可以取值也可以为空。visibility:hidden;的作用是允许浏览器渲染它，但是不显示出来，这样才能实现清除浮动。 所以总的来说，推荐使用伪类的办法。

请解释 CSS sprites，以及你要如何在页面或网站中实现它
--------------------------------

CSS Sprites就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。 **优点：** 当页面加载时，不是加载每个单独图片，而是一次加载整个组合图片。这是一个了不起的改进，它大大减少了HTTP请求的次数，减轻服务器压力，同时缩短了悬停加载图片所需要的时间延迟，使效果更流畅，不会停顿。 **缺点：**做图像拼合的时候很麻烦

你会如何解决特定浏览器的样式问题？
-----------------

解决方案：

*   主张向前兼容，不考虑向后兼容，
*   根据产品的用户群中各大浏览器，来考虑需要兼容的浏览器
*   把浏览器分两类，一类历史遗留浏览器，一类是现代浏览器，然后根据这个分类开发两个版本的网站，然后自己定义哪些浏览器是历史遗留版本，历史遗留版本浏览器，是用历史遗留界面，通过通告栏告知用户使用现代浏览器，功能更全面，提供好的用户体验
*   直接在用户的浏览器不能兼容的时候，提示用户至少什么版本的IE和火狐谷歌浏览器才能支持（以上方案都失效）
*   项目开始前就得需要确认兼容支持的最低按本是什么，设计一个对应的兼容方案

有哪些的隐藏内容的方法 (如果同时还要保证屏幕阅读器可用呢)？
-------------------------------

**display:none 文本图片的隐藏：** 缺陷：搜索引擎可能认为被隐藏的文字属于垃圾信息而被忽略 屏幕阅读器（是为视觉上有障碍的人设计的读取屏幕内容的程序）会忽略被隐藏的文字，同时不利于搜索引擎。

**visibility: hidden：隐藏内容或图片** 缺陷：隐藏的内容会占据他所应该占据物理空间

你用过栅格系统 (grid system) 吗？如果使用过，你最喜欢哪种？
-------------------------------------

Bootstrap中的流式布局；Bootstrap提供了两种布局方式，固定式布局和流式布局（用em表示的叫做弹性布局，用百分比表示的叫做流体布局）方式，Bootstrap的布局实际上是在栅格外加个容器 (Container) 因此两种布局方式的唯一区别是： **固定布局**加的是固定宽度(width)的容器， **流式布局加**的是自适应(或叫可变)宽度的容器。

你用过媒体查询，或针对移动端的布局/CSS 吗？
------------------------

媒体查询规则是开发者能够在相同的样式中，针对不同的媒介来使用不同的样式规则。在CSS2的时候有media Type的规则，通过不同的媒介来切换不同的CSS样式。通过媒体查询的技术可以实现响应式布局，适应不同终端的开发。媒体查询的具体知识请见 CSS3新属性应用文档。

如何优化网页的打印样式？
------------

添加打印样式，为屏幕显示和打印分别准备一个css文件，如下所示：

*   用于屏幕显示的css：
    
        <link rel="stylesheet" href="css/mainstylesheet.css" media="screen" />  
        
    
*   用于打印的css：
    
        <link rel="stylesheet" href="css/printstylesheet.css" media="print" />
        
    
*   import方式：
    
        
        <style type="text/css">
            @import url("css/printstylesheet.css") print;
        </style>
        
    
*   直接把屏幕显示样式和打印样式写在一个css文件中：
    
        @media print {}{
           h1 {
             color: black;
           }
           h2 {}{
             color: gray;
           }
         }
    

@media print里面的内容只对打印出来的内容有效，之外的内容就是屏幕显示的样式。

创建一个不指定媒体类型的样式表通常很有用（或者利用media=”all”）。当你准备好定义一些特别用 于打印的规则时，可以只创建一个单独的样式表，使任何在打印时看起来不好的样式都失效。使用这种方法的一个问题是必须确保打印机样式实际上确实覆盖了主样式表。可以使用！important.

打印样式表也应有些**注意事项：**

*   打印样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景。如要显示图片，请使用html插入到页面中。
*   最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用pt和cm。
*   隐藏掉不必要的内容。（@print div{display:none;}）
*   打印样式表中最好少用浮动属性，因为它们会消失。
*   如果想要知道打印样式表的效果如何，直接在浏览器上选择打印预览就可以了。

备注： 参考： [http://blog.csdn.net/pangni/a…](/go/?target=http%3A%2F%2Fblog.csdn.net%2Fpangni%2Farticle%2Fdetails%2F6224533)

在书写高效 CSS 时会有哪些问题需要考虑？
----------------------

*   样式是：从右向左的解析一个选择器
*   ID最快，Universal最慢 有四种类型的key selector，解析速度由快到慢依次是：ID、class、tag和universal
*   不要tag-qualify （永远不要这样做 ul#main-navigation { } ID已经是唯一的，不需要Tag来标识，这样做会让选择器变慢。）
*   后代选择器最糟糕（换句话说，下面这个选择器是很低效的： html body ul li a { }）
*   想清楚你为什么这样写
*   CSS3的效率问题（CSS3选择器（比如 :nth-child）能够漂亮的定位我们想要的元素，又能保证我们的CSS整洁易读。但是这些神奇的选择器会浪费很多的浏览器资源。）
*   我们知道#ID速度是最快的，那么我们都用ID，是不是很快。但是我们不应该为了效率而牺牲可读性和可维护性

使用 CSS 预处理器的优缺点有哪些？
-------------------

**缺点：**简单来说CSS预处理器语言较CSS玩法变得更高级了，但同时降低了自己对最终代码的控制力。更致命的是提高了门槛，首先是上手门槛，其次是维护门槛，再来是团队整体水平和规范的门槛。这也造成了初学学习成本的昂贵。 **优点：**用一种专门的编程语言，为CSS增加了一些编程的特性，将CSS作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。通俗的说，CSS预处理器用一种专门的编程语言，进行Web页面样式设计，然后再编译成正常的CSS文件，以供项目使用。CSS预处理器为CSS增加一些编程的特性，无需考虑浏览器的兼容性问题，例如你可以在CSS中使用变量、简单的逻辑程序、函数等等在编程语言中的一些基本特性，可以让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。

如果设计中使用了非标准的字体，你该如何去实现？
-----------------------

Webfonts (字体服务例如：Google Webfonts，Typekit 等等。)

请解释浏览器是如何判断元素是否匹配某个 CSS 选择器？
----------------------------

浏览器先产生一个元素集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到真个选择器都匹配完，还在集合中的元素就匹配这个选择器了。

请描述伪元素 (pseudo-elements) 及其用途
-----------------------------

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。 伪元素用于创建一些不在文档树中的元素，并为其添加样式。

**区别：**伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素

参考： [http://www.alloyteam.com/2016…](/go/?target=http%3A%2F%2Fwww.alloyteam.com%2F2016%2F05%2Fsummary-of-pseudo-classes-and-pseudo-elements%2F)

请解释你对盒模型的理解，以及如何在 CSS 中告诉浏览器使用不同的盒模型来渲染你的布局？
--------------------------------------------

盒子模型分为两类：W3C标准盒子模型和IE盒子模型 这两者的关键区别就在于： **宽高的计算：**W3C盒子模型——属性高（height）和属性宽（width）这两个值不包含 填充（padding）和边框（border） IE盒子模型——属性高（height）和属性宽（width）这两个值包含 填充（padding）和边框（border）

各浏览器盒模型的组成结构是一致的，区别只是在”怪异模式”下宽度和高度的计算方式，而“标准模式”下则没有区别。

**组成结构以宽度为例：**总宽度=marginLeft+borderLeft+paddingLeft+contentWidth+paddingRight+borderRight+marginRight（W3C标准盒子模型）。页面在“怪异模式”下，css中为元素的width和height设置的值在标准浏览器和ie系列(ie9除外)里的代表的含义是不同的（IE盒子模型）。

因而解决兼容型为题最简洁和**值得推荐的方式是：下述的第一条。**

*   将页面设为“标准模式”。 添加对应的dtd标识，如： <!DOCTYPE html>
*   使用hack或者在外面套上一层wrapper。 前提是页面处于“怪异模式”，“标准模式”不存在兼容性问题。

1、hack的方式

    #box {  
        width:100px !important; // ie9,ff,chrome,opera这样的标准浏览器
        width:160px; //所有的浏览器；它的本意是只对不认识!important的设置。可是ie7、ie8也认识
        +width:160px!important;//ie7
        width:160px/0!important;//ie8
        padding:0 10px;border:20px solid blue;margin:70px;  
    }  
    

2、wrapper

    
    #box {  
    width:100px;  
    margin:70px;  
    float:left;  
    }  
    .wrapper {  
    padding:0 10px;border:20px solid blue;  
    }
    

总结：使用“标准模式”即可实现兼容，不兼容只发生在“怪异模式”下。而且正常的页面基本上都选择前者，如果选择后者，麻烦不止于此，一些css技巧也将失灵，如将div居中：div {margin:0 auto;}

请解释 \* { box-sizing: border-box; } 的作用, 并且说明使用它有什么好处？
-----------------------------------------------------

设置以后，相当于以怪异模式解析，border和padding全会在你设置的宽度内部，比如手机端设置两行并且的布局，宽度各为50%,如果不用这个属性，设置border后右边的div会下来错位，设置这个属性，宽度还是50%而不是50%+*px,两行可以并列显示

说到 IE 的 bug，在 IE6以前的版本中，IE对盒模型的解析出现一些问题，跟其它浏览器不同，将 border 与 padding 都包含在 width 之内。而另外一些浏览器则与它相反，是不包括border和padding的。对于IE浏览器，当我们设置 box-sizing: content-box; 时，浏览器对盒模型的解释遵从我们之前认识到的 W3C 标准，当它定义width和height时，它的宽度不包括border和padding；对于非IE浏览器，当我们设置box-sizing: border-box; 时，浏览器对盒模型的解释与 IE6之前的版本相同，当它定义width和height时，border和padding则是被包含在宽高之内的。内容的宽和高可以通过定义的“width”和 “height”减去相应方向的“padding”和“border”的宽度得到。内容的宽和高必须保证不能为负，必要时将自动增大该元素border box的尺寸以使其内容的宽或高最小为0。

好处：

*   使用 \* { box-sizing: border-box; }能够统一IE和非IE浏览器之间的差异。
*   解决排版的问题，每个盒子之间排版时不用考虑padding和border的宽度计算

请罗列出你所知道的 display 属性的全部值?
-------------------------

display 属性规定元素应该生成的框的类型。

![](/var/www/html/nodeclub/public/upload/local/cb0bfd391c9ca7ca0f27c3a480a79886)

请解释 inline 和 inline-block 的区别？
------------------------------

都是display 属性规定元素应该生成的框的类型。但是block代表块级元素，元素前后都有换行符；inline是默认的样式，表示该元素被显示为内联元素，元素前后没有换行符号。也就是说，block元素通常被现实为独立的一块，会单独换一行；inline元素则前后不会产生换行，一系列inline元素都在一行内显示，直到该行排满。而inline-block代表行内块元素（css2.0新增）。

**display:block:**

*   block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
*   block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
*   block元素可以设置margin和padding属性。

**display:inline:**

*   inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
*   inline元素设置width,height属性无效。
*   inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。

**display:inline-block:** 简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性

请解释 relative、fixed、absolute 和 static 元素的区别?
-------------------------------------------

**各个属性的值：**

*   static：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
*   relative：生成相对定位的元素，通过top,bottom,left,right的设置相对于其正常位置进行定位。可通过z-index进行层次分级。
*   absolute：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。可通过z-index进行层次分级。
*   fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。可通过z-index进行层次分级。

**relative和absolute进行对比分析：**

*   relative。定位为relative的元素脱离正常的文本流中，但其在文本流中的位置依然存在。
*   absolute。定位为absolute的层脱离正常文本流，但与relative的区别是其在正常流中的位置不在存在。
*   fixed:定位为绝对定位，脱离正常文本流，相对于浏览器窗口进行定位

**relative和absolute与fixed进行对比分析：**

*   relative定位的层总是相对于其最近的父元素，无论其父元素是何种定位方式。
*   absolute定位的层总是相对于其最近的定义为absolute或relative的父层，而这个父层并不一定是其直接父层。如果其父层中都未定义absolute或relative，则其将相对body进行定位，
*   fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。

CSS中字母 ‘C’ 的意思是叠层 (Cascading)。请问在确定样式的过程中优先级是如何决定的 (请举例)？如何有效使用此系统？
-------------------------------------------------------------------

请写出一些块级元素、行内元素、行内块元素？
---------------------

*   块级：div、p、ul、ol、body、from
*   行内： title  lable  span a
*   行内块：  img  input  td

解释一下盒子模型？
---------

盒子模型的三维立体结构: 第一层：border   第二层：内容+padding    第三层：背景图片     第四层：背景颜色      第五层：外边距

什么是语义化的html标签？
--------------

语义化的HTML就是写出的HTML代码，符合内容的结构化（内容语义化），选择合适的标签（代码语义化），能够便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

*   语义化有利于SEO，有利于搜索引擎爬虫更好的理解我们的网页，从而获取更多的有效信息，提升网页的权重。
*   在没有CSS的时候能够清晰的看出网页的结构，增强可读性。
*   便于团队开发和维护，语义化的HTML可以让开发者更容易的看明白，从而提高团队的效率和协调能力。
*   支持多终端设备的浏览器渲染。

CSS 有哪些选择器？权重计算及优先级？
--------------------

id选择器、类选择器、元素选择器、全局选择器、组合选择器、继承选择器、伪类选择器

权重计算: 第一等级：代表内联样式，如style=""，权值为 1000 第二等级：代表id选择器，如#content，权值为100 第三等级：代表类，伪类和属性选择器，如.content，权值为10 第四等级：代表标签选择器和伪元素选择器，如div p，权值为1 Css 语句权重由选择器的权值相加可得。 样式优先级:！important>行内样式>内部样式>外部样式

*   !important声明的样式优先级最高，如果冲突再进行计算。
*   如果优先级相同，则选择最后出现的样式。
*   继承得到的样式的优先级最低。

CSS 引入方式有哪些？link和 @important的区别？
--------------------------------

CSS的引入方式共有三种：

*   行内样式（使用style属性引入CSS样式）
*   内部样式表（在style标签中书写CSS代码。style标签写在head标签中）
*   外部样式表（链接式、导入式）

链接：

    <link type="text/css" rel="styleSheet"  href="CSS文件路径" />

导入：

    <style type="text/css">
          @import url("css文件路径");
    </style>
    

链接和道路的区别： <link>：

@import：

*   属于CSS2.1
*   先加载HTML结构在加载CSS文件

CSS选择器有哪些？哪些属性可以继承？
-------------------

CSS选择符：id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a\[rel=”external”\]）、伪类选择器（a:hover, li:nth-child）

**可继承的属性：\*\*font-size, font-family, color \*\*不可继承的样式：**border, padding, margin, width, height **优先级（就近原则）：**!important > \[ id > class > tag \] !important 比内联优先级高

CSS3有哪些新特性？
-----------

*   RGBA和透明度
*   background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
*   word-wrap（对长的不可分割单词换行）word-wrap：break-word
*   文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
*   font-face属性：定义自己的字体
*   圆角（边框半径）：border-radius 属性用于创建圆角
*   边框图片：border-image: url(border.png) 30 30 round
*   盒阴影：box-shadow: 10px 10px 5px #888888
*   媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性

请解释一下CSS3的flexbox（弹性盒布局模型）,以及适用场景？
----------------------------------

该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。 **适用场景：**弹性布局适合于移动前端开发，在Android和ios上也完美支持。

用纯CSS创建一个三角形的原理是什么？
-------------------

首先，需要把元素的宽度、高度设为0。然后设置边框样式。

    width: 0;
    height: 0;
    border-top: 40px solid transparent;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 40px solid #ff0000;
    

一个满屏品字布局如何设计?
-------------

**第一种真正的品字：**

三块高宽是确定的； 上面那块用margin: 0 auto;居中； 下面两块用float或者inline-block不换行； 用margin调整位置使他们居中。

**第二种全屏的品字布局:** 上面的div设置成100%，下面的div分别宽50%，然后使用float或者inline使其不换行。

常见的兼容性问题？
---------

*   不同浏览器的标签默认的margin和padding不一样。*{margin:0;padding:0;}
*   IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。hack：display:inline;将其转化为行内属性。
*   渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。

    {
    background-color:#f1ee18;/*所有识别*/
    .background-color:#00deff\9; /*IE6、7、8识别*/
    +background-color:#a200ff;/*IE6、7识别*/
    _background-color:#1e0bd1;/*IE6识别*/
    }
    

*   设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。
*   IE下，可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。
*   Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。
*   超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是改变CSS属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

为什么要初始化CSS样式？
-------------

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

absolute的containing block计算方式跟正常流有什么不同？
---------------------------------------

无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：

*   若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
*   否则,则由这个祖先元素的 padding box 构成。

如果都找不到，则为 initial containing block。 补充：

*   static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）
*   absolute: 向上找最近的定位为absolute/relative的元素
*   fixed: 它的containing block一律为根元素(html/body)

CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？
---------------------------------------------

当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。

*   chrome中，使用collapse值和使用hidden没有区别。
*   firefox，opera和IE，使用collapse值和使用display：none没有什么区别。

display:none与visibility：hidden的区别？
----------------------------------

*   display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
*   visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

position跟display、overflow、float这些特性相互叠加后会怎么样？
---------------------------------------------

display属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性是一种布局方式，定义元素在哪个方向浮动。 类似于优先级机制：position：absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float 或者absolute定位的元素，只能是块元素或表格。

对BFC规范(块级格式化上下文：block formatting context)的理解？
---------------------------------------------

BFC规定了内部的Block Box如何布局。 定位方案：

*   内部的Box会在垂直方向上一个接一个放置。
*   Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
*   每个元素的margin box 的左边，与包含块border box的左边相接触。
*   BFC的区域不会与float box重叠。
*   BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
*   计算BFC的高度时，浮动元素也会参与计算。

**满足下列条件之一就可触发BFC：**

*   根元素，即html
*   float的值不为none（默认）
*   overflow的值不为visible（默认）
*   display的值为inline-block、table-cell、table-caption
*   position的值为absolute或fixed

为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？
----------------------------

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。 浮动带来的问题：

*   父元素的高度无法被撑开，影响与父元素同级的元素
*   与浮动元素同级的非浮动元素（内联元素）会跟随其后
*   若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动的方式：

*   父级div定义height
*   最后一个浮动元素后加空div标签 并添加样式clear:both。
*   包含浮动元素的父标签添加样式overflow为hidden或auto。
*   父级div定义zoom

上下margin重合的问题
-------------

在重合元素外包裹一层容器，并触发该容器生成一个BFC。 例子：

        <div class="aside"></div>
        <div class="text">
            <div class="main"></div>
        </div>
        <!--下面是css代码-->
        .aside {
            margin-bottom: 100px;  
            width: 100px;
            height: 150px;
            background: #f66;
        }
        .main {
            margin-top: 100px;
            height: 200px;
            background: #fcc;
        }
         .text{
            /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
            overflow: hidden;  //此时已经触发了BFC属性。
        }
    

设置元素浮动后，该元素的display值是多少？
------------------------

自动变成display:block

移动端的布局用过媒体查询吗？
--------------

通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示。

*   <head>里边<link rel=”stylesheet” type=”text/css” href=”xxx.css” media=”only screen and (max-device-width:480px)”>
*   CSS : @media only screen and (max-device-width:480px) {/css样式/}

CSS优化、提高性能的方法有哪些？
-----------------

*   避免过度约束
*   避免后代选择符
*   避免链式选择符
*   使用紧凑的语法
*   避免不必要的命名空间
*   避免不必要的重复
*   最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
*   避免！important，可以选择其他选择器
*   尽可能的精简规则，你可以合并不同类里的重复规则

浏览器是怎样解析CSS选择器的？
----------------

CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。 而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

在网页中的应该使用奇数还是偶数的字体？为什么呢？
------------------------

使用偶数字体。偶数字号相对更容易和 web 设计的其他部分构成比例关系。Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，而 13、15、17 px时用的是小一号的点。（即每个字占的空间大了 1 px，但点阵没变），于是略显稀疏。

margin和padding分别适合什么场景使用？
-------------------------

何时使用margin：

*   需要在border外侧添加空白
*   空白处不需要背景色
*   上下相连的两个盒子之间的空白，需要相互抵消时。

何时使用padding：

*   需要在border内侧添加空白
*   空白处需要背景颜色
*   上下相连的两个盒子的空白，希望为两者之和。

兼容性的问题：在IE5 IE6中，为float的盒子指定margin时，左侧的margin可能会变成两倍的宽度。通过改变padding或者指定盒子的display：inline解决。

元素竖向的百分比设定是相对于容器的高度吗？
---------------------

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

全屏滚动的原理是什么？用到了CSS的哪些属性？
-----------------------

**原理：**有点类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行y轴定位，也可以通过margin-top实现

    overflow：hidden；transition：all 1000ms ease；
    

什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？
----------------------------------

响应式网站设计(Responsive Web design)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。 基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。 页面头部必须有meta声明的viewport。

    <meta name="’viewport’" content="”width=device-width," 
    initial-scale="1." maximum-scale="1,user-scalable=no”"/>
    

视差滚动效果？
-------

视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。

*   CSS3实现: **优点：**开发时间短、性能和开发效率比较好，缺点是不能兼容到低版本的浏览器
*   jQuery实现: 通过控制不同层滚动速度，计算每一层的时间，控制滚动效果。 **优点：**能兼容到各个版本的，效果可控性好 **缺点：**开发起来对制作者要求高
*   插件实现方式: 例如：parallax-scrolling，兼容性十分好

::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用
--------------------------------------------

*   单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
*   ::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。

:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after

你对line-height是如何理解的？
--------------------

行高是指一行文字的高度，具体说是两行文字间基线的距离。CSS中起高度作用的是height和line-height，没有定义height属性，最终其表现作用一定是line-height。 单行文本垂直居中：把line-height值设置为height一样大小的值可以实现单行文字的垂直居中，其实也可以把height删除。

**多行文本垂直居中：**需要设置display属性为inline-block。

怎么让Chrome支持小于12px 的文字？
----------------------

    p{font-size:10px;-webkit-transform:scale(0.8);} //0.8是缩放比例
    

让页面里的字体变清晰，变细用CSS怎么做？
---------------------

-webkit-font-smoothing在window系统下没有起作用，但是在IOS设备上起作用-webkit-font-smoothing：antialiased是最佳的，灰度平滑。

position:fixed;在android下无效怎么处理？
-------------------------------

    <meta name="viewport" content="width=device-width, 
    initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>    
    

如果需要手动写动画，你认为最小时间间隔是多久，为什么？
---------------------------

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms

li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
---------------------------------

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。 解决方法：

*   可以将<li>代码全部写在一排
*   浮动li中float：left
*   在ul中用font-size：0（谷歌不支持）；可以使用letter-space：-3px

display:inline-block 什么时候会显示间隙？
-------------------------------

*   有空格时候会有间隙 解决：移除空格
*   margin正值的时候 解决：margin使用负值
*   使用font-size时候 解决：font-size:0、letter-spacing、word-spacing

有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度
--------------------------------------------

外层div使用position：relative；高度要求自适应的div使用position: absolute; top: 100px; bottom: 0; left: 0

png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？
------------------------------------------

*   png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
*   jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
*   gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
*   webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

style标签写在body后与body前有什么区别？
--------------------------

页面加载自上而下 当然是先加载样式。 写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

阐述一下CSS Sprites
---------------

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background- repeat，background-position 的组合进行背景定位。利用CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能；CSS Sprites能减少图片的字节。