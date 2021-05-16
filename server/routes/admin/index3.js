const express = require('express')
const router = express.Router()
const Categories = require('../../models/Category')

router.post('/categories', async (req, res) => {
    const model = await Categories.create(req.body)
    res.send(model)
})

router.get('/categories', async (req, res) => {
    const items = await Categories.find().populate('parent')
    res.send(items)
})

router.get('/categories/:id', async (req, res) => {
    const model = await Categories.findById(req.params.id)
    res.send(model)
})

router.put('/categories/:id', async (req, res) => {
    const model = await Categories.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})

router.delete('/categories/:id', async (req, res) => {
    await Categories.findByIdAndDelete(req.params.id, req.body)
    res.send({
        success: true,
    })
})

module.exports = router