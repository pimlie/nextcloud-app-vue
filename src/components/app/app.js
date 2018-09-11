import { mergeData } from 'vue-functional-data-merge'
import navigation from '../navigation/navigation'

export const props = {
  navigationItems: {
    type: Array,
    default: null
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, slots, children } = {}) {
    let childs = []
    const $slots = slots()

    if ($slots.navigation || props.navigationItems) {
      childs.push(
        $slots.navigation || h(navigation, {
          items: props.navigationItems || []
        })
      )
    }

    childs.push(
      h('div', { staticClass: 'app-content' }, [
        $slots.controls || null,
        h('router-view')
      ])
    )

    if ($slots.sidebar) {
      childs.push($slots.sidebar)
    }

    return h('div', mergeData(data, { staticClass: 'nc-app' }), childs)
  }
}
