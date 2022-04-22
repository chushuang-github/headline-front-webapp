import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Layout from '../views/Layout'
import Home from '../views/Home'
import User from '../views/User'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' },
  { path: '/login', component: Login },
  {
    path: '/layout',
    component: Layout,
    children: [
      // 二级路由的path前面是不用加'/'的
      { path: 'home', component: Home },
      { path: 'user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
