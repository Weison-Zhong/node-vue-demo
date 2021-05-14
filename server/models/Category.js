const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    //特殊数据类型，表示他是数据库里面的ObjectId（mongoose数据库里面的id类型）
    //同时要指定一个ref表示它关联的是哪一个数据模型（其实关联的是本身）注意这里是schematypes（要有s）
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})
module.exports = mongoose.model('Category',schema)