#	hybrid
1.	移动端占大部分流量,已经远远超过pc
2. 一线互联网公司都有自己的App
3. 这些App中有很大比例的前端代码
4. 拿微信举例,你每天浏览微信得内容,多少是前端?

##	题目
1.	hybrid是什么,为什么用hybrid?
2. 介绍一下hybrid,更新和上线流程?
3. hybrid和h5的主要区别?
4. 前端js和客户端如何通信?

### hybrid是什么,为什么用hybrid?
####	hybrid文字解析
1.	hybrid即 "混合", 即前端和客户端的混合开发
2. 需前端开发人员和客户端开发人员配合完成
3. 某些环节也可能涉及到server端
4. ps: 不要以为自己是前端就可以不理会客户端的只是

####	存在价值,为何会用hybrid
1.	可以快速迭代更新 **关键** (无需app审核,思考为何),代码可以访问手机比较隐私的功能,所以要审核 
2.	体验流畅(和NA的体验基本类似 react native)
3. 减少开发和沟通成本,双端公用一套代码

#### webview
1.	 是app中的一个组件(App可以有webview,也可以没有)
2. 用于加载h5页面,即一个小型的浏览器内核

####file://协议
1.	其实在一开始接触html开发,就已经使用了file协议
2. 只不过当时没有 "协议", "标准" 等这些概念
3. 再次强调 "协议", "标准" 的重要性

##### file vs http(s)
1.	file协议: 本地文件,快
2. http(s)协议: 网络加载,慢

#### hybrid实现
1.	不是所有场景都适合使用hybrid
2. 使用NA: 体验要求极致,变化不频繁(头条的首页)
3. 使用hybrid" 体验要求高,变化频繁(如头条的新闻详情页)
4. 使用h5: 体验无要求,不常用(如举报,反馈等页面)

#####	具体实现
1.	前端做好静态页面(HTML,css,js) ,将文件交给客户端
2. 客户端拿到前端静态页面,以文件形式存储在app中
3. 客户端在一个webview中
4. 使用file协议加载静态页面

### 介绍一下hybrid,更新和上线流程?
1.	app发布之后,静态文件如何实时更新
	1.	要替换每个客户端的静态文件
	2. 只能客户端来做
	3. 客户端去server下载最新的静态文件
	4. 我们维护server的静态文件
	5.	分版本,有版本号,如2019030323432
	6. 将静态文件压缩zip包,上传到服务端
	7. 客户端每次启动,都去服务端检查版本号
	8. 如果服务端版本号大禹客户端版本号,就去下载最新的zip包
	9. 下载完之后解压包,然后将现有的文件覆盖

#### 要点
1.	服务端的版本和zip包版本
2. 更新zip包之前,先对比版本号
3. zip下载解压和覆盖

### hybrid和h5的主要区别?
####	优点
1.	体验更好,跟NA体验基本一致
2. 可快速迭代,无需app审核

#### 缺点
1.	开发成本高,联调,测试,查bug都比较麻烦(人多,三端开发)
2. 运维成本高,更新上线等问题

####	适用场景
1.	hybrid: 产品的稳定功能,体验要求高,迭代频繁
2. h5: 单次的运营活动(红包).或不常用功能

#### 总结
1.	优点: 体验号,可快速迭代
2. 缺点: 开发成本高,运维成本高
3. 适用的场景: hybrid适合产品型,h5适合运营型

### JS和客户端通信
####	静态页面如何获取内容
1.	新闻详情页适用hybrid,前端如何获取新闻内容
2. 不能用ajax获取,第一跨域,第二速度慢
3. 客户端获取新闻内容,然后JS通讯拿到内容,再渲染

#### JS和客户端通讯的基本形式
1.	JS访问客户端能力,传递参数和回调函数
2. 客户端通过回调函数返回内容

#### schema协议简介和使用
1.	schema协议 - 前端客户端通讯的约定

#### schema使用的封装
```js
(function (window, undefined) {

    // 调用 schema 的封装
    function _invoke(action, data, callback) {
        // 拼装 schema 协议
        var schema = 'myapp://utils/' + action

        // 拼接参数
        schema += '?a=a'
        var key
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                schema += '&' + key + data[key]
            }
        }

        // 处理 callback
        var callbackName = ''
        if (typeof callback === 'string') {
            callbackName = callback
        } else {
            callbackName = action + Date.now()
            window[callbackName] = callback
        }
        schema += 'callback=callbackName'

        // 触发
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = schema  // 重要！
        var body = document.body
        body.appendChild(iframe)
        setTimeout(function () {
            body.removeChild(iframe)
            iframe = null
        })
    }

    // 暴露到全局变量
    window.invoke = {
        share: function (data, callback) {
            _invoke('share', data, callback)
        },
        scan: function (data, callback) {
            _invoke('scan', data, callback)
        }
        login: function (data, callback) {
            _invoke('login', data, callback)
        }
    }

})(window)

//使用
document.getElementById('btn1').addEventListener('click', function () {
            // invokeScan()
            window.invoke.scan({}, function () {})
        })
        document.getElementById('btn2').addEventListener('click', function () {
            window.invoke.share({
                title: 'xxx',
                content: 'yyy'
            }, function (result) {
                if (result.errno === 0) {
                    alert('分享成功')
                } else {
                    alert(result.message)
                }
            })
        })
```

#### 内置上线
1.	将以上封装的代码打包,叫做invoke.js,内置到客户端
2. 客户端每次启动webview,都默认执行invoke.js
3. 本地加载,免去网络加载的时间,更快
4. 本地加载,没有网络请求,黑客看不到schema协议,更安全

#### 总结
1.	通讯的基本形式:调用能力,传递参数,监听回调
2. 对schema协议的理解和使用
3. 调用schema代码的封装
4. 内置上线的好处,更快更安全
































