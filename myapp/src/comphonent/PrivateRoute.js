import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from './../context/AuthContext'
const PrivateRoute = ({ component: Component }, ...rest) => {

    const { isUserAuthenticated, loading } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                !isUserAuthenticated && !loading ? (
                    <Redirect to="/" />
                ) : (
                        <Component {...props} />
                    )

            }
        />
    )
}

export default PrivateRoute

