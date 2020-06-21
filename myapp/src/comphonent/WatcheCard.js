import React, { useContext } from 'react';
import CartContext from './../cartContext/CartContext'
import AuthContext from './../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        maxWidth: 200,
    },
    media: {
        height: 140,
        width: 100,
        marginLeft: "auto",
        marginRight: "auto"

    },
    center: {
        textAlign: "center"
    },
    centerItem: {
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export default function WatchCard({ image, title, price, id }) {
    const classes = useStyles();
    const push = useHistory();
    const { addToCart } = useContext(CartContext);
    const { isUserAuthenticated } = useContext(AuthContext);

    const onBtnClick = () => {
        if (isUserAuthenticated) {
            addToCart({ image, title, price, id });
        } else {
            push.push("/signin");
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image ? `/images/${image}` : "/images/watch1.jfif"}

                />
                <CardContent className={classes.center}>
                    <Typography variant="button" noWrap style={{ width: '120px', display: "block", }}>
                        {title}
                    </Typography>
                    <Typography variant="button" noWrap>
                        price:₹ {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" variant="contained" color="primary" className={classes.centerItem} onClick={onBtnClick}>
                    Add To Cart
                </Button>

            </CardActions>
        </Card >
    );
}