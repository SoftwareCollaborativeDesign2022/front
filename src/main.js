import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import './assets/css/global.css'
Vue.config.productionTip = false
Vue.prototype.$http = axios
// 请求根路径
axios.defaults.baseURL = "/api"
// 全局挂载弹窗
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
