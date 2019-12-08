## 块元素
### 定义
在一个水平流上只能单独显示一个元素,多个块级元素则换行显示
### 清除浮动
由于块级元素具有换行特性,因此理论上都可以配合clear属性来清除浮动带来的影响
```css
.clear:after {
    content: '';
    display: block;
    clear: both;
}
```

### 实际开发
在实际开发中,我们要么使用block,要么使用table,并不会使用list-item
#### 原因
1.	字符比较多
2. 会出现多余的一个点,需要再加一行 list-style:none声明
3. 兼容性不好,IE浏览器不支持伪元素的display设置list-item,在普通元素上可以使用,但是在:before,:after伪元素选择器上并不支持

### 属性详解
1.	display: block: 实际上由外在的块级盒子,和内在的块级容器盒子组成
2. display: inline-block 实际上有外在的内联盒子,和内在的块级容器盒子组成
3. display: inline  内外均为内联盒子
4.	display: inline-table 由外在的内联盒子和内在的table盒子组成

### div的默认宽度为100%

### box-sizing
1. 默认值是 content-box	只针对content
2. 可选值 border-box	包含border,content,就是border + padding + content = 指定width

### !important
当设置了width,与max-width时,max-width会覆盖width,即使 width !important 也不行