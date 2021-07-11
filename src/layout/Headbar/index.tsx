import React from 'react'
import { Menu, Dropdown } from 'antd';
import {
  useHistory
} from 'react-router-dom'
import { routePaths } from '@src/routes'
import Storage from '@src/utils/storage'

import './index.scss'

const prefixCls = 'head-bar'

const Headbar: React.FC = function(props) {
  const history = useHistory()

  const logout = () => {
    Storage.clear()

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
