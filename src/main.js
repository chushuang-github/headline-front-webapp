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
  Divider,
  Tag,
  CellGroup,
  Image,
  Dialog,
  DatetimePicker
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
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(DatetimePicker)

Vue.config.productionTip = false

// vue2.0的自定义指令
const directiveObj = {
  install (Vue) {
    Vue.directive('focus', {
      inserted (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          return el.focus()
        }
        const input = el.querySelector('input')
        const textarea = el.querySelector('textarea')
        input && input.focus()
        textarea && textarea.focus()
      },
      update (el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          return el.focus()
        }
        const input = el.querySelector('input')
        const textarea = el.querySelector('textarea')
        input && input.focus()
        textarea && textarea.focus()
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
