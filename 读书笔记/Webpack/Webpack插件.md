# Webpack插件
## CopyWebpackPlugin
+	需要安装三方库

```js
npm install babel-core babel-loader babel-preset-es2015 babel-plugin-transform-runtime --save-dev
```

+	使用
-	第一种: 指定query属性 ==> 也是webpack.config.js比较推荐的方式

```js
{
	test:/\.js$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query:{
		presets: ['es2015'],
		plugins:['transform-runtime']
	}
}
```

- 第二种: 查询字符串的方式

```js
{
	test:/\.js$/,
	loader: 'babel?presets[]=es2015',
	exclude: /node_modules/
}
```

### cacheDirectory
-	默认值是false。如果设置了这个参数，被转换的结果将会被缓存起来。
-	当webpack再次编译时，将会首先尝试从缓存中读取转换结果，以此避免资源浪费。
-	如果该值为空(loader:'babel-loader?cacheDirectory'),loader会使用系统默认的临时文件目录

```js
	loader: 'babel? cacheDirectory=true',
```

### 性能问题
+	确保只转换尽可能少的文件，你可能匹配了过多的文件类型，或者匹配了所有的‘.js’文件，你需要使用

```js
exclude:/(node_modules|bower_components)/    //排除部分目录
```

+	设置cacheDirectory参数也可以让你的loader性能提升2倍
+ 	babel 给每个需要的文件注入helper扩展
+	您可以改为要求babel作为一个独立运行的模块，以避免重复。
+	下面的配置通过babel-plugin-transform-runtime插件可以禁用babel向每个文件注入helper

```js
query:{
      presets:['es2015'],
      plugins : ['transform-runtime']
      }
```