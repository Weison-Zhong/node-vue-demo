function fn(app){
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useCreateIndex:true,
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
    })
}
//把models文件夹下面所有的js文件引用了一遍
require('require-all')(__dirname + '/../models')

 
module.exports = fn
