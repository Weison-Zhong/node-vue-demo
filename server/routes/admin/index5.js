//加登录验证中间件之后
//通用CRUD 后端路由里面的index.js
module.exports = app => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const express = require('express')
    //这是express的一个子路由，里面有各种CRUD的东西
    const router = express.Router({
        mergeParams: true
    })

    //不能是固定模型了
    //const Category = require('../../models/Category')

    //创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //资源列表
    router.get('/', async (req, res) => {
        //这里只是在查询Category的时候才需要加populate  const items = await Categories.find().populate('parent')
        const queryOptions = {}
        if (req.Model.modelName === 'Category') { queryOptions.populate = 'parent' }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true,
        })
    })

    //登录校验中间件函数   上传需要验证，所哟的CRUD需要验证
    const authMiddleware = require('../../middleware/auth')
    //下是原来的写法
    // const authMiddleware = async (req, res, next) => {
    //     const token = String(req.headers.authorization || '').split(' ').pop()
    //     assert(token, 401, '请提供jwttoken')
    //     const { id } = jwt.verify(token, app.get('secret'))
    //     console.log(id)
    //     assert(id, 401, '无效的jwttoken')
    //     req.user = await AdminUser.findById(id)
    //     assert(req.user, 401, '请先登录哇→')
    //     await next()
    // }

    const resourceMiddle = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddle(), router)
    //中间件打包出去之前  可以直接用app.ger('serect')
    /*   app.use('/admin/api/rest/:resource', async (req, res, next) => {
           const token = String(req.headers.authorization || '').split(' ').pop()
           assert(token, 401, '请提供jwttoken')
           const { id } = jwt.verify(token, app.get('secret'))
           //console.log(id)
           assert(id, 401, '无效的jwttoken')
           req.user = await AdminUser.findById(id)
           assert(req.user, 401, '请先登录哇→')
           await next()
       }, resourceMiddle(), router)
   */
    const multer = require('multer')
    //定义一个上传中间件  dest是destination目标地址的意思  __dirname表示当前文件的绝对地址
    const upload = multer({ dest: __dirname + '/../../uploads' })
    //上传图片接口  upload.single表示单个文件的上传  这个file对应的是headers中的form data字段中的file（转换成了二进制），这个file名是可以改成其他的
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res, next) => {
        //本身express是没有req.file的，在用了multer后会自动在req中加入该属性。
        const file = req.file
        //自己拼凑出该图片的url
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录的接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // console.log(username)
        //1、根据用户名查找用户
        const user = await AdminUser.findOne({
            username: username
        }).select('+password')
        /*原来的写法
          if (!user) {
              //设置状态码后再发送send
              return res.status(422).send({
                  message: "用户不存在"
              })
          }
        */
        //换成assert包的写法
        //这里只是抛出异常  后面还有错误处理中间件
        assert(user, 422, '用户不存在')


        //2、校验密码
        //compareSync比较明文和密文是否匹配 但是这里直接user.password是查不出密码的（因为数据模型定义了select:false）
        //所以在findone方法加了.select
        const isValid = require('bcrypt').compareSync(password, user.password)
        //必须是isValid，否则抛出422错误状态码和密码错误
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     //统一用422表示客户端提交的数据有问题
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }

        //3、返回token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({ token })


        //post末尾
    })



    //错误处理函数  这也是个中间件，4个参数是错误处理中间件
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}










/*
当时测试express用了router中间件的时候在里面获取不到req.params参数
是因为忘了加 const router = express.Router({
    mergeParams:true     忘了加这个导致我找了大半天的bug
})
*/