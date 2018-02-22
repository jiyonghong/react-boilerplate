import React from 'react';
import { Switch, Route } from 'react-router';

import routes from 'app/pages/routes';


class AppContainer extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map(route => (
          <Route
            key={`route-${route.name}`}
            {...route}
          />
        ))}
      </Switch>
    );
  }
}


export default AppContainer;
