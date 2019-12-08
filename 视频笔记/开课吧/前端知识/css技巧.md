# css技巧
##让固定宽度的页面居中
```css
  #wrapper {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    margin: auto;
    position: relative;
  }
```

## 隐藏水平滚动条
```css
body { overflow-x: hidden; }
```

## 画三角形
```css
.triangle{
	width: 0px;
	height:0px;
	border-color: transparent transparent transparent green;
	border-style: solid;
	border-width: 20px 0px 20px 20px;
}
```