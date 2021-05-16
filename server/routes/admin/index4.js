const express = require('express')
const router = express.Router()

const Category = require('../../models/Category')

router.post('/', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
})

router.get('/', async (req, res) => {
    const items = await Category.find().populate('parent')
    res.send(items)
})

router.get('/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
})

router.put('/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})

router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
        success: true,
    })
})

module.exports = router