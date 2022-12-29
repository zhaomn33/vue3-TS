import request from '@/utils/request'
import { LoginForm, LoginResponse } from '@/@types/login'

const UserAccountAPI = {
  login(data: LoginForm) {
    // console.log('API datadata',data);

    // return request<LoginResponse>({
    //   method: 'post',
    //   url: '/login',
    //   data
    // })

    return {
      error: 0,
      msg: 'OK',
      data: {
        language: 'zh-hans',
        Authorization: '4v8acea-6a89-2a2ebc-10802-9ac19003',
        user: {
          username: 'admin'
        }
      }
    }
  },

  logout() {
    return request({
      url: '/logout',
      method: 'post'
    })
  },

  getUserInfoData(params = {}) {
    // return request({
    //   url: '/user_info',
    //   method: 'get',
    //   params
    // })
    return {
      error: 0,
      msg: 'OK',
      data: {
        language: 'zh-hans',
        Authorization: '4v8acea-6a89-2a2ebc-10802-9ac19003',
        user: {
          username: 'admin'
        }
      }
    }
  }
}

export default UserAccountAPI
