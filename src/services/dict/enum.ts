/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description: 所有的枚举统一用一个文件管理, 枚举值首字母大写
 */

export enum Gender {
  Male = 'M',
  Female = 'F'
}

export enum ChannelType {
  ADMIN = 'ADMIN',
  PROGRAM = 'PROGRAM'
}

// 审核状态，APPLY(0,"待审核"),PASS(1,"审核通过"),REJECT(2,"审核拒绝");
export enum AuditStatus {
  APPLY = 'APPLY',
  PASS = 'PASS',
  REJECT = 'REJECT'
}

// EXTRACTING(1,"提取中"),,EXTRACT_SUCCESS(2,"提取成功"),,EXTRACT_FAIL(3,"提取失败");
export enum ExtractStatus {
  EXTRACTING = 'EXTRACTING',
  EXTRACT_SUCCESS = 'EXTRACT_SUCCESS',
  EXTRACT_FAIL = 'EXTRACT_FAIL'
}
