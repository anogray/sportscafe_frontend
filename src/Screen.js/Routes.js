import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import HomeScreen from './HomeScreen';
import PostScreen from './PostScreen';

const Main = () => {
    return ( 
        <BrowserRouter>
        <Switch>
          <Route  path="/all"  component={HomeScreen} />
          <Route path="/article/:id" component = {PostScreen} />
          {/* <Route path="/register" component={RegisterScreen} />
          <Route path="/products" component={ProductsScreen} /> */}
          
        </Switch>
        </BrowserRouter>

     );
}
 
export default Main;