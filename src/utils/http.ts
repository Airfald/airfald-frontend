import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import * as consts from '@src/constants'

interface IRequestOpts {
  defaults?: AxiosRequestConfig
  interceptors?: {
    onFulfilled?: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>
    onRejected?: (err: AxiosError) => Promise<ResError>
  }
}

interface IResErrorOpts {
  code: string | number
  message: string
  reason?: any
}

const isEnvDevelopment = process.env.NODE_ENV === 'development'

export interface IResStandardRet<T> {
  data: T
  code: number
  message: string
  timestamp?: number
  success: boolean
}

/**
 * 封装请求响应 Error
 */
export class ResError {
  code: string | number
  reason?: any
  message?: any

  constructor({ code = '', message = '', reason = null }: IResErrorOpts) {
    this.message = message
    this.code = code
    this.reason = reason
  }
}

/**
 * 封装 axios, 对外提供统一的 http 请求工具
 * 支持 get, post, put, patch, delete
 */
export default class Request {
  instance: AxiosInstance
  /**
   * 创建请求实例
   *
   * @param {Object} options
   * @param {Object} options.defaults axios的默认设置
   * @param {Object} options.interceptors 拦截器设置
   */
  constructor({ defaults = {}, interceptors = {} }: IRequestOpts) {
    const instance = (this.instance = Axios.create({
      ...defaults,
      timeout: 50000
    }))

    instance.interceptors.request.use(cfg => cfg, err => Promise.reject(err))

    const defaultOnFulFilled = (res: AxiosResponse) => res
    const defaultOnRejected = (err: AxiosError) => {
      return !err.response
        ? Promise.reject(
            new ResError({
              code: consts.RES_FAILED_DEFAULT_CODE,
              message: consts.RES_FAILED_DEFAULT_MSG,
              reason: {}
            })
          )
        : Promise.reject(
            new ResError({
              code: err.response.status,
              message: err.message,
              reason: err.response.data
            })
          )
    }

    instance.interceptors.response.use(
      interceptors.onFulfilled || defaultOnFulFilled,
      interceptors.onRejected || defaultOnRejected
    )
  }

  static async all<T>(promises: Promise<T>[]) {
    return Axios.all<T>(promises)
  }

  static async spread<T, R>(callback: (...args: T[]) => R) {
    return Axios.spread<T, R>(callback)
  }

  async head(url: string) {
    const res = await this.instance.head(url)

    return res.data
  }

  async get<T = any>(
    url: string,
    params?: object,
    config: AxiosRequestConfig = {}
  ) {
    try {
      const { data: ret } = await this.instance.get<IResStandardRet<T>>(url, {
        ...config,
        params
      })
      return ret.success
        ? ret.data
        : Promise.reject(
            new ResError({
              code: ret.code,
              message: ret.message,
              reason: ret.data
            })
          )
    } catch (err) {
      return Promise.reject(
        new ResError({
          code: err.code,
          message: err.message,
          reason: err.reason
        })
      )
    }
  }

  async delete(url: string) {
    const res = await this.instance.delete(url)
    return res.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const { data: ret } = await this.instance.post<IResStandardRet<T>>(
        url,
        data,
        config
      )
      return ret.success
        ? ret.data
        : Promise.reject(
            new ResError({
              code: ret.code,
              message: ret.message,
              reason: ret.data
            })
          )
    } catch (err) {
      return Promise.reject(
        new ResError({
          code: err.code,
          message: err.message,
          reason: err.reason
        })
      )
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const { data: ret } = await this.instance.put<IResStandardRet<T>>(
        url,
        data,
        config
      )
      return ret.success
        ? ret.data
        : Promise.reject(
            new ResError({
              code: ret.code,
              message: ret.message,
              reason: ret.data
            })
          )
    } catch (err) {
      return Promise.reject(
        new ResError({
          code: err.code,
          message: err.message,
          reason: err.reason
        })
      )
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    try {
      const { data: ret } = await this.instance.patch<IResStandardRet<T>>(
        url,
        data,
        config
      )
      return ret.success
        ? ret.data
        : Promise.reject(
            new ResError({
              code: ret.code,
              message: ret.message,
              reason: ret.data
            })
          )
    } catch (err) {
      return Promise.reject(
        new ResError({
          code: err.code,
          message: err.message,
          reason: err.reason
        })
      )
    }
  }
}
