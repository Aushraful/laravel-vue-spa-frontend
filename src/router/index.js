import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/Auth/SignUp.vue'
import SignIn from '../views/Auth/SignIn.vue'
import Profile from '../views/Auth/Profile.vue'
import ProductDetail from '../views/Products/ProductDetail.vue'
import Products from '../views/Products/Index.vue'
import EditProduct from '../views/Products/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'Profile'
        })
      }

      next()
    }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'Profile'
        })
      }

      next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        })
      }

      next()
    }
  },
  {
    path: '/product-detail/:product_id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/edit-product/:product_id',
    name: 'EditProduct',
    component: EditProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
