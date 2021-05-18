module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        //给req多挂载一个model属性，后续就可以用req.model去访问了
        // console.log(modelName)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}