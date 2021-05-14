import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      //props:true 表示把url里面的任何参数都注入到categoryedit页面里，这样在categoryedit里面就可以直接使用变量id（页面里面用pros接收）
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
