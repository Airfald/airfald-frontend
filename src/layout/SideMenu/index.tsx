import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { Menu, Icon } from 'antd'
import { RootContainer } from '../container'
import styles from './index.module.css'
import { ISubMenu, PermissionType } from 'services/permission/types'
import homeRoute from 'views/home/route'
import { treasureBoxHomePath } from 'views/new-media/routes'
import qs from 'querystringify'

const { SubMenu } = Menu
const externalPath = '/external/page'
// home 首页
// carry-out 营销活动
// sound 讲座管理
// shake  营销工具
// message 微信工具
// up-square 进群宝
// file-text 订单管理
// laptop 资源中心
// control 公众号管理
// code 权限管理
// setting 系统设置

const homeMenu: ISubMenu = {
  category: PermissionType.Menu,
  children: [],
  id: -1,
  level: 1,
  name: '新媒体工作台',
  parentId: 0,
  path: homeRoute.path,
  permissionOrder: 0,
  url: '/dashboard',
  iconName: 'home'
}

const newMedia: ISubMenu = {
  category: PermissionType.Menu,
  children: [],
  id: -2,
  level: 1,
  name: '新媒体百宝箱',
  parentId: 0,
  path: treasureBoxHomePath,
  permissionOrder: 0,
  url: '/new-media/treasureBoxHome',
  iconName: 'appstore'
}

interface ISideMenuProps extends RouteComponentProps {
  collapsed: boolean
}

const SideMenu: React.FC<ISideMenuProps> = function(props) {
  const { collapsed, history, location } = props
  const searchObj = qs.parse(props.location.search) as any

  const {
    permissionList: { permissionList }
  } = RootContainer.useContainer()

  let menus = [homeMenu, ...permissionList.menus]
  // 新媒体百宝箱
  const key = '/new-media/treasureBoxHome'
  let showNewMedia = permissionList.pageFeatMap[key]
  if (showNewMedia) {
    menus = [homeMenu, newMedia, ...permissionList.menus]
  }

  const [defaultDefaultSelectedKeys, setDefaultDefaultSelectedKeys] = useState<
    string[]
  >([])
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([])

  const handleMenuItemClick = (menuItem: any) => {
    const { path, params, isInline } = menuItem

    if (!path) return

    const searchString = params ? `?${qs.stringify(params)}` : ''

    const regexp = /^((https|http):\/\/)\.*/
    if (regexp.test(path) && isInline) {
      const searchStr = `?url=${path}&${qs.stringify(params)}`
      history.push(`${externalPath}${searchStr}`)
    } else if (regexp.test(path)) {
      window.open(`${path}${searchString}`)
    } else {
      history.push(`${path}${searchString}`)
    }
  }

  const getDefaultDefaultSelectedKeys = (menus: any[]) => {
    for (let i = 0, len = menus.length; i < len; i++) {
      const menuItem = menus[i]
      let locaPathname = location.pathname
      // todo simple handle fans page menus selected apply
      if (location.pathname === '/task-helper/fanslist') {
        locaPathname = '/task-helper/list'
      }
      if (
        menuItem.path === locaPathname ||
        (searchObj.url && menuItem.path === searchObj.url)
      ) {
        setDefaultDefaultSelectedKeys([String(menuItem.id)])
        setDefaultOpenKeys([String(menuItem.parentId)])
        return
      }

      if (menuItem.children && menuItem.children.length) {
        getDefaultDefaultSelectedKeys(menuItem.children)
      }
    }
  }

  useEffect(() => {
    getDefaultDefaultSelectedKeys(menus)
  }, [])

  useEffect(() => {
    if (location.pathname === homeRoute.path || location.pathname === '/') {
      setDefaultDefaultSelectedKeys([String(homeMenu.id)])
    } else {
      getDefaultDefaultSelectedKeys(menus)
    }
  }, [history.location])

  const MenuItemRender = (menus: any[]) => {
    return menus.map((menuItem, index) => {
      if (menuItem.children && menuItem.children.length > 0) {
        return (
          <SubMenu
            key={menuItem.id}
            title={
              <span>
                {menuItem.category === PermissionType.Menu && (
                  <Icon type={menuItem.iconName || 'layout'} />
                )}
                <span>{menuItem.name}</span>
              </span>
            }
          >
            {MenuItemRender(menuItem.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item
            key={menuItem.id}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            <span>
              {menuItem.category === PermissionType.Menu &&
                menuItem.iconName && (
                  <Icon type={menuItem.iconName || 'layout'} />
                )}
              <span>{menuItem.name}</span>
            </span>
          </Menu.Item>
        )
      }
    })
  }

  return (
    <div
      className={classNames({
        [styles.menu]: true,
        [styles.menuCollapsed]: collapsed
      })}
    >
      {
        <Menu
          mode="inline"
          defaultSelectedKeys={defaultDefaultSelectedKeys}
          selectedKeys={defaultDefaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
        >
          {MenuItemRender(menus)}
        </Menu>
      }
    </div>
  )
}

export default withRouter(SideMenu)
