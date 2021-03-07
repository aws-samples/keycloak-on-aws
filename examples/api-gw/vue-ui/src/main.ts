import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import kcConfig from './kcConfig'
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'

Vue.config.productionTip = false

function tokenInterceptor () {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })
}

Vue.use(VueKeycloakJs, {
  init: {
    // onLoad: 'login-required',
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  },
  config: {
    realm: kcConfig['realm'],
    url: kcConfig['auth-server-url'],
    clientId: kcConfig['resource']
  },
  onReady: () => {
    tokenInterceptor()
    /* eslint-disable no-new */
    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
