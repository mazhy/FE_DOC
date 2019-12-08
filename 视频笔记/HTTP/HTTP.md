#	HTTP
##	http的例子
+	输入url打开网页
+ 	ajax获取数据
+  	img标签加载图片 

##	通过 URL 打开网址,做了什么
![avatar](./url_http.png)

##	网络协议分层
###	经典五层模型
![avatar](./wucengmoxing.png)

###	物理层
+	定义物理设备如何传输数据

###	数据链路层
+	在通信的实体间建立数据链路连接

###		网络层
+	为数据在节点之间传输创建逻辑链路

###	传输层
+	向用户提供可靠的端到端的服务(End - to - End)
+ 	传输层向高层屏蔽了下层数据通信的细节

###	应用层
+	为应用软件提供了很多服务
+ 	构建于TCP协议之上
+  屏蔽了网络传输相关细节

###	HTTP 三次握手
![avatar](./sanciwoshou.png)

###	URL URI URN
###	URI
+	Uniform Resource Identifier	统一资源标识符
+	用来标示互联网上的信息资源
+ 	包含了URL RUN

###	URL
+	Uniform Resource Locator 	统一资源定位器

```js
http://user:pass@host.com:80/path?query=string#hash
scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]

传送协议。
层级URL标记符号(为[//],固定不变)
访问资源需要的凭证信息（可省略）
服务器。（通常为域名，有时为IP地址）
端口号。（以数字方式表示，若为HTTP的默认值“:80”可省略）
路径。（以“/”字符区别路径中的每一个目录名称）
查询。（GET模式的窗体参数，以“?”字符为起点，每个参数以“&”隔开，
			再以“=”分开参数名称与数据，通常以UTF8的URL编码，避开字符冲突的问题）
片段。以“#”字符为起点
```

###	URN
+	永久统一资源定位符
+ 	在资源移动之后还能被找到
+  目前还没有成熟的使用方案

## HTTP报文
###	请求头
![avatar](./qingqiutou.png)

+	Http请求由三部分构成
	+	请求行	
		-	GET /images/logo.gif HTTP/1.1
		- 	请求方式, 请求URL,	协议版本
	+ 	首部
		-	Cache-Control			控制缓存的行为
		-	Connection			浏览器想要优先使用的连接类型，比如 keep-alive
		-	Date					创建报文时间
		-	Pragma					报文指令
		-	Via						代理服务器相关信息
		-	Transfer-Encoding	传输编码方式
		-	Upgrade				要求客户端升级协议
		-	Warning				在内容中可能存在错误
		- 	Accept	能正确接收的媒体类型
		- 	Accept-Charset	能正确接收的字符集
		- 	Accept-Encoding	能正确接收的编码格式列表
		- 	Accept-Language	能正确接收的语言列表
		- 	Expect	期待服务端的指定行为
		- 	From	请求方邮箱地址
		- 	Host	服务器的域名
		- 	If-Match	两端资源标记比较
		- 	If-Modified-Since	本地资源未修改返回 304（比较时间）
		- 	If-None-Match	本地资源未修改返回 304（比较标记）
		- 	User-Agent	客户端信息
		- 	Max-Forwards	限制可被代理及网关转发的次数
		- 	Proxy-Authorization	向代理服务器发送验证信息
		- 	Range	请求某个内容的一部分
		- 	Referer	表示浏览器所访问的前一个页面
		- 	TE	传输编码方式
	+  实体

####	详情
-	POST /manage/login/getAllInfo?t=1556272136794 HTTP/1.1
	+ 这个是请求行
	+ 分别对应 请求方式, 请求URL, 和协议版本
-	Host: 127.0.0.1:8000
	+ 请求的服务器地址(域名或者ip+port)
-	Connection: keep-alive
	+ 表示客户端与服务器连接类型
	+ keep-alive  客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接
	+ Connection: close  代表一个Request完成后，客户端和服务器之间用于传输HTTP数据的TCP连接会关闭， 当客户端再次发送Request，需要重新建立TCP连接。
