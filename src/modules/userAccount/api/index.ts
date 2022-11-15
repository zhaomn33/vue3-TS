import request from '@/utils/request'
import { LoginForm, LoginResponse } from '@/@types/login'

const UserAccountAPI = {
  login(data: LoginForm){
    return request<LoginResponse>({
      method: 'post',
      url: '/login',
      data
    })
  },
  // const login = (data: {
  //   account: string
  //   pwd: string
  //   imgcode: string
  // }) => {
  //   return request<LoginResponse>({
  //     method: 'POST',
  //     url: '/login',
  //     data
  //   })
  // }

  logout(){
    return request({
      url: '/logout',
      method: 'post'
    })
  }
}

export default UserAccountAPI