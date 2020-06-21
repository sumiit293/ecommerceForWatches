import {

    PAYMENT_REQUEST_CREATED_F,
    PAYMENT_REQUEST_CREATED_S,
    LOADING

} from './../Types'

export default (state, action) => {

    switch (action.type) {


        case PAYMENT_REQUEST_CREATED_S:
            return {
                ...state,
                paymentRequestResult: action.payload
            }
        case PAYMENT_REQUEST_CREATED_F:
            return {
                ...state,
                paymentRequestResult: {},
                iminfo: "Can't process request now"
            }
        case LOADING:
            return {
                ...state,
                paymentLoading: !state.paymentLoading
            }
        default:
            return {
                state
            }
    }
}