import Vue from "vue";
import VueRouter from "vue-router";
// 导入所有的子路由
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'


Vue.use(VueRouter)
// 创建路由组件
// 组件和路由进行映射
const routes=[
    { 
        path : '/', 
        component: Main,
        redirect:'/home',//重定向
        children:[
            { path : '/home', name:'home' ,component: Home },//主页面
            { path : '/user', name:'user' ,component: User },//用户页面
            { path : '/mall', name:'mall' ,component: Mall },//商品页面
            { path : '/page1', name:'page1', component: PageOne },//子页面1
            { path : '/page2', name:'page2', component: PageTwo },//子页面2
            
        ]
    },

]
// 创建router实例
const router = new VueRouter({
    routes
})
export default router
// 
