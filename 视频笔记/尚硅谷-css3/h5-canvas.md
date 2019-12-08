#	canvas基本用法
##		什么是canvas(画布)
+	canvas 是 HTML5 新增的元素，可用于通过使用JavaScript中的脚本来绘制图形
+	例如，它可以用于绘制图形，创建动画。canvas 最早由Apple引入WebKit
+	我们可以使用canvas标签来定义一个canvas元素
	-	使用canvas标签时，建议要成对出现，不要使用闭合的形式。
	-	canvas元素默认具有高宽
		+	width：  300px
		+	height：150px
		
##		替换内容
+	canvas很容易定义一些替代内容。由于某些较老的浏览器（尤其是IE9之前的IE浏览器）不支持HTML元素"canvas"，但在这些浏览器上你应该要给用户展示些替代内容。
+	这非常简单：我们只需要在canvas标签中提供替换内容就可以。
	-	支持canvas的浏览器将会忽略在容器中包含的内容，并且只是正常渲染canvas。
	-	不支持canvas的浏览器会显示代替内容

##		canvas标签的两个属性
+	canvas看起来和 img元素很相像，唯一的不同就是它并没有 src 和 alt 属性。 实际上，canvas 标签只有两个属性—— width和height。这些都是可选的。
+	当没有设置宽度和高度的时候，canvas会初始化宽度为300像素和高度为150像素。
+	画布的高宽
	-	html属性设置width height时只影响画布本身不影画布内容
	-	css属性设置width height时不但会影响画布本身的高宽，
	-	还会使画布中的内容等比例缩放（缩放参照于画布默认的尺寸）

```html
<!-- 支持width height属性 -->
<canvas id="test" width="300px" height="300px">
	<!-- 替代元素 当浏览器不支持canvas时显示一下内容 -->
	<span>对不起,您的浏览器版本过低,请下载chrome浏览器</span>
</canvas>
```		
##		渲染上下文
+	canvas 元素只是创造了一个固定大小的画布，要想在它上面去绘制内容， 我们需要找到它的渲染上下文
+	canvas 元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能。
	-	getContext()只有一个参数，上下文的格式
		+	获取方式
		+  检查支持性
				  
```js
var canvas = document.getElementById('box');
var ctx = canvas.getContext('2d');
	
var canvas = document.getElementById('tutorial');
if (canvas.getContext){
	var ctx = canvas.getContext('2d');
} 
```	

## 注意
+	canvas图像的渲染有别于html图像的渲染，
	-	canvas的渲染极快，不会出现代码覆盖后延迟渲染的问题
	-	写canvas代码一定要具有同步思想
+	在获取上下文时，一定要先判断
+	画布高宽的问题
	-	画布默认高宽300*150
	-	切记一定要使用html的attribute的形式来定义画布的宽高
	-	通过css形式定义会缩放画布内的图像
+	绘制矩形的问题
	-	边框宽度的问题，边框宽度是在偏移量上下分别渲染一半，可能会出现小数边框，一旦出现小数边框都会向上取整
	-	canvas的api只支持一种图像的直接渲染：矩形
+	我们没法使用选择器来选到canvas中的图像

## 画布API
+	oc.getContext("2d"):获取画布的2d上下文
+	oc.width:画布在横向上css像素的个数
+	oc.height:画布在纵向上css像素的个数
+	oc.toDataUrl():拿到画布的图片地址

## 上下文API
+	ctx.fillRect(x,y,w,h):填充矩形
+	ctx.strokeRect(x,ymwmh):带边框的矩形
+	ctx.clearRect(0,0,oc.width,oc.height):清除整个画布
	-	注意原点的位置
+	ctx.fillStyle
	-	填充颜色
	-	背景fillStyle的值可以是createPattern(image, repetition)返回的对象
	-	线性渐变fillStyle的值可以是createLinearGradient(x1, y1, x2, y2))返回的对象
		+	addColorStop(position, color)
	-	径向渐变fillStyle的值可以是createRadialGradient(x1, y1, r1, x2, y2, r2)返回的对象
		+	addColorStop(position, color)
