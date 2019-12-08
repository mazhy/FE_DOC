#	webpack
##	webpack 实际上是一个模块打包工具
+	支持 ES Moudule, CommonJS, CMD, AMD 的引入规范

##	搭建 Webpack 环境
+	package.json
	-	private:	不会发布到线上库

###	webpack 安装
1.	npm  install webpack webpack-cli -g	
	-	全局安装, 不推荐
	- 	卸载: npm  uninstall webpack webpack-cli -g
2. 	npm install webpack webpack-cli --save-dev
	-	npm install webpack webpack-cli --save-dev 等价的
	- 	局部安装,不能直接使用webpack 命令
	-  	node提供了一个命令  npx 
	-   npx webpack -v 就可以使用webpack命令了
	-   npx 会在你当前目录下的node_moudules 中找webpack 包

###	Webpack配置文件
webpack 有自己默认配置, 当使用webpack打包时, 命令后面要加上你需要打包的文件,比如(npx webpack index.js), 但是也可以开发人员自己定义配置,而webpack 默认只认 webpack.config.js 这个配置文件,所以需要将配置写到这个文件中 (npx webpack) 就可以了,如果想用另外的名字的配置文件,就需要使用(npx webpack --config webpackconfig.js) 的方式打包.

####	webpack.config.js
```js
const path = require('path')
module.exports = {
	// 入口文件
  entry : './src/index.js',
  // 以下是entry 具体写法
  entry: {
  	main: './src/index.js',
  },
  // 打包成什么文件
  output: {
  	//	目录 生成绝对路径 可不写,默认为dist
    path: path.resolve(__dirname, 'dist'),
    // 文件名
    filename: 'bundle.js'
  },
  //  打包环境,是开发环境还是生产环境, 不写默认是production,但是打包时会有警告
  // 开发环境: development
  // 生产环境的打包的内容是被压缩的,也就是会一行显示,开发环境不会压缩
  mode: 'production',
}

```

+	手动打包需要 npx webpack 进行打包,为了方便可以使用 npm script 的方式

```js
"scripts": {
	// 为什么没有使用npx ,其实script 先从本地的node_modules中一层一层查找
	"build" : "webpack"
},
```
	
###	运行webpack方式
+	global : webpack index.js
+ 	local : npx webpack index.js
+  script: npm run build
	
	
###	webpack-cli 作用
+	webpack打包其实就是在控制台打命令
+ 	而webpack-cli的作用就是给你提供了可以打命令的功能(webpack 或者 npx webpack)

###	打包输出的内容
当使用npm run build 进行webpack打包时, 控制台打印的内容

| 参数 | 意思 |
|---|---|
| hash 			|打包对应的唯一hash值		|
| version	 		|webpack 的版本			|
| time 			|打包用的时间(ms)			|
| asset 			|打包的文件					|
| size 			|打包完文件大小				|
| chunks 			|每一个打包文件对应id值		|
|chunk names		|每一个打包文件对应的名字	|
|entrypoint main	|打包的入口文件				|


##		Loader是什么
webpack不识别除了js之外的文件,所以需要不同的loader 来处理不同后缀的文件

###	file-loader
+	当需要打包图片时候webpack并不认识,默认只认识js文件,所以需要file-loader 来处理图片
+	npm install file-loader -D

```js
module:{
	rules:[{
		test: /\.jpg$/,
		use: {
		  loader: 'file-loader'
		}
	}]
},
```

####	file-loader做了什么
+	首先当你代码中引入了文件
+ 	他会将图片修改名字,并将它复制到dist文件夹中
+  然后将打包之后的图片 返回给代码中引用的位置并得到这个图片的名字

####	打包文件的名字
+	如果默认的配置,打包的图片,会有很长的一段名字
+ 	如果想用原本的名字,则这样配置

```js
options: {
	// 当打包的文件想保留原来的名字
	name : '[name].[ext]'
}
```

+	 当处理图片的时候想把他复制到dist 的一个文件夹的时候

```js
options: {
    // [hash:8] 保留8位hash值
    name : '[name]_[hash:8].[ext]',
    // 处理图片的时候会复制到dist/images 文件夹下
    outputPath: 'images/'
  }
```

+	完整代码

```js
{
	test: /\.(jpg|png|gif)$/,
	use: {
	  loader: 'file-loader',
	  options: {
	    // 当打包的文件想保留原来的名字
	    name : '[name]_[hash:8].[ext]',
	    outputPath: 'images/'
	  }
	}
}
```

###	url-loader
+	功能和 file-loader 差不多
+ 	区别是 url-loader 会将图片转换成一个base64的字符串

