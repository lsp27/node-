const redis = require('redis')
const {
  REDIS_CONF
} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.log('error=====>',err)
})

function set(key, val) {
  if(typeof val === 'object') {
    val = JSON.stringify(val)
  }
  return redisClient.set(key, val, redis.print)
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      } 
      try {   // 只为了兼容 JSON 转换格式
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}