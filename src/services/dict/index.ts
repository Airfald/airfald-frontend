/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description: 字典用于存储常量 dict, 枚举值首字母大写
 */
import * as enums from './enum'

export const genderDict = [
  {
    label: '男',
    value: enums.Gender.Male
  },
  {
    label: '女',
    value: enums.Gender.Female
  }
]

export const personalInfoDict = [
  {
    label: '已补全',
    value: true
  },
  {
    label: '未补全',
    value: false
  }
]

export const signComplatedDict = [
  {
    label: '已签订',
    value: true
  },
  {
    label: '未签订',
    value: false
  }
]

export const accountStatusDict = [
  {
    label: '正常',
    value: false
  },
  {
    label: '禁用',
    value: true
  }
]

export const channelTypeDict = [
  {
    label: '后台录入',
    value: enums.ChannelType.ADMIN
  },
  {
    label: '用户注册',
    value: enums.ChannelType.PROGRAM
  }
]

export const AuditStatusDict = [
  {
    label: '未审核',
    value: enums.AuditStatus.APPLY
  },
  {
    label: '审核通过',
    value: enums.AuditStatus.PASS
  },
  {
    label: '审核不通过',
    value: enums.AuditStatus.REJECT
  }
]

export const ShelvesStatusDict = [
  {
    label: '已上架',
    value: true
  },
  {
    label: '未上架',
    value: false
  }
]

export const userTypeDict = [
  {
    label: '是',
    value: true
  },
  {
    label: '否',
    value: false
  }
]

export const ExtractStatusDict = [
  {
    label: '提现中',
    value: enums.ExtractStatus.EXTRACTING
  },
  {
    label: '提现成功',
    value: enums.ExtractStatus.EXTRACT_SUCCESS
  },
  {
    label: '提现失败',
    value: enums.ExtractStatus.EXTRACT_FAIL
  }
]
