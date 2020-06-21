import React, { useContext, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import WatchIcon from '@material-ui/icons/Watch';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom'
import AuthContext from './../context/AuthContext'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 10
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {

    const { isUserAuthenticated, logout } = useContext(AuthContext);

    const Logout = () => {
        logout();
    }
    useLayoutEffect(() => {
        console.log(isUserAuthenticated);
    }, [isUserAuthenticated])
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <a href="/" style={{ textDecoration: "none", color: 'white' }}>  <WatchIcon /></a>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <a href="/" style={{ textDecoration: "none", color: 'white' }}> TNT Watches </a>
                    </Typography>
                    <a href="/signin" style={{ textDecoration: "none", color: 'white' }}>
                        <Button color="inherit" style={{ display: isUserAuthenticated ? "none" : "block" }}>Login</Button></a>
                    <a href="/register" style={{ textDecoration: "none", color: 'white' }}>
                        <Button color="inherit" style={{ display: isUserAuthenticated ? "none" : "block" }}>Register</Button></a>
                    <IconButton onClick={logout} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style={{ display: isUserAuthenticated ? "block" : "none" }}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}