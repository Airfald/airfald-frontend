/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description: 统一全局状态管理, 如果不是必须全局 如userInfo, token, permission， 则应分模块进行存储，更加清晰
 */

import { useState } from 'react'
import { createContainer } from 'unstated-next'
import useModule1 from './module1'
import useModule2 from './module2'

const GlobalContainer = createContainer(() => {
  // 全局状态管理
  const [userInfo, setUserInfo] = useState()

  return {
    userInfo,
    setUserInfo,
    // 自定义分层概念
    module1: {
      ...useModule1(),
    },
    module2: {
      ...useModule2(),
    }
  }
})

export { GlobalContainer }
