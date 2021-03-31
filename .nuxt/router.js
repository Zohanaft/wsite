import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d7ba1fa4 = () => interopDefault(import('..\\resources\\nuxt\\pages\\expirience.vue' /* webpackChunkName: "pages/expirience" */))
const _764d896c = () => interopDefault(import('..\\resources\\nuxt\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _2497a1b1 = () => interopDefault(import('..\\resources\\nuxt\\pages\\notes.vue' /* webpackChunkName: "pages/notes" */))
const _ed79e97c = () => interopDefault(import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _1bf76044 = () => interopDefault(import('..\\resources\\nuxt\\pages\\_page.vue' /* webpackChunkName: "pages/_page" */))
const _56e1abd3 = () => interopDefault(import('..\\resources\\nuxt\\pages\\page\\index.vue' /* webpackChunkName: "pages/page/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/expirience",
    component: _d7ba1fa4,
    name: "expirience"
  }, {
    path: "/inspire",
    component: _764d896c,
    name: "inspire"
  }, {
    path: "/notes",
    component: _2497a1b1,
    name: "notes"
  }, {
    path: "/",
    component: _ed79e97c,
    name: "index"
  }, {
    path: "/:page",
    component: _1bf76044,
    children: [{
      path: "",
      component: _56e1abd3,
      name: "page"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
