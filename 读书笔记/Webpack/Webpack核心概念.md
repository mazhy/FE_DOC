#模块化开发
## CommonJS
1.	一个文件为一个模块
2. 通过module.exports暴露模块接口
3. 通过require引入模块
4. 同步执行

## AMD
1.	异步的模块定义
2. 使用define定义模块
3. 使用require加载模块
4. RequireJS使用了AMD规范
5. 依赖前置,提前执行

## CMD
1.	通用模块定义
2. 一个文件伪一个模块
3. 使用define来定义一个模块
4. 使用require来加载一个模块
5. SeaJS
6. 尽可能懒执行

## UMD
1.	通用解决方案
2. 判断是否支持AMD
3.  判断是否支持CommonJS
4. 如果都没有,使用全局变量

## ESM
1.	一个文件一个模块
2. export / import


## Webpack支持
1.	AMD
2. ESM  = 推荐
3. CommonJS

# Webpack核心概念
##	Entry  
1.	代码的入口
2. 打包的入口
3. 单个或多个文件


## Output  输出
1.	打包成的文件bundle
2. 一个或多个
3. 自定义规则
4. 配合CDN

## Loaders  
1.	处理文件
2. 转化为模块

### 常用loader
####	编译相关
1.	babel-loader,tsloader

#### 样式相关
1.	style-loader, css-loader, less-loader, postcss-loader

#### 文件相关
1.	file-loader, url-loader

## plugins  插件
1.	参与打包整个过程
2. 打包优化和压缩
3. 配置编译时的变量

### 常用plugin
#### 优化相关
1.	CommonsChunkPlugin    --- 提取单独的代码块
2. UglifyjsWebpackPlugin   ---  混淆代码

#### 功能相关
1.	ExtractTextWebpackPlugin		---	提取单独的css文件
2. HtmlWebpackPlugin		---帮助生成html的
3. HotModuleReplacementPlugin		---	热更新
4. CopyWebpackPlugin	--- 打包时复制文件

## Chunk
1.	代码块

## Bundle
1.	打包后的

## Module
1.	模块







































