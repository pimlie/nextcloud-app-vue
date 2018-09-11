import { bindTargets, unbindTargets } from '../../utils/targets'
import { setAttr, removeAttr } from '../../utils/dom'
import { keys } from '../../utils/object'

const listenTypes = {click: true}

export default {
  // eslint-disable-next-line no-shadow-restricted-names
  bind (el, binding, vnode) {
    let eventType = 'toggle'
    keys(binding.modifiers).forEach(mod => {
      if (/^(toggle|show|hide)$/.test(mod)) {
        eventType = mod
      }
    })

    bindTargets(vnode, binding, listenTypes, ({targets, vnode, data}) => {
      console.log(data)
      targets.forEach(target => {
        vnode.context.$root.$emit(
          'nc::' + eventType + '::sidebar',
          target,
          vnode.elm,
          eventType !== 'hide' &&
          binding.value &&
          binding.value.data
            ? binding.value.data
            : null
        )
      })
    })
    if (el.tagName !== 'BUTTON') {
      // If element is not a button, we add `role="button"` for accessibility
      setAttr(el, 'role', 'button')
    }
  },
  unbind (el, binding, vnode) {
    unbindTargets(vnode, binding, listenTypes)
    if (el.tagName !== 'BUTTON') {
      // If element is not a button, we add `role="button"` for accessibility
      removeAttr(el, 'role', 'button')
    }
  }
}
