// import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index/index'
import Product from './components/product/product'
import ModelClient from './components/ModelClient/ModelClient'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/ContactUs/ContactUs'
// 8bcd1aa91aef455b81c785a5d8e8d0af
export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Index },
    { path: '/product', name: 'product', component: Product,
      children:[
        {
          path:'jbztsjk',
          name:'jbztsjk',
          component:Product
        },{
          path:'gjb',
          name:'gjb',
          component:Product
        }
      ]
  },
    { path: '/customer', name: 'customer', component: ModelClient },
    { path: '/about', name: 'about', component: AboutUs },
    { path: '/contactus', name: 'contactus', component: ContactUs },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})