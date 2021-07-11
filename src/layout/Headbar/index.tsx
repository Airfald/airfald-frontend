import React from 'react'
import { Menu, Dropdown } from 'antd';
import {
  useHistory
} from 'react-router-dom'
import { routePaths } from '@src/routes'
import './index.scss'

const prefixCls = 'head-bar'

const Headbar: React.FC = function(props) {
  const history = useHistory()

  const logout = () => {
    history.replace(routePaths.login)
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <span onClick={logout}>logout</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={`${prefixCls}`}>
      <Dropdown overlay={menu} arrow={true}>
        <div className={`${prefixCls}-name`}>
          airfald
        </div>
      </Dropdown>
    </div>
  )
}

export default Headbar
