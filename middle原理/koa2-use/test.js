const Koa = require('./like-koa2')
const app = new Koa()

// koa 中间件远离：洋葱模型
// app.use 用来注册中间件，先收集起来
// 实现next 机制，即上一个通过next触发下一个
// 不涉及 method 和 path 判断


app.use(async (ctx, next) => {
  console.log(1)
  await next() // 1
  const rt = ctx['X-Response-Time']   // 7
  console.log(`${ctx.method} ${ctx.url} ${rt}`)    // 8
  console.log(11)
})

app.use(async (ctx, next) => {
  console.log(2)
  const start = Date.now() // 2
  await next()   // 3
  const ms = Date.now() - start   // 5
  ctx['X-Response-Time']  = `${ms}ms`
  console.log(22)
})

app.use(async ctx => {
  console.log(3)
  ctx.res.end('Hello World')   // 4
  console.log(33)

})

app.listen(8000)