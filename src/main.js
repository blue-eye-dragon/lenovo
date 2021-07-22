// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import moment from 'moment'
import '@/style/index.css'
import '@/style/indextool.css'
import Bus from '@/utils/bus'
import base from '@/utils/base.js'

Vue.use(ElementUI);
Vue.use(Bus);

Vue.config.productionTip = false
Vue.prototype.$moment = moment
window.basePath = base.basePath

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vue
