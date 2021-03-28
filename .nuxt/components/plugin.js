import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  Button: () => import('../..\\resources\\nuxt\\components\\Button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c)),
  CardNotes: () => import('../..\\resources\\nuxt\\components\\CardNotes.vue' /* webpackChunkName: "components/card-notes" */).then(c => wrapFunctional(c.default || c)),
  CardProject: () => import('../..\\resources\\nuxt\\components\\CardProject.vue' /* webpackChunkName: "components/card-project" */).then(c => wrapFunctional(c.default || c)),
  TagList: () => import('../..\\resources\\nuxt\\components\\TagList.vue' /* webpackChunkName: "components/tag-list" */).then(c => wrapFunctional(c.default || c)),
  YearSort: () => import('../..\\resources\\nuxt\\components\\YearSort.vue' /* webpackChunkName: "components/year-sort" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