+	ctx.strokeStyle:线条颜色
+	ctx.lineWidth：线条宽度
+	ctx.lineCap：线条两端的展现形式
+	ctx.lineJoin：线条连接处的展现形式
+	ctx.moveTo(x,y):将画笔抬起点到x，y处
+	ctx.lineTo(x,y):将画笔移到x，y处
+	ctx.rect(x,y,w,h)
+	ctx.arc(x,y,r,degS,degE,dir)
+	ctx.arcTo(x1,y1,x2,y2,r):2个坐标，一个半径
	-	结合moveTo(x,y)方法使用，
	-	x,y:起始点
	-	x1,y1：控制点
	-	x2,y2：结束点
+	ctx.quadraticCurveTo(x1,y1,x2,y2)
	-	结合moveTo(x,y)方法使用，
	-	x,y:起始点
	-	x1,y1：控制点
	-	x2,y2：结束点
	-	必须经过起点和终点
+	ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)
	-	结合moveTo(x,y)方法使用，
	-	x,y:起始点
	-	x1,y1：控制点
	-	x2,y2：控制点
	-	x3，y3：结束点
	-	必须经过起点和终点
+	ctx.fill()
+	ctx.stroke()
+	ctx.beginpath():清除路径容器
+	ctx.closepath():闭合路径
	-	fill自动闭合
	-	stroke需要手动闭合
+	ctx.save()
	-	将画布当前状态(样式相关 变换相关)压入到样式栈中
+	ctx.restore()
	-	将样式栈中栈顶的元素弹到样式容器中
	-	图像最终渲染依赖于样式容器
			
+	ctx.translate(x,y):将原点按当前坐标轴位移x，y个单位
+	ctx.rotate(弧度):将坐标轴按顺时针方向进行旋转
+	ctx.scale(因子):
	-	放大：放大画布，画布中的一个css像素所占据的物理面积变大，画布中包含的css像素的个数变少
		+	画布中图像所包含的css像素的个数不变
	-	缩小：缩小画布，画布中的一个css像素所占据的物理面积变小，画布中包含的css像素的个数变多
		+	画布中图像所包含的css像素的个数不变
+	ctx.drawImage(img,x,y,w,h)
			:在canvas中引入图片一定在图片加载完成之后再去操作
+	ctx.measureText("文本")
			:返回一个持有文本渲染宽度的对象
+	ctx.fillText()
+	ctx.strokeText()
+	ctx.font
+	ctx.textAlign
+	ctx.textBaseline
	-	shadowOffsetX = float
	-	shadowOffsetY = float
	-	shadowBlur = float
	-	shadowColor = color(必需项)
+	ctx.getImageData(x,y,w,h)
	-	ImageData对象
		+	width：选中区域在横向上css像素的个数
		+	height：选中区域在纵向上css像素的个数
		+	data:数组:选中区域所有像素点的rgba信息，rgba的取值从0到255
+	ctx.putImageData(imgdata,x,y)
+	ctx.createImageData(w,h)
	-	返回的是imgdata对象 默认像素点的信息是rgba(0,0,0,0)
+	ctx.globalAlpha
	-	取值为0到1
+	ctx.globalCompositeOperation
	-	source-over(默认值):源在上面,新的图像层级比较高
	-	source-in  :只留下源与目标的重叠部分(源的那一部分)
	-	source-out :只留下源超过目标的部分
	-	source-atop:砍掉源溢出的部分
			
	-	destination-over:目标在上面,旧的图像层级比较高
	-	destination-in:只留下源与目标的重叠部分(目标的那一部分)
	-	destination-out:只留下目标超过源的部分
	-	destination-atop:砍掉目标溢出的部分
+	ctx.ispointinpath(x,y)
	-	x,y这个点是否在路径上
				
#	canvas绘制矩形
+	HTML中的元素canvas只支持一种原生的图形绘制：矩形。所有其他的图形的绘制都至少需要生成一条路径

##		绘制矩形
+	canvas提供了三种方法绘制矩形：
	-	绘制一个填充的矩形（填充色默认为黑色）
		+	fillRect(x, y, width, height)
	-	绘制一个矩形的边框（默认边框为:一像素实心黑色）
		+	strokeRect(x, y, width, height)
	-	清除指定矩形区域，让清除部分完全透明。	
		+	clearRect(x, y, width, height)
