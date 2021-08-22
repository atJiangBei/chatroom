let router = require('koa-router')()
let {
  findDataFromName,
  getJsonData,
  updateJsonData,
  createRandomStr,
} = require('./../utils')

router.get('/chat/queryAllUser', async (ctx) => {
  try {
    const { id } = ctx.query
    const userPath = './datajson/user.json'
    const jsondata = await getJsonData(userPath)
    const index = jsondata.findIndex((res) => res.id === id)
    jsondata.splice(index, 1)
    ctx.body = {
      code: 0,
      msg: '成功',
      data: jsondata,
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: error,
    }
  }
})

router.get('/chat/register', async (ctx) => {
  console.log(ctx.query)
  try {
    const { name, password } = ctx.query
    if (!name || !password) {
      ctx.body = {
        code: 1,
        msg: '参数错误！用户名或密码为必填项',
      }
      return
    }
    const userPath = './datajson/user.json'
    const jsondata = await getJsonData(userPath)
    const data = await findDataFromName(jsondata, name)
    if (data) {
      ctx.body = {
        code: 1,
        msg: '用户名重复',
      }
    } else {
      const userData = {
        name,
        password,
        createTime: Date.now(),
        id: createRandomStr(),
      }
      jsondata.push(userData)
      await updateJsonData(userPath, JSON.stringify(jsondata))
      ctx.body = {
        code: 0,
        msg: '注册成功',
      }
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: error,
    }
  }
})

router.get('/chat/login', async (ctx) => {
  try {
    const { name, password } = ctx.query
    if (!name || !password) {
      ctx.body = {
        code: 1,
        msg: '参数错误！用户名或密码为必填项',
      }
      return
    }
    const userPath = './datajson/user.json'
    const jsondata = await getJsonData(userPath)
    const data = await findDataFromName(jsondata, name)
    if (data) {
      ctx.body = {
        code: 0,
        msg: '成功',
        data,
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '无此用户',
      }
    }
  } catch (error) {
    ctx.body = {
      code: 2,
      msg: error,
    }
  }
})

module.exports = router
