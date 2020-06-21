import React, { Fragment, useContext } from 'react'
import WatchCard from "./../comphonent/WatcheCard"
import CartContext from './../cartContext/CartContext'
import Alert from './../comphonent/Alert'

const ProductPage = () => {

    const { info } = useContext(CartContext);
    const productItems = [
        { id: "19234501", title: "Timex Brown Analog Watch", price: 5, image: "watch1.jfif" }, { id: "19234502", title: "Timex Brown Analog Watch", price: 5, image: "watch1.jpg" },
        { id: "19234503", title: "Timex Brown Analog Watch", price: 5, image: "watch1.png" },
        { id: "19234504", title: "Timex Brown Analog Watch", price: 5, image: "watch3.jfif" }, { id: "19234505", title: "Timex Brown Analog Watch", price: 5, image: "watch3.jpg" },
        { id: "19234506", title: "Timex Brown Analog Watch", price: 5, image: "watch4.png" },
        { id: "19234507", title: "Timex Brown Analog Watch", price: 5, image: "watch5.png" }, { id: "19234508", title: "Timex Brown Analog Watch", price: 5, image: "watch6.png" },
        { id: "19234509", title: "Timex Brown Analog Watch", price: 5, image: "watch7.png" },
        { id: "192345010", title: "Timex Brown Analog Watch", price: 5, image: "watch8.jfif" }, { id: "192345011", title: "Timex Brown Analog Watch", price: 5, image: "watch9.jfif" },
        { id: "192345012", title: "Timex Brown Analog Watch", price: 5, image: "watch11.jfif" }
    ]
    return (
        <Fragment>

            {info && <Alert alert={info} />}
            <div id="product-wrapper" style={style}>
                {productItems.map((item) => <div style={childStyle} key={item.id}>
                    <WatchCard
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        id={item.id}
                    />
                </div>)}
            </div>
        </Fragment>
    )
}

export default ProductPage
const style = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    alignItems: "center"
}
const childStyle = {
    margin: '20px'
}