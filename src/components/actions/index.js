import ncActions from './actions'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncActions
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
