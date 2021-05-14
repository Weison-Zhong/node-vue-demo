import axios from 'axios'

const http = axios.create({
   baseURL:'http://localhost:3000/admin/api/'
    //下面这个是用来测试非模块server用
    //baseURL:'http://localhost:3000/api/'
})

export default http