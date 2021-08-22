const fs = require('fs')

exports.findDataFromName = function (attr, name) {
  if (!attr || !Array.isArray(attr) || !attr.length || !name) return false
  for (let i = 0; i < attr.length; i++) {
    if (attr[i].name === name) {
      return attr[i]
    }
  }
  return false
}

exports.getJsonData = function (pathstr) {
  return new Promise((res, rej) => {
    fs.readFile(pathstr, function (err, json) {
      if (err) {
        rej(err)
      } else {
        json = JSON.parse(json.toString())
        res(json)
      }
    })
  })
}

exports.updateJsonData = function (pathstr, jsonstr) {
  return new Promise((res, rej) => {
    fs.writeFile(pathstr, jsonstr, function (err) {
      if (err) {
        rej(err)
      } else {
        res()
      }
    })
  })
}

//生成不同位数的随机数
exports.createRandomStr = function (digit = -10) {
  return Math.random().toString(36).substr(digit)
}
