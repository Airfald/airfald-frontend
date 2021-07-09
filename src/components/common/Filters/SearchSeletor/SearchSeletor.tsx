import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback
} from 'react'
import { FormInstance } from 'antd/lib/form'
import { Form, Select, Input } from 'antd'

const { Option } = Select

// -------支持动态切换筛选类型的输入框----------

interface SearchSeletorProps {
  // 该组件的唯一ID
  id: string
  ref: any
  form: FormInstance
  // 输入框值变化或者option变化时的回调
  onChange?: (value) => void
  // 选择器的option项
  selectors?: {
    key: string
    cnName: string
    inputProps?: object
  }[]
}

const idPrefix = '__'

const SearchSeletor: React.FC<SearchSeletorProps> = forwardRef((props, ref) => {
  const { id, selectors, onChange, form, ...otherProps } = props

  const [selectOption, setSelectOption] = useState<any>({
    key: selectors[0].key,
    cnName: selectors[0].cnName,
    inputProps: selectors[0].inputProps || {}
  })

  const triggerChange = useCallback(
    v => {
      // eslint-disable-next-line no-unused-expressions
      typeof onChange === 'function' && onChange({ [v.key]: v.value })
    },
    [onChange]
  )

  /**
   * 父级调用
   */
  useImperativeHandle(ref, () => ({
    // 重置表格
    reset: () => {
      setSelectOption({
        key: selectors[0].key,
        cnName: selectors[0].cnName,
        inputProps: selectors[0].inputProps || {}
      })
    }
  }))

  useEffect(() => {
    const value = form.getFieldValue(`${idPrefix}${id}`)
    if (value) {
      const selectValue = selectors.find(item => item.key === value)
      setSelectOption({
        key: value,
        cnName: selectValue?.cnName || '',
        inputProps: selectValue?.inputProps || {}
      })
    }
  }, [form.getFieldValue(`${idPrefix}${id}`)])

  return (
    <React.Fragment>
      <Form.Item noStyle name={selectOption.key} {...otherProps}>
        <Input
          type="text"
          allowClear
          onChange={e => {
            triggerChange({
              key: selectOption.key,
              value: e.target.value
            })
          }}
          placeholder={`请输入${selectOption.cnName}`}
          addonBefore={
            selectors.length > 1 ? (
              <Select
                placeholder={selectOption.cnName}
                value={selectOption.key}
                onChange={(value, item: any) => {
                  setSelectOption({
                    key: item.value,
                    cnName: item.children,
                    inputProps: item.inputProps || {}
                  })
                  form.setFieldsValue({ [`${idPrefix}${id}`]: item.value })
                }}
              >
                {selectors?.map(el => {
                  return (
                    <Option key={el.key} value={el.key}>
                      {el.cnName}
                    </Option>
                  )
                })}
              </Select>
            ) : null
          }
          {...selectOption.inputProps}
        />
      </Form.Item>
      {/* 隐藏的Form，用于同步addonBefore的Select数据用 */}
      <Form.Item
        initialValue={selectOption.key}
        name={`${idPrefix}${id}`}
        hidden={true}
      >
        <Input type="text" />
      </Form.Item>
    </React.Fragment>
  )
})

export default SearchSeletor
