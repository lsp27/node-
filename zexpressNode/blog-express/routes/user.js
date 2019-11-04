var express = require('express');
const {
  login
} = require('../controller/user')

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// const {set} = require('../db/redis')
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const {
    username,
    password
  } = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      // 设置session
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(
        new SuccessModel(data)
      )
      return 
    }
    res.json(new ErrorModel('登陆失败'))
  })
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json(new SuccessModel(req.session.username))
    return
  } 
  res.json(new ErrorModel('失败'))
})


// router.get('/session-test', (req, res, next) => {
//   const session = req.session
//   if(session.viewNum == null) {
//     session.viewNum = 0
//   }
//   session.viewNum++
//   res.json({
//     viewNum: session.viewNum
//   })

// })


module.exports = router
