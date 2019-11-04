var express = require('express');
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog.js')
const loginCheck = require('../middle/loginCheck')

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

/* GET users listing. */
router.get('/list',  (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isadmin) {
    //管理员界面
    if(req.session.username == null) {
      //未登陆
      return res.json(
        new ErrorModel('未登陆')
      )
    }
    // 强制查询自己的博客
    author = req.session.username
  }

  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get('/detail', (req, res, next) => {
  const id = req.query.id
  const result = getDetail(id)
  result.then(data => {
    res.json( new SuccessModel(data) )
  })
  return
})

router.post('/new', loginCheck, (req, res, next) => {
 
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/update',loginCheck,  (req, res, next) => {
  const result = updateBlog(id, req.body)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel(val))
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

router.post('/delete', loginCheck, (req,res, next) => {
  const author = req.session.username
  const id = req.query.id
  const result = delBlog(id,author)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel(val))
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
})


module.exports = router;
