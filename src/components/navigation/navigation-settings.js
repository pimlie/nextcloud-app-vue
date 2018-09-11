import clickOutMixin from '../../mixins/clickout'

export const props = {
  title: {
    type: String,
    default: 'Settings'
  }
}

export default {
  props,
  mixins: [
    clickOutMixin
  ],
  render (h) {
    return h('div', {
      class: 'app-settings',
      on: {
        click: () => {
          this.toggle()
        }
      }
    }, [
      h('div', {
        class: 'app-settings-header'

      }, [
        h('button', {
          class: [
            'settings-button',
            { 'opened': this.opened }
          ]
        }, [ this.title ])
      ]),
      h('div', {
        class: [
          'app-settings-content',
          { 'opened': this.opened }
        ],
        on: { click: evt => {
          evt.stopPropagation()
        } }
      }, this.$slots.default || [])
    ])
  },
  data () {
    return {
      opened: false
    }
  },
  watch: {
    opened (newVal) {
      if (typeof window !== 'undefined') {
        if (newVal === true) {
          this.clickOutStartListening()
        } else {
          this.clickOutStopListening()
        }
      }
    }
  },
  methods: {
    clickOutListener () {
      this.opened = false
    },
    toggle () {
      this.opened = !this.opened
    }
  }
}
