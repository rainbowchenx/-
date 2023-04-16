import http from "../utils/request";

export const getData = () => {
    // axios#get(url[, config])
    // 返回promise对象
    return http.get('/home/getData')
}