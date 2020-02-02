import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
