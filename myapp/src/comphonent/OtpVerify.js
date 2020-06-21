import React, { useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { FormControl, InputLabel, Input, Button } from '@material-ui/core'
import AuthContext from './../context/AuthContext'
import Alert from './../comphonent/Alert'
import Loader from './../comphonent/Loader'
const OtpVerify = (props) => {
    const push = useHistory();
    const { register, registerationUserDetails, isUserAuthenticated, alert, loading } = useContext(AuthContext);
    const verifyOtp = () => {

        let otpInput = document.getElementById("otp").value;
        if (props.location.state.otp.toString() === otpInput) {
            register(registerationUserDetails);
        } else {
            console.log("otp not")
        }
    }


    return (
        <Fragment>
            {loading && <Loader />}
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: '100px'
            }}>

                <div style={{ height: '200px', width: '600px', padding: '20px', backgroundColor: '#eeee' }}>
                    {alert && <Alert />}
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="password">Enter the otp sent to your mail</InputLabel>
                        <Input id="otp" type="text" name="otp" required />
                    </FormControl>
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={verifyOtp}
                        >
                            Verify
      </Button>
                    </FormControl>
                </div>
            </div>
        </Fragment>
    )
}

export default OtpVerify
