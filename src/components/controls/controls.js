import { mergeData } from 'vue-functional-data-merge'
import actions from '../actions/actions'

export const drawLink = (h, item, childs) => {
  const tag = item.to ? 'router-link' : 'a'

  const data = {
    props: !item.to ? {} : {
      to: item.to
    },
    class: [
      item.class || null,
      item.icon ? 'icon-' + item.icon : null
    ],
    attrs: !item.href ? {} : {
      href: item.href
    }
  }

  if (!childs || !childs.length) {
    childs = []

    /* if (item.src || item.icon) {
      childs.push(h(item.src ? 'img' : 'span', {
        attrs: {
          src: item.src || null
        },
        class: [{
          'symcol': item.icon,
          ['icon-' + item.icon]: item.icon
        }]
      }))
    } */

    /* if (item.text) {
      childs.push(h('span', {
        class: [{
          'hidden-visually': !item.textVisible,
        }]
      }, [item.text]))
    } */
    childs.push(item.text)
  }
  return h(tag, data, childs)
}

export default {
  functional: true,
  render (h, { props, data, slots }) {
    const childs = []
    const $slots = slots()

    if ($slots.breadcrumb) {
      childs.push($slots.breadcrumb)
    }

    if ($slots.actions || $slots.properties) {
      if (!$slots.actions) {
        $slots.actions = [ h(actions) ]
      }
      // If we have an actions bar, push the controls default slot
      // to the action bar
      if (typeof $slots.actions[0].children === 'undefined') {
        $slots.actions[0].children = []
      }
      $slots.default.map(child => {
        $slots.actions[0].children.push(child)
      })

      childs.push($slots.actions)
    } else {
      childs.push($slots.default)
    }

    if ($slots.properties) {
      childs.push($slots.properties)
    }

    const controlsData = {
      class: 'controls'
    }

    return h('div', mergeData(data, controlsData), childs)
  },
  render2 (h) {
    return h('div', {
      class: 'controls'
    }, [
      !this.items.length ? null : h('div', {
        class: 'breadcrumb'
      }, this.items.map((item, index) => {
        return h('div', {
          class: [
            'crumb',
            'svg'
            // { 'last': this.isLast(index) }
          ]
        }, [drawLink(h, item)])
      })),
      !this.actions.length ? null : h('div', {
        class: 'actions creatable'
      }, this.actions.map(item => {
        return drawLink(h, item)
      }))
    ])
  }
  /* computed: {
    items() {
      return this.$store.state.breadcrump
    },
    actions() {
      return this.$store.state.breadcrumpActions
    }
  }, */
  /* data () {
    return {
      items: [{
        to: '/',
        icon: 'home',
        text: 'Home'
        // src: this.OC.filePath('core', 'img', 'places/home.svg')
      }],
      actions: []
    }
  },
  created () {
    EventBus.$on('controls:addBreadcrump', (item) => {
      this.items.push(item)
    })
    EventBus.$on('controls:popBreadcrump', () => {
      if (this.items.length > 1) {
        this.items.pop()
      }
    })

    EventBus.$on('controls:addAction', (action) => {
      this.actions.push(Object.assign({
        type: 'button',
        icon: '',
        text: '',
        textVisible: false
      }, action))
    })

    EventBus.$on('controls:clearActions', () => {
      this.actions = []
    })
  },
  methods: {
    isLast (index) {
      return index === this.items.length - 1
    }
  } */
}
