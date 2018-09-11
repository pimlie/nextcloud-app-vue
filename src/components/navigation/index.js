import ncNavigation from './navigation'
import ncNavigationSettings from './navigation-settings'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncNavigation,
  ncNavigationSettings
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
