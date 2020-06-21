import React, { useEffect, useContext } from 'react'
import Cart from "./Cart";
import CheckOut from './../comphonent/CheckOut'
import { Grid, useMediaQuery, Typography } from '@material-ui/core';
import AuthContext from './../context/AuthContext'
import CartContext from './../cartContext/CartContext'
import { useHistory } from 'react-router-dom'
const CratPage = (props) => {

    const { isUserAuthenticated, loadUser, user } = useContext(AuthContext);
    const { fetchCartDetails, cartLoading, cartDetails } = useContext(CartContext);
    const push = useHistory();
    useEffect(() => {

        fetchCartDetails();
        if (!isUserAuthenticated) {
            push.push("/");
        }
        loadUser();
    }, [isUserAuthenticated])


    return (
        <div style={{ width: '100%', minHeight: '100vh', background: 'pink', padding: '1px 1px' }}>

            <Typography variant="h6" display="block" gutterBottom style={{ width: useMediaQuery('(max-width:600px)') ? '100%' : '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
                Hey {user.name} this is Your cart summary
            </Typography>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                    width: useMediaQuery('(max-width:600px)') ? '100%' : '70%', marginLeft: 'auto', marginRight: 'auto',
                    boxShadow: '0 0 10px 2px black'
                }}
            >
                <Grid item xs="12" lg="8">
                    <Cart loading={cartLoading} cartDetail={cartDetails} />
                </Grid>
                <Grid item xs="12" lg="4">
                    <CheckOut loading={cartLoading} total={50} />
                </Grid>
            </Grid>
        </div>
    )
}

export default CratPage
