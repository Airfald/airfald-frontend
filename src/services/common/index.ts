import request from '@src/services/request'
import * as types from './types'

export const login = async (data: types.ILoginQueryDTO) => {
  return request.post(`/login`, data)
}

export const check = async () => {
  return request.get(`/check`, {})
}
