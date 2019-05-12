const express = require('express'),
	router = express.Router(),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	app = express()

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


const allowHeaders = (() => {
	let list = ["content-type", "user_id", "user_ip", "user_name", "token"]
	return list.join(', ')
})()
const allowMethods = (() => {
	let list = ["POST", "GET", "DELETE", "put", "OPTIONS", "PATCH"]
	return list.join(", ")
})()
// 支持跨域
app.all("*", function (req, res, next) {
	// var orginList = [
	// 	"http://www.zhangpeiyue.com",
	// 	"http://www.alibaba.com",
	// 	"http://www.qq.com",
	// 	"http://www.baidu.com"
	// ]
	// if (orginList.includes(req.headers.origin.toLowerCase())) {
	// 	res.header("Access-Control-Allow-Origin", req.headers.origin);
	// }
	res.header("Access-Control-Allow-Origin", "*"); // 允许所有域名
	res.header("Access-Control-Allow-Headers", allowHeaders); // 跨域的请求头里面设置的自定义参数
	res.header("Access-Control-Allow-Methods", allowMethods);
	res.header("Access-Control-Max-Age", 10); // 响应保存10秒
	res.header("Access-Control-Expose-Headers", "Cache-Control, Content-Language, Content-Type, Last-Modified")
	if (req.method.toLowerCase() == 'options') { //让options 预检请求快速结束
		res.send(200);
	} else {
		next();
	}
})


app.use("/", require("./routes/index"))

app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.send({
		code: "0000100",
		message: "资源访问错误"
	})
})

module.exports = app