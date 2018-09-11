import navigationSettings from './navigation-settings'

export default {
  functional: true,
  render (h, { props, data, slots, children }) {
    let childNodes = []
    const $slots = slots()

    if ($slots.default) {
      $slots.default.map(item => {
        childNodes.push(item)
      })
    }

    if ($slots.settings) {
      childNodes.push(h(navigationSettings, {}, $slots.settings))
    }

    return h('div', {
      class: 'app-navigation'
    }, childNodes)
  }
}
