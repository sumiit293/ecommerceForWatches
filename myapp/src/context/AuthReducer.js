import {


    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    USER_LOADING_FAIL,
    SET_ALERT,
    REMOVE_ALERT,
    LOGOUT,
    LOADING,
    REGISTER_SUCCESS,
    LOAD_USER_DETAILS,
    SEND_OTP


} from "../Types";

export default (state, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("authToken", action.payload);
            return
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isUserAuthenticated: false
            }
        case LOGOUT:
            localStorage.removeItem("authToken");
            return {
                ...state,
                isUserAuthenticated: false,
                loading: false,
                user: null
            }
        case USER_LOADED:
            return {
                ...state,
                isUserAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case USER_LOADING_FAIL:
            return {
                ...state,
                isUserAuthenticated: false,
                loading: false,
                user: {}
            }
        case LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case REMOVE_ALERT: {
            return {
                ...state,
                alert: null
            }
        }
        case LOAD_USER_DETAILS:
            return {
                ...state,
                registerationUserDetails: action.payload
            }

        case SEND_OTP:
            return {
                ...state,
                sentOTP: true
            }
        default:
            return state
    }
}