/* eslint-disable semi */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import router from '../router'
import { getToken } from '@/utils/auth'

// CORS Cross-Origin Macro
const ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
const ALLOW_HEADERS = 'Access-Control-Allow-Headers';
const ALLOW_METHODS = 'Access-Control-Allow-Methods';

const CONTENT_TYPE = 'Content-Type';
const X_AUTH_TOKEN = 'x-auth-token';

axios.defaults.headers[CONTENT_TYPE] = 'application/json';

// cors 跨域设置
axios.defaults.headers[ALLOW_ORIGIN] = '*';
axios.defaults.headers[ALLOW_HEADERS] = '*';
axios.defaults.headers[ALLOW_METHODS] = '*';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000, // request timeout
  withCredentials: false
});

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers[X_AUTH_TOKEN] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error)
});

// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (res.code === 40013 || res.code === 40001) {
        router.push('/401')
      } else if (res.code === 40004) {
        router.push('/404')
      }
      // if (res.code === 40003 || res.code === 40004) {
      //   router.push('/404');
      // }
      // return Promise.reject('error');
      return response
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  });

export default service
