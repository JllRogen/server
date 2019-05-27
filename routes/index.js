const express = require('express'),
  router = express.Router(),
  fs = require("fs"),
  path = require("path")

// 访问根接口
router.get('/', function (req, res, next) {
  res.send({
    code: "000001",
    msg: "该接口无法访问!"
  })
})

let apiDirPath = path.resolve(__dirname, "../../src/api") //  api文件夹路径

// let apiDirPath = path.resolve(__dirname, "../api") //  api文件夹路径
// 读取文件列表
fs.readdir(apiDirPath,
  (err, files) => {
    if (err) {
      console.log("没有api文件", err)
      return
    }
    parseFiles(files)
  })

// 遍历api文件下面的模块
function parseFiles(files) {
  files.forEach((filename) => {
    let filePath = path.resolve(apiDirPath, filename)
    let stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      console.log()
      console.log(`==========解析${filename}模块==========`)
      let nodeDirPath = path.resolve(filePath, "nodeApi")
      let apiListFilepath = path.resolve(nodeDirPath, "apiList.js")
      if (fs.existsSync(apiListFilepath)) {
        // let apiList = JSON.parse(fs.readFileSync(apiListFilepath, 'utf8'))
        let apiList = require(apiListFilepath)
        if (Object.prototype.toString.call(apiList) !== "[object Array]") return
        apiList.forEach(item => {
          let filePath = path.resolve(nodeDirPath, item.doc + ".js") // 回调函数文件的路径
          addRoute(item, filePath)
        })
      } else {
        console.log(`==========${filename}模块没有apiList.json文件==========`)
      }

    }
  })
}

// 添加路由
function addRoute(data, filePath) {
  console.log(` 添加路由${ data.url },   mehtod: ${data.method || "get"},   api文件: ${data.doc}`)
  if (data.method === "post") {
    router.post(data.url, (req, res, next) => {
      routeCb(req, res, next, filePath)
    })
  } else {
    router.get(data.url, (req, res, next) => {
      routeCb(req, res, next, filePath)
    })
  }
}

// 路由的回调
function routeCb(req, res, next, filePath) {
  fs.readFile(filePath, "utf8", (err, funStr) => {
    if (err) {
      console.log("文件路径错误", err)
      res.send({
        code: "000001",
        msg: `找不到路径${filePath}`,
        error: err
      })
      return
    }
    let fn = new Function(["req", "res"], funStr)
    fn.call(null, req, res)
    fn = null
  })
}




module.exports = router
