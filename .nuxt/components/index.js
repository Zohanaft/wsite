export { default as Button } from '../..\\resources\\nuxt\\components\\Button.vue'
export { default as CardNotes } from '../..\\resources\\nuxt\\components\\CardNotes.vue'
export { default as CardProject } from '../..\\resources\\nuxt\\components\\CardProject.vue'
export { default as TagList } from '../..\\resources\\nuxt\\components\\TagList.vue'
export { default as YearSort } from '../..\\resources\\nuxt\\components\\YearSort.vue'

export const LazyButton = import('../..\\resources\\nuxt\\components\\Button.vue' /* webpackChunkName: "components/button" */).then(c => wrapFunctional(c.default || c))
export const LazyCardNotes = import('../..\\resources\\nuxt\\components\\CardNotes.vue' /* webpackChunkName: "components/card-notes" */).then(c => wrapFunctional(c.default || c))
export const LazyCardProject = import('../..\\resources\\nuxt\\components\\CardProject.vue' /* webpackChunkName: "components/card-project" */).then(c => wrapFunctional(c.default || c))
export const LazyTagList = import('../..\\resources\\nuxt\\components\\TagList.vue' /* webpackChunkName: "components/tag-list" */).then(c => wrapFunctional(c.default || c))
export const LazyYearSort = import('../..\\resources\\nuxt\\components\\YearSort.vue' /* webpackChunkName: "components/year-sort" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
export function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
