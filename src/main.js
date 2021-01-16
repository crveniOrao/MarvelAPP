import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Include global constants mixin
import constants from "./mixins/constants";
Vue.mixin(constants);

// Custom SCSS
import './assets/scss/main.scss'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
