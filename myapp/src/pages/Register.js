import React, { useState, useLayoutEffect, useContext, Fragment } from 'react'
import { FormControl, InputLabel, Input, Button, Grid, useMediaQuery } from '@material-ui/core'
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import { Link, useHistory } from 'react-router-dom'
import AuthContext from './../context/AuthContext'
import Alert from './../comphonent/Alert'
import Loader from './../comphonent/Loader'

const Register = () => {

    const [userDetails, setUserDetails] = useState({});

    const { alert, setAlert, isUserAuthenticated, register, loading } = useContext(AuthContext);


    const registerUser = () => {
        if (userDetails.name && userDetails.phone && userDetails.email && userDetails.password && userDetails.password2 && userDetails.address) {
            if (userDetails.password === userDetails.password2) {
                register(userDetails);


            } else {
                setAlert("Both password should match");
            }
        } else {

            setAlert("Please enter all the fields");
        }
    }
    const onChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value

        })
    }

    const push = useHistory();
    useLayoutEffect(() => {
        if (isUserAuthenticated) {

            push.push("/");
        }
        // eslint-disable-next-line
    }, [isUserAuthenticated]);
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
                    <PersonAddSharpIcon style={{ width: '100px', height: '100px', margin: '1px auto', display: 'block' }} />

                    <FormControl margin="medium" fullWidth variant="standard" size="medium" style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input id="name" type="text" name="name" onChange={onChange} />
                    </FormControl>
                    <FormControl margin="medium" fullWidth variant="standard" size="medium" style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="my-input">Phone</InputLabel>
                        <Input id="phone" type="Phone" name="phone" onChange={onChange} />
                    </FormControl>
                    <FormControl margin="medium" fullWidth variant="standard" size="medium" style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="email" type="email" name="email" onChange={onChange} />

                    </FormControl>
                    <FormControl margin="medium" fullWidth variant="standard" size="medium" style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="my-input">Address</InputLabel>
                        <Input id="address" type="text" name="address" onChange={onChange} />

                    </FormControl>
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" name="password" onChange={onChange} />
                    </FormControl>
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>
                        <InputLabel htmlFor="password">Re-enter password</InputLabel>
                        <Input id="password" type="password" name="password2" onChange={onChange} />
                    </FormControl>
                    <FormControl margin="dense" fullWidth style={{ margin: '10px 5px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={registerUser}
                        >
                            Register
              </Button>
                    </FormControl>

                    <Grid container spacing="0" direction="row"
                        justify="space-between" style={{ margin: '2px 0px' }}>
                        <Grid item spacing="0">
                            <div style={{ margin: '10px 2px', background: 'rgba(0,0,0,0.2)', padding: '2px 5px', fontSize: '10px' }}> <Link to="#!">Forgot password?</Link> </div>
                        </Grid><Grid item >
                            <div style={{ margin: '10px 2px', background: 'rgba(0,0,0,0.2)', padding: '2px 5px', fontSize: '10px' }}> <Link to="/">Allready having account? </Link></div>
                        </Grid>
                    </Grid>


                </form>

            </div>
        </Fragment>
    )
}

export default Register


