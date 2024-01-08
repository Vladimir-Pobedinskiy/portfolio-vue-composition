import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home-view'
import HeroesView from '@/views/heroes-view'
import HeroView from '@/views/hero-view'
import TasksView from '@/views/tasks-view'
import UIView from '@/views/ui-view'
import NotFoundView from '@/views/not-found-view'

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView
  },
  {
    path: '/heroes',
    name: 'heroes-view',
    component: HeroesView
  },
  {
    path: '/heroes/:heroView',
    name: 'hero-view',
    component: HeroView
  },
  {
    path: '/tasks',
    name: 'tasks-view',
    component: TasksView
  },
  {
    path: '/ui',
    name: 'ui-view',
    component: UIView
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
