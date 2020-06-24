import {
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    ORDER_SUCCESS,
    REMOVE_FROM_CART_S,
    REMOVE_FROM_CART_F,
    LOADING,
    CART_DETAILS_FETCHED,
    CART_DETAILS_NOT_FETCHED,
    REMOVE_ALERT,
    ORDER_FAILED,
    CLEAR_CART,
    ORDER_DETAILS_FETCHED
} from '../Types'
export default (state, action) => {
    switch (action.type) {

        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                info: action.payload
            }

        case ADD_TO_CART_FAIL:
            return {
                ...state,
                info: action.payload
            }
        case LOADING:
            return {
                ...state,
                cartLoading: !state.cartLoading
            }
        case CART_DETAILS_FETCHED:
            return {
                ...state,
                cartDetails: action.payload
            }
        case CART_DETAILS_NOT_FETCHED:
            return {
                ...state,

            }
        case ORDER_DETAILS_FETCHED:
            return {
                ...state,
                recentOrders: action.payload
            }
        case REMOVE_FROM_CART_S:

            return {
                ...state,
                cartDetails: state.cartDetails.filter(item => item.productId !== action.payload)
            }
        case CLEAR_CART:
            return {
                ...state,
                cartDetails: []
            }
        case REMOVE_FROM_CART_F:
            return state

        case REMOVE_ALERT:
            return {
                ...state,
                info: null
            }
        case ORDER_SUCCESS:
            return {
                ...state,
                info: action.payload
            }
        case ORDER_FAILED:
            return {
                ...state,
                info: "Order failed"
            }
        default:
            return state

    }

}


