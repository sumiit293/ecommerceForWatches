import React, { useState, useLayoutEffect, useContext, Fragment } from 'react'
import { FormControl, InputLabel, Input, Button, Grid, useMediaQuery } from '@material-ui/core'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp'
import { Link, useHistory } from 'react-router-dom'
import AuthContext from "./../context/AuthContext"
import Loader from './../comphonent/Loader'
import Alert from './../comphonent/Alert'

const SignIn = (props) => {

    const { isUserAuthenticated, login, loading, alert } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const push = useHistory();
    const Login = () => {

        if (userInfo.email && userInfo.password) {
            login(userInfo);
        }
    }

    const onblur = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    useLayoutEffect(() => {

        if (isUserAuthenticated) {
            push.push("/");

        }

    }, [isUserAuthenticated])


    return (
        <Fragment>
            {loading && <Loader />}
            <div style={{
                display: "flex",
                justifyContent: "center",
                margin: 20,
                padding: 20
            }}>

                <form style={{
                    width: useMediaQuery('(max-width:800px)') ? "100%" : "40%"
                }}>
                    {alert && <Alert />}
                    <AccountCircleSharpIcon style={{ width: '100px', height: '100px', margin: '1px auto', display: 'block' }} />

                    <FormControl margin="normal" fullWidth variant="standard" size="medium" style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="email" type="email" name="email" required onBlur={onblur} />

                    </FormControl>
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" name="password" required onBlur={onblur} />
                    </FormControl>
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={Login}
                        >
                            Login
              </Button>
                    </FormControl>

                    <Grid container direction="row"
                        justify="space-between" style={{ margin: '2px 0px' }}>
                        <Grid item >
                            <div style={{ margin: '10px 2px', background: 'rgba(0,0,0,0.2)', padding: '2px 5px', fontSize: '10px' }}> <Link to="#">Forgot password?</Link> </div>
                        </Grid><Grid item >
                            <div style={{ margin: '10px 2px', background: 'rgba(0,0,0,0.2)', padding: '2px 5px', fontSize: '10px' }}> <Link to="/register">Don't have account? Register now! </Link></div>
                        </Grid>
                    </Grid>


                </form>

            </div>
        </Fragment>
    )
}

export default SignIn


