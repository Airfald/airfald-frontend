import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react'
import classNames from 'classnames'
import { Form, Button, Col, Row } from 'antd'
import { GlobalContainer } from 'store'
import { store } from '@ice/stark-data'
// import { store } from 'ice'

import { UpOutlined, DownOutlined } from '@ant-design/icons'
import FieldsData from './FieldsData'
import styles from './styles.module.scss'

interface FilterSectionProps {
  className?: string
  ref?: any
  onQuery: Function
  renderSelections?: string[] // 要显示的筛选项
  responsiveMap?: {
    [key: string]: number
  }
  colSpans?: {
    [key: string]: number
  }
  isShowExpandBtn?: boolean // 是否显示展开收起按钮
}

const FilterSection: React.FC<FilterSectionProps> = forwardRef((props, ref) => {
  const {
    onQuery,
    renderSelections,
    responsiveMap,
    colSpans,
    isShowExpandBtn = true,
    className = ''
  } = props
  const [form] = Form.useForm()
  const [expand, setExpand] = useState<boolean>(false)
  const fieldRef = useRef(null)
  // const { userinfo } = store.getModelState('user')
  // const userinfo = storage.get('userinfo')
  const branchId = store.get('branchId')
  const { dicts, getDicts } = GlobalContainer.useContainer()
  // const dispatcher = store.getModelDispatchers('filter')

  useImperativeHandle(ref, () => ({
    setFields: (fields: any) => form.setFields(fields)
  }))

  /**
   * 根据筛选条件刷新班级列表
   * @param query 筛选条件
   */
  const onFinish = (query: any) => {
    // 去除搜索关键词中的空格
    const trimQuery = {}
    Object.keys(query).forEach(key => {
      if (query[key] && typeof query[key] === 'string')
        trimQuery[key] = query[key]?.trim()
      else trimQuery[key] = query[key]
    })
    onQuery(trimQuery)
  }

  useEffect(() => {
    if (dicts.length <= 0) {
      getDicts()
    }
  }, [])
  return (
    <div
      className={classNames({
        [styles.formContainer]: true,
        [className]: true
      })}
    >
      <Form onFinish={onFinish} form={form}>
        <Row gutter={[8, 8]}>
          <FieldsData
            ref={fieldRef}
            form={form}
            expand={expand}
            renderSelections={renderSelections}
            colSpans={colSpans}
            responsiveMap={responsiveMap}
            isShowExpandBtn={isShowExpandBtn}
          />

          <Col
            className={styles.btnContainer}
            xs={24}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            order={20}
          >
            <Button className={styles.btn} type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              className={styles.btn}
              onClick={() => {
                fieldRef.current.resetFields(false)
                const res = fieldRef.current.getDefaultYear()
                onFinish(res)
                // onQuery()
              }}
            >
              重置
            </Button>
            {isShowExpandBtn && (
              <Button
                type="link"
                className={classNames({
                  [styles.btn]: true,
                  [styles.expandBtn]: true
                })}
                onClick={() => {
                  setExpand(!expand)
                }}
                style={{ color: '#5b4eff' }}
              >
                {expand ? (
                  <>
                    收起
                    <UpOutlined className={styles.icon} width="12" />
                  </>
                ) : (
                  <>
                    更多
                    <DownOutlined className={styles.icon} width="12" />
                  </>
                )}
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  )
})

export default FilterSection
