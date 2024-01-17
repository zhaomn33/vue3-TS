import {
  createRouter,
  createWebHistory
} from 'vue-router'
import routes from './routes'

const history = createWebHistory()
console.log(routes,'routes')

export default createRouter({
  history,
  routes
})
