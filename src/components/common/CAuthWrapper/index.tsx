import React from 'react'
import * as constants from '@src/constants/index'

interface IAuthWrapperProps {
  /** 资源ID */
  label: string
  [key: string]: any
}

// 缓存Map
const cache = new Map()
/**
 * 判断权限缓存
 * @param label 资源ID
 * @returns 'NO_CACHE' - 无缓存, false - 缓存值为false，true - 缓存值为true
 */
const checkCache = (label: string) => {
  if (!cache.has(label)) {
    return 'NO_CACHE'
  } else {
    return cache.get(label)
  }
}

/**
 * 根据源数据判断权限
 * @param authList 权限列表数据
 * @param label 资源ID
 * @effect 设置cache缓存
 * @returns boolean
 */
const checkAuthData = (authList: any, label: string) => {
  let flag = false
  for (let i = 0; i < authList.length; i++) {
    const el = authList[i]
    if (el.url === label) {
      flag = true
      break
    }
  }
  cache.set(label, flag)
  return flag
}

/**
 * 判断权限方法
 * @param authList 权限列表
 * @param label 资源ID
 * @effect 设置cache缓存
 * @returns boolean
 */
const hasAuth = (authList: any, label: string) => {
  const cacheResult = checkCache(label)
  const result =
    cacheResult === 'NO_CACHE' ? checkAuthData(authList, label) : cacheResult
  return result
}

/**
 * 权限组件封装
 * @returns 有权限- props.childern ， 无权限 - null
 */
const CAuthWrapper: React.FC<IAuthWrapperProps> = (
  props: IAuthWrapperProps
) => {
  // const permission = store.get(constants.XH_BAODU_PERSIMMION)
  // const { btnList } = permission

  // const auth = hasAuth(btnList, props.label)

  // if (auth) {
  //   return props.children
  // } else {
  //   return null
  // }
  return null
}

/**
 * 权限判断，函数调用方法
 * @returns boolean
 */
const checkAuth = (label: string) => {
  // // const permission = store.get(constants.XH_BAODU_PERSIMMION)
  // const { btnList } = permission

  // return hasAuth(btnList, label)
}

export { CAuthWrapper, checkAuth }

export default CAuthWrapper
