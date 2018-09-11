import ncProperties from './properties'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncProperties
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
