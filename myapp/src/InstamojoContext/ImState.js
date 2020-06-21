import React, { useReducer } from 'react'
import ImContext from './ImContext'
import ImReducer from './ImReducer'
import credential from './../config/ImCredentials'
import axios from 'axios'
import {

    PAYMENT_REQUEST_CREATED_F,
    PAYMENT_REQUEST_CREATED_S,
    LOADING

} from './../Types'
const ImState = (props) => {

    const initialState = {

        paymentLoading: false,
        paymentRequestResult: null,
        iminfo: ""

    }

    const [state, dispatch] = useReducer(ImReducer, initialState)


    const createPaymentRequest = async (data) => {
        setImLoading();
        const config = {
            headers: {
                'X-Api-Key': credential["X-Auth-Key"],
                'X-Auth-Token': credential["X-Auth-Token"],
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                "content-type": "application/json"
            }
        }

        try {

            const res = await axios.post("/api/instamojo", { data, config }, {
                headers: {
                    'content-type': 'application/json'
                }
            });

            dispatch({
                type: PAYMENT_REQUEST_CREATED_S,
                payload: res.data
            })

            return res.data.payment_request.longurl
        } catch (error) {
            dispatch({
                type: PAYMENT_REQUEST_CREATED_F
            })
        }
        setImLoading();
    }
    const setImLoading = () => {
        dispatch({
            type: LOADING,
        })
    }

    return (
        <ImContext.Provider value={{
            paymentLoading: state.paymentLoading,
            paymentRequestResult: state.paymentRequestResult,
            iminfo: state.iminfo,
            createPaymentRequest,
            setImLoading,
        }}>
            {props.children}
        </ImContext.Provider>
    )
}

export default ImState



/*
            const res = await fetch("https://www.instamojo.com/api/1.1/payment-requests/", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors", // no-cors, *cors, same-origin
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    "X-Api-Key": "9d25ead2b811ff0361b7fe05b501fe54",
                    "X-Auth-Token": "5975cb9dc873581e9082adaaeb069e81",
                    "Access-Control-Allow-Origin": "*",
                },

                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })


*/
