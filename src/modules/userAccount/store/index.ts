import { defineStore } from 'pinia'
import UserAccountAPI from '@/modules/UserAccount/api'

const useUserAccount = defineStore('UserAccount',{
  state: ()=>{
    return {
      userInfo: {}
    }
  },
  actions: {
    async login(data:any) {
      const res = await UserAccountAPI.login(data)
      console.log('res',res);
      return res
    }
  }
})

export default useUserAccount