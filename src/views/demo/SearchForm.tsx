import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import { PaginationConfig } from 'antd/lib/pagination'
import CSearchForm from '../../components/common/CSearchForm'
import CPage from '../../components/common/CPage'
import { COMPONENT_TYPE } from '../../components/common/CSearchForm/types'
import useTableScrollY from '../../hooks/useTableScrollY'
import { GlobalContainer } from 'store'
import { getRoutePathByName, routeNames } from 'routes'

const SearchForm: React.FC = () => {
  const breadcrumb = [
    {
      label: '分销产品',
      url: getRoutePathByName(routeNames.demo)
    },
    {
      label: '分销产品',
      url: getRoutePathByName(routeNames.demo1)
    }
  ]

  const [searchData, setSearchData] = useState({})
  const { scrollY } = useTableScrollY()
  const [searchParams, setSearchParams] = useState<any>({
    current: 1,
    pageSize: 10
  })

  const { module1, setModule1, module2 } = GlobalContainer.useContainer()
  console.log(module1, module2)
  // error: Cannot update a component (`Provider`) while rendering a different component (`SearchForm`). To locate the bad setState() call inside `SearchForm`, follow the stack trace as described
  // setModule1('changeModule1')

  useEffect(() => {
    setModule1('changeModule1')
  }, [])

  const handleCustomChange = (value: string) => {
    setSearchData({ ...searchData, custom: value })
  }

  const handleSearchQuery = (searchObj: any) => {
    setSearchData({ ...searchData, ...searchObj })
  }

  const handleTableChange = (pagination: PaginationConfig) => {
    console.log(pagination)
    setSearchParams({ ...searchData, ...pagination })
  }

  const TestCompontent = (props: any) => {
    return (
      <button onClick={e => handleCustomChange('custome')}>
        test custom compontent
      </button>
    )
  }

  const formConfig = [
    {
      colSpan: 6,
      label: '分销产品名称',
      componentType: COMPONENT_TYPE.INPUT,
      placeholder: '请输入名称',
      fieldName: 'name'
    },
    {
      colSpan: 6,
      label: '分销产品名称',
      componentType: COMPONENT_TYPE.INPUT,
      placeholder: '请输入名称',
      fieldName: 'name1'
    },
    {
      colSpan: 6,
      label: '分销产品名称',
      componentType: COMPONENT_TYPE.INPUT,
      placeholder: '请输入名称',
      fieldName: 'name2'
    },
    {
      colSpan: 6,
      label: '分销产品名称',
      componentType: COMPONENT_TYPE.INPUT,
      placeholder: '请输入名称',
      fieldName: 'name3'
    },
    {
      colSpan: 6,
      label: '分销产品名称',
      componentType: COMPONENT_TYPE.INPUT,
      placeholder: '请输入名称',
      fieldName: 'name4'
    },
    {
      colSpan: 6,
      label: '分销产品名称',
      componentType: COMPONENT_TYPE.INPUT,
      placeholder: '请输入名称',
      fieldName: 'name5'
    },
    {
      colSpan: 6,
      label: '年级',
      componentType: COMPONENT_TYPE.SELECT,
      fieldName: 'grade',
      options: [
        {
          label: '四年级',
          value: '4'
        },
        {
          label: '5年级',
          value: '5'
        }
      ]
    },
    {
      colSpan: 6,
      label: '时间',
      fieldName: 'DATEPICKER',
      componentType: COMPONENT_TYPE.DATEPICKER
    },
    {
      colSpan: 6,
      label: '时间',
      fieldName: 'RANGEPIKCER',
      componentType: COMPONENT_TYPE.RANGEPIKCER
    },
    // https://www.jianshu.com/p/a2ef7d7031b9
    {
      colSpan: 6,
      label: '自定义组件',
      fieldName: 'testCustom',
      componentType: COMPONENT_TYPE.CUSTOM,
      component: TestCompontent
    }
  ]

  let columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Chinese Score',
      dataIndex: 'chinese'
    },
    {
      title: 'Math Score',
      dataIndex: 'math'
    },
    {
      title: 'English Score',
      dataIndex: 'english'
    }
  ]

  let data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    }
  ]

  for (let i = 2; i < 500; i++) {
    data.push({
      ...data[0],
      key: String(i + 1)
    })
  }

  return (
    <CPage breadcrumb={breadcrumb}>
      <CSearchForm
        formConfig={formConfig}
        onQuery={searchObj => handleSearchQuery(searchObj)}
        showExpand={true}
      />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: scrollY }}
        pagination={{
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          showSizeChanger: true,
          total: data.length
        }}
        onChange={handleTableChange}
      />
    </CPage>
  )
}

export default SearchForm
