import request from '@src/services/request'
import * as types from './types'

/**
 * 获取订单详情列表
 * http://47.106.118.192:13000/project/109/interface/api/32643
 */
export const getOrderDetail = async (orderId: string) => {
  return request.get(`/xhmall-mgr/mgr/api/order/detail?orderId=${orderId}`)
}