```js
{
    test: /\.(jpg|png|gif)$/,
    use: {
      // loader: 'file-loader',
      loader: 'url-loader',
      options: {
        // 当打包的文件想保留原来的名字
        name : '[name]_[hash:8].[ext]',
        outputPath: 'images/',
        // 当文件大于1kb的时候就采用file-loader方式处理图片
        limit: 1024 * 1024 * 3
      }
    }
  }
```

###	css-loader
+	开启css 模块化, 
	-	在文件中需要import styles from 'index.scss'
	- 	使用时候用styles. 的方式使用

```js
 {
    test: /\.scss$/,
    use: [
      'style-loader',// 挂载到页面上
      {
        loader: 'css-loader',	//解析css语法
        options:{
          // 当发现@import引入了css文件,让他在额外进行两次loader 所以是2
          importLoader: 2,
          // 开启css modules 模式
          modules: true
        }
      },
      'sass-loader',	// 将sass语法解析成css语法
      'postcss-loader'	// 配置厂商前缀
    ]
  }
  
//postcss.config.js  
//自动添加厂商前缀
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

###	打包字体文件
+	直接使用file-loader,将字体文件复制到dist文件夹下

```js
 test: /\.(eot|ttf|svg)$/,
    use: {
      loader: 'file-loader',
    }
```

##	plugins
+	plugin 可以在webpack运行到某个时刻的时候,帮你做一些事情
	-	htmlWebpackPlugin时刻: 就是webpack打包之后
	- 	cleanWebpackPlugin时刻: 在webpack打包之前

###	html-webpack-plugin
+	htmlWebpackPlugin会在打包结束后,自动生成一个html文件,并把打包生成的js自动引入到这个html文件中
+	因为插件默认生成的html并不满足我们需求,所以需要额外写一个模板,在插件中配置template, 来引用这个模板

```js
 plugins:[
    new HtmlWebpackPlugin({
      template:'index.html',
    })
  ],
