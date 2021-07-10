/*
 * @Author: ouhefu
 * @Date: 2020-03-20 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description: 封装统一分页组件
 */

import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import './index.scss';

interface ICPaginationProps {
  pageInfo: object,
  onChange: Function
}

const CPagination: React.FC<ICPaginationProps> = props => {
  const { pageInfo, onChange } = props

  // 参考 https://3x.ant.design/components/pagination-cn/
  const defaultPaginationInfo = {
    showQuickJumper: true,
    showSizeChanger: true,
    pageNumber: 1,
    pageSize: 10,
    total: 0
  }

  const [pagination, setPagination] = useState(defaultPaginationInfo)

  useEffect(() => {
    pageInfo && setPagination(Object.assign({}, defaultPaginationInfo, pageInfo))
  }, [pageInfo])

  const queryChange = (page, pageSize, type) => {
    onChange(page, pageSize, type)
  }

  return (
    <div className='c-pagination'>
      <Pagination
        {
          ...pagination
        }
        onShowSizeChange={(page, pageSize) => queryChange(page, pageSize, 'size')}
        onChange={(page, pageSize) => queryChange(page, pageSize, 'page')}
      ></Pagination>
    </div>
  );
};

export default CPagination;
