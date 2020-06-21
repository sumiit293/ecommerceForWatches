import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Grid, useMediaQuery, Button } from '@material-ui/core'

const ProductInfoPage = (props) => {

    const target = process.env.PUBLIC_URL + "/images/"
    var items = [
        {
            name: "watch1.jpg",

        },
        {
            name: "watch2.jpg",

        },
        {
            name: "watch3.jpg",

        }
    ]

    return (
        <Grid
            container

            style={{
                width: useMediaQuery('(max-width:600px)') ? '100%' : '70%', margin: '20px auto',
                boxShadow: '0 0 10px 2px black'
            }}
        >

            <Grid item xs="12" lg="7">
                <div>
                    <Carousel autoPlay='false'>
                        {
                            items.map(item => <Item target={target} item={item} />)
                        }
                    </Carousel>
                </div>
            </Grid>
            <Grid item xs="12" lg="5">
                <div style={{ border: '1px solid black', height: '300px', background: 'pink', padding: '10px', lineHeight: '29px' }}>
                    <p>TITAN</p>
                    <h3>Stellar by Titan Off White Dial Analog Watch for men</h3>
                    <span>MRP  6495.00</span>  <span style={{ marginLeft: '200px' }}>Review:  4.0</span>
                    <div style={{ width: '90%', marginLeft: '5%', marginRight: '5%', marginTop: '80px' }} >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ width: '60%', height: '50px', borderRadius: '20px', marginLeft: '20%', marginRight: 'auto' }}

                        > Remove From cart</Button>
                    </div>

                </div>
            </Grid>
        </Grid>

    )
}

function Item(props) {
    return (
        <Paper>
            <img src={props.target + props.item.name} style={{ width: '100%', height: '300px' }} />
        </Paper>
    )
}
export default ProductInfoPage;