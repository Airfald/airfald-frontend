import {
  AppstoreOutlined,
  HomeOutlined
} from '@ant-design/icons';
import React from 'react'

export interface IMenu {
  id: string,
  name: string,
  path?: string,
  icon?: React.ReactNode,
  children?: IMenu[]
}

const menuConfig: IMenu[] = [
  {
    id: 'Dashboard',
    name: 'Dashboard',
    path: '/home',
    // 要把文件改为tsx才能这样声明对象
    icon: <HomeOutlined />
  },
  {
    id: 'Tools',
    name: 'Tools',
    icon: <AppstoreOutlined />,
    children: [
      {
        id: 'demo',
        name: 'demo',
        path: '/demo'
      },
      {
        id: 'Tools1',
        name: 'Tools1',
        path: '/tools'
      }
    ]
  }
]

export default menuConfig
