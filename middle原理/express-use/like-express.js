const http = require('http')
const slice = Array.prototype.slice

class expressNext{
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }
  register(path) {
    const info = {}
    if(typeof path === 'string') {
      info.path = path
      info.stack = slice.call(arguments, 1)
    }else{
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)                   
  }

  match(url, method) {
    let stack = []
    if(url === '/favicon.ico') {
      return stack
    }
    const allUrl = []
    const allUrl = allUrl.concat(this.routes.all)
    const allUrl = allUrl.concat(this.routes[method])

    allUrl.forEach(item => {
      if(url.indexOf(item.path) === 0) {
        stack = stack.concat(item.stack)
      }
    })
    return stack
  }

  handle(req, res, fn) {
    const next = () => {
      const middleWare = fn.shift()
      if(middleWare) {
        middleWare(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const fn = this.match(url, method)
      this.handle(req, res, fn)
    }
  }



  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

}