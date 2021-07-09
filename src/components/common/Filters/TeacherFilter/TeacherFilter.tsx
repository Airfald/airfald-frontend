import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  SearchBarCategorys,
  TeacherRole,
  ITeacherItem
} from 'services/filter/typing'
import { getMountNode } from '@ice/stark-app'
import { Select, Form } from 'antd'
import teacherService from 'services/filter'
import storage from 'utils/storage'
import _ from 'lodash'
import { getChannelByCache } from 'utils/tools'

const { Option } = Select

interface TeacherFilterProps {
  name?: string
  placeholder?: string
  isAssistTeacher?: boolean
  onChange?: (value) => void
}
const TeacherFilter: React.FC<TeacherFilterProps> = props => {
  const {
    isAssistTeacher = false,
    name = isAssistTeacher ? 'assistTeacherId' : 'mainTeacherId',
    placeholder = isAssistTeacher ? '班主任' : '老师',
    onChange
  } = props

  const [searchTeacherValue, setSearchTeacherValue] = useState<string>('')
  const [isInsideDropdown, setIsInsideDropdown] = useState<boolean>(false)
  const [teacherList, setTeacherList] = useState<ITeacherItem[]>([])
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10

  const isSS = getChannelByCache() === 'SS'

  /**
   * 角色 星火，老师传TEACHER,班主任传STUDY_MANAGER，双师 传TEACHER
   */
  const roleCodes = useMemo(() => {
    if (isSS) return [TeacherRole.TEACHER]
    if (!isSS && !isAssistTeacher) return [TeacherRole.TEACHER]
    if (!isSS && isAssistTeacher) return [TeacherRole.STUDY_MANAGER]
  }, [isSS, isAssistTeacher])

  /**
   * 选中项发生变化
   */
  const triggerChange = useCallback(
    v => {
      // eslint-disable-next-line no-unused-expressions
      typeof onChange === 'function' && onChange({ name: v })
    },
    [onChange]
  )

  /**
   * 获取老师列表
   */
  const listMainTeacherList = async (teacherName?: string) => {
    // const { userinfo } = store.getModelState('user')
    const userinfo = storage.get('userinfo')

    if (!userinfo?.branchId) return []

    const res = await teacherService.getSearchBarTeacherList({
      current: currentPage || 1,
      size: PAGE_SIZE,
      params: {
        branchId: userinfo?.branchId,
        roleCodes,
        name: teacherName
      }
    })

    const allRecords = currentPage > 1 ? [...teacherList, ...res] : res

    setTeacherList(allRecords || [])
    setHasMore(res.length === PAGE_SIZE)
    return allRecords
  }

  /**
   * 滚动到页尾，获取下一页数据
   */
  const scrollToPageEnd = e => {
    const { target } = e
    if (target?.scrollTop + target?.offsetHeight === target?.scrollHeight) {
      if (hasMore) {
        setCurrentPage(prev => ++prev)
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
      category: SearchBarCategorys.TEACHER,
      dataDicts: teacherList?.map(el => {
        return {
          category: SearchBarCategorys.TEACHER,
          id: el.id,
          name: el.name
        }
      })
    }
    return sourceData?.dataDicts?.map(z => {
      return (
        <Option key={z.id} value={z.id}>
          {z.name}
        </Option>
      )
    })
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
    listMainTeacherList(searchTeacherValue)
  }, [currentPage, searchTeacherValue])

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
        onPopupScroll={debounceHandler(e => scrollToPageEnd(e))}
        onSelect={v => triggerChange(v)}
        onSearch={_.debounce(value => {
          setSearchTeacherValue(value)
          setCurrentPage(1)
        }, 500)}
        onDropdownVisibleChange={visible => {
          if (visible) {
            setTimeout(() => {
              setIsInsideDropdown(true)
            }, 100)
            setCurrentPage(1)
            setSearchTeacherValue('')
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

export default TeacherFilter
