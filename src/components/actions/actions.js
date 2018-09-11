import { mergeData } from 'vue-functional-data-merge'

export const props = {
  createable: {
    type: Boolean,
    default: true
  }
}

export default {
  functional: true,
  props,
  render (h, { props, data, children }) {
    console.log(children)
    return h('div', mergeData(data, {
      class: [
        'actions',
        { creatable: props.createable }
      ]
    }), children)
  }
}
