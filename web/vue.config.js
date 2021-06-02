module.exports = {
    //这个publicPath表示生成的静态文件路径
    //当运行npm run build的时候会自动把NODE——ENV改成production
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? '/web/'  前端就直接访问好了，不用刻意去加/web  
    //   : '/',
//__dirname 表示当前文件（vue.config.js）所在的路径
      outputDir:__dirname + '/../server/web'
  }