import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {


    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: '100px',
        left: '50%',
        width: '60%',
        zIndex: '100',
        transform: 'translateX(-50%)',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars({ alert = "Your alert", severity = "info" }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity={severity} style={{ textAlign: 'center' }}>{alert}</Alert>
        </div>
    );


}
