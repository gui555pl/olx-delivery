import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Buy from '@/views/Buy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      hasToolbar: false
    }
  },
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: 'buy',
        name: 'Comprar',
        components: { default: Buy }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