-	Content-Length: 0
	+ 表示请求消息正文的长度
-	Accept: application/json, text/plain, */*
	+ 浏览器可接收的MIME类型,接收什么类型的格式
-	Origin: http://127.0.0.1:8000
	+	最初请求是从哪里发起的,只有协议,ip,端口
-	User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36
	+ 客户端信息:系统,内核,浏览器
-	Content-Type: application/x-www-form-urlencoded
	+	客户端告诉服务器实际发送的数据类型
-	Referer: http://127.0.0.1:8000/community/houseOwnerInfo
	+ 告诉服务器我是从哪个页面链接过来的
-	Accept-Encoding: gzip, deflate, br
	+ 	浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate）
-	Accept-Language: zh-CN,zh;q=0.9
	+ 浏览器申明自己接收的语言。

### 	响应头
![avatar](./xiangyingtou.png)

+	响应首部
	-	connection: close
	-	Content-Encoding: gzip
	-	content-type: text/html;charset=UTF-8
	-	date: Fri, 26 Apr 2019 11:20:22 GMT
	-	server: Apache-Coyote/1.1
	-	transfer-encoding: chunked
	-	Vary: Accept-Encoding
	-	X-Powered-By: Express
####	详情
+	HTTP/1.1 200 OK
	-	响应首行, 响应状态码，表示 web 服务器处理的结果。 
+	X-Powered-By: Express
+	server: Apache-Coyote/1.1
	-	一种标明Web服务器软件及其版本号的头标
+	content-type: text/html;charset=UTF-8
	-	接收的实体的MIME类型
+	transfer-encoding: chunked
	-	一种通用头标，标明对应被接受方反向的消息体实施变换的类型
+	date: Fri, 26 Apr 2019 11:27:09 GMT
	-	发送HTTP消息的日期
+	connection: close
	-	close（连接已经关闭）
	- 	keepalive（连接保持着，在等待本次连接的后续请求）。 
+	Vary: Accept-Encoding
	-	告诉代理服务器缓存两种版本的资源：压缩和非压缩，这有助于避免一些公共代理不能正确地检测Content-Encoding标头的问题。由于一些公共代理的错误，可能会导致你的压缩版本资源被服务到不支持压缩的用户。指定Vary: Accept-Encoding标头可指示代理来存储压缩和非压缩的版本资源
+	Content-Encoding: gzip
	-	WEB服务器表明自己使用了什么压缩方法（gzip，deflate）压缩响应中的对象

###	首部和主体中间有一个空行
###	HTTP方法
+	用来定义对于资源的操作
+	Restfull接口
	-	GET：读取（Read）
	-	POST：新建（Create）
	-	PUT：更新（Update）
	-	PATCH：更新（Update），通常是部分更新
	-	DELETE：删除（Delete）

###	HTTP CODE
+	定义服务器对请求的处理结果
+ 	各个区间的code有各自的语义
+ 	好的HTTP服务可以通过CODE 判断结果
	-	2XX 成功
		+ 	200 OK，表示从客户端发来的请求在服务器端被正确处理
		+ 	204 No content，表示请求成功，但响应报文不含实体的主体部分
		+ 	205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
		+ 	206 Partial Content，进行范围请求
	-	3XX 重定向
		+ 	301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
		+ 	302 found，临时性重定向，表示资源临时被分配了新的 URL
		+ 	303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
		+ 	304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
		+ 	307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求
	-	4XX 客户端错误
		+ 	400 bad request，请求报文存在语法错误
		+ 	401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
		+ 	403 forbidden，表示对请求资源的访问被服务器拒绝
		+ 	404 not found，表示在服务器上没有找到请求的资源
	-	5XX 服务器错误
		+ 	500 internal sever error，表示服务器端在执行请求时发生了错误
		+ 	501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
		+ 	503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求

##		跨域
从一个域去获取另一个域下的数据就会发生跨域问题(不同域: 协议,ip,端口,有一个不同都是跨域)

###	访问
不管跨不跨域, 浏览器发送的请求服务器都接收到了,并且也返回了数据,只是浏览器拦截了(没有看到Access-Control-Allow-Origin 想匹配的规则),会忽略掉响应内容,并且报下面的错误

###	报错信息
Access to XMLHttpRequest at 'http://127.0.0.1:3000/' from origin 'http://127.0.0.1:3001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'  header is present on the requested resource.

```js
res.writeHead(200,{
	//	允许所有域访问, 不安全
	'Access-Control-Allow-Origin': '*',
	//	指定某个域名可以访问,只能有一个值
	//	解决办法: 动态获取请求的host, 判断是否可以访问,然后将host设置给Access-Control-Allow-Origin
	'Access-Control-Allow-Origin': 'http://baidu.com'
	//	允许携带的头信息
	//	浏览器先会发送一个OPTIONS method的请求获取服务器的认可
	//	认可了再发送真正的请求	-->	预请求
	'Access-Control-Allow-Headers':'X-Test-Cors',
	//设置允许的方法
	'Access-Control-Allow-Methods':'POST, PUT, DELETE',
	// 1000s之内不需要在预请求
	'Access-Control-Max-Age':'1000',	
})
```

###	CROS 预请求
####	允许的方法
+	get
+ 	post
+ 	head

####	允许的Content-Type
+	text/plain
+ 	multipart/form-data
+  application/x-www-form-urlencoded

### Cache-Control
####	可缓存性
+	public		所有的都可以缓存, 客户端, 代理服务器等等任何地方都可以缓存
+ 	private	只有发起请求的浏览器可以缓存
+  no-cache	任何一个节点都不可以缓存

####	到期
+	max-age=<seconds>	浏览器会根据这个设置过期时间
+ 	s-maxage=<seconds>	代理服务器设置
+  max-stale=<seconds>	可以使用过期缓存,在这个时间内还可以访问缓存

```js
response.writeHead(200, {
  'Content-Type': 'text/javascript',
  //20s过期, 在这20s内不会再向服务器获取数据
  //	多个值用, 分隔
  'Cache-Control': 'max-age=20,public,'
})
```

####	重新验证
+	must-revalidate	验证是否过期
+ 	proxy-revalidate	缓存服务器过期了要去原服务器从新缓存一遍

####	其他
+	no-store	不会走缓存(本地和代理服务器),每次都去服务器拿数据
+ 	no-transform	告诉代理服务器不要随意改动返回的内容


### 资源验证
![avatar](./yanzhenghuancun.png)

####	验证
+	Last-Modified	上次修改时间:资源上次是什么时间修改的
+ 	配合If-Modified-Since或者If-Unmodified-Since使用
+  对比上次修改时间以验证资源是否需要更新
+	Etag	数据签名  文件的数据进行修改 数据签名就会重新计算
+ 	配合If-Match或者If-None-Match使用
+  对比资源的签名判断是否使用缓存
+	当服务器返回以上两个头信息的时候,浏览器下次再访问服务器的时候会通过If-Modified-Since,If-None-Match将值在带回服务端

-	当服务器设置响应头(Last-Modified || Etag) 
- 	在浏览器下次访问时会通过(If-Modified-Since || If-None-Match)将值带回来
-	304就是Not-Modified 会忽略掉响应体内容,去缓存中拿

```js
const etag = request.headers['if-none-match']
if (etag === '777') {
  response.writeHead(304, {
    'Content-Type': 'text/javascript',
    'Cache-Control': 'max-age=2000000, no-cache',
    'Last-Modified': '123',
    'Etag': '777'
  })
  response.end()
} else {
  response.writeHead(200, {
    'Content-Type': 'text/javascript',
    'Cache-Control': 'max-age=2000000, no-cache',
    'Last-Modified': '123',
    'Etag': '777'
  })
  response.end('console.log("script loaded twice")')
}
```

## Cookie
+	通过Set-Cookie设置
+ 	下次请求会自动带上
+  键值对,可以设置多个

###	Cookie属性
+	max-age	设置过期时间
+ 	expires 	设置过期时间
+	Secure		只在https的时候发送
+	设置HttpOnly		无法通过document.cookie访问 (安全性考虑)
+	设置domain	为一级域名, 那么所有的二级域名都可以访问cookie

###	request
+	存在cookie的话,再次请求的时候,请求头里会存在 Cookie 头(Cookie: id=123; name=345)

```js
response.writeHead(200, {
  'Content-Type': 'text/html',
  'Set-Cookie': ['id=123; max-age=2', 'abc=456;domain=test.com; httpOnly']
})
```

## Connection
+	发送http请求时,会先创建一个http连接, 请求和响应在这个连接中传递
+	chrome 有6个并发链接数,所以同时请求多余6个,多余的就会等待

###	长连接
+	现在互联网公司的解决方案都是采用长连接,避免每次请求重新创建连接,重新三次握手.
+	Connection: keep-alive
+ 	可以查看chrome network选项中的 ConnectionID 连接情况
+  同域的情况下才可以使用同一连接

###	用完就关闭
+	Connection:close

```js
response.writeHead(200, {
  'Content-Type': 'image/jpg',
  'Connection': 'keep-alive' // or close
})
```

##	数据协商
###	分类
#### 请求
+	Accept				想要的数据类型
+ 	Accept-Encoding  编码方式,服务器采用什么数据压缩
+  Accept-Language	语言
+  User-Agent			客户端相关的信息(判断是pc还是移动端)

####	返回
+	Content-Type			返回格式(实际返回的什么格式)
+ 	Content-Encoding		编码方式(压缩方式)
+ 	Content-Language		语言

```js
//预测返回的格式   设置不会预测, 目前浏览器不会主动预测所以不用设置
'X-Content-Options': 'nosniff'
'Content-Encoding': 'gzip'
```
##	Redirect
+	301 	谨慎	如果确定所有都要跳转到某个地址用301  永久性跳转 第一次会通过服务器跳转,之后浏览器自己跳转不再经过服务器
+ 	302		临时跳转	会先通过服务器在跳转到指定地址
+	设置Location 跳转的路由

```js
if (request.url === '/') {
	response.writeHead(302, {  // or 301
	  'Location': '/new'
	})
	response.end()
}
```
##		Content-Security-Policy
+	内容安全策略

###作用
+	限制资源获取
+ 	报告资源获取越权

###	限制方式
+	default-src限制全局
+ 	指定资源类型
	-	connect-src
	- 	img-src
	-  manifest-src
	-  font-src
	-  media-src
	-  style-src
	-  frame-src
	-  script-src

##	Nginx
###	include
+	可以将conf文件拆分

###	server_name
+	host地址

###	proxy_pass
+	代理到什么地方

```js
#   设置代理缓存, cache文件夹, 可以创建二级文件夹 内存中缓存的名字my_cache 10m大小
proxy_cache_path cache levels=1:2 keys_zone=my_cache:10m;
server{
	#   80端口默认跳转到http => https
	listen  80 default_server;  # 80端口
	listen  [::]:80 default_server; #   [::] ip方式
	server_name test.com;
	return 302  https://$server_name$request_uri; 
}
server {
	# 如果listen上设置了ip 192.168.1.1:80 的话,server_name将失效
	listen       80;    //端口
	# 可以在80 端口上绑定多个域名,然后通过域名进行转发到不同地址上
	server_name  cloud; //域名 - host名称
	
	charset utf-8;
	
	location / { 
		root D:\smartpark\dist; 
		proxy_set_header  X-Real-IP  $remote_addr; 
		index index.html index.htm; 
		try_files $uri /index.html;
	    #   使用缓存
	    proxy_cache my_cache;
	}
	
	location /manage/itbgp/ {
	    proxy_pass        http://120.236.207.162:9099/manage/itbgp/;    //代理到什么地方
	    // 设置代理头,如果不写,发送到服务器的host 就是proxy_pass内容    
	    //	$http_host 是nginx 维护的变量,是浏览器发过来的host
	    proxy_set_header  Host $http_host;  
	    proxy_set_header  X-Real-IP        $remote_addr;
	    proxy_http_version 1.1;
	}
}

```

## HTTPS
+	http是明文传输,没有安全属性

###	加密
![avatar](./https.png)

####	公钥
放在互联网上任何人都可以拿到的加密字符串, 传输的数据使用公钥加密

####	私钥
存在服务器上,服务器接收到请求用私钥解密, 没有私钥是解析不了公钥的加密字符串

#### 默认端口
443

#### 开启https
ssl:on;	开启
ssl_certificate_key certs/localhost-privkey.pem
ssl_certificate certs/localhost-cert.pem

##	HTTP2_前奏_TLS
+	HTTPS 还是通过了 HTTP 来传输信息，但是信息通过 TLS 协议进行了加密。
+	TLS 协议位于传输层之上，应用层之下。首次进行 TLS 协议传输需要两个 RTT ，接下来可以通过 Session Resumption 减少到一个 RTT。
+	在 TLS 中使用了两种加密技术，分别为：对称加密和非对称加密。

###	对称加密：
+	对称加密就是两边拥有相同的秘钥，两边都知道如何将密文加密解密。
+	这种加密方式固然很好，但是问题就在于如何让双方知道秘钥。因为传输数据都是走的网络，如果将秘钥通过网络的方式传递的话，一旦秘钥被截获就没有加密的意义的。

###	非对称加密：
+	有公钥私钥之分，公钥所有人都可以知道，可以将数据用公钥加密，但是将数据解密必须使用私钥解密，私钥只有分发公钥的一方才知道。
+	这种加密方式就可以完美解决对称加密存在的问题。假设现在两端需要使用对称加密，那么在这之前，可以先使用非对称加密交换秘钥。
+	简单流程如下：首先服务端将公钥公布出去，那么客户端也就知道公钥了。接下来客户端创建一个秘钥，然后通过公钥加密并发送给服务端，服务端接收到密文以后通过私钥解密出正确的秘钥，这时候两端就都知道秘钥是什么了。

###	TLS握手过程
![avatar](./tls.png)

+	客户端发送一个随机值以及需要的协议和加密方式。
+	服务端收到客户端的随机值，自己也产生一个随机值，并根据客户端需求的协议和加密方式来使用对应的方式，并且发送自己的证书（如果需要验证客户端证书需要说明）
+	客户端收到服务端的证书并验证是否有效，验证通过会再生成一个随机值，通过服务端证书的公钥去加密这个随机值并发送给服务端，如果服务端需要验证客户端证书的话会附带证书
+	服务端收到加密过的随机值并使用私钥解密获得第三个随机值，这时候两端都拥有了三个随机值，可以通过这三个随机值按照之前约定的加密方式生成密钥，接下来的通信就可以通过该密钥来加密解密
+	通过以上步骤可知，在 TLS 握手阶段，两端使用非对称加密的方式来通信，但是因为非对称加密损耗的性能比对称加密大，所以在正式传输数据时，两端使用对称加密的方式通信。
+	PS：以上说明的都是 TLS 1.2 协议的握手情况，在 1.3 协议中，首次建立连接只需要一个 RTT，后面恢复连接不需要 RTT 了。

##	HTTP2
###	HTTP1  vs HTTP2
+	在 HTTP/1 中，为了性能考虑，我们会引入雪碧图、将小图内联、使用多个域名等等的方式。这一切都是因为浏览器限制了同一个域名下的请求数量（Chrome 下一般是限制六个连接），当页面中需要请求很多资源的时候，队头阻塞（Head of line blocking）会导致在达到最大请求数量时，剩余的资源需要等待其他资源请求完成后才能发起请求。
+	在 HTTP/2 中引入了多路复用的技术，这个技术可以只通过一个 TCP 连接就可以传输所有的请求数据。多路复用很好的解决了浏览器限制同一个域名下的请求数量的问题，同时也间接更容易实现全速传输，毕竟新开一个 TCP 连接都需要慢慢提升传输速度。

###	优势
+	信道复用
+ 	分帧传输
+	Server	Push	(服务器可以给客户端发送消息)

###	二进制传输
HTTP/2 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP/2 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。

![avatar](./erjinzhi.png)

###	多路复用
+	在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
+	帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
+	多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

![avatar](./duolufuyong.png)

### 	Header 压缩
+	在 HTTP/1 中，我们使用文本的形式传输 header，在 header 携带 cookie 的情况下，可能每次都需要重复传输几百到几千的字节。
+	在 HTTP /2 中，使用了 HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。并在两端维护了索引表，用于记录出现过的 header ，后面在传输过程中就可以传输已经记录过的 header 的键名，对端收到数据后就可以通过键名找到对应的值。

###	服务端 Push
+	在 HTTP/2 中，服务端可以在客户端某个请求后，主动推送其他资源。
+	可以想象以下情况，某些资源客户端是一定会请求的，这时就可以采取服务端 push 的技术，提前给客户端推送必要的资源，这样就可以相对减少一点延迟时间。当然在浏览器兼容的情况下你也可以使用 prefetch 。

##	HTTP3
+	虽然 HTTP/2 解决了很多之前旧版本的问题，但是它还是存在一个巨大的问题，虽然这个问题并不是它本身造成的，而是底层支撑的 TCP 协议的问题。
+	因为 HTTP/2 使用了多路复用，一般来说同一域名下只需要使用一个 TCP 连接。当这个连接中出现了丢包的情况，那就会导致 HTTP/2 的表现情况反倒不如 HTTP/1 了。
+	因为在出现丢包的情况下，整个 TCP 都要开始等待重传，也就导致了后面的所有数据都被阻塞了。但是对于 HTTP/1 来说，可以开启多个 TCP 连接，出现这种情况反到只会影响其中一个连接，剩余的 TCP 连接还可以正常传输数据。
+	那么可能就会有人考虑到去修改 TCP 协议，其实这已经是一件不可能完成的任务了。因为 TCP 存在的时间实在太长，已经充斥在各种设备中，并且这个协议是由操作系统实现的，更新起来不大现实。
+	基于这个原因，Google 就更起炉灶搞了一个基于 UDP 协议的 QUIC 协议，并且使用在了 HTTP/3 上，当然 HTTP/3 之前名为 HTTP-over-QUIC，从这个名字中我们也可以发现，HTTP/3 最大的改造就是使用了 QUIC，接下来我们就来学习关于这个协议的内容。

###	QUIC
之前我们学习过 UDP 协议的内容，知道这个协议虽然效率很高，但是并不是那么的可靠。QUIC 虽然基于 UDP，但是在原本的基础上新增了很多功能，比如多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能。这里我们就挑选几个重要的功能学习下这个协议的内容。

###	多路复用
+	虽然 HTTP/2 支持了多路复用，但是 TCP 协议终究是没有这个功能的。QUIC 原生就实现了这个功能，并且传输的单个数据流可以保证有序交付且不会影响其他的数据流，这样的技术就解决了之前 TCP 存在的问题。
+	并且 QUIC 在移动端的表现也会比 TCP 好。因为 TCP 是基于 IP 和端口去识别连接的，这种方式在多变的移动端网络环境下是很脆弱的。但是 QUIC 是通过 ID 的方式去识别一个连接，不管你网络环境如何变化，只要 ID 不变，就能迅速重连上。

###	0-RTT
+	通过使用类似 TCP 快速打开的技术，缓存当前会话的上下文，在下次恢复会话的时候，只需要将之前的缓存传递给服务端验证通过就可以进行传输了。

###	纠错机制
+	假如说这次我要发送三个包，那么协议会算出这三个包的异或值并单独发出一个校验包，也就是总共发出了四个包。
+	当出现其中的非校验包丢包的情况时，可以通过另外三个包计算出丢失的数据包的内容。
+	当然这种技术只能使用在丢失一个包的情况下，如果出现丢失多个包就不能使用纠错机制了，只能使用重传的方式了。