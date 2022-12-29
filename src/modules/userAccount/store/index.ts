import { defineStore } from 'pinia'
import UserAccountAPI from '@/modules/UserAccount/api'

const useUserAccount = defineStore('UserAccount', {
  state: () => {
    return {
      userInfo: {}
    }
  },
  actions: {
    async login(data:any) {
      // console.log('store login data',data);

      const res = await UserAccountAPI.login(data)

      // console.log('store login res',res);
      return res
    },
    async getUserInfo() {
      // console.log('getUserInfo');

      const res = await UserAccountAPI.getUserInfoData()
      // console.log('getUserInfo res',res);
      this.userInfo = res.data
      console.log('this.userInfo', this.userInfo)

      return res
    }
  }
})

export default useUserAccount
