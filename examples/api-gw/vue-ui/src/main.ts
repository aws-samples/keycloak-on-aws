import Vue from 'vue'
import App from './App.vue'
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'

Vue.config.productionTip = false

Vue.use(VueKeycloakJs, {
  init: {
    onLoad: 'login-required',
  },
  config: {
    'realm': 'lambda-authorizer',
    'url': 'http://localhost:8090/auth/',
    'clientId': 'vue'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')