```

###	CleanWebpackPlugin
+	打包之前会清除掉dist文件夹内的内容

```js
new CleanWebpackPlugin(),
```
##	entry & output
```js
// 入口文件
entry : './src/index.js',
// 以下是entry 具体写法
entry: {
	main: './src/index.js',
},
```

###	如果想打包多个入口文件
+	对应的output'也要修改,因为打包的两个入口,文件都是index.js 最后都要生成bundle.js文件会冲突,所以output也要修改
+ 	因为有htmlWebpackPlugin的原因,所以两个入口文件都会被引入到index.html中

```js
entry : {
    main:'./src/index.js',
    sub:'./src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
```

###	静态文件上传到cdn服务器上,引用静态文件
+	通过publicPath 指定cdn地址

```js
  output: {
    publicPath:'http://www.mazy.com',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
```

###	SourceMap
+	sourceMap是一个映射关系,他知道你报错的具体文件,和具体位置
+ 	开启SourceMap 打包速度会很慢

####	配置
```js
devtool:'none', //关闭
devtool:'source-map'	//开启
```

####	推荐配置
+	性能最好,打包最快, 提示信息最全
+ 	cheap	提示多少行出错了,不提示多少列出错了,只负责业务代码中的错误
+  module	上面不管loader里面的错误,他来管
+  eval	通过eval的方式进行打包
+  source-map 会生成一个map的文件

```js
  devtool:'cheap-module-eval-source-map',
```

####	线上配置
+	提示效果比较好

```js
  devtool:'cheap-module-source-map',
```

###	WebpackDevServer
+	配置devServer 会自动启动一个服务, 并且实时监听代码,如果有改动会在页面上重新加载
+ 	配置open 会打开浏览器
+	需要再package.json的scripts 中配置一个 'start' : 'webpack-dev-server' 启动时,直接命令 npm run start
+ 	使用devServer的时候不会生成dist文件夹,其实他打包了在内存中

```js
  devServer: {
    // 以哪个目录为基准 启动服务
    contentBase: ' ./dist',
    // 使用浏览器打开
    open: true,
    proxy:{
    	'/api': 'http://localhost:3000'
    }
  },
```

###	Hot Module Replacement
+	hmr : 热模块替换
+ 	当只是用WebpackDevServer 的时候, 当你的文件改了,浏览器会自动刷新页面,也就是之前操作的内容都没有了,需要重新填充

```js
const Webpack = require('webpack')

devServer: {
	// 开启hmr
	hot: true,
	// 如果hmr失效,也不让浏览器自动刷新
	hotOnly: true,
},

plugins:[
	new Webpack.HotModuleReplacementPlugin()
],
```

+	js 使用 hmr
	-	在css-loader 中有类似的下面的代码,也是为什么 不用手写这些代码的原因
	- 	在vue-loader中也一样

```js
if(module.hot){
	module.hot.accept('./other.js', () => {
		// 当发现other.js文件改变了,就会执行这个回调函数
		//	这个也是在js中使用hmr技术的模型
	})
}
```

###	Babel 编译ES6 语法
####	需要安装的包
+	npm install --save-dev babel-loader @babel/core
+	npm install @babel/preset-env --save-dev
+	npm install --save @babel/polyfill
+	npm install --save core-js@2
+ 	npm install --save-dev @babel/plugin-transform-runtime



####	具体配置
+	如果写的是业务代码,可以使用下面配置

```js
{ 
    test: /\.js$/, 
    exclude: /node_modules/, 
    loader: "babel-loader" ,
    options:{
      presets:[['@babel/preset-env',{
      	 // 使用polyfill 并不是所有的东西都有用,只有用到了才注入
        useBuiltIns: 'usage'
      }]]
    }
},
// 有一些老版本的浏览器不知道es5的语法,需要引入polyfill 来使用
import "@babel/polyfill";

let arr = [1,2,3,4,4,5,6,9]
arr.map(item => {
  console.log(item)
})
```

####	写类库
+	如果写类库的话,推荐使用下面的配置,他同样也会实现polyfill的功能,但是不会污染全局环境

```js
{ 
    test: /\.js$/, 
    exclude: /node_modules/, 
    loader: "babel-loader" ,
    options:{
		"plugins": [["@babel/plugin-transform-runtime",{
		    "absoluteRuntime": false,
		    "corejs": 2,
		    "helpers": true,
		    "regenerator": true,
		    "useESModules": false
		  }]]
	}
},
```

####	拆解方式
+	其实options 中需要配置的东西比较多
+ 	可以提取出来放到 .babelrc文件中
+	同时将options 相关的删掉就可以了

```js
// .babelrc
{
  "plugins": [["@babel/plugin-transform-runtime",{
    "absoluteRuntime": false,
    "corejs": 2,
    "helpers": true,
    "regenerator": true,
    "useESModules": false
  }]]
}
```

##	Tree Shaking
+	只支持 ES 模块引入
+ 	实现按需打包
+  在一个文件内有很多个方法,但是只用到了1 2个的时候,就没必要将整个文件都打包进去,tree shaking 的作用就是将用到的打包
+	在开发环境中,配置了,也会将代码打包到文件中,因为这个可以确定具体错误,而不会使提示信息紊乱

```js
optimization:{
	//	见名知意, 用到的导出
	usedExports: true
}
// 还需要在package.json 文件中增加这个配置
// css 文件不需要tree shaking
"sideEffects": ["*.css"]
// 整个业务代码中不需要tree shaking
"sideEffects":false
```

##	区分开发环境和生产环境
+	安装	npm install webpack-merge -D

```js
//webpack.prod.js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const prodConfig = {
  mode: 'production',
  devtool:'cheap-module-source-map',
};
module.exports = merge(commonConfig,prodConfig);
```

```js
// webpack.dev.js
const Webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
 const devConfig = {
  mode: 'development',
  devtool:'cheap-module-eval-source-map',
  devServer: {
    // 以哪个目录为基准 启动服务
    contentBase: ' ./dist',
    // 使用浏览器打开
    open: true,
    // 跨域代理
    proxy:{
    	'/api': 'http://localhost:3000'
    },
    // 开启hmr
    hot: true,
    // 如果hmr失效,也不让浏览器自动刷新
    hotOnly: true,
  },
  optimization:{
    usedExports: true
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ],
}
module.exports = merge(commonConfig,devConfig)
```

```js
// webpack.common.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry : {
    main:'./src/index.js',
  },
  module:{
    rules:[
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" ,
        // options:{
        // presets:[['@babel/preset-env',{
        //   useBuiltIns: 'usage'
        // }]]
        //   "plugins": [["@babel/plugin-transform-runtime",{
        //     "absoluteRuntime": false,
        //     "corejs": 2,
        //     "helpers": true,
        //     "regenerator": true,
        //     "useESModules": false
        //   }]]
        // }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            // 当打包的文件想保留原来的名字
            name : '[name]_[hash:8].[ext]',
            outputPath: 'images/',
            // 当文件大于1kb的时候就采用file-loader方式处理图片
            limit: 1024 * 1024 * 3
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options:{
              // 当发现@import引入了css文件,让他在额外进行两次loader 所以是2
              importLoader: 2,
              // 开启css modules 模式
              modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  }
}
```

##	Code Splitting
+	代码分隔

###	方式一
+	需要在webpack配置文件中配置 Code Splitting

```js
import _ from  'lodash'
console.log(_.join([1,2,3,4,5,3,22],'-'))

optimization:{
	splitChunks:{
	  chunks: 'all'
	}
},

// 打包会生成, 实现了 代码分隔
main.js
vendors~main.js
```

###	方式二
+	采用异步加载的方式进行Code Splitting
+ 	需要安装 npm install babel-plugin-dynamic-import-webpack -D  

```js
// 需要修改 .babelrc
{
  "presets":  [["@babel/preset-env",{
   "useBuiltIns": "usage",
   "corejs": 2
  }]],
  //新增
  "plugins" : ["dynamic-import-webpack"]
}
// 采用异步加载模块的方式
function getComponent() {
  return import('lodash').then(({default:_}) => {
    var ele = document.createElement('div')
    ele.innerHTML = _.join([1,2,3,4,5,3,22],'-')
    return ele
  })
}

getComponent().then(ele => {
  document.body.appendChild(ele)
})
// 发现打包 	实现了Code Splitting
main.js
0.js
```

### 总结
+	代码分隔和webpack 无关
+ 	webpack 中实现代码分隔,两种方式
	-	同步代码: 只需要在webpack.common.js中做optimization的配置即可
	- 	异步代码(import): 异步代码,无需做任何配置,会自动进行代码分隔 ,放置到新的文件中

##	SplitChunksPlugin 配置参数
+	在方式一中发现打包的文件有个vendors~ 前缀
+ 	在方式二中发现打包的文件前面是 索引值.js
+  	那么如何进行自定义名称的打包呢

###	魔法注释
```js
// /* webpackChunkName: 'lodash' */ 用这种方式告诉webpack 打包成什么名字
function getComponent() {
  return import( /* webpackChunkName: 'lodash' */ 'lodash').then(({default:_}) => {
    var ele = document.createElement('div')
    ele.innerHTML = _.join([1,2,3,4,5,3,22],'-')
    return ele
  })
}
```

+ 	需要安装 npm install --save-dev @babel/plugin-syntax-dynamic-import
+	并在.babelrc文件中改plugins 配置

```js
"plugins": ["@babel/plugin-syntax-dynamic-import"]
```

+	修改webpack 配置文件

```js
optimization:{
	splitChunks:{
	  chunks: 'all',
	  cacheGroups: {
	    vendors: false,
	    default: false
	  }
	}
},
```

+	打包的时候发现名字就正确了

###	参数
```js
//	chunks和cacheGroups 是配合使用的
splitChunks:{
  //async 只对异步引入代码生效 all 就是同步异步引入都可以分割, initial 同步代码分割
  chunks: "all",
  cacheGroups: {
    vendors: {
      // 符合 vendors 这个组的条件就打包成vendors.js 文件
      test: /[\\/]node_modules[\\/]/,
      priority: -10,
      filename: 'vendors.js'  //打包文件的名字
  },
    default:false
  }
}
```

```js
optimization:{
    splitChunks:{
      //async 只对异步引入代码生效 all 就是同步异步引入都可以分割, initial 同步代码分割
      chunks: "async",
      // 只有文件大于30000 字节的时候才会去分割
      minSize: 30000, 
      // 因为每一个打包的文件就是一个chunk , 所以这些chunk中有一个chunk引用了才会分割打包
      minChunks: 1,
      // 代码分割时 如果分割的文件大于5个, 就不会继续分割了
      maxAsyncRequests: 5,
      //  入口文件引入的模块进行分割,超过三个就不会分割了
      maxInitialRequests: 3,
      // 打包时的连接符
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          // 符合 vendors 这个组的条件就打包成vendors.js 文件
          test: /[\\/]node_modules[\\/]/,
          // 打包优先级, 数越大,如果满足了条件就会进入这个组,打包
          priority: -10,
          filename: 'vendors.js'  //打包文件的名字
        },
        default:{
          minChunks: 2,
          priority: -20,
          //  如果打包的过程中,发现有个包之前打过了,就会忽略这次
          reuseExistingChunk: true,
          filename: 'common.js'
        }
      }
    }
  },
