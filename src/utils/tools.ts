import storage from './storage'
import * as Auth from 'constants/auth'
import { XH_BAODU_SYSTEM } from '../constants/local'
// 工具类函数
export default {
  throttle(fn: Function, wait: number) {
    let previous = 0
    return (...args: any) => {
      let now = new Date().getTime()
      if (now - previous > wait) {
        fn.apply(this, args)
        previous = now
      }
    }
  },

  // https://github.com/mqyqingfeng/Blog/issues/100
  // 尽管我们可以使用 try catch 捕获错误，但是当我们需要捕获多个错误并做不同的处理时，很快 try catch 就会导致代码杂乱，就比如：
  // 精简写法:
  // const [err, user] = await clearCatch(UserModel.findById(1));
  // if(!user) throw new CustomerError('No user found');
  clearCatch(promise: any) {
    return promise
      .then((data: any) => {
        return [null, data]
      })
      .catch((err: Error) => [err])
  }
}

/**
 * 获取当前用户登录的渠道
 */
export function getChannelByCache(): string | null {
  return storage.get(Auth.system)
}

export function getLabelByEnumValue(dict: Array<any>, value: any) {
  const item = dict.find(item => item.value === value)

  return item ? item.label : null
}
