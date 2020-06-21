import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './../comphonent/PrivateRoute'
import CratPage from './CratPage'
import ProductInfoPage from './ProductInfoPage'
import ProductPage from './ProductPage'
import Sidebar from './../comphonent/Sidebar'
const HomePage = () => {
    return (


        <Router>
            <Fragment>

                <Sidebar />
                <ProductPage />
                <Switch>
                    <PrivateRoute exact path="/cart" component={CratPage} />
                    <Route exact path="/sidebar" component={Sidebar} />
                    <Route exact path="/productinfopage" component={ProductInfoPage} />

                </Switch>
            </Fragment>
        </Router>







    );
}

export default HomePage;
