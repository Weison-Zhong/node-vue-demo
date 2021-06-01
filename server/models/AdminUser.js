const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: { type: String },
    //set可以自定义怎么保存
    password: {
        type: String,
        //让密码不可被查出来展示以免被二次保存的时候生成该hash值得hash值
        select:  true,
        //m1芯片mac用bcrypt有bug
        // set: function (val) {     
        //     //val是前面传进来的数据，10是加密指数，数值越高越安全但越耗时
        //     return require('bcrypt').hashSync(val, 10)
        // }
    },

})
module.exports = mongoose.model('AdminUser', schema)