# Css世界
## 流,元素与基本尺寸
### 块级元素
+	在一个水平流上只能单独显示一个元素, 多个块级元素则换行显示.
+	块级元素和 display:block 不是同一概念
+ 	li 标签的display为 list-item
+  table 标签的display 为 table
+  正是由于 '块级元素' 具有换行特性,因此理论上可以配合 clear 属性来清除浮动.

+ 清除浮动

```css
.clear:after {
	content: '';
	display: block; // table, list-item
	clear: both;
}
```

#### 内外盒子 & 附加盒子
+	display: list-item 会有一个附加盒子,就是前面的圆点 或者 数字
+ 块级盒子分为内外两个盒子 (外在盒子负责元素是可以一行显示还是多行显示,内在盒子负责宽高)
	-	block 内外盒子都是block
	-  inline-block 外盒子是inline 内盒子为 block
	-  table 外在盒子为 block 内在盒子为 table 