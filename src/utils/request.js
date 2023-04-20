import axios, { AxiosHeaders } from "axios";
import {Loading, Message, MessageBox} from 'element-ui'
import nProgress from "nprogress";
import 'nprogress/nprogress.css'


const http = axios.create({
    // 通用请求地址前缀
    baseURL:'/api',
    // 超时事件
    timeout:10000,
    // headers:
})
// 可以利用CancelToken工厂函数创建cancel token
let requestList = new Set()




// 添加请求拦截器
http.interceptors.request.use(function(config){
    // 发送请求之前做什么
    // 利用cancleToken取消档次请求
    // config.cancelToken = new axios.CancelToken(e => {
    //     // 这里阻止重复请求,上个请求未未执行完成时不会执行相同的请求
    //     requestList.has(config.url)?e(`${location.host}${config.url}---重复请求被中断`):requestList.add(config.url)

    // })
    showLoaing()
    nProgress.start()
    return config
},function(error){
    // 对错误的请求做什么
    return Promise.reject(error)
});
// 添加响应拦截器
http.interceptors.response.use(function(response){
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 相同请求在600ms内不可以在600ms内重复发送，反之继续执行
    nProgress.done()
    hideLoading()
    setTimeout(() => {
        requestList.delete(response.config.url)
    }, 600);
    
    return response
},function(error){
  // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)

})
let loading;
let loadingCount = 0;
function start() {
  loading = Loading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0,0,0,0.7)'
  })
};
function end() {
  loading.close();
}
function showLoaing() {
  if (loadingCount == 0) {
    start();
  };
  loadingCount++
};

function hideLoading() {
  loadingCount--;
  if (loadingCount == 0) {
    end()
  }
}
    





export default http