import * as components from './components'
import * as directives from './directives'
import { vueUse } from './utils/plugins'

import './style/base.scss'

const VuePlugin = {
  install: function (Vue) {
    if (Vue._nextcloud_app_vue_installed) {
      return
    }

    Vue._nextcloud_app_vue_installed = true

    // Register component plugins
    for (let plugin in components) {
      Vue.use(components[plugin])
    }

    // Register directive plugins
    for (let plugin in directives) {
      Vue.use(directives[plugin])
    }
  }
}

vueUse(VuePlugin)

export default VuePlugin
