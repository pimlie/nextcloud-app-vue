import { assign, keys } from '../utils/object'

const allListenTypes = {hover: true, click: true, focus: true}

const NCBoundListeners = '__NC_boundEventListeners__'

const bindTargets = (vnode, binding, listenTypes, fn) => {
  const targets = keys(binding.modifiers || {})
    .filter(t => !allListenTypes[t])

  let data
  if (binding.value) {
    if (typeof binding.value === 'string') {
      targets.push(binding.value)
    } else if (typeof binding.value === 'object') {
      data = assign(binding.value)
      if (data.targetId) {
        targets.push(data.targetId)
        delete data.targetId
      }
    }
  }

  const listener = () => {
    fn({targets, vnode, data})
  }

  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      vnode.elm.addEventListener(type, listener)
      const boundListeners = vnode.elm[NCBoundListeners] || {}
      boundListeners[type] = boundListeners[type] || []
      boundListeners[type].push(listener)
      vnode.elm[NCBoundListeners] = boundListeners
    }
  })

  // Return the list of targets
  return targets
}

const unbindTargets = (vnode, binding, listenTypes) => {
  keys(allListenTypes).forEach(type => {
    if (listenTypes[type] || binding.modifiers[type]) {
      const boundListeners = vnode.elm[NCBoundListeners] && vnode.elm[NCBoundListeners][type]
      if (boundListeners) {
        boundListeners.forEach(listener => vnode.elm.removeEventListener(type, listener))
        delete vnode.elm[NCBoundListeners][type]
      }
    }
  })
}

export {
  bindTargets,
  unbindTargets
}

export default bindTargets
