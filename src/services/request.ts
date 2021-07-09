import { AxiosResponse } from 'axios'
import Request, { ResError, IResStandardRet } from '@src/utils/http'
import * as consts from '@src/constants'

interface IResponse {
  data?: any
  code: number
  msg: string
  timestamp: number
  errorCode?: number | string
}

const request = new Request({
  defaults: {
    // process.env.REACT_APP_API_BASE_PATH_XH
  },
  interceptors: {
    onFulfilled: (res: AxiosResponse<IResponse>) => {
      const {
        data: resData,
        config: { responseType }
      } = res
      let result: IResStandardRet<any> = {
        data: null,
        code: consts.RES_SUCCESS_DEFAULT_CODE,
        message: consts.RES_SUCCESS_DEFAULT_MSG,
        success: true
      }

      if (resData === null || resData === void 0) {
        result.data = {}
      } else if (
        typeof resData !== 'object' ||
        (responseType && responseType !== 'json')
      ) {
        result.data = resData
      } else {
        result = {
          data: resData.data,
          code: resData.code,
          message: resData.msg,
          timestamp: resData.timestamp,
          success: resData.code === consts.RES_SUCCESS_DEFAULT_CODE
        }
      }

      return {
        ...res,
        data: result
      }
    },
    onRejected: err => {
      if (!err.response) {
        return Promise.reject(
          new ResError({
            code: consts.RES_FAILED_DEFAULT_CODE,
            message: consts.RES_FAILED_DEFAULT_MSG,
            reason: {}
          })
        )
      }

      if (err.response.status === consts.RES_UNAUTHORIZED_CODE) {
        localStorage.clear()
        // window.location.href = services.getLogoutUri()
      }

      const { code, msg, data } = err.response.data as IResponse

      return Promise.reject(
        new ResError({
          code: code || err.response.status,
          message: msg || '',
          reason: data
        })
      )
    }
  }
})

export default request
