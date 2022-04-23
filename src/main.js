import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  NavBar,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Col,
  Row,
  Badge,
  Search,
  Divider
} from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Divider)

Vue.config.productionTip = false

// vue2.0的自定义指令
const directiveObj = {
  install (Vue) {
    Vue.directive('focus', {
      inserted (el) {
        const input = el.querySelector('input')
        input.focus()
      }
    })
  }
}
Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
