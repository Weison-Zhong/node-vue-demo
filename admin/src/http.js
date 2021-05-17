import axios from 'axios'
import Vue from 'vue'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api/'
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
    }
    return Promise.reject(error)
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export default http