+	x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。
+	width和height设置矩形的尺寸。（存在边框的话，边框会在width上占据一个边框的宽度，height同理）
	
```js
let ctx = canvasNode.getContext('2d')
//  画个矩形
ctx.rect(50,50,100,100);
// 填充
ctx.fill()
```
##		strokeRect时，边框像素渲染问题
+	按理渲染出的边框应该是1px的，
+	canvas在渲染矩形边框时，边框宽度是平均分在偏移位置的两侧。
	-	context.strokeRect(10,10,50,50)
		+	:边框会渲染在10.5 和 9.5之间,浏览器是不会让一个像素只用自己的一半的
		+	相当于边框会渲染在9到11之间
	-	context.strokeRect(10.5,10.5,50,50)
		+	:边框会渲染在10到11之间
	
##		添加样式和颜色
+	fillStyle   :设置图形的填充颜色。
+	strokeStyle :设置图形轮廓的颜色。
	-	默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）
+	lineWidth : 这个属性设置当前绘线的粗细。属性值必须为正数。
	-	描述线段宽度的数字。 0、 负数、 Infinity 和 NaN 会被忽略。
	-	默认值是1.0。
			
##		lineWidth & 覆盖渲染
+	canvas中是同步执行,后面的lineWidth会覆盖前面的lineWidth
	
##		lineJoin
+	设定线条与线条间接合处的样式（默认是 miter）
	-	round : 圆角
	-	bevel : 斜角
	-	miter : 直角

```js
window.onload = function() {
  // 拿到画布 
  // 下面注释是为了开启vscode 的canvas 自动补全功能
  /** @type {HTMLCanvasElement} */
  let canvasNode = document.querySelector('#test')
  // 判断是否支持
  if(canvasNode.getContext) {
    // 指定2d绘图
    let ctx = canvasNode.getContext('2d')
    // 填充 只给带fill前缀的有用
    ctx.fillStyle = "green"
    //边框颜色,以及宽度
    ctx.strokeStyle= "red"
    ctx.lineWidth = 10
    // 线与线的连接处怎么处理 round 圆角 bevel 斜角 miter 直角
    ctx.lineJoin="bevel"
    // 不加单位
    //  填充的矩形
    //  x, y, width, height (x,y 参照画布原点)
    ctx.fillRect(0,0,100,100)
    // 绘制边框
    ctx.strokeRect(100,100,100,100)
    // 画一个一模一样大小的矩形 底色为html底色 会覆盖一部分边框
    ctx.clearRect(100,100,100,100)
  }
}
```
#	canvas绘制路径
+	图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。
	
##		步骤
1.	首先，你需要创建路径起始点。
2.	然后你使用画图命令去画出路径
3.	之后你把路径封闭。
4.	一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

```js
if(canvasNode.getContext) {
	// 指定2d绘图
	let ctx = canvasNode.getContext('2d')
	// 画个三角形
	// 抬起画笔
	ctx.moveTo(50,50)
	// 画点
	ctx.lineTo(100,50)
	ctx.lineTo(100,100)
	//  closePath() 关闭路径
	//  fill 也可以关闭路径
	ctx.lineTo(50,50)
	//连线
	ctx.stroke()
	//填充
	//ctx.fill()
	// 清空路径容器 fill不会影响到上面
	ctx.beginPath()
	ctx.moveTo(200,200)
	ctx.moveTo(200,300)
	ctx.moveTo(300,300)
	ctx.closePath()
	ctx.fill()
}
```
##		绘制三角形
+	beginPath()
	-	新建一条路径，生成之后，图形绘制命令被指向到路径上准备生成路径。
	-	生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，
	-	所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，
	-	然后我们就可以重新绘制新的图形。
	
+	moveTo(x, y)
	-	将笔触移动到指定的坐标x以及y上
	-	当canvas初始化或者beginPath()调用后，你通常会使用moveTo()函数设置起点
		
