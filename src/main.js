import Vue from 'vue'
import ElementUI, { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  //判断cookie存不存在
  const token = Cookie.get('token')
  //cookie不存在，说明用户没登入，跳转至登入页
  if(!token && to.name !== 'login') {
    next({name:'login'})
  }else if(token && to.name === 'login') {
    next({name:'home'})
  }else {
    next()
  }
})

new Vue({
  router,
  store,
  created() {
    store.commit('addMenu',router)
  },
  render: h => h(App),
}).$mount('#app')
