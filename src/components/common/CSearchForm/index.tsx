/*
 * @Author: ouhefu
 * @Date: 2020-11-11 15:38:57
 * @LastEditors: ouhefu
 * @LastEditTime: 2020-04-08 18:35:22
 * @Description: 封装统一搜索表单，使用数据驱动的方式进行
 */

import React, { useState, useMemo } from 'react'
import { Form } from 'antd'
import { Row, Col, Input, Select, DatePicker, Button } from 'antd'
import { COMPONENT_TYPE, PLACEHOLDER } from './types'
import './index.scss'

const { RangePicker } = DatePicker
const { Option } = Select

// 支持的表单类型
// 输入框    INPUT = 'INPUT',
// 选择框    SELECT = 'SELECT',
// 时间      DATEPICKER = 'DATEPICKER',
// 开始时间结束时间    RANGEPIKCER = 'RANGEPIKCER',
// 自定义组件    CUSTOM = 'CUSTOM'  (require) onchange

// formConfig => {
// 占位空间大小
// colSpan: 6,
// label
// label: 'label',
// 占位名称
// placeholder: '请输入名称',
// (require) 组件类型
// componentType: COMPONENT_TYPE.INPUT,
// (require) 字段名称
// fieldName: 'name'
// select 选择框时必填
// options: []
// }

interface ISearchFormProps {
  // 表单配置
  formConfig: Array<any>
  // 查询事件
  onQuery: (searchFormData: any) => void
  // 是否可以收起展开
  showExpand?: boolean
}

const prefixCls = 'c-search-form'

const MAX_COL_SPAN = 18

const defaultConfig = {
  placeholder: 'placeholder',
  colSpan: { xs: 24, sm: 24, md: 12, lg: 6, xl: 4 },
  label: 'field'
}

const defaultSelectColSpan = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 3
}

const defaultProps = {
  style: {
    width: '100%'
  }
}

