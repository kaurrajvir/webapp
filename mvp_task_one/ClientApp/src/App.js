import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import './custom.css'
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Customer } from './components/Customer';
import { Product } from './components/Product';
import { Store } from './components/Store';
import { Sales } from './components/Sales';

export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/Customer' component={Customer} />
        <Route path='/Product' component={Product} />
        <Route path='/Store' component={Store} />
        <Route path='/Sales' component={Sales} />
      </Layout>
    );
  }
}
