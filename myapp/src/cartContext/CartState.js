import React, { useReducer } from 'react'
import CartContext from './CartContext'
import CartReducer from './CartReducer'
import axios from 'axios'
import {
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    ORDER_SUCCESS,
    ORDER_FAILED,
    REMOVE_FROM_CART_S,
    REMOVE_FROM_CART_F,
    LOADING,
    CART_DETAILS_FETCHED,
    CART_DETAILS_NOT_FETCHED,
    ORDER_DETAILS_FETCHED,
    ORDER_DETAILS_NOT_FETCHED,
    REMOVE_ALERT,
    CLEAR_CART
} from '../Types'

const CartState = (props) => {

    const initialState = {
        cartLoading: false,
        cartDetails: [],
        recentOrders: [],
        info: null
    }

    const [state, dispatch] = useReducer(CartReducer, initialState);

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    //function for getting the cart details
    const fetchCartDetails = async () => {
        setCartLoading();
        try {

            const res = await axios.get("api/cart/cartinfo", config);
            dispatch({
                type: CART_DETAILS_FETCHED,
                payload: res.data
            })
        } catch (error) {

            dispatch({
                type: CART_DETAILS_NOT_FETCHED,
                payload: error.response.msg
            })
        }
        setCartLoading();
    }

    // function for adding to cart
    const addToCart = async (data) => {

        try {

            const res = await axios.post('api/cart/', data, config);
            dispatch({
                type: ADD_TO_CART_SUCCESS,
                payload: res.data
            })
        } catch (error) {

            if (error.response) {
                console.log(error.response.msg);
                dispatch({
                    type: ADD_TO_CART_FAIL,
                    payload: error.response.msg
                })
            }
        }
        clearInfo();
    }

    //function for removing from cart
    const removeFromCart = async (productId) => {
        try {

            await axios.delete(`api/cart/remove/${productId}`, config);
            dispatch({
                type: REMOVE_FROM_CART_S,
                payload: productId
            })
        } catch (error) {

            if (error.response) {
                console.log(error.response.msg);
            }
            dispatch({
                type: REMOVE_FROM_CART_F,
                payload: "something went wrong"
            })
        }
    }

    const clearInfo = () => {
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT
            })
        }, 2000)
    }
    //function for placing the order
    const placeOrder = async (data) => {
        console.log(data)
        try {
            await axios.post("/api/cart/order", data, config);
            dispatch({
                type: ORDER_SUCCESS,
                payload: "Order success"
            })

            clearCart();
        } catch (error) {
            dispatch({
                type: ORDER_FAILED,
            })
        }
    }
    //function for checking orders in db
    const orderInfo = async () => {
        try {
            const res = await axios.get("/api/cart/orderinfo", config);
            dispatch({
                type: ORDER_DETAILS_FETCHED,
                payload: res.data
            })
        } catch (error) {

            dispatch({
                type: ORDER_DETAILS_NOT_FETCHED,
                payload: "Could not get any things in cart"
            })
        }
    }
    //function for clearing the cart

    const clearCart = async () => {
        try {
            await axios.delete("/api/cart/clear");
            dispatch({
                type: CLEAR_CART,

            })
        } catch (error) {

            console.log(error);
        }
    }
    //fucntion for loading
    const setCartLoading = () => {
        dispatch({
            type: LOADING
        })
    }



    return (
        <CartContext.Provider value={{
            cartLoading: state.cartLoading,
            cartDetails: state.cartDetails,
            order: state.order,
            info: state.info,
            recentOrders: state.recentOrders,
            fetchCartDetails,
            addToCart,
            removeFromCart,
            placeOrder,
            orderInfo
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState
