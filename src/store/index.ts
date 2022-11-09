import { createPinia } from 'pinia'
import piniaPlugins from '@/store/plugins/mounted'

const pinia = createPinia()

pinia.use(piniaPlugins)

export default pinia
