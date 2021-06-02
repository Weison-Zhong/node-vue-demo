import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    //必须是VUE_APP开头后面再是_加自己的变量名  用了vue-cli之后才会有这个process的环境变量
    baseURL:process.env.VUE_APP_API_URL || '/admin/api',
   // baseURL: 'http://localhost:3000/admin/api/'
    //下面这个是用来测试非模块server用
    //baseURL:'http://localhost:3000/api/'
})
//给http请求加一个拦截器response,可以做到统一监听错误  ,这样就不用每一个页面去监听错误弹出什么内容了
http.interceptors.response.use(function (response) {
    return response
    //return res 原来写的res出BUG
}, function (error) {
    if (error.response.data.message) {
        //因为全局使用了elementui，（vue add element-ui），elementui会把message方法加到Vue原型上
        Vue.prototype.$message({
            type: 'error',
            message: error.response.data.message
        })

        if (error.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(error)
})

// Add a request interceptor
//给axios加了一个请求request的拦截器，在每一次axios发起请求的时候会判断是否有token，如果有就把token加到headers上去。
http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


export default http