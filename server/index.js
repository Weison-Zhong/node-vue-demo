  //这是原来模块的写法

//这是服务端的入口文件
const express = require("express")

const app = express()
app.use(require('cors')())
//加上一个中间件
app.use(express.json())

const db = require('./plugins/db')
db()
//console.log(db)
//require('./plugins/db')()
//require('./plugins/db')(app)


//引入admin目录下index.js模块的函数，直接（）使用，并把app对象传进去。那么在admin里面就有一个app可以用
require('./routes/admin')(app)

//app.use('/admin/api')


app.listen(3000,()=>{
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