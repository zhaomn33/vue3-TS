import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'
import { Modal, message } from 'ant-design-vue'

// code Message
const codeMessage: {
  [key: number]: string
} = {
  // 200: '服务器成功返回请求的数据。',
  200: 'The server successfully returned the requested data.',
  // 201: '新建或修改数据成功。',
  201: 'Create or modify data successfully.',
  // 202: '一个请求已经进入后台排队（异步任务）。',
  202: 'A request has entered the background queue (asynchronous task).',
  // 204: '删除数据成功。',
  204: 'Data deleted successfully.',
  // 206: '进行范围请求成功。',
  206: 'Successful range request.',
  // 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  400: 'Bad error request, and the server did not create or modify the data.',
  // 401: '用户没有权限（令牌、用户名、密码错误）。',
  401: 'User does not have permission (invalid username, password, security token).',
  // 403: '用户得到授权，但是访问是被禁止的。',
  403: 'User is authorized, but access is forbidden.',
  // 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  404: 'The request sent is for a record that does not exist, and the server does not operate.',
  // 405: '请求不允许。',
  405: 'Request denied.',
  // 406: '请求的格式不可得。',
  406: 'Requested format not available.',
  // 410: '请求的资源被永久删除，且不会再得到的。',
  410: 'The requested resource is permanently deleted and will no longer be available.',
  // 422: '当创建一个对象时，发生一个验证错误。',
  422: 'When creating an object, a validation error occurrs.',
  // 500: '服务器发生错误，请检查服务器。',
  500: 'An error occurred in the server, please check the server.',
  // 502: '网关错误。',
  502: 'Bad Gateway Error.',
  // 503: '服务不可用，服务器暂时过载或维护。',
  503: 'The server is temporarily unable to service your request due to maintenance downtime or capacity problems.',
  // 504: '网关超时。'
  504: 'Gateway Timeout.'
}

// 创建axios实例
const service: AxiosInstance = axios.create({
  // api 的 base_url
  // baseURL: import.meta.env.VITE_BASE_API,
  baseURL: '/api',
  // 请求超时时间
  timeout: 6000000
})

// request 请求拦截器
service.interceptors.request.use(
  request => {
    const token = Cookie.get('token')
    // console.log('token',token); // 4v8acea-6a89-2a2ebc-10802-9ac19003
    if (
      !(request.data instanceof FormData)
    ) {
      // request.data = decamelizeKeys(request.data)
    }
    request.headers!.Authorization = token as string
    // console.log('request.headers',request.headers);
    
    return request
  },
  error => {
    Modal.confirm({
      title: '提示',
      content: '请求超时!',
    });
    return Promise.reject(error)
  }
)

// response 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('response',response.data.status);
    const res = response.data;
    if(res.code != 200){
      return;
    }
    return response.data;
  },
  error=>{
    if(error.response ){
      console.log('error.response',error.response);
      
      // const match = /.+[#]/g.exec(location.href);
      // if(process.env.NODE_ENV === 'production'){
      //   location.href = '' //url
      // } else {
      //   const url = match[0] + '/login';
      //   location.href = url;
      // }

      return false;
    }
    return Promise.reject(error.response.data);
  }
)

export default service