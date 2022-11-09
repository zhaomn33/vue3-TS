/* global
  IRequestData
  ICallBack
 */
import { ElMessage } from 'element-plus'

export function filterResponse(
  res: IRequestData,
  successCb?: ICallBack | undefined | null,
  errorCb?: ICallBack | undefined | null
): Promise<IRequestData>{
  return new Promise((resolve) => {
    if (res && res.error === 0) {
      successCb && successCb(res)
    } else {
      errorCb
        ? errorCb(res)
        : ElMessage({
          type: 'error',
          message: res.msg,
          showClose: true
        })
    }
    resolve(res)
  })
}

export type filterResponseTypes = typeof filterResponse
