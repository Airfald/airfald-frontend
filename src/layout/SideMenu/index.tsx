import { Menu, Button } from 'antd';
import React, { useState } from 'react';
import menuConfig, { IMenu } from './menu-config'
import {
  useHistory
} from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import './index.scss'

const { SubMenu } = Menu;

const prefixCls = 'side-menu'

interface IProps {
  collapsed: boolean
  toggleCollapsed: () => void
}

const SideMenu: React.FC<IProps> = (props: IProps) => {
  const { collapsed, toggleCollapsed } = props
  const history = useHistory()

  const handleMenuItemClick = (menuItem: IMenu) => {
    const { path } = menuItem

    history.push(`${path}`)
  }

  const menuItemRender = (menus: IMenu[]) => {
    return menus.map((menuItem) => {
      const icon = menuItem.icon || null

      if (menuItem.children && menuItem.children.length > 0) {
        return (
          <SubMenu
            key={menuItem.id}
            title={<span>{menuItem.name}</span>}
            icon={icon}
          >
            {menuItemRender(menuItem.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item
            key={menuItem.id}
            onClick={() => handleMenuItemClick(menuItem)}
            icon={icon}
          >
            <span>{menuItem.name}</span>
          </Menu.Item>
        )
      }
    })
  }

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-logo`}>
        {
          !collapsed ? 'airfald-web' : ''
        }
      </div>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {menuItemRender(menuConfig || [])}
      </Menu>
      <div className={`${prefixCls}-collapsed`}>
        <Button
          type={'primary'}
          onClick={toggleCollapsed}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      </div>
    </div>
  );
}

export default SideMenu
