import ncSidebar from './sidebar'
import sidebarPlugin from '../../directives/sidebar'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncSidebar
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
    Vue.use(sidebarPlugin)
  }
}

vueUse(VuePlugin)

export default VuePlugin
