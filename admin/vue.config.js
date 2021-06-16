module.exports = {
    //这个publicPath表示生成的静态文件路径
    //当运行npm run build的时候会自满足这个===判断的条件（生产环境）
    publicPath: process.env.NODE_ENV === 'production'
      ? '/admin/'
      : '/',
//__dirname 表示当前文件（vue.config.js）所在的路径
      outputDir:__dirname + '/../server/admin'
  }