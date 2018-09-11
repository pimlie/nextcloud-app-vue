import ncApp from './app'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncApp
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
