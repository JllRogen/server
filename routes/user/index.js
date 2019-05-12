const router = require('express').Router()

let user = {}

const allRoles = ["admin", 'editer', "developer"] // 角色列表

router.post('/login', function (req, res, next) {
  console.log(req.body)
  let body = req.body
  user.name = body.username
  user.pwd = body.password
  res.send({
    code: "000000",
    data: {
      token: "jdfakngognopegori42h"
    }
  })
})
router.post('/logout', function (req, res, next) {
  res.send({
    code: "000000",
  })
})


router.get('/info', function (req, res, next) {
  res.send({
    code: "000000",
    data: {
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: user.name,
      roles: [allRoles[1]],
      role: [user.name]
    }
  })
})



module.exports = router