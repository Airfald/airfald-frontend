import React, { useState, useEffect } from 'react'
import { SearchBarCategorys, ICampusItem } from 'services/filter/typing'
import { getMountNode } from '@ice/stark-app'
import { Select, Form } from 'antd'
import service from 'services/filter'
import _ from 'lodash'
import storage from 'utils/storage'

const { Option } = Select

interface OptionsDataProps {
  id: string
  name: string
}

interface CampusFilterProps {
  name?: string
  placeholder?: string
  // 将固定的数据前置插入最前面的筛选项
  prepend?: OptionsDataProps[]
}
const CampusFilter: React.FC<CampusFilterProps> = props => {
  const { name = 'campusId', placeholder = '校区', prepend = [] } = props

  const [searchCampusValue, setSearchCampusValue] = useState<string>('')
  const [isInsideDropdown, setIsInsideDropdown] = useState<boolean>(false)

  const [campusList, setCampusList] = useState<ICampusItem[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  /**
   * 获取校区列表
   */
  const listCampusList = async (campusName?: string) => {
    // const { userinfo } = store.getModelState('user')
    const userinfo = storage.get('userinfo')

    if (!userinfo?.branchId) return []

    const res = await service.getSearchBarCampus({
      current: currentPage,
      size: PAGE_SIZE,
      params: {
        branchId: userinfo?.branchId,
        name: campusName
      }
    })

    const allRecords =
      currentPage > 1 ? [...campusList, ...res?.records] : res?.records

    setCampusList(allRecords || [])
    setTotal(res?.total as number)
    return allRecords
  }

  /**
   * 滚动到页尾，获取下一页数据
   */
  const scrollToPageEnd = (e, type) => {
    const { target } = e
    if (target?.scrollTop + target?.offsetHeight === target?.scrollHeight) {
      if (type === SearchBarCategorys.CAMPUS) {
        if (currentPage * PAGE_SIZE < total) {
          setCurrentPage(prev => ++prev)
        }
      }
    }
  }
  /**
   * 针对事件防抖特殊处理
   */
  const debounceHandler = fn => {
    const debounced = _.debounce(fn, 500)
    return e => {
      // 保留事件引用 https://zh-hans.reactjs.org/docs/events.html
      e.persist()
      return debounced(e)
    }
  }

  /**
   * 渲染单个筛选栏数据
   * @param category 单个筛选栏数据
   */
  const renderDictOptions = () => {
    const sourceData = {
      category: SearchBarCategorys.CAMPUS,
      dataDicts: campusList?.map(el => {
        return {
          category: SearchBarCategorys.CAMPUS,
          id: el.id,
          name: el.name
        }
      })
    }

    let prependOption: any = []

    if (searchCampusValue === '') {
      if (prepend) {
        prependOption = prepend.map(z => {
          return (
            <Option key={z.id} value={z.id}>
              {z.name}
            </Option>
          )
        })
      }
    }

    let sourceOption = sourceData?.dataDicts?.map(z => {
      return (
        <Option key={z.id} value={z.id}>
          {z.name}
        </Option>
      )
    })

    return [...prependOption, ...sourceOption]
  }

  /**
   * 阻止当前dropdown影响父级滚动状态
   */
  useEffect(() => {
    const clasListDom = document.getElementById('root')?.classList
    if (isInsideDropdown && clasListDom) {
      clasListDom.add('limit-contain-scroll')
    } else {
      if (clasListDom) {
        clasListDom.remove('limit-contain-scroll')
      }
    }
  }, [isInsideDropdown])

  useEffect(() => {
    listCampusList(searchCampusValue)
  }, [currentPage, searchCampusValue])

  return (
    <Form.Item name={name} noStyle>
      <Select
        style={{ width: '100%' }}
        allowClear
        showSearch
        filterOption={false}
        defaultActiveFirstOption={false}
        notFoundContent={null}
        getPopupContainer={trigger => trigger.parentNode}
        placeholder={placeholder}
        onPopupScroll={debounceHandler(e =>
          scrollToPageEnd(e, SearchBarCategorys.CAMPUS)
        )}
        onSearch={_.debounce(value => {
          setSearchCampusValue(value)
          setCurrentPage(1)
        }, 500)}
        onDropdownVisibleChange={visible => {
          if (visible) {
            setTimeout(() => {
              setIsInsideDropdown(true)
            }, 100)
            setCurrentPage(1)
            setSearchCampusValue('')
          } else {
            setIsInsideDropdown(false)
          }
        }}
      >
        {renderDictOptions()}
      </Select>
    </Form.Item>
  )
}

export default CampusFilter
