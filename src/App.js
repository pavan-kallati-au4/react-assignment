import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import EditProduct from './components/EditProduct/EditProduct';
import Header from './components/Header/Header';
import Products from './components/Products/Products';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>

          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/product-page">
            <EditProduct />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
