import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

function createData(name, modal, Quantity, Price) {
    return { name, modal, Quantity, Price };
}

const rows = [


];

export default function Cart({ loading, cartdDetail }) {

    const target = process.env.PUBLIC_URL + "/images/"
    const classes = useStyles();
    const getTotal = (row) => {
        var total = 0;
        for (var i = 0; i < row.length; i++) {
            total += row[i].Price
        }
        return total;

    }

    return (
        <TableContainer component={Paper} style={{ minHeight: '150px' }}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow style={{ background: 'pink' }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Modal</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>

                    </TableRow>
                </TableHead>
                {loading ? (<div style={center}><CircularProgress /></div>) : (<TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.modal}>
                            <TableCell component="th" scope="row">
                                <Link to="/productinfopage"> <img src={target + row.name} style={{ width: '50px', height: '50px', backgroundColor: 'brown', borderRadius: '50%' }} />
                                </Link>
                            </TableCell>

                            <TableCell align="center">{row.modal}</TableCell>
                            <TableCell align="center">{row.Quantity}</TableCell>
                            <TableCell align="center">{row.Price}</TableCell>

                        </TableRow>

                    ))}
                </TableBody>)}

            </Table>



        </TableContainer>
    );
}

const center = {

    width: '100px',
    margin: '10px auto'
}