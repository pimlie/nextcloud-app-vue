import ncControls from './controls'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncControls
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
