const router = require('koa-router')()

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



router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    //管理员界面
    if(ctx.session.username == null) {
      //未登陆
      ctx.body = new ErrorModel('未登陆')
      return 
    }
    // 强制查询自己的博客
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id
  const result = await getDetail(id)
  ctx.body = new SuccessModel(result)
})

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update',loginCheck,  async (ctx, next) => {
  const id = ctx.query.id
  const data = await updateBlog(id, ctx.request.body)
  if(data) {
    ctx.body = new SuccessModel(val)
  }else{
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/delete', loginCheck, (ctx, next) => {
  const author = ctx.session.username
  const id = ctx.query.id
  const data = delBlog(id,author)
  if(data) {
    ctx.body = new SuccessModel(val)
  }else{
    ctx.body = new ErrorModel('删除博客失败')
  }
})




module.exports = router