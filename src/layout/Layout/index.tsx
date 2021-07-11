import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Layout } from 'antd';
import routes, { routePaths } from '@src/routes'
import SideMenu from '../SideMenu'
import Headbar from '../Headbar'

import './index.scss'

const { Header, Sider, Content } = Layout;

const prefixCls = 'root-layout'

const Root: React.FC = () => {
  const currLocation =  useLocation();
  const history = useHistory();

  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false)

  const toggleCollapsed = () => {
    setSiderCollapsed(!siderCollapsed)
  };

  useEffect(() => {
    const route = routes.find(item => item.path.includes(currLocation.pathname))
    if (route) return

    history.replace(routePaths.notFound)
  }, [currLocation]);

  return (
    <Layout className={`${prefixCls}`}>
      <Sider
        trigger={null}
        collapsible
        defaultCollapsed
        collapsedWidth={80}
        collapsed={siderCollapsed}
        width={180}
      >
        <SideMenu
          collapsed={siderCollapsed}
          toggleCollapsed={toggleCollapsed}
        >
        </SideMenu>
      </Sider>
      <Layout className={`${prefixCls}-sub-layout`}>
        <Headbar />
        <Content style={{ margin: '24px 16px 0' }}>
          <Switch>
            {routes.map((route: any, index) => (
              <Route
                key={`${route.id}-${index}`}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Root