+	lineTo(x, y)
	-	将笔触移动到指定的坐标x以及y上
	-	绘制一条从当前位置到指定x以及y位置的直线。
	
+	closePath()
	-	闭合路径之后图形绘制命令又重新指向到上下文中。
		+	闭合路径closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。
	-	如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做
		+	当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。
	-	但是调用stroke()时不会自动闭合
		
+	stroke()
	-	通过线条来绘制图形轮廓。
	-	不会自动调用closePath()
		
+	fill()
	-	通过填充路径的内容区域生成实心的图形。
	-	自动调用closePath()
		
##		绘制矩形
+	rect(x, y, width, height)
	-	绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。
	-	当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。
	-	也就是说，当前笔触自动重置会默认坐标
		
##		lineCap
+	lineCap 是 Canvas 2D API 指定如何绘制每一条线段末端的属性。
+	有3个可能的值，分别是：
	-	butt  :线段末端以方形结束。 
	-	round :线段末端以圆形结束
	-	square:线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域
	-	默认值是 butt。

```js
let ctx = canvasNode.getContext('2d')
ctx.strokeStyle="red"
ctx.lineWidth = 20;
//  线的两端样式
ctx.lineCap = "round"
ctx.moveTo(50,50)
ctx.lineTo(100,100)
ctx.stroke()
```
##		save
+	save() 是 Canvas 2D API 通过将当前状态放入栈中，保存 canvas 全部状态的方法
+	保存到栈中的绘制状态有下面部分组成：
	-	当前的变换矩阵。
	-	当前的剪切区域。
	-	当前的虚线列表.
	-	以下属性当前的值： 
		+	strokeStyle, 
		+	fillStyle,  
		+	lineWidth, 
		+	lineCap, 
		+	lineJoin...
					 
##		restore
+	restore() 是 Canvas 2D API 通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 
+	如果没有保存状态，此方法不做任何改变。	

```js
let ctx = canvasNode.getContext('2d')
// save 和 restore 类似于作用域的概念
// 包裹在他们之间的操作,只在他俩之间有效,不会影响到下一个画图
// 可以嵌套使用,类似堆栈
ctx.save()
//写样式
ctx.strokeStyle = "red"
ctx.beginPath()
//画图
ctx.moveTo(0,0)
ctx.lineTo(100,100)
ctx.stroke()
ctx.restore()

ctx.save()
//写样式
//ctx.strokeStyle = "red"
ctx.beginPath()
//画图
ctx.moveTo(100,100)
ctx.lineTo(200,200)
ctx.stroke()
ctx.restore()
```
##角度与弧度的js表达式:radians=(Math.PI/180)*degrees。

#	canvas绘制圆形
+	arc(x, y, radius, startAngle, endAngle, anticlockwise)
	-	画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，
	-	按照anticlockwise给定的方向（默认为顺时针）来生成。
	-	ture：逆时针
	-	false:顺时针
		
	-	x,y为绘制圆弧所在圆上的圆心坐标
	-	radius为半径
	-	startAngle以及endAngle参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准
	-	参数anticlockwise 为一个布尔值。为true时，是逆时针方向，否则顺时针方向。

##		arcTo
+	arcTo(x1, y1, x2, y2, radius)
+	根据给定的控制点和半径画一段圆弧
+	肯定会从(x1 y1)  但不一定经过(x2 y2);(x2 y2)只是控制一个方向

```js
// 扇形
ctx.beginPath()
ctx.moveTo(100,100)
ctx.arc(100,100,50,0, 90 * Math.PI / 180,true)
ctx.closePath()
ctx.stroke()

 // 圆型
ctx.beginPath()
ctx.arc(300,300,50,0, 2 * Math.PI,true)
ctx.stroke()
```
##		二次贝塞尔
+	quadraticCurveTo(cp1x, cp1y, x, y)
	-	绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
	-	起始点为moveto时指定的点
		
##		三次贝塞尔
+	bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
	-	绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
	-	起始点为moveto时指定的点

#		canvas中的变换
+	translate(x, y)
	-	我们先介绍 translate 方法，它用来移动 canvas的原点到一个不同的位置。
	-	translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量，
	-	在canvas中translate是累加的

