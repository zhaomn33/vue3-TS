
/**
 * plugin single mounted
 */

import { filterResponse } from '@/store/utils/mixin'
import router from '@/router'
import { PiniaPluginContext } from 'pinia'

const piniaPlugins = (context: PiniaPluginContext):void => {
  context.store.filterResponse = filterResponse
  console.log(context)
}

export default piniaPlugins
