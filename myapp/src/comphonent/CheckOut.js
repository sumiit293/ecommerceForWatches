import React from 'react'
import { Checkbox, Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
const CheckOut = ({ loading, total = Number(0) }) => {
    return (
        <div style={style, { background: 'pink' }}>
            <div style={{ borderTop: '3px solid black' }}>

                <div style={center}>
                    <div style={{ margin: '10px' }}>Grand Total</div>
                    {loading ? <CircularProgress /> : <div style={{ fontSize: "25px", fontWeight: '600', marginLeft: '10px' }}>₹ {total}</div>}
                </div>
                <div style={center1}>
                    <div>Price may increase</div>

                </div>
                <div style={center}>

                    <div> <Checkbox color="green" /> I agree to all Terms and Services</div>

                </div>

                <div style={center}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: '60%', height: '50px', borderRadius: '20px' }}
                    >
                        Checkout
            </Button>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
const style = {

    width: '100%',
    padding: '10px',
    border: '1px solid black',

}
const center = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: '10%'
}
const center1 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",

}