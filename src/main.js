import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import './api/mock'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie';


Vue.config.productionTip = false
Vue.use(ElementUI);//全局引入
// Vue.use()按需引入
// 添加全局前置路由守卫
router.beforeEach((to,from,next) =>{
  const token = Cookies.get('token')
  // token没有值，跳转到登录页面
  if(!token && to.name!=='login'){
    next({name:'login'})
  }else if(token &&to.name==='login'){
    next({name:'home'})
  }else{
    next()
  }
})


new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
