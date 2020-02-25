
const Express = require('./like-express')
const app = Express()


app.use((req, res, next) => {
  console.log(1)
  next()
}, (req, res, next) => {
  console.log(2)
  next()
})

app.get('/api/ccc',(req, res, next) => {
  console.log(4)
})



app.listen(8000)