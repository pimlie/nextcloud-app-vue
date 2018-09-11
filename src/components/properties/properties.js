import { mergeData } from 'vue-functional-data-merge'

export default {
  functional: true,
  render (h, { data, children }) {
    return h('div', mergeData(data, {
      class: 'properties'
    }), children)
  }
}
