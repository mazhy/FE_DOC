#less
+	less是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言， 增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展
+	LESS 既可以在 客户端 上运行 ，也可以借助Node.js在服务端运行。
+	less的中文官网：http://lesscss.cn/
+	bootstrap中less教程：http://www.bootcss.com/p/lesscss/
 
#less中的注释
+	以//开头的注释，不会被编译到css文件中
+	以/**/包裹的注释会被编译到css文件中  
	
#less中的变量
+	使用@来申明一个变量：@pink：pink;
1.	作为普通属性值只来使用：直接使用@pink
2.	作为选择器和属性名：#@{selector的值}的形式
3.	作为URL：@{url}
4.	变量的延迟加载

#less中的嵌套规则
1.	基本嵌套规则
2.	&的使用

#less中的混合
+	混合就是将一系列属性从一个规则集引入到另一个规则集的方式
1.	普通混合      
2.	不带输出的混合
3.	带参数的混合
4.	带参数并且有默认值的混合
5.	带多个参数的混合
6.	命名参数
7.	匹配模式
8.	arguments变量

##	普通混合
```css
/* 声明需要混合的代码 */
/* .in 这种方式会把这段代码同样生成到css文件中,我们并不需要这些代码  */
/* 加个() 就不会把这段代码生成到css文件中 */
.in() {
  width: 100px;
}
.wrap{
  .inner1{
    /* 引入混合代码 */
    .in;
  }
}
```

## 带参数并且有默认值的混合
```css
/* 设置需要传的参数,用@定义 */
/* .in(@w, @h, @c, @z) 直接定义参数变量 */
/* 可以设置默认值*/
.in(@w: 10px, @h:20px, @c:red, @z:0) {
  width: @w;
  height:@h;
  background: @c;
  z-index: @z;
}

.wrap{
  .inner1{
    /* 引入混合代码 */
    .in(100px, 100px, pink, 2);
  }
  .inner2{
    .in();
  }
}
```

## 命名参数
```css
.in(@w: 10px, @h:20px, @c:red, @z:0) {
  width: @w;
  height:@h;
  background: @c;
  z-index: @z;
}

.wrap{
  .inner2{
    /* 可以指定传入哪些参数 */
    .in(@c:green);
  }
}
```

## 匹配模式
```css
/* 画三角为例*/
/* 在使用匹配模式时,如果参数列表相同,且第一个参数为@_, 那么会执行下面的代码 */
/* triangle.less */
.triangle(@_, @w, @c){
  width: 0;
  height: 0;
  overflow: hidden;
}

.triangle(L, @w, @c){
  border-width: @w;
  border-style: dashed solid dashed dashed;
  border-color:  transparent @c transparent transparent;
}

.triangle(R, @w, @c){
  border-width: @w;
  border-style:  dashed  dashed dashed solid;
  border-color:  transparent  transparent transparent @c;
}

.triangle(T, @w, @c){
  border-width: @w;
  border-style: dashed  dashed solid dashed;
  border-color:  transparent  transparent @c transparent;
}

.triangle(B, @w, @c){
  border-width: @w;
  border-style: solid dashed  dashed dashed;
  border-color: @c transparent  transparent transparent;
}

/* 使用 */
@import "./triangle.less";
.inner{
  /* 第一个参数用来使用匹配模式 */
  .triangle(R,40px,pink);
}
```
	
#less运算
在less中可以进行加减乘除的运算

```css
.inner{
   /* 基本运算*/
  /*只要有一个单位就可以*/
  width:(100 + 100px + 100px)
}
```

#less避免编译
```css
.inner{
  width: 100+100px;
  /* 用~"内容" 相当于一个字符串, 让浏览器自己去计算, 预编译时不计算 */
  height: ~"calc(100 + 100 + 100px)";
}
```

#less继承
+	性能比混合高
+	灵活度比混合低

```css
/* extend.less */
.juzhong{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.juzhong:hover{
  background: red !important;
}

/* 使用 */
@import './extends.less';
.wrap .inner {
  /* 使用extend 来继承属性值,如果不写all只继承指定类的属性, 写all 继承所有(伪元素等) */
  &:extend(.juzhong all);
  &:nth-child(1){
    width: 100px;
    height: 100px;
    background: pink;
    z-index: -1;
  }
  &:nth-child(2){
    width: 50px;
    height: 50px;
    background: green;
    z-index: 0;
  }
}
```
	
		     