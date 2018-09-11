import { mergeData } from 'vue-functional-data-merge'

export const props = {
  text: {
    type: String,
    default: null
  },
  href: {
    type: String,
    default: null
  },
  to: {
    type: [String, Object],
    default: null
  },
  linkClass: {
    type: String,
    default: null
  }
}

export default {
  functional: true,
  props,
  render (h, { props, slots, data, children }) {
    return h('li', mergeData(data, { staticClass: 'breadcrumb-item' }), [
      h(props.to ? 'router-link' : 'a', { staticClass: props.linkClass, props }, [
        slots().default || props.text
      ])
    ])
  }
}
