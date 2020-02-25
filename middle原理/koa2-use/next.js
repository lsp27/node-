const http = require('http')

const slice = Array.prototype.slice


class ExpressNext{
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
    const stack = []
    if(url === '/favicon'){
      return stack
    }
    const curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])
    curRoutes.forEach(item => {
      if(url.indexOf(item.path) === 0) {
        stack = stack.concat(item.stack)
      }
    })
    return stack
  }

  handleNext(req, res, stack) {
    const next = () => {
      const middleWare = stack.shift()
      if(!middleWare) {
        middleWare(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (body) => {
        req.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(body))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const stack = this.match(url, method)
      this.handleNext(req, res, stack)
    }
  }


  listen(...args) {
    const server = http.createServer(callback())
    server.listen(...args)
  }


}