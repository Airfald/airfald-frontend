import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from '@src/layout/PrivateRoute'
import Root from '@src/layout/Root'
import Login from '@src/views/Login'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

import './App.scss';

const App: React.FC = () => {
  const routerRender = () => (
    <Router basename={'/'}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Root} />
        </Switch>
      </Suspense>
    </Router>
  )

  return (
    <ConfigProvider locale={zhCN}>
      {
        routerRender()
      }
    </ConfigProvider>
  );
}

export default App;
