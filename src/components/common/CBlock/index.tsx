/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description:
 */

import React from 'react'
import './index.scss'

interface IProps {
  title?: string
  subTitle?: string
  renderTitle?: any
  customStyle?: any
  contentCustomStyle?: any
}

const prefixCls = 'c-block'

const CBlock: React.FC<IProps> = props => {
  return (
    <div className={prefixCls} style={props.customStyle}>
      <div className={`${prefixCls}-title`}>
        <span className={`${prefixCls}-divide-line`}></span>
        {props.title && (
          <span className={`${prefixCls}-text`}>{props.title}</span>
        )}
        {props.subTitle && (
          <span className={`${prefixCls}-title-tips`}>{props.subTitle}</span>
        )}
        {props.renderTitle && <div>{props.renderTitle}</div>}
      </div>
      <div className={`${prefixCls}-content`} style={props.contentCustomStyle}>
        {props.children}
      </div>
    </div>
  )
}

export default CBlock
