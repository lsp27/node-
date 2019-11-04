// 标准输入输出
// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     req.pipe(res) 
//   }
// })

// server.listen(8000)

const fs = require('fs')
const path = require('path')

const file1 = path.resolve(__dirname, 'aaa.txt')
const file2 = path.resolve(__dirname, 'bck.txt')

const readStream = fs.createReadStream(file1)
const writeStream = fs.createWriteStream(file2)

readStream.pipe(writeStream)

readStream.on('data', chunk => {
  console.log(chunk.toString())
  console.log('=====================')
})

readStream.on('end', () => {
  console.log('完成')
})