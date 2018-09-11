import ncBreadcrumb from './breadcrumb'
import ncBreadcrumbItem from './breadcrumb-item'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  ncBreadcrumb,
  ncBreadcrumbItem
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
