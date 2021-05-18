import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

import http from "./http"
//加载到Vue实例原型后就可以在任意地方用this.$http去访问这个数据请求接口
Vue.prototype.$http = http
//这个全局的mixin可以在任意地方调用getAuthHeaders
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + 'upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
