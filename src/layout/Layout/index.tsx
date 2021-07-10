import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { Layout } from 'antd';
import routes, { routePaths } from '@src/routes'
import './index.scss'

const { Header, Sider, Content } = Layout;

const prefixCls = 'root-layout'

const Root: React.FC = () => {
  const currLocation =  useLocation();
  const history = useHistory();

  useEffect(() => {
    const route = routes.find(item => item.path.includes(currLocation.pathname))
    if (route) return

    history.replace(routePaths.notFound)
  }, [currLocation]);

  return (
    <Layout className={`${prefixCls}`}>
      <Header style={{ background: '#fff', display: 'flex', width: '100%', textAlign: 'center', padding: 0 }}>Header</Header>
      <Layout className={`${prefixCls}-sub-layout`}>
        <Sider width={180} style={{ background : 'red' }}>
          Sider
        </Sider>
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
