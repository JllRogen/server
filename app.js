const express = require( 'express' ),
  // router = express.Router(),
  path = require( 'path' ),
  // favicon = require('serve-favicon'),
  // logger = require('morgan'),
  // cookieParser = require('cookie-parser'),
  // bodyParser = require('body-parser'),
  app = express( )

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }))
// app.use(cookieParser())
// console.log(path.join(__dirname, '../dist/base'))
app.use( express.static( path.join( __dirname, 'public' ) ) )
app.use( express.static( path.join( __dirname, '../dist' ) ) )

const allowHeaders = ( ( ) => {
  let list = [
		'Authorization',
		"content-type",
		'Depth',
		'User-Agent',
		'X-File-Size',
		'X-Requested-With',
		'X-Requested-By',
		'If-Modified-Since',
		'X-File-Name',
		'X-File-Type',
		'Cache-Control',
		'Origin',
		"user_id",
		"user_ip",
		"user_name",
    "token",
    "lang",
    "opsource",
    "sign"
    ] // content-type,lang,opsource,sign
  let str = list.join( ',' )
  console.log( str )
  return str
} )( )
const allowMethods = ( ( ) => {
  let list = [ "POST", "GET", "DELETE", "PUT", "OPTIONS", "PATCH" ]
  console.log( list.join( "," ) )
  return list.join( "," )
} )( )

// var orginList = [
//     "http://0.0.0.0:2019",
//     'http://localhost:2019',
//      'http://192.168.43.222:8080',
//     "http://www.alibaba.com",
//     'http://192.168.43.222:2019',
//   	"http://www.qq.com",
//   	"http://www.baidu.com"
//   ]
// 支持跨域
app.all( "*", function ( req, res, next ) {

  let origin = req.headers.origin.toLowerCase( )
  console.log( origin )
  res.header( "Access-Control-Allow-Origin", origin );

  // res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Authorization,content-type,Depth,User-Agent,X-File-Size,X-Requested-With,X-Requested-By,If-Modified-Since,X-File-Name,X-File-Type,Cache-Control,Origin,user_id,user_ip,user_name,token,lang,opsource,sign" );
  // res.header( "Access-Control-Allow-Headers", "*" )
  res.header( "Access-Control-Allow-Methods", "POST,GET,DELETE,PUT,OPTIONS,PATCH" );
  res.header( "Access-Control-Allow-Credentials", true )
  res.header( "Access-Control-Max-Age", 200 ); // 响应保存10秒
  res.header( "Access-Control-Expose-Headers", "Cache-Control,Authorization,Content-Language, Content-Type,Last-Modified" )
  if ( req.method.toLowerCase( ) === 'options' ) { //让options 预检请求快速结束
    res.sendStatus( 200 );
  } else {
    next( );
  }
} )


app.use( "/", require( "./routes/index" ) )

app.use( function ( err, req, res, ) {
  res.locals.message = err.message
  res.locals.error = req.app.get( 'env' ) === 'development' ? err : {}

  res.status( err.status || 500 )
  res.send( {
    code: "0000100",
    message: "资源访问错误"
  } )
} )

module.exports = app




//Access to XMLHttpRequest at 'http://0.0.0.0:8888/lkjz_cms/home' from origin 'http://192.168.43.222:2019' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://0.0.0.0:2019' that is not equal to the supplied origin.
//Access to XMLHttpRequest at 'http://0.0.0.0:8888/lkjz_cms/home' from origin 'http://192.168.43.222:2019' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://192.168.43.222:8080' that is not equal to the supplied origin.
//Access to XMLHttpRequest at 'http://0.0.0.0:8888/lkjz_cms/home' from origin 'http://192.168.43.222:2019' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The 'Access-Control-Allow-Origin' header has a value 'http://192.168.43.222:8080' that is not equal to the supplied origin.

// Access to XMLHttpRequest at 'http://0.0.0.0:8888/lkjz_cms/home' from origin 'http://192.168.43.222:2019' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
//Access to XMLHttpRequest at 'http://0.0.0.0:8888/lkjz_cms/home' from origin 'http://192.168.43.222:2019' has been blocked by CORS policy: Request header field lang is not allowed by Access-Control-Allow-Headers in preflight response.
