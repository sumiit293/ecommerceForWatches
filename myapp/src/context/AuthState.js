import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import { setAuthToken } from './../Utils'
import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    USER_LOADING_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOADING,
    SET_ALERT,
    REMOVE_ALERT,
    LOGOUT,
    LOAD_USER_DETAILS,
    SEND_OTP
} from './../Types'

const AuthState = (props) => {

    const initialState = {
        isUserAuthenticated: false,
        loading: false,
        user: {},
        alert: null,
        registerationUserDetails: {},
        sentOTP: false

    }


    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // function for logging user in
    const login = async (data) => {
        setLoading();
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const res = await axios.post("/api/auth", data, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token
            })

            loadUser();
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg)
                setAlert(error.response.data.msg);
                dispatch({
                    type: LOGIN_FAIL,
                    payload: error.response.data.msg
                })
            }

        }

    }
    //otp verification

    const sendOTP = async (data) => {
        try {

            await axios.post("api/user/otp", data);
            dispatch({
                type: SEND_OTP
            })
        } catch (error) {
            console.log(error);
        }
    }

    //registeration success
    const register = async (data) => {
        setLoading();
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/user', data, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.token
            })

            loadUser();
        } catch (error) {

            if (error.response) {
                console.log(error.response.data);
                dispatch({
                    type: REGISTER_FAIL
                })
                if (error.response.data.msg) {
                    setAlert(error.response.data.msg);
                } else {
                    setAlert("Couldn't register. Something went wrong!")
                }
            }
        }
        setLoading();


    }
    // function for logging out the user
    const logout = () => {

        dispatch({
            type: LOGOUT
        })
    }
    //function for loading the user
    const loadUser = async () => {
        setAuthToken(localStorage.getItem("authToken"));
        try {
            const res = await axios.get("/api/auth/user");
            console.log(res);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: USER_LOADING_FAIL,
                payload: error
            })
        }
    }
    //alert function
    const setAlert = (message) => {
        dispatch({
            type: SET_ALERT,
            payload: message
        })

        setTimeout(() => {
            removeAlert();
        }, 4000)
    }
    // function for removing the alert
    function removeAlert() {
        dispatch({
            type: REMOVE_ALERT
        })
    }
    //funtion for setting loading
    const setLoading = () => {
        dispatch({
            type: LOADING
        })
    }
    //function for grapping the user's registration info
    const saveUsersDetails = (userInfo) => {
        dispatch({
            type: LOAD_USER_DETAILS,
            payload: userInfo
        })
    }
    return (
        <AuthContext.Provider value={{
            isUserAuthenticated: state.isUserAuthenticated,
            loading: state.loading,
            user: state.user,
            login,
            loadUser,
            register,
            setAlert,
            logout,
            saveUsersDetails,
            sendOTP,
            alert: state.alert,
            registerationUserDetails: state.registerationUserDetails,
            sentOTP: state.sentOTP

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
