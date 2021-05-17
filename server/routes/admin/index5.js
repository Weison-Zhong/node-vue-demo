//加登录验证中间件之后
//通用CRUD 后端路由里面的index.js
module.exports = app => {
    const express = require('express')
    //这是express的一个子路由，里面有各种CRUD的东西
    const router = express.Router()
    //不能是固定模型了
    //const Category = require('../../models/Category')

    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    router.get('/',async (req,res,next) => {
        //校验用户是否登录
        //1、获取用户信息，从请求头中拿
        
        
        await next()
    }, async (req, res) => {
        //这里只是在查询Category的时候才需要加populate  const items = await Categories.find().populate('parent')
        const queryOptions = {}
        if (req.Model.modelName === 'Category') { queryOptions.populate = 'parent' }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true,
        })
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        //给req多挂载一个model属性，后续就可以用req.model去访问了
        // console.log(modelName)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)


    const multer = require('multer')
    //定义一个上传中间件  dest是destination目标地址的意思  __dirname表示当前文件的绝对地址
    const upload = multer({ dest: __dirname + '/../../uploads' })
    //上传图片接口  upload.single表示单个文件的上传  这个file对应的是headers中的form data字段中的file（转换成了二进制），这个file名是可以改成其他的
    app.post('/admin/api/upload', upload.single('file'), async (req, res, next) => {
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
        const AdminUser = require('../../models/AdminUser')
        const user = await AdminUser.findOne({
            username: username
        }).select('+password')
        if (!user) {
            //设置状态码后再发送send
            return res.status(422).send({
                message: "用户不存在"
            })
        }

        //2、校验密码
        //compareSync比较明文和密文是否匹配 但是这里直接user.password是查不出密码的（因为数据模型定义了select:false）
        //所以在findone方法加了.select
        const isValid = require('bcrypt').compareSync(password, user.password)
        if (!isValid) {
            //统一用422表示客户端提交的数据有问题
            return res.status(422).send({
                message: '密码错误'
            })
        }

        //3、返回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send({token})


        //post末尾
    })
}










/*
当时测试express用了router中间件的时候在里面获取不到req.params参数
是因为忘了加 const router = express.Router({
    mergeParams:true     忘了加这个导致我找了大半天的bug
})
*/