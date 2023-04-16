import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './api/mock'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);//全局引入
// Vue.use()按需引入


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