const CSearchForm: React.FC<ISearchFormProps> = props => {
  const { showExpand, formConfig = [], onQuery } = props
  // 搜索的内容
  const [searchFormData, setSearchFormData] = useState<any>({})
  // 展开收起
  const [expand, setExpand] = useState<boolean>(false)
  // 是否筛选过多需要收起
  const [overMaxWidth, setOverMaxWidth] = useState<boolean>(false)

  // 触发搜索
  const handleOnQuery = () => {
    onQuery(searchFormData)
  }

  // 重置条件
  const resetFields = () => {
    setSearchFormData(getInitValues())
    onQuery(getInitValues())
  }

  const getInitValues = () => {
    let params = {} as any
    props.formConfig.forEach(item => {
      params[item.fieldName] = item.props ? item.props.defaultValue : undefined
      if (item.componentType === COMPONENT_TYPE.SELECTINPUT) {
        params[item.selectFieldName] = item.options
          ? item.options[0].value
          : undefined
      }
    })

    return params
  }

  const handleSearchDataChange = (
    type: COMPONENT_TYPE,
    fieldName: string,
    fieldValue: any
  ) => {
    setSearchFormData({
      ...searchFormData,
      [fieldName]: fieldValue
    })
  }

  // 通过传入的参数自动计算渲染结果
  const renderFields = (formConfig: any) => {
    const children = []
    let totalSpan = 0

    for (let i = 0; i < formConfig.length; i++) {
      const formConfigItem = formConfig[i]
      const CustomComponent = formConfigItem.component

      totalSpan += formConfigItem.colSpan || 0
      // 大于最大宽度剩余的不渲染出来
      if (showExpand && !expand && i > 6) {
        setOverMaxWidth(true)
        break
      }

      let colSpan = defaultConfig.colSpan
      if (formConfigItem.colSpan) {
        colSpan = formConfigItem.colSpan
      } else if (formConfigItem.componentType === COMPONENT_TYPE.SELECT) {
        colSpan = defaultSelectColSpan
      }

      children.push(
        <Col {...colSpan} key={i}>
          <div className={`${prefixCls}-form-item`}>
            {formConfigItem.label && (
              <span className={`${prefixCls}-form-item-label`}>
                {formConfigItem.label}：
              </span>
            )}
            <div className={`${prefixCls}-form-item-content`}>
              {formConfigItem.componentType === COMPONENT_TYPE.INPUT && (
                <Input
                  allowClear
                  placeholder={formConfigItem.placeholder || PLACEHOLDER.INPUT}
                  value={searchFormData[formConfigItem.fieldName]}
                  onChange={e =>
                    handleSearchDataChange(
                      COMPONENT_TYPE.INPUT,
                      formConfigItem.fieldName,
                      e.target.value.trim()
                    )
                  }
                  {...Object.assign({}, defaultProps, formConfigItem.props)}
                />
              )}
              {formConfigItem.componentType === COMPONENT_TYPE.SELECTINPUT && (
                <Input.Group compact>
                  <Select
                    value={searchFormData[formConfigItem.selectFieldName]}
                    onChange={value =>
                      handleSearchDataChange(
                        COMPONENT_TYPE.SELECTINPUT,
                        formConfigItem.selectFieldName,
                        value
                      )
                    }
                    style={{ width: '40%' }}
                  >
                    {(formConfigItem.options || []).map(
                      (item: any, index: number) => (
                        <Option value={item.value ?? item.id} key={index}>
                          {item.label ?? item.name}
                        </Option>
                      )
                    )}
                  </Select>
                  <Input
                    placeholder={
                      formConfigItem.placeholder || PLACEHOLDER.INPUT
                    }
                    value={searchFormData[formConfigItem.fieldName]}
                    onChange={e =>
                      handleSearchDataChange(
                        COMPONENT_TYPE.INPUT,
                        formConfigItem.fieldName,
                        e.target.value.trim()
                      )
                    }
                    {...Object.assign({}, defaultProps, formConfigItem.props)}
                  />
                </Input.Group>
              )}
              {formConfigItem.componentType === COMPONENT_TYPE.SELECT && (
                <Select
                  placeholder={formConfigItem.placeholder || PLACEHOLDER.SELECT}
                  value={searchFormData[formConfigItem.fieldName]}
                  onChange={value =>
                    handleSearchDataChange(
                      COMPONENT_TYPE.SELECT,
                      formConfigItem.fieldName,
                      value
                    )
                  }
                  allowClear
                  {...Object.assign({}, defaultProps, formConfigItem.props)}
                >
                  {(formConfigItem.options || []).map(
                    (item: any, index: number) => (
                      <Option value={item.value ?? item.id} key={index}>
                        {item.label ?? item.name}
                      </Option>
                    )
                  )}
                </Select>
              )}
              {formConfigItem.componentType === COMPONENT_TYPE.DATEPICKER && (
                <DatePicker
                  value={searchFormData[formConfigItem.fieldName]}
                  onChange={value =>
                    handleSearchDataChange(
                      COMPONENT_TYPE.DATEPICKER,
                      formConfigItem.fieldName,
                      value
                    )
                  }
                  {...Object.assign({}, defaultProps, formConfigItem.props)}
                />
              )}
              {formConfigItem.componentType === COMPONENT_TYPE.RANGEPIKCER && (
                <RangePicker
                  value={searchFormData[formConfigItem.fieldName]}
                  onChange={(date, datestring) =>
                    handleSearchDataChange(
                      COMPONENT_TYPE.RANGEPIKCER,
                      formConfigItem.fieldName,
                      date
                    )
                  }
                  {...Object.assign({}, defaultProps, formConfigItem.props)}
                />
              )}
              {formConfigItem.componentType === COMPONENT_TYPE.CUSTOM && (
                <CustomComponent />
              )}
            </div>
          </div>
        </Col>
      )
    }

    return children
  }

  useMemo(() => {
    setSearchFormData({ ...getInitValues(), ...searchFormData })
  }, [formConfig])

  return (
    <div className={prefixCls}>
      <Form layout="inline">
        <Row gutter={[8, 8]} style={{ width: '100%' }}>
          {renderFields(formConfig)}
          <Col xs={24} sm={12} md={6} lg={6} xl={4}>
            <div className={`${prefixCls}-operation`}>
              <Button type="primary" onClick={() => handleOnQuery()}>
                查询
              </Button>
              <Button
                className={`${prefixCls}-reset-btn`}
                onClick={() => resetFields()}
              >
                重置
              </Button>
              {showExpand && (
                <a
                  className={`${prefixCls}-operation-text`}
                  onClick={() => {
                    setExpand(!expand)
                  }}
                >
                  {expand ? '收起' : '展开'}
                </a>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CSearchForm
