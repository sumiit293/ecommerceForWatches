import React, { Fragment, useEffect, useContext, useRef } from 'react'
import AuthContext from './../context/AuthContext'
import CartContext from './../cartContext/CartContext'
import ImContext from './../InstamojoContext/ImContext'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom'
const NewCartPages = (props) => {

    const { isUserAuthenticated, user } = useContext(AuthContext);
    const { fetchCartDetails, cartLoading, cartDetails, removeFromCart, placeOrder } = useContext(CartContext);
    const { createPaymentRequest, paymentRequestResult, setImLoading } = useContext(ImContext);

    const push = useHistory();

    //getting the total price of item in cart
    const subTotal = (cartDetails) => {
        var total = 0;
        cartDetails.map(product => total += product.productPrice);
        return total;
    }
    // for saving the order to database
    const data = {
        totalSum: subTotal(cartDetails),
        orderDetails: cartDetails
    }

    //for making the payment request to instamoji
    const paymentData = {
        purpose: 'Payment To TNT',
        amount: subTotal(cartDetails).toString(),
        phone: user.phone,
        buyer_name: user.name,
        redirect_url: 'https://rocky-caverns-34732.herokuapp.com/cart',
        send_email: true,
        send_sms: true,
        email: user.email,
        allow_repeated_payments: false
    }

    //function for placing the order
    const order = () => {
        createPaymentRequest(paymentData);
        if (paymentRequestResult.longurl) {
            push.push(paymentRequestResult.longurl)
        }

        // placeOrder(data);
    }

    const productId = useRef();

    // function for deleting the cart item
    const deleteFromCart = (e) => {
        removeFromCart(e.target.id);
    }

    useEffect(() => {
        console.log(isUserAuthenticated);
        fetchCartDetails();
        if (props.location.search.payment_status) {
            console.log(props.location.search.payment_status)
            console.log(props.location.search.payment_id)
            //     console.log(props.location.query.payment_request_id)
        }

    }, [isUserAuthenticated])

    // image path for acces the product image
    const target = process.env.PUBLIC_URL + "/images/"
    return (

        <Fragment>
            <div style={style}>
                <div><h3>{user.name}</h3></div>
                <div> <ShoppingCartIcon style={{ width: '50px', height: '50px', margin: '1px auto', display: 'block' }} /></div>
            </div>
            {cartLoading && <div style={styleInfo}><CircularProgress style={{ margin: '1px auto' }} /></div>}
            {(!cartLoading && cartDetails !== null && cartDetails.length !== 0) && cartDetails.map(product => <div style={styleInfo}
                key={product.productId}>
                <div><img src={target + product.imagePath} alt="No image" style={{ width: '50px', height: '50px', borderRadius: '10px' }} /></div>
                <div><p>{product.productName}</p></div>
                <div><p>{product.productPrice}</p></div>
                <div><i class="fa fa-trash-o" onClick={deleteFromCart} id={product.productId} /></div>
            </div>)}
            {(!cartLoading && cartDetails !== null && cartDetails.length !== 0) && (<div style={styleInfo}>
                <div><h2>Sub-total</h2></div>
                <div><h3>{subTotal(cartDetails).toString()}</h3></div>
            </div>)}
            {(!cartLoading && cartDetails.length === 0) && (<div style={styleInfo}>
                <div><h2>Nothing in cart</h2></div>

            </div>)}
            {(!cartLoading && cartDetails !== null && cartDetails.length !== 0) && (<div style={styleInfo}>

                <Button size="small" variant="contained" color="primary" style={btnStyle} onClick={order}>Place Order</Button>
            </div>)}

        </Fragment>

    )
}

export default NewCartPages
const style = {

    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid black',
    margin: '20px auto 5px auto'

}
const styleInfo = {

    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px auto',
    padding: "10px 5px",
    backgroundColor: '#eeee',

}
const btnStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1px auto',
    width: '100%'

}

