/* 写成这种形式到处是写死的不能扩展的
module.exports = async (req, res, next) => {
    //校验用户是否登录
    //1、获取用户信息，从请求头headers中拿
    //强制转换为字符串，若为空值时自动转换为空字符串  以空格 分割，分割完后是个数组，pop取出最后一个
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请提供jwttoken')
    //提取token数据 用对象解构拿到id
    const { id } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '无效的jwttoken')
    //查找是否确有此id
    //const user = await AdminUser.findById(id) 
    //把user挂载到req上去可以给其他接口用
    req.user = await AdminUser.findById(id)
    //401错误一般是和用户信息有关的
    //确保req.user存在，否则的话抛出401错误，同事告诉他请先登录。
    assert(req.user, 401, '请先登录哇→')
    await next()
}
*/

//写成函数调用形式
module.exports = options => {
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    const jwt = require('jsonwebtoken')

    const fn = async (req, res, next) => {

        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请提供jwttoken')
        //console.log(req.app)
        //这里的req.app等同于外面的app对象  在中间件里面是访问不到路由里面的app的
        const { id } = jwt.verify(token, req.app.get('secret'))
        console.log(id)
     
        assert(id, 401, '无效的jwttoken')

        req.user = await AdminUser.findById(id)

        assert(req.user, 401, '请先登录哇→')
        await next()
    }

    return fn
}
