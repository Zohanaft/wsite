import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9bfc0024 = () => interopDefault(import('..\\resources\\nuxt\\pages\\expirience.vue' /* webpackChunkName: "pages/expirience" */))
const _11cb78ec = () => interopDefault(import('..\\resources\\nuxt\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _d0048c1e = () => interopDefault(import('..\\resources\\nuxt\\pages\\notes.vue' /* webpackChunkName: "pages/notes" */))
const _06adb8fc = () => interopDefault(import('..\\resources\\nuxt\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _656a681e = () => interopDefault(import('..\\resources\\nuxt\\pages\\_page.vue' /* webpackChunkName: "pages/_page" */))
const _1636d7da = () => interopDefault(import('..\\resources\\nuxt\\pages\\page\\index.vue' /* webpackChunkName: "pages/page/index" */))

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
    component: _9bfc0024,
    name: "expirience"
  }, {
    path: "/inspire",
    component: _11cb78ec,
    name: "inspire"
  }, {
    path: "/notes",
    component: _d0048c1e,
    name: "notes"
  }, {
    path: "/",
    component: _06adb8fc,
    name: "index"
  }, {
    path: "/:page",
    component: _656a681e,
    children: [{
      path: "",
      component: _1636d7da,
      name: "page"
    }]
  }, {
    path: "/__laravel_nuxt__",
    component: _06adb8fc,
    name: "__laravel_nuxt__"
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