```js
let ctx = canvasNode.getContext('2d')
// 将原点移动到50 50 的位置
ctx.translate(50,50)
ctx.beginPath()
ctx.fillRect(50,50,100,100)
```

+	rotate(angle)
	-	这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。
	-	旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 translate 方法
	-	在canvas中rotate是累加的

```JS
let ctx = canvasNode.getContext('2d')
// 旋转45度
ctx.rotate(45 * Math.PI / 180)
ctx.beginPath()
ctx.fillRect(50,50,100,100)
```
+	scale(x, y)
	-	scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。
	-	值比 1.0 小表示缩小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。
	-	缩放一般我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。
	-	在canvas中scale是累称的

```JS
//  缩小一倍 
//  放大的是css像素的面积 容器内的总像素数量变少
//  缩小的是css像素的面积 容器内的总像素数量变多
ctx.scale(.5,.5)
ctx.beginPath()
ctx.fillRect(50,50,100,100)
```

##		在canvas中插入图片(需要image对象)
1.	canvas操作图片时，必须要等图片加载完才能操作
2.	drawImage(image, x, y, width, height)
	+	其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。
	+	这个方法多了2个参数：width 和 height，这两个参数用来控制 当像canvas画入时应该缩放的大小

```js
let img = new Image()
img.src = "../img/小牛.png"
img.onload = function() {
  ctx.drawImage(img,0 , 0, img.width, img.height)
}
```
##		在canvas中设置背景(需要image对象)
1.	createPattern(image, repetition)
	+	image:图像源
	+	repetition:
		-	"repeat" 
		-	"repeat-x" 
		-	"repeat-y" 
		-	"no-repeat" 

```js
let img = new Image()
img.src = "../img/小牛.png"
img.onload = function() {
  let pattern = ctx.createPattern(img,"no-repeat")
  ctx.fillStyle = pattern
  ctx.fillRect(0,0,200,200)
}
```
2.	一般情况下，我们都会将createPattern返回的对象作为fillstyle的值
			
#	渐变
##	canvas渐变（线性渐变）
+	createLinearGradient(x1, y1, x2, y2)
	-	表示渐变的起点 (x1,y1) 与终点 (x2,y2)
					
+	gradient.addColorStop(position, color)
	-	gradient :createLinearGradient的返回值
	-	addColorStop 方法接受 2 个参数，
		+	position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。
			-	例如，0.5 表示颜色会出现在正中间。
		+	color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）
				
```js
let ctx = canvasNode.getContext('2d')
let gradient = ctx.createLinearGradient(0,0,300,300)
gradient.addColorStop(0, "red")
gradient.addColorStop(0.5, "yellow")
gradient.addColorStop(1,"green")
ctx.fillStyle = gradient
ctx.fillRect(0,0,300,300)
```
##	canvas渐变（径向渐变）	
+	createRadialGradient(x1, y1, r1, x2, y2, r2)
	-	前三个参数则定义另一个以(x1,y1) 为原点，半径为 r1 的圆，
	-	后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

```js
let ctx = canvasNode.getContext('2d')
let gradient = ctx.createRadialGradient(150,150,50,150,150,100)
gradient.addColorStop(0, "red")
gradient.addColorStop(0.5, "yellow")
gradient.addColorStop(1,"green")
ctx.fillStyle = gradient
ctx.fillRect(0,0,300,300)
```
#	在canvas中绘制文本
+	canvas 提供了两种方法来渲染文本:
	-	fillText(text, x, y)
		+	在指定的(x,y)位置填充指定的文本
	-	strokeText(text, x, y)
		+	在指定的(x,y)位置绘制文本边框

```js
let ctx = canvasNode.getContext('2d')
// 要写字体大小和字体
ctx.font = "60px sans-serif"
// 文本内容,和绘制点
ctx.fillText("苏妲己", 50, 50)
// 绘制边框
ctx.strokeText("苏妲己", 200,100)
```
		
##		文本样式
+	font = value
	-	当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 
	-	默认的字体是 10px sans-serif。
	-	font属性在指定时，必须要有大小和字体 缺一不可
