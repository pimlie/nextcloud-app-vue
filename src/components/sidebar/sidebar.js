// import sidebarMixin from '../mixins/sidebar'
import idMixin from '../../mixins/id'
import listenOnRootMixin from '../../mixins/listen-on-root'
import clickOutMixin from '../../mixins/clickout'

import {
  hasClass,
  addClass,
  removeClass,
  eventOn,
  eventOff
} from '../../utils/dom'

export const props = {
  visible: {
    type: Boolean,
    default: false
  },
  closeable: {
    type: Boolean,
    default: true
  },
  lazy: {
    type: Boolean,
    default: false
  },
  closeOnClickout: {
    type: Boolean,
    default: false
  },
  sidebarClass: {
    type: [String, Array],
    default: null
  }
}

export default {
  props,
  mixins: [
    // sidebarMixin,
    idMixin,
    listenOnRootMixin,
    clickOutMixin
  ],
  render (h) {
    const children = []

    if (this.closeable) {
      children.push(h('a', {
        class: 'close icon-close',
        attrs: {
          alt: 'Close',
          title: 'Close',
          disabled: this.is_transitioning
        },
        on: {
          click: this.hide
        }
      },
      [
        h('span', {
          staticClass: 'hidden-visually'
        },
        [ 'Close' ])
      ]))
    }

    if (this.$slots.default) {
      children.push(this.$slots.default)
    }

    let sidebar = h(
      'div',
      {
        ref: 'sidebar',
        staticClass: 'app-sidebar',
        class: this.sidebarClasses,
        directives: [
          {
            name: 'show',
            rawName: 'v-show',
            value: this.is_visible,
            expression: 'is_visible'
          }
        ],
        attrs: {
          id: this.safeId(),
          role: 'complementary',
          'aria-hidden': this.is_visible ? null : 'true'
        }
      },
      [ children ]
    )

    // Wrap sidebar in transition
    sidebar = h(
      'transition',
      {
        props: {
          enterClass: '',
          enterToClass: '',
          enterActiveClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: ''
        },
        on: {
          'before-enter': this.onBeforeEnter,
          enter: this.onEnter,
          'after-enter': this.onAfterEnter,
          'before-leave': this.onBeforeLeave,
          leave: this.onLeave,
          'after-leave': this.onAfterLeave
        }
      },
      [sidebar]
    )

    return h('div', {}, [
      !this.is_hidden ? sidebar : null
    ])
  },
  data () {
    return {
      is_hidden: this.lazy || false,
      is_visible: false,
      is_transitioning: false,
      is_show: false,
      is_block: false
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  mounted () {
    // Listen for events from others to either open or close ourselves
    this.listenOnRoot('nc::show::sidebar', this.showHandler)
    this.listenOnRoot('nc::hide::sidebar', this.hideHandler)
    this.listenOnRoot('nc::toggle::sidebar', this.toggleHandler)
    // Listen for nc:sidebar::show events, and close ourselves if the opening sidebar is not us
    this.listenOnRoot('nc::sidebar::show', this.sidebarListener)

    if (this.visible === true) {
      this.show()
    }
  },
  beforeDestroy () {
    removeClass(document.body, 'sidebar-open')
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal !== oldVal) {
        this[newVal ? 'show' : 'hide']()
      }
    }
  },
  computed: {
    sidebarClasses () {
      return [
        {
          show: this.is_show,
          'd-block': this.is_block
        },
        this.sidebarClass
      ]
    }
  },
  methods: {
    show () {
      if (this.is_visible) {
        return
      }

      this.$emit('nc::sidebar::show', this.id)
      this.$root.$emit('nc::sidebar::show', this.id)

      if (hasClass(document.body, 'sidebar-open')) {
        // If another sidebar is already open, wait for it to close
        this.$root.$once('nc::sidebar::hidden', this.doShow)
      } else {
        // Show the sidebar
        this.doShow()
      }
    },
    hide () {
      if (!this.is_visible) {
        return
      }

      if (this.closeOnClickout) {
        this.clickOutStopListening()
      }

      this.$emit('nc::sidebar::hide', this.id)
      this.$root.$emit('nc::sidebar::hide', this.id)
      this.is_visible = false
      this.$emit('change', false)
    },
    doShow () {
      this.is_hidden = false
      this.$nextTick(() => {
        this.is_visible = true
        this.$emit('change', true)
      })

      // nextTick is not working cause
      // clickOut is immeditately triggered
      setTimeout(() => {
        if (this.closeOnClickout) {
          this.clickOutStartListening()
        }
      }, 1)
    },
    // Transition Handlers
    onBeforeEnter () {
      this.is_transitioning = true
      // this.adjustDialog()
      addClass(document.body, 'sidebar-open')
      this.setResizeEvent(true)
    },
    onEnter () {
      this.is_block = true
    },
    onAfterEnter () {
      this.is_show = true
      this.is_transitioning = false
      this.$nextTick(() => {
        this.$emit('nc::sidebar::shown', this.id)
        this.emitOnRoot('nc::sidebar::shown', this.id)
      })
    },
    onBeforeLeave () {
      this.is_transitioning = true
      this.setResizeEvent(false)
    },
    onLeave () {
      this.is_show = false
    },
    onAfterLeave () {
      this.is_block = false
      this.is_transitioning = false
      removeClass(document.body, 'sidebar-open')
      this.$nextTick(() => {
        this.is_hidden = this.lazy || false
        this.$emit('nc::sidebar::hidden', this.id)
        this.emitOnRoot('nc::sidebar::hidden', this.id)
      })
    },
    clickOutListener (evt) {
      // If backdrop clicked, hide sidebar
      if (this.is_visible && this.closeOnClickout) {
        this.hide()
      }
    },
    setResizeEvent (on) {
      return
      ['resize', 'orientationchange'].forEach(evtName => {
        if (on) {
          eventOn(window, evtName, this.recalculatePosition)
        } else {
          eventOff(window, evtName, this.recalculatePosition)
        }
      })
    },
    showHandler (id, triggerEl) {
      if (id === this.id) {
        this.return_focus = triggerEl || null
        this.show()
      }
    },
    hideHandler (id) {
      if (id === this.id) {
        this.hide()
      }
    },
    toggleHandler (id) {
      if (id === this.id) {
        if (!this.is_hidden && this.is_visible) {
          this.hide()
        } else {
          this.show()
        }
      }
    },
    sidebarListener (id) {
      // If another sidebar opens, close this one
      if (id !== this.id) {
        this.hide()
      }
    }
  }
}
