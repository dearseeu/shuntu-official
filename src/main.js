import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router.js'
// import iView from 'iview'
import {Message}  from 'iview'
import 'iview/dist/styles/iview.css'
import './common/stylus/index.styl'

Vue.use(VueRouter)
Vue.prototype.$message = Message
Vue.prototype.$api = process.env.NODE_ENV == 'production' ? 'http://www.greetrend.com:8888' : '/img'
// Vue.use(iView)
// Vue.use(iViButton,Menu,Card,Dropdown,Carouselew)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
