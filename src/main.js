import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/plugins/vant'
Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
