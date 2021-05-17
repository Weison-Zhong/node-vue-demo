//这是原来模块的写法

//这是服务端的入口文件
const express = require("express")

const app = express()

//app.set表示给这app实例加一个变量  第二个参数直接放这里不合理的，应该放到一个环境变量中
app.set('secret','suibiandade')


app.use(require('cors')())
//加上一个中间件
app.use(express.json())
//表示uploads文件夹下的东西都是静态文件,托管静态文件
app.use('/uploads',express.static(__dirname + '/uploads'))

const db = require('./plugins/db')
db()
//console.log(db)
//require('./plugins/db')()
//require('./plugins/db')(app)


//引入admin目录下index.js模块的函数，直接（）使用，并把app对象传进去。那么在admin里面就有一个app可以用
//require('./routes/admin/index')(app)
//通用CRUD版本
require('./routes/admin/index5')(app)

// const indexRouter = require('./routes/admin/index3')   另一种引入模块对象的用法

/*下段是测试代码
// app.use('/admin/api', indexRouter)
const router = express.Router()
app.use('/admin/api/rest/:resource', async (req, res, next) => {
    req.name = req.params.resource
    console.log('middleWare run')
    next()
}, router)
//app.use('/admin/api/rest', router)

 不用中间件是可以获取到req.params的
app.get('/admin/api/rest/:resource', async (req, res) => {
    console.log(44)
    res.send(req.params)
})

router.get('/', async (req, res) => {
    console.log(req.name)
    console.log(321)
    //res.send(req.name)
    //.classify转类名的意思

    const modelName = require('inflection').classify(req.name)
    // res.send(modelName)
    //  const modelName = 'Category'
    const Model = require(`./models/${modelName}`)

    const items = await Model.find().populate('parent')
    res.send(items)
})
*/


app.listen(3000, () => {
    console.log('listening')
})


/*
以下是非模块写法，初始学习的用法
const express = require('express')
const app = express()

app.use(require('cors')())

app.use(express.json())

//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
})

//定义数据库模型
const Categories = mongoose.model('Categories', new mongoose.Schema({
    name: { type: String }
})
)
//新增数据的接口（路由）
app.post('/api/categories', async (req, res) => {
    console.log(222)
    const model = await Categories.create(req.body)
    res.send(model)
})
app.get('/',(req,res) => {
    console.log(123)
    res.send('getget')
})
app.get('/categories', async (req, res) => {
    console.log('non-post')
    //const model = await Categories.create(req.body)
    res.send('non-post')
})

app.listen(3000, () => {
    console.log('listening 3000 port.')
})
*/