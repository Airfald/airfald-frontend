import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'
import routes, { routeNames, getRoutePathByName } from '@src/routes'

const Root: React.FC = () => {
  console.log('进入 root layout')

  const currLocation =  useLocation();
  const history = useHistory();

  useEffect(() => {
    console.log(currLocation)

    const route = routes.find(item => item.path.includes(currLocation.path))
    if (route) return

    // history.replace(routeNames.notFound)
  }, [currLocation]);

  return (
    <div className={'rootLayout'}>
      root layout
      <Switch>
        {routes.map((route: any, index) => (
          <Route
            key={`${route.id}-${index}`}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  )
}

export default Root