+	textAlign = value
	-	文本对齐选项. 可选的值包括： left, right  center. 
	-	left
		+	文本左对齐。
	-	right
		+	文本右对齐。
	-	center
		+	文本居中对齐。
		+	这里的textAlign="center"比较特殊。textAlign的值为center时候
		+	文本的居中是基于你在fillText的时候所给的x的值，
		+	也就是说文本一半在x的左边，一半在x的右边
+	textBaseline = value
	-	描述绘制文本时，当前文本基线的属性。
	-	top
		+	文本基线在文本块的顶部。
	-	middle
		+	文本基线在文本块的中间。
	-	bottom
		+	文本基线在文本块的底部。

```js
ctx.font = "60px sans-serif"
ctx.textAlign = "left"
ctx.textBaseline = "bottom"
// 文本内容,和绘制点
ctx.fillText("苏妲己", 50, 50)
```

##		measureText
+	measureText() 方法返回一个 TextMetrics 对象，包含关于文本尺寸的信息（例如文本的宽度）
		
##		canvas中文本水平垂直居中
```js
if(canvasNode.getContext) {
	let ctx = canvasNode.getContext('2d')
	// 要写字体大小和字体
	ctx.font = "60px sans-serif"
	ctx.textBaseline = "middle"
	var obj = ctx.measureText("姜子牙")
	ctx.fillText("姜子牙", (canvasNode.width - obj.width) / 2, (canvasNode.height - 60)/2)
}
```
	
##		阴影
+	shadowOffsetX = float
	-	shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，
	-	它们默认都为 0。
+	shadowOffsetY = float
	-	shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，
	-	它们默认都为 0。
+	shadowBlur = float
	-	shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
+	shadowColor = color(必需项)
	-	shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

```js
ctx.font = "60px sans-serif"
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 10
ctx.shadowColor = "red"
ctx.fillText("苏妲己", 50, 50)
```
#	在canvas中的像素操作
+	到目前为止，我们尚未深入了解Canvas画布真实像素的原理，事实上，
+	你可以直接通过ImageData对象操纵像素数据，直接读取或将数据数组写入该对象中
	

##		得到场景像素数据
+	getImageData():获得一个包含画布场景像素数据的ImageData对像,它代表了画布区域的对象数据
+	ctx.getImageData(sx, sy, sw, sh)
	-	sx:将要被提取的图像数据矩形区域的左上角 x 坐标。
	-	sy:将要被提取的图像数据矩形区域的左上角 y 坐标。
	-	sw:将要被提取的图像数据矩形区域的宽度。
	-	sh:将要被提取的图像数据矩形区域的高度。
	
##		ImageData对象
+	ImageData对象中存储着canvas对象真实的像素数据，它包含以下几个只读属性：
	-	width:图片宽度，单位是像素
	-	height:图片高度，单位是像素
	-	data:Uint8ClampedArray类型的一维数组，
		+	包含着RGBA格式的整型数据，范围在0至255之间（包括255）
		+	R:0 --> 255(黑色到白色)
		+	G:0 --> 255(黑色到白色)
		+	B:0 --> 255(黑色到白色)
		+	A:0 --> 255(透明到不透明)
			
##		在场景中写入像素数据
+	putImageData()方法去对场景进行像素数据的写入。
+	putImageData(myImageData, dx, dy)
	+	dx和dy参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标

```js
let ctx = canvasNode.getContext('2d')
// 从原点开始横向100个像素点纵向100个像素点一共一万个
let imgData = ctx.getImageData(0,0,100,100)
// 包含 图片的width, height 和rgba信息data,是个数组,大小是像素点的四倍
console.log(imgData)
for(let i = 0; i < imgData.data.length; i ++){
  imgData.data[i] = 134
}
// 写入到容器中
ctx.putImageData(imgData,100,100)
```		
##		创建一个ImageData对象
+	ctx.createImageData(width, height);
	-	width : ImageData 新对象的宽度。
	-	height: ImageData 新对象的高度。
+	默认创建出来的是透明的

