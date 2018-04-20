import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import ResourcesIndex from '../resources_index/resources_index';
import ResourcesShow from '../resources_show/resources_show';

class AppRouter extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ResourcesIndex} />
          <Route path="/resources/:id" component={ResourcesShow} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(AppRouter);