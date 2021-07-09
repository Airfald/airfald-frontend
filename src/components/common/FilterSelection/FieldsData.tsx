import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import { GlobalContainer } from 'store'
import { useResponsive } from 'hooks/useResponsive'
import { Select, Col, Form } from 'antd'
import { SearchBarCategorys, SearchBarCategory } from 'services/dict/typing'
import SearchSeletor from '../Filters/SearchSeletor'

const { Option } = Select

interface FieldsDataProps {
  ref?: any
  form: any
  colSpans?: {
    [key: string]: number
  }
  // 响应式断点
  responsiveMap?: {
    [key: string]: number
  }
  // 自定义响应式设置
  responsiveConfig?: {
    [key: string]: number
  }
  expand?: boolean
  // 要显示的筛选项
  renderSelections?: string[]
  // 是否显示展开更多按钮
  isShowExpandBtn?: boolean
}

const FieldsData: React.FC<FieldsDataProps> = forwardRef((props, ref) => {
  const defaultColSpans = { xs: 24, sm: 24, md: 12, lg: 6, xl: 3 }
  const defaultResponsiveMap = { xs: 5, sm: 5, md: 5, lg: 6, xl: 8 }
  const {
    form,
    expand = false,
    renderSelections,
    colSpans = defaultColSpans,
    responsiveMap = defaultResponsiveMap,
    isShowExpandBtn = true
  } = props

  const {
    dicts,
    classLevelDict,
    setDefaultFieldsValue,
    getClassLevelByClassTypeId
  } = GlobalContainer.useContainer()

  const responsive = useResponsive()
  const selectorRef = useRef(null)

  /**
   * 响应式地设置筛选项收起时的显示个数
   */
  const getResponsiveFieldNums = () => {
    let maxNums = responsiveMap.xs
    Object.keys(responsive).forEach(key => {
      if (responsive[key]) {
        maxNums = responsiveMap[key]
      }
    })
    return 6
  }
  /**
   * 选中select中默认options
   */
  const setInitialFormValue = (category: SearchBarCategory, type: string) => {
    const currentCategory = dicts?.find(el => el?.category === category)
    const currentCategoryDict = currentCategory?.dataDicts.find(
      (el: any) => el.selectFlag === true
    )
    form.setFieldsValue({ [type]: currentCategoryDict?.id })
    setDefaultFieldsValue({ [type]: currentCategoryDict?.id })
  }
  /**
   * 渲染单个筛选栏数据
   * @param category 单个筛选栏数据
   */
  const renderDictOptions = (category: SearchBarCategorys) => {
    let sourceData = null

    if (category === SearchBarCategorys.CLASS_LEVEL) {
      // 班级层次特殊处理
      sourceData = classLevelDict
    } else sourceData = dicts?.find(d => d.category === category)

    return sourceData?.dataDicts?.map((z: any) => {
      return (
        <Option key={z.id} value={z.id}>
          {z.name}
        </Option>
      )
    })
  }
  /**
   * 筛选栏数据配置
   */
  const getRenderFields = () => {
    return [
      {
        name: 'productName',
        type: 'search',
        colSpans,
        itemProps: {
          selectors: [
            {
              key: 'productName',
              cnName: '产品名称'
            }
          ]
        }
      },
      {
        name: 'productVersionId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '年份'
        },
        options: renderDictOptions(SearchBarCategorys.PRODUCT_VERSION)
      },
      {
        name: 'productCategory',
        type: 'select',
        style: { width: 200 },
        itemProps: {
          placeholder: '授课方式'
        },
        options: [
          <Option key="MINI_CLASS" value="MINI_CLASS">
            面授小班
          </Option>,
          <Option key="ONLINE_CLASS" value="ONLINE_CLASS">
            本地网课
          </Option>
        ]
      },

      {
        name: 'productQuarterId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '季度'
        },
        options: renderDictOptions(SearchBarCategorys.PRODUCT_QUARTER)
      },
      {
        name: 'gradeId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '年级'
        },
        options: renderDictOptions(SearchBarCategorys.STUDENT_GRADE)
      },
      {
        name: 'subjectId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '科目'
        },
        options: renderDictOptions(SearchBarCategorys.SUBJECT)
      },
      {
        name: 'courseSeriesId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '产品系列'
        },
        options: renderDictOptions(SearchBarCategorys.COURSE_SERIES)
      },
      {
        name: 'classTypeId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '班级类型',
          onChange: (id: string) => {
            if (id) getClassLevelByClassTypeId({ id })
            form.resetFields(['classLevelId'])
          }
        },
        options: renderDictOptions(SearchBarCategorys.CLASS_TYPE)
      },
      {
        name: 'classLevelId',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '班级层次'
        },
        options: renderDictOptions(SearchBarCategorys.CLASS_LEVEL)
      },
      {
        name: 'enrollLimitCase',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '报读限制'
        },
        options: renderDictOptions(SearchBarCategorys.ENROLL_LIMIT_CASE)
      },
      {
        name: 'delayEnrollCase',
        type: 'select',
        colSpans,
        itemProps: {
          placeholder: '插班限制'
        },
        options: renderDictOptions(SearchBarCategorys.DELAY_ENROLL_CASE)
      }
    ]
  }
  /**
   * 渲染筛选栏数据
   */
  const renderFields = () => {
    const fields = getRenderFields()
    const fieldsLength =
      expand || !isShowExpandBtn ? fields?.length : getResponsiveFieldNums()
    return fields?.slice(0, fieldsLength).map((item, index) => {
      if (
        renderSelections &&
        renderSelections.length > 0 &&
        !renderSelections.includes(item.name)
      ) {
        return null
      }
      // if (item.type === 'filter') {
      //   return (
      //     <Col {...item.colSpans} key={index}>
      //       {item.component}
      //     </Col>
      //   )
      // }

      if (item.type === 'select') {
        return (
          <Col {...item.colSpans} key={index}>
            <Form.Item name={item.name} noStyle>
              <Select allowClear {...item.itemProps} style={{ width: '100%' }}>
                {item.options}
              </Select>
            </Form.Item>
          </Col>
        )
      }

      if (item.type === 'search') {
        return (
          <Col {...item.colSpans} key={index}>
            <SearchSeletor
              id="defaultSearchSeletor"
              form={form}
              ref={selectorRef}
              {...item.itemProps}
            />
          </Col>
        )
      }

      if (item.type === 'selectSearch') {
        return (
          <Col {...item.colSpans} key={index}>
            <Form.Item name={item.name} noStyle>
              <Select
                allowClear
                showSearch
                filterOption={false}
                defaultActiveFirstOption={false}
                notFoundContent={null}
                getPopupContainer={(trigger: HTMLElement) =>
                  trigger.parentNode as HTMLElement
                }
                style={{ width: '100%' }}
                {...item.itemProps}
              >
                {item.options}
              </Select>
            </Form.Item>
          </Col>
        )
      }
    })
  }

  /**
   * 父级调用
   */
  useImperativeHandle(ref, () => ({
    // 重置表格
    resetFields: () => {
      form.resetFields()
      // @ts-ignore
      selectorRef.current.reset()
      setInitialFormValue(
        SearchBarCategorys.PRODUCT_VERSION,
        'productVersionId'
      )
    },
    //  获取默认选中的年份值
    getDefaultYear: () => {
      return form.getFieldsValue()
    }
  }))

  useEffect(() => {
    setInitialFormValue(SearchBarCategorys.PRODUCT_VERSION, 'productVersionId')
  }, [dicts])

  return <>{renderFields()}</>
})

export default FieldsData
