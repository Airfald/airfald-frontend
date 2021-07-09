import React, { useEffect } from 'react'
import { Input, DatePicker, Form } from 'antd'
import { FormInstance } from 'antd/lib/form'

import moment from 'moment'

const { RangePicker } = DatePicker

function formatDate(timestamp: number | string | any, rule?: string): any {
  return moment(timestamp).format(rule || 'YYYY.M.D HH:mm:ss')
}

interface RangeDateFilterProps {
  form: FormInstance
  name: string
  formItemProps?: object
  initBeginDate: any
  initEndDate: any
  beginDateName: string
  endDateName: string
  formatRule?: string
  rangePickerProps?: object
}
const RangeDateFilter: React.FC<RangeDateFilterProps> = props => {
  const {
    form,
    name,
    formItemProps = {},
    initBeginDate,
    initEndDate,
    beginDateName,
    endDateName,
    formatRule = 'YYYY-MM-DD HH:mm:ss',
    rangePickerProps = {}
  } = props

  const initTime = [moment(initBeginDate), moment(initEndDate)]

  // 根据RangePicker的值，设置beginDateName和endDateName的值
  const onRangePickerChange = (dates, dateStrings) => {
    form.setFieldsValue({ [beginDateName]: dateStrings[0] || undefined })
    form.setFieldsValue({ [endDateName]: dateStrings[1] || undefined })
  }

  // 根据beginDateName和endDateName的value，设置RangePicker的值
  useEffect(() => {
    const setValue = () => {
      const beginValue = form.getFieldValue(beginDateName)
      const endValue = form.getFieldValue(endDateName)

      form.setFieldsValue({
        [name]: [
          beginValue ? moment(beginValue) : undefined,
          endValue ? moment(endValue) : undefined
        ]
      })
    }

    setValue()

    const timer = setTimeout(() => {
      setValue()
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [form.getFieldValue(beginDateName), form.getFieldValue(endDateName), form])

  return (
    <React.Fragment>
      <Form.Item name={name} noStyle initialValue={initTime} {...formItemProps}>
        <RangePicker
          showTime
          format={formatRule}
          style={{ width: '100%' }}
          onChange={onRangePickerChange}
          {...rangePickerProps}
        />
      </Form.Item>
      <Form.Item
        name={beginDateName}
        initialValue={formatDate(initTime[0], formatRule)}
        hidden={true}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name={endDateName}
        initialValue={formatDate(initTime[1], formatRule)}
        hidden={true}
      >
        <Input type="text" />
      </Form.Item>
    </React.Fragment>
  )
}

export default RangeDateFilter
