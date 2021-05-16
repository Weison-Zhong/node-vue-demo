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
    //获取分类列表的接口 .populate表示关联取出，数据库中如果有字段是关联字段的话那么我们就可以用populate把他查出来（数据库category模型中定义了parent）
    //不只是要他的id，而是要把他的完整信息拿出来变成一个对象。这个对象是id对应的对象
    router.get('/categories', async (req, res) => {
        const items = await Categories.find().populate('parent')
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






    app.use('/admin/api', router)
}