```js
ctx.fillStyle = "rgba(0,0,0,.3)"
ctx.fillRect(0,0,100,100)
let imgData = ctx.createImageData(100,100)
for(let i = 0; i < imgData.data.length;i++){
  imgData.data[4 * i + 3] = 255
}
// 写入到容器中
ctx.putImageData(imgData,100,100)
```
##		操作单个像素（行与列）
```js
let ctx = canvasNode.getContext('2d')
// 图片的宽度和高度
ctx.save()
ctx.fillStyle = "pink"
ctx.beginPath()
ctx.fillRect(50,50,100,100)
ctx.restore()
// width 为49 一行黑线
let imageData = ctx.getImageData(0,0,canvasNode.width,canvasNode.height)
// 获取指定坐标的像素点rgba
let color = getColor(50,50,imageData)
console.log(color)
// 设置指定坐标的像素点rgba
for(let i = 0; i < canvasNode.height; i++){
	setColor(imageData,[0,0,0,255],49,i)
}
ctx.putImageData(imageData,0,0)
// 获取指定像素点信息
function getColor(x, y, imageData) {
	let color = []
	let data = imageData.data
	let w = imageData.width
	let h = imageData.height
	color[0] = data[4 * (y * w + x)]
	color[1] = data[4 * (y * w + x)+1]
	color[2] = data[4 * (y * w + x)+2]
	color[3] = data[4 * (y * w + x)+3]
	return color
}

// 设置某个像素点的rgba
function setColor(imageData, color, x, y ) {
	let data = imageData.data
	let w = imageData.width
	let h = imageData.height
	data[4 * (y * w + x)] = color[0]
	data[4 * (y * w + x)+1] = color[1]
	data[4 * (y * w + x)+2] = color[2]
	data[4 * (y * w + x)+3] = color[3]
} 
```
##		马赛克
```js
// 读取一张图片
let img = new Image()
img.src = "../img/小牛.png"
img.onload = function() {
  // 设置canvas画布大小
  canvas.width = img.width * 2
  canvas.height = img.height
  draw()
}
function draw() {
  ctx.drawImage(img,0,0)
  let oldImg = ctx.getImageData(0,0,img.width,img.height)
  let newImg = ctx.createImageData(img.width, img.height)
  let size = 5
  // 将整个画布分成一个一个的马赛克矩形
  for(let i = 0; i < oldImg.width / size; i++) {
    for(let j = 0; j < oldImg.height / size; j++){
      // 每一个都是马赛克矩形,在每个矩形中随机获取一个像素点
      let color = getColor(i * size + Math.floor(Math.random() * size),j * size + 
      									Math.floor(Math.random() * size),oldImg)
      // 把马赛克矩形中每一个像素都设置成这个像素
      for(let a = 0; a < size; a ++){
        for(let b = 0; b < size; b++) {
          setColor(newImg, color,i * size + a, j * size + b)
        }
      }
    }
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.putImageData(newImg,0,0);
}
// 获取指定像素点信息
function getColor(x, y, imageData) {
  let color = []
  let data = imageData.data
  let w = imageData.width
  let h = imageData.height
  color[0] = data[4 * (y * w + x)]
  color[1] = data[4 * (y * w + x)+1]
  color[2] = data[4 * (y * w + x)+2]
  color[3] = data[4 * (y * w + x)+3]
  return color
}

// 设置某个像素点的rgba
function setColor(imageData, color, x, y ) {
  let data = imageData.data
  let w = imageData.width
  let h = imageData.height
  data[4 * (y * w + x)] = color[0]
  data[4 * (y * w + x)+1] = color[1]
  data[4 * (y * w + x)+2] = color[2]
  data[4 * (y * w + x)+3] = color[3]
}
}
```
	     
#		全局透明度的设置
+	globalAlpha = value
	-	这个属性影响到 canvas 里所有图形的透明度，
	-	有效的值范围是 0.0 （完全透明）到 1.0（完全不透明）
	-	默认是 1.0
		
