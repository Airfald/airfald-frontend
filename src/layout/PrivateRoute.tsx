import React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { stringify } from 'querystringify'

const isAuthenticated = true

const PrivateRoute: React.FC<RouteProps> = function({
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          Component && <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              search: stringify({ from: '/' }, true)
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
