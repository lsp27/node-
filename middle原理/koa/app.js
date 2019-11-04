const Koa = require('koa')
const app = new Koa()

// koa 中间件远离：洋葱模型
// app.use 用来注册中间件，先收集起来
// 实现next 机制，即上一个通过next触发下一个
// 不涉及 method 和 path 判断


app.use(async (ctx, next) => {
  console.log('第一层洋葱开始')
  await next() // 1
  const rt = ctx.response.get('X-Response-Time')   // 7
  console.log(`${ctx.method} ${ctx.url} ${rt}`)    // 8
  console.log('第一层洋葱结束')
})

app.use(async (ctx, next) => {
  console.log('第二层洋葱开始')
  const start = Date.now() // 2
  await next()   // 3
  const ms = Date.now() - start   // 5
  ctx.set('X-Response-Time', `${ms}ms`)   // 6
  console.log('第二层洋葱结束')
})

app.use(async ctx => {
  console.log('第三层洋葱开始')
  ctx.body = 'Hello World'   // 4
  console.log('第三层洋葱结束')
})

app.listen(8000)