```

##	Lazy Loading 懒加载
+	当页面加载时,有一些东西是不在页面显示的,需要某些操作,才进行显示
+ 	那么这种情况,一些模块就没有必要一开始就加载
+  当点击页面的时候,才会去加载lodash 模块

```js
async function getComponent() {
  const {default: _} = await import( /* webpackChunkName: 'lodash' */'lodash')
  const ele = document.createElement('div')
  ele.innerHTML = _.join([1,2,3,4,5,3,22],'-')
  return ele
}
document.addEventListener('click', () => {
  getComponent().then(ele => {
    document.body.appendChild(ele)
  })
})

```

## Chunk
+	每一个打包的文件都是一个chunk

##	Preloading
+	设置 webpackPreloading:true ,会跟你核心业务模块一起加载,不推荐 

```js
document.addEventListener('click', () => {
  import(/* webpackPreloading:true */'./clearfix.png')
})
```

##	Prefetching
+	设置 webpackPrefetch:true ,当页面核心内容加载完了,释放了带宽, 利用空闲时间加载 

```js
document.addEventListener('click', () => {
  import(/* webpackPrefetch:true */'./clearfix.png')
})
```

##	Shimming

```js
//	当你使用了$, 会自动帮你把jquery包引入到模块里
//相当于 import $ form 'jquery'
new webpack.ProvidePlugin({
	$: 'jquery',
	_: 'lodash'
})
```

+	将模块中的this指向window
	-	原先this指向这个模块

```js
test: /\.js$/, 
exclude: /node_modules/, 
use:[
  {loader: "babel-loader" },
  {loader: "imports-loader>this=>window"}
]
```

##	Library 打包
###	如果要满足以下方式的引入
+	import library from 'library'
+ 	const library = require('library')
+  require(['library'], function(){})

```js
// 需要再webpack配置文件的output 内配置
libraryTarget:'umd'
```


###	如果要满足以下方式的引入
+	标签script src = "library.js"   window.library.math

```js
// 需要再webpack配置文件的output 内配置
library:'library'	// 挂载到全局变量的library上
```

###	配合使用
+	library 会挂载到 this 上

```js
library:'library'
libraryTarget:'this'
```

+	library 会挂载到 window 上

```js
library:'library'
libraryTarget:'window'
```

###	打包
+	自定义类库中如果需要用到其他第三方的库, 可以直接忽略,但是在使用自定义库的时候需要先引用这个第三方库

```js
// 在webpack配置文件中配置
externals:["loadsh"]

