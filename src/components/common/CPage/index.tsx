/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description: 统一页面container
 */

import React from 'react'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import './index.scss'

interface IBreadcrumb {
  label: string
  url: string
}

interface IPageProps {
  breadcrumb?: Array<IBreadcrumb>
}

const prefixCls = 'c-page'

const CPage: React.FC<IPageProps> = props => {
  const history = useHistory()
  const { breadcrumb = [] } = props

  const handleBreadcrumbClick = (url: string) => {
    if (!url) return

    history.replace({
      pathname: url
    })
  }

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-breadcrumb`}>
        {breadcrumb.map((item, index) => (
          <span
            className={classnames({
              [`${prefixCls}-breadcrumb-item`]: true,
              [`outside-page`]: breadcrumb.length === 1
            })}
            key={index}
          >
            {index !== 0 && (
              <span className={`${prefixCls}-breadcrumb-separator`}>/</span>
            )}
            <a onClick={() => handleBreadcrumbClick(item.url)}>{item.label}</a>
          </span>
        ))}
      </div>
      {props.children}
    </div>
  )
}

export default CPage
