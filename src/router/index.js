import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home-view'
import NotFoundView from '@/views/not-found-view'

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found-view',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (window.scrollY !== 0) {
    window.scrollTo(0, 0)
  }
  next()
})

export { router }
