import Mock from "mockjs";
import homeApi from "./mockServeData/home";

// Mock.mock('/api/home/getData','get',function(){
//     // 拦截到请求后的处理逻辑
//     console.log('got it')
// })
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)