const fs = require('fs')

const userPath = './datajson/user.json'
fs.readFile(userPath, function (err, json) {
  json = JSON.parse(json.toString())
  console.log(json)
  json.name = 'sdfsd'
  const jsonstr = JSON.stringify(json, null, '  ')
  fs.writeFile(userPath, jsonstr, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('----------修改成功-------------')
    }
  })
})
