/**
 * Plugins for Pinia
 */

// import { getFilterResponse } from '@/store/utils/mixin'
// import router from '@/router'

// export const pluginPinia = ({ store }) => {
//   store.filterResponse = getFilterResponse
//   store.router = router
// }

// declare module 'pinia' {
//   export interface PiniaCustomProperties {

//     filterResponse: typeof getFilterResponse
//     router: typeof router
//   }
// }

/**
 * plugins all export
 */

import pinia from '@/store'

import piniaPlugins from '@/store/plugins/mounted'
// import mounted from './mounted'

pinia.use(piniaPlugins)
