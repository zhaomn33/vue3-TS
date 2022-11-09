import axios, { AxiosInstance } from 'axios'
import Router from '@/router'

// redirect error
function errorRedirect(url: string) {
  Router.push(`/${ url }`)
}

// Instance for axios
const service: AxiosInstance = axios.create({
  // API from the environment variable
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 15000
})


export default service
