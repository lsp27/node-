const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('请求开始....', req.method, req.url)
  next()
  console.log('aaaaaaa')
})

app.use((req, res, next) => {
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next) => {
  console.log('到我之前')
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    console.log('到我了')
    next()
  },2000)
})

app.use('/api', (req, res, next) => {
  console.log('use /api 路由')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post /api 路由')
  next()
})

function loginCheck(req, res, next) {
  console.log('模拟登陆')
  setTimeout(() => {
    next()
  })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  console.log('post /api/get-post-data')
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理 404')
  res.json({
    errno: -1,
    msg: '404 not found'
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})