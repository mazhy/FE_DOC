# webpack
## 第一版 简单配置
```js
//webpack.config.js
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main":'./main.js'
	},
	output:{
		filename:'./build.js'
	},
	watch:true,//文件监视改动 自动产出build.js
}
```

## 第二版 加入css-loader
```js
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main":'./main.js'
	},
	output:{
		filename:'./build.js'
	},
	watch:true,//文件监视改动 自动产出build.js
	// 声明模块
	// 包含各个loader
	module:{
		loaders:[
			{
				// /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit = 3000'
			}

		]
	}
}
```

## 第三版 加入less-loader
```js

var path  = require('path');
// webpack ./main.js  ./build.js
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main":'./src/main.js'
	},
	output:{
		path:path.resolve('./dist'),//相对转绝对
		filename:'build.js'
	},
	watch:true,//文件监视改动 自动产出build.js
	// 声明模块
	// 包含各个loader
	module:{
		loaders:[
			{
				// /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit = 60000'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}

		]
	}
}
```

## 第四版 加入HtmlWebpackPlugin
```js
var path  = require('path');

const HtmlWebpackPlugin  = require('html-webpack-plugin')
// webpack ./main.js  ./build.js
module.exports = {
	// 入口
	entry:{
		// 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
		"main":'./src/main.js'
	},
	output:{
		path:path.resolve('./dist'),//相对转绝对
		filename:'build.js'
	},
	watch:true,//文件监视改动 自动产出build.js
	// 声明模块
	// 包含各个loader
	module:{
		loaders:[
			{
				// /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
				// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
				// webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|jpeg|gif|svg)$/,
				loader:'url-loader?limit = 60000'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!less-loader'
			}

		]
	},
	plugins:[
		// 插件的的执行顺序与元素由关
		//这个插件可以自动为我们生成HTML并插入对应的js和css文件
		new HtmlWebpackPlugin({
			template:'./src/index.html',//参照物
		})

	]
}
```

## 第五版 启动命令
```js
//	--inline 刷新浏览器
// --hot --inline 修改并刷新
"dev": "webpack-dev-server --open --hot --inline --config ./webpack.dev.config.js",
```

## 第六版 加入处理es6+
```js
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack ./main.js  ./build.js
module.exports = {
    // 入口
    entry: {
        // 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
        "main": './src/main.js'
    },
    output: {
        path: path.resolve('./dist'), //相对转绝对
        filename: 'build.js'
    },
    watch: true, //文件监视改动 自动产出build.js
    // 声明模块
    // 包含各个loader
    module: {
        loaders: [{
                // /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
                // 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
                // webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/,
                loader: 'url-loader?limit = 60000'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                // 处理es6,7,8
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/,
                options: {
                    presets: ['env'], //处理关键字
                    plugins: ['transform-runtime'], //处理函数
                }
            }

        ]
    },
    plugins: [
        // 插件的的执行顺序与元素由关
        new HtmlWebpackPlugin({
            template: './src/index.html', //参照物
        })

    ]
}
```

## 第七版 加入vue-loader
```js
var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack ./main.js  ./build.js
module.exports = {
    // 入口
    entry: {
        // 可以有多个入口，也可以有一个，如果有一个就默认从这一个入口开始分析
        "main": './src/main.js'
    },
    output: {
        path: path.resolve('./dist'), //相对转绝对
        filename: 'build.js'
    },
    watch: true, //文件监视改动 自动产出build.js
    // 声明模块
    // 包含各个loader
    module: {
        loaders: [{
                // /遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件
                // 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
                // webpack在打包过程中，遇到后缀为css的文件，就会使用style-loader和css-loader去加载这个文件。
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/,
                loader: 'url-loader?limit = 60000'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                // 处理es6,7,8
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env'], //处理关键字
                    plugins: ['transform-runtime'], //处理函数
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }

        ]
    },
    plugins: [
        // 插件的的执行顺序与元素由关
        new HtmlWebpackPlugin({
            template: './src/index.html', //参照物
        })

    ]
}
```

## 第八版  加入css modules
```js
module.exports = {
    // 包含各个loader
    module: {
        loaders: [{
                // 以查询字符串形式?modules 开启css modules 模式
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            }
        ]
    }
}

```