import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/Login')
const Layout = () => import('../views/Layout')
const Home = () => import('../views/Home')
const User = () => import('../views/User')
const UserEdit = () => import('../views/User/UserEdit.vue')
const Search = () => import('../views/Search')
const SearchResult = () => import('../views/Search/SearchResult.vue')
const ArticleDetail = () => import('../views/ArticleDetail')
const Chat = () => import('../views/Chat')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/search_result/:kw', component: SearchResult },
  { path: '/article_detail', component: ArticleDetail },
  { path: '/user_edit', component: UserEdit },
  { path: '/chat', component: Chat },
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