import _ from 'loadsh'
// 这library这个自定义库中没有将loadsh 打包进去 需要先引入
import library from 'library'
```

###	具体步骤
```js
// 在package.json中
"main": "./dist/library.js"

// 需要再webpack配置文件的output 内配置
library:'root'
libraryTarget:'this'

// 在webpack配置文件中配置
externals:["loadsh"]

npm publish
```

##	如何编写plugin
```js
class CopyrightWebpackPlugin {
  constructor(options){
    console.log(options)
  }

  apply(compiler){
    // 在compile阶段同步执行
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compiler')
    })

    //在把打包内容复制到dist文件夹时,异步执行
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation,cb) => {
      compilation.assets['copyright.txt'] = {
        source: function(){
          return 'copyright by mazy'
        },
        size: function(){
          return 17
        }
      }
      // 异步要手动执行cb()
      cb()
    })
  }
}

module.exports =  CopyrightWebpackPlugin
```

##		使用WebpackDevServer 实现请求转发
```js
devServer:{
	proxy:{
		'/react/api': 'http://www.baidu.com'
	}
}

devServer:{
	proxy:{
		'/react/api': {
			target: 'http://www.baidu.com',
			secure:false, //可以使用https
			pathRewrite: {
				//	当你访问header.json时,真实会调用demo.json, 
				'header.json': 'demo.json'
			}
		}
	}
}

// 多路径的情况
devServer:{
	proxy:{
		context:['/auth','/api']
		target: 'http://www.baidu.com'
	}
}

devServer:{
	proxy:{
		'/react/api': 'http://www.baidu.com',
		// 网站可能对origin做限制,防止爬虫之类的访问
		changeOrigin: true
	}
}

```

## ESLint
```js
// .eslintrc.js
module.exports = {
  //  使用爱彼迎的eslint 模板
  "extends": "airbnb",
  //  使用babel-eslint进行解析
  "parser": "babel-eslint",
  "rules": {
    // 如果不想遵循某一个eslint设置为0
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension":0
  },
  globals:{
    // 全局变量也会报错,所以给设置为false
    document:false
  }
}
```

###	使用eslint-loader
+	安装 eslint eslint-loader

```js
devServer:{
	overlay:true
}
rules:[{
	test: /\.js$/,
	exclude: /node_modules/,
	loader: ['babel-loader','eslint-loader']
}]
```

##	提升Webpack 打包速度
+	升级 node webpack 版本
+ 	在尽可能少的模块上应用loader(使用loader的范围越小越快)
+  尽可能少的plugin(并保证每一个插件精简并可靠)


##	使用DllPlugin提高打包速度




















