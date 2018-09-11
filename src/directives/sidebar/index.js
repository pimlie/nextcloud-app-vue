import ncSidebar from './sidebar'
import { registerDirectives, vueUse } from '../../utils/plugins'

const directives = {
  ncSidebar
}

const VuePlugin = {
  install (Vue) {
    registerDirectives(Vue, directives)
  }
}

vueUse(VuePlugin)

export default VuePlugin
