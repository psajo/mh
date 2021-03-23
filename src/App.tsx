import 'antd/dist/antd.css';
import React from 'react';
import { Route } from 'react-router';
import Search from './search/container/Search';
import User from './user/container/User';

function App(): JSX.Element {
  return (
    <>
      <Route exact path="/" component={Search} />
      <Route path="/user/:name" component={User} />
    </>
  );
}

export default App;
