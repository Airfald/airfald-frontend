import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from '@src/layout/PrivateRoute'
import Root from '@src/layout/Root'

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
    routerRender()
  );
}

const Login = () => <div>'Login'</div>

export default App;
