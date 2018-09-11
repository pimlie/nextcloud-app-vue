export default {
  beforeDestroy () {
    this.clickOutStopListening()
  },
  methods: {
    clickOutStartListening () {
      if (typeof document !== 'undefined') {
        document.documentElement.addEventListener('click', this._clickOutListener)
      }
    },
    clickOutStopListening () {
      if (typeof document !== 'undefined') {
        document.documentElement.removeEventListener('click', this._clickOutListener)
      }
    },
    _clickOutListener (e) {
      if (!this.$el.contains(e.target)) {
        if (this.clickOutListener) {
          this.clickOutListener()
        }
      }
    }
  }
}
