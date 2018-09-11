import { mergeData } from 'vue-functional-data-merge'
import BreadcrumbItem from './breadcrumb-item'

export const props = {
  items: {
    type: Array,
    default: null
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, slots, children }) {
    const childs = children
    const $slots = slots()

    if (props.items.length) {
      props.items.map(item => {
        childs.push(h(BreadcrumbItem, { props: item }))
      })
    } else {
      childs.push($slots.default)
    }

    return h('ol', mergeData(data, { staticClass: 'breadcrumb' }), childs)
  }
}
