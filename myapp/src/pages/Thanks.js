import React, { Fragment, useContext, useEffect } from 'react'
import CartContext from './../cartContext/CartContext'
import CircularProgress from '@material-ui/core/CircularProgress';


const Thanks = () => {

    const { placeOrder, cartDetails, fetchCartDetails } = useContext(CartContext);
    const params = new URLSearchParams(window.location.search);


    //getting the total price of item in cart
    const grandTotal = (cartDetails) => {
        var total = 0;
        cartDetails.map(product => total += product.productPrice);
        return ((total * 103) / 100 + 3)
    }
    const completeOrder = () => {

        if (params.has("payment_status")) {


            if (params.get("payment_status") === "Credit") {
                // for saving the order to database
                const data = {
                    totalSum: grandTotal(cartDetails),
                    orderDetails: cartDetails,
                    paymentId: params.get("payment_id")
                }

                placeOrder(data);
                window.location.replace("https://rocky-caverns-34732.herokuapp.com/profile");
            }

        } else {
            alert("Can't complete order");
            window.location.replace("https://rocky-caverns-34732.herokuapp.com/");
        }
    }

    useEffect(() => {
        fetchCartDetails();

        //eslint-disable-next-line
    }, [])
    return (
        <Fragment>
            <div style={bannerStyle}>
                <div style={notesStyle}>
                    <h1> Thank You ! For choosing us</h1>
                    {(params.get("payment_status") === "Credit") ? <h2>Your payment was sucessful</h2> : <h2>Your payment failed</h2>}
                </div>
            </div>
            <div style={{ height: '200px', position: 'relative' }}>
                {(cartDetails.length !== 0) ? <div style={notesStyle}>
                    {(params.get("payment_status") === "Credit") ?
                        <button style={button} onClick={completeOrder}>complete your order {'>'} </button>
                        : <button style={button} onClick={completeOrder}>Return to home page {'>'} </button>}
                </div> : <div style={notesStyle}><CircularProgress /></div>}
            </div>
        </Fragment>
    )
}

export default Thanks

const bannerStyle = {

    background: "blue",
    width: '100%',
    height: '300px',
    fontFamily: 'Merienda One , cursive',
    color: 'white',
    position: 'relative'

}
const notesStyle = {

    width: '60%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    textAlign: 'center',

}
const button = {
    height: '70px',
    width: '300px',
    backgroundImage: 'linear-gradient(to top, blue , brown)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '20px',
    fontFamily: 'Merienda One , cursive',
    outline: 'none',
    cursor: 'pointer'
}