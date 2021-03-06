import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
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
    onLoad: 'login-required',
  },
  config: {
    'realm': 'lambda-authorizer',
    'url': 'http://localhost:8090/auth/',
    'clientId': 'vue'
  },
  onReady: () => {
    tokenInterceptor()
    /* eslint-disable no-new */
    new Vue({
      render: h => h(App)
    }).$mount('#app')
  }
})
