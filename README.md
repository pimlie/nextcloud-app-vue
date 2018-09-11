> Vue.js components and directives for Nextcloud apps

## Getting started

Create an app entry point
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import nextcloudAppVue from 'nextcloud-app-vue'

import myGlobalComponent from './my-global-component'

import home from './my-home-component'
import addedit from './my-addedit-component'

Vue.use(VueRouter)
Vue.use(nextcloudAppCore)

Vue.prototype.t = t
Vue.prototype.oc_defaults = oc_defaults
Vue.prototype.OC = OC

Vue.component('my-global-component', myGlobalComponent)

import 'nextcloud-app-vue/dist/nextcloud-app-vue.css'

new Vue({
  el: '#nextcloud-app',
  router: new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
      { path: '/', component: home },
      { path: '/addedit', component: addedit }
    ],
    linkActiveClass: 'active-path',
    linkExactActiveClass: 'active'
  }
}

```

implement the app in your template (or write a App component)

```html
<?php
script('your-app', 'your-app');
style('your-app', 'your-app');
?>

<nc-app id="nextcloud-app">
  <nc-navigation slot="navigation">
    <ul>
      <li>
        <router-link to="/" class="nav-icon-files svg">Home</router-link>
      </li>
      <li class="pinned first-pinned">
        <router-link to="/add" class="nav-icon-files svg">Add something</router-link>
      </li>
    </ul>
    
    <div slot="settings" style="padding: 10px">
      <p>Settings Content</p>
      <p>Settings Content</p>
      <p>Settings Content</p>
      <p>Settings Content</p>
      <p>Settings Content</p>
      <p>Settings Content</p>
      <p>Settings Content</p>
    </div>
  </nc-navigation>

  <nc-controls slot="controls">
    <nc-breadcrumb slot="breadcrumb" :items="[{text:'Item 4'}]">
      <nc-breadcrumb-item link-class="icon-home" text="Item 1" to="/item1"></nc-breadcrumb-item>
      <nc-breadcrumb-item to="/item2">
        Item 2
      </nc-breadcrumb-item>
      
      <li class="breadcrumb-item">
        <a href="/item3">Item 3</a>
      </li>
    </nc-breadcrumb>

    <nc-actions slot="actions">
      <a class="button icon-add">Add</a>
    </nc-actions>

    <nc-properties slot="properties">
      <a class="button icon-audio">Audio</a>
    </nc-properties>
    
    <input type="text">
    <button>Do it</button>
  </nc-controls>

  <nc-sidebar id="sidebar1" slot="sidebar" :visible="true" :closeable="true">
    <div style="padding: 10px">
      <h3>App Sidebar 1</h3>
      <sidebar1></sidebar1>
    </div>
  </nc-sidebar>

  <nc-sidebar id="sidebar2" slot="sidebar" :close-on-clickout="true" :visible="false" :closeable="true">
    <div style="padding: 10px">
      <h3>App Sidebar 2</h3>
      <sidebar2></sidebar2>
    </div>
  </nc-sidebar>
</nc-app>
```

and here is an example for controlling the sidebars using directives or events
```js
<template>
<div>
  <button v-nc-sidebar="{targetId: sidebarComponentName, data: 3}" v-for="sidebarComponentName in sidebarComponents">
    <template v-if="sidebarComponent == sidebarComponentName">Close</template>
    <template v-else>Open</template>
    {{ sidebarComponentName }}
  </button>
  
  <button v-nc-sidebar.sidebar1.show>Show Sidebar 1</button>
  <button v-nc-sidebar.sidebar1.hide>Hide Sidebar 1</button>
</div>
</template>

<script>
export default {
  mounted() {
    this.$root.$on('nc::sidebar::shown', id => {
      this.sidebarComponent = id
    })

    this.$root.$on('nc::sidebar::hidden', id => {
      this.sidebarComponent = null
    })
  },
  beforeDestroy() {
    if (this.sidebarComponent !== null) {
      this.$root.$emit('nc::hide::sidebar', this.sidebarComponent)
    }
  },
  data () {
    return {
      sidebarComponent: null,
      sidebarComponents: [
        'sidebar1',
        'sidebar2',
      ]
    }
  },
}
</script>
```
