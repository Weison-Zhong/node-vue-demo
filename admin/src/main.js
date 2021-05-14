import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false

import http from "./http"
//加载到Vue实例原型后就可以在任意地方用this.$http去访问这个数据请求接口
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
