import Vue from 'vue'
import VueRouter from 'vue-router'
import Playlist from '@/views/Playlist.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Settings from '@/views/Settings.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: { name: 'Login' } },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const requiresGuest = to.matched.some(x => x.meta.requiresGuest)
  const isLoggedIn = localStorage.getItem('email') !== null && localStorage.getItem('email').length > 0
  if (requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (requiresGuest && isLoggedIn) {
    next('/home')
  } else {
    next()
  }
})

export default router
