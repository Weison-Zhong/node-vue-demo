//后端路由里面的index.js
module.exports = app => {
    const express = require('express')
    //这是express的一个子路由，里面有各种CRUD的东西
    const router = express.Router()
    const Categories = require('../../models/Category')

    //新增接口
    router.post('/categories', async (req, res) => {
        const model = await Categories.create(req.body)
        res.send(model)
    })
    //获取分类列表的接口
    router.get('/categories', async (req, res) => {
        const items = await Categories.find()
        res.send(items)
    })
    //获取详情页的接口
    router.get('/categories/:id', async (req, res) => {
        const model = await Categories.findById(req.params.id)
        res.send(model)
    })
    //修改分类接口
    router.put('/categories/:id', async (req, res) => {
        const model = await Categories.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除分类的接口
    router.delete('/categories/:id', async (req, res) => {
        await Categories.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success:true,
        })
    })






    //意思是所有/admin/api文件夹里面的静态文件可以直接被访问。
    app.use('/admin/api', router)
}