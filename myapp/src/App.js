import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import PrivateRoute from './comphonent/PrivateRoute'
import './App/main.css';
import AuthState from './context/AuthState'
import CartState from './cartContext/CartState'
import ProductInfoPage from './pages/ProductInfoPage'
import Appbar from './comphonent/Appbar'
import ProductPage from './pages/ProductPage'
import Sidebar from './comphonent/Sidebar'
import Profile from './pages/Profile'
import About from './pages/About'
import NewCartPages from './pages/NewCartPages';
import ImState from './InstamojoContext/ImState';
import Thanks from './pages/Thanks'

const App = () => {
  return (

    <AuthState>
      <CartState>
        <ImState>
          <Router>
            <Fragment>
              <Appbar />
              <Sidebar />
              <Switch>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/" component={ProductPage} />
                <Route exact path="/about" component={About} />
                <Route exact path="/thanks" component={Thanks} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/cart" component={NewCartPages} />
                <PrivateRoute exact path="/productinfopage" component={ProductInfoPage} />
                <Redirect to="/" />

              </Switch>
            </Fragment>
          </Router>
        </ImState>
      </CartState>
    </AuthState>






  );
}

export default App;