#		覆盖合成
+	source:新的图像(源)
+	destination:已经绘制过的图形(目标)
+	globalCompositeOperation
	-	source-over(默认值):源在上面,新的图像层级比较高
	-	source-in  :只留下源与目标的重叠部分(源的那一部分)
	-	source-out :只留下源超过目标的部分
	-	source-atop:砍掉源溢出的部分
	-	destination-over:目标在上面,旧的图像层级比较高
	-	destination-in:只留下源与目标的重叠部分(目标的那一部分)
	-	destination-out:只留下目标超过源的部分
	-	destination-atop:砍掉目标溢出的部分

```js
let ctx = canvasNode.getContext('2d')
//  设置全局透明度
ctx.globalAlpha = 0.5
// 首先画两个矩形,并且有重叠的部分
ctx.fillStyle = "pink"
//先画的就是destination
ctx.fillRect(50,50,100,100)
// 在这个位置
//ctx.globalCompositeOperation = "source-atop"
ctx.globalCompositeOperation = "destination-atop"
ctx.fillStyle= "yellowGreen"
// 后创建的就是source
ctx.fillRect(100,100,100,100)
```	

## 刮刮卡
```js
let canvas = document.querySelector('canvas')
if(canvas.getContext) {
  let ctx = canvas.getContext('2d')
  // 设置canvas为屏幕大小
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  // 设置上层刮刮卡
  let img = new Image()
  img.src = "../img/a.png"
  img.onload = function() {
    draw()
  }
  function draw() {
    let flag = 0
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    //监听touch事件
    canvas.addEventListener('touchstart', function(ev) {
      //获取第一个手指
      let touch = ev.changedTouches[0]
      ev = ev || event
      let x = touch.clientX - canvas.offsetLeft
      let y = touch.clientY - canvas.offsetTop
      //设置合成规则
      ctx.globalCompositeOperation = "destination-out"
      //设置样式
      ctx.lineWidth = 20
      ctx.lineCap = "round" //两头圆
      ctx.lineJoin = "round" //  连接点圆
      //开始画线
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x,y)
      ctx.lineTo(x+1,y+1)
      ctx.stroke()
      ctx.restore()
    })

    //监听移动事件
    canvas.addEventListener("touchmove", function(ev) {
      ev = ev || event
      let touch = ev.changedTouches[0]
      let x = touch.clientX - canvas.offsetLeft
      let y = touch.clientY - canvas.offsetTop
      ctx.save()
      ctx.lineTo(x,y)
      ctx.stroke()
      ctx.restore()
    })

    //监听touch结束事件
    canvas.addEventListener("touchend",function() {
      //拿到所有像素点
      let imgData = ctx.getImageData(0,0,canvas.width, canvas.height)
      let allPx = imgData.width * imgData.height
      for(let i= 0; i < allPx; i++){
        if(imgData.data[4 * i + 3] === 0) {
          flag++
        }
      }
      console.log(flag)
      if(flag >= allPx/2){
        canvas.style.opacity = 0
      }
    })
    //当canvas的transition事件结束后删掉canvas元素
    canvas.addEventListener("transitionend", function() {
      this.remove()
    })
  }
}
```
#		将画布导出为图像
+	toDataURL(注意是canvas元素接口上的方法)

```js
let canvas = document.querySelector('canvas')
if(canvas.getContext) {
  let ctx = canvas.getContext('2d')
  ctx.fillRect(0,0,100,100)22_
  // 导出地址
  let result = canvas.toDataURL()
  console.log(result)
}
```
	
#		事件操作
+	ctx.isPointInPath(x, y)
	-	判断在当前路径中是否包含检测点
		+	x:检测点的X坐标
		+	y:检测点的Y坐标
+	注意，此方法只作用于最新画出的canvas图像

```js
ctx.beginPath()
ctx.arc(100,100,50,0, 360*Math.PI/180)
ctx.fill()
ctx.beginPath()
ctx.arc(300,300,50,0,360*Math.PI/180)
ctx.fill()
canvas.onclick = function(ev) {
	ev = ev|| event
	var x = ev.clientX - canvas.offsetLeft
	var y = ev.clientY - canvas.offsetTop
	if(ctx.isPointInPath(x,y)) {
	  alert(123)
	}
}
```