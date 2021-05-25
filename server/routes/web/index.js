module.exports = app => {
    const router = require('express').Router()

    //const Article = require('../../models/Article')  通过这种方式还要翻路径太麻烦了
    //因为之前已经在mongoose里面加入了Article模型，所以可以直接用下面的方法引用进来  
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    //初始化新闻的路由，是为了偷懒直接在后台录入数据用的。
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        //lean方法表示取纯粹的json js对象或数组  不带mongoose里面的对象的比较干净的一个对象
        const cats = await Category.find().where({
            parent
        }).lean()
        const newsTitles = ["老亚瑟的答疑时间:甄姬-冰雪圆舞曲海报方案票选结果公布", "5月25日英雄平衡性调整丨孙策、橘右京增强，瑶优化", "布谷声中夏时新，峡谷福利乐不停", "5月25日全服不停机更新公告", "甄姬-冰雪圆舞曲优化海报方案票选结果公布", "老亚瑟的答疑时间:甄姬-冰雪圆舞曲海报方案票选结果公布", "甄姬-冰雪圆舞曲优化海报方案票选结果公布", "狄某有话说｜中路水太深，你把握不住", "峡谷甜蜜520，周瑜小乔最新情侣皮肤送不停", "甄姬-冰雪圆舞曲优化海报票选活动开启", "老亚瑟的答疑时间:甄姬-冰雪圆舞曲海报方案票选结果公布", "5月25日英雄平衡性调整丨孙策、橘右京增强，瑶优化", "布谷声中夏时新，峡谷福利乐不停", "5月25日全服不停机更新公告", "甄姬-冰雪圆舞曲优化海报方案票选结果公布", "老亚瑟的答疑时间:甄姬-冰雪圆舞曲海报方案票选结果公布", "甄姬-冰雪圆舞曲优化海报方案票选结果公布", "狄某有话说｜中路水太深，你把握不住", "峡谷甜蜜520，周瑜小乔最新情侣皮肤送不停", "甄姬-冰雪圆舞曲优化海报票选活动开启"]
        const newsList = newsTitles.map(title => {
            //先把他打乱再随机取一个或2个  .slice(0)表示先复制一份不要影响原来的数据
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                title,
                categories: randomCats.slice(0, 2)
            }
        })

        //传递一个空对象表示以任意条件去查询去删除
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    // router.get('/news/list',(req,res) => {
    //     const parent = await Category.findOne({
    //         name:'新闻分类'
    //     })
    // })













    app.use('/web/api', router)
}