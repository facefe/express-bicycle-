var express = require('express')
var router = express.Router()
let fs = require('fs')
let path = require('path')
/* GET home page. */

/*
 * login 接口
 */
router.post('/login', (req, res, next) => {
  let loginMes = req.body
  console.log(loginMes)
  fs.readFile(path.join(__dirname, '../mock/userLogin.json'), (err, data) => {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    if (loginMes.user === data.user && loginMes.password === data.password) {
      fs.readFile(path.join(__dirname, '../mock/user.json'), (err, data) => {
        if (err) {
          throw err
        }
        data = JSON.parse(data)
        res.status(200).send({
          code: 1,
          mes: "登陆成功",
          data
        })
      })
    } else {
      if (loginMes.user === data.user) {
        res.status(200).send({
          code: 2,
          mes: "密码不正确"
        })
      } else {
        res.status(200), send({
          code: 3,
          mes: "账号不存在"
        })
      }
    }
  })
})

/**
 * repassword 修改密码
 */
router.post('/repassword', (req, res, next) => {
  let account = req.body
  fs.readFile(path.join(__dirname, '../mock/userLogin.json'), (err, data) => {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    if (account.user === data.user && account.password === data.password) {
      data.password = account.repassword
      data = JSON.stringify(data)
      fs.writeFile(path.join( __dirname , "../mock/userLogin.json"), data, (err) => {
        if (err) {
          throw err
        }
        res.status(200).send("厉害了,竟然修改成功了")
      })
    } else {
      if (account.user === data.user) {
        res.status(200).send({
          code: 2,
          mes:"原密码不正确"
        })
      }else {
        res.status(200).send({
          code: 3,
          mes: "账号不存在"
        })
      }
    }
  })
})


//测试接口
// router.get('/login', (req, res, next) => {
//   fs.readFile(path.join(__dirname, '../mock/userLogin.json'),  (err, data) => {
//     if (err) {
//       throw err
//     }
//     data = JSON.parse(data)
//     res.status(200).send(data)
//   })
// })

module.exports = router;