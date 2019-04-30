/**
 * @description: 基于axios封装http请求插件
 * @param: {type}
 * @return:
 */
// vue插件 核心：install函数

import axios from 'axios';

let instance = axios.create({
    // baseUrl:'http://127.0.0.1:8080',
    timeout:5000,
    withCredentials:true
})

// 请求拦截器
instance.interceptors.request.use((req)=>{
    console.log(req)
    if(req.url == ''){
        console.log(sessionStorage.getItem('user'))
        req.headers.authorization = sessionStorage.getItem('user');
    }else if(req.url == '/upload'){
        req.processData=false;
        req.headers['content-Type'] = "multipart/form-data";
    }
    // if(req.data && req.data.query){
    //     console.log(req.data.query.store_id || 'asdascxv123asd')
    //     req.headers.authorization = req.data.query.store_id ||  'asdascxv123asd'
    // }else{
        req.headers.authorization =  'asdascxv123asd'
    // }
    
    return req
    
})

// 响应拦截器
instance.interceptors.response.use((res)=>{
    if(res.status == 200 || res.status == 304){
        return res.data
    }else{
        console.log(res)
    }
},(err)=>{
    Promise.reject(err)
})

let httpPlugin = {
    install(Vue){
        Object.defineProperty(Vue.prototype,'$http',{
            value:instance
        })
    }
}

export default httpPlugin;