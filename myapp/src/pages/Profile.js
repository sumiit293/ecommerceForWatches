import React, { Fragment, useContext, useEffect } from 'react'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp'
import AuthContext from './../context/AuthContext'
import CartContext from './../cartContext/CartContext'
const Profile = () => {

    const { user } = useContext(AuthContext);
    const { orderInfo, recentOrders } = useContext(CartContext);
    var Index = 1;
    useEffect(() => {
        orderInfo();
        // eslint-disable-next-line
    }, [])
    return (
        <Fragment>
            <div style={{ width: '100%', margin: '1px auto' }}>
                <div style={style}>
                    <AccountCircleSharpIcon style={{ width: '100px', height: '100px', margin: '1px auto', display: 'block' }} />
                </div>
                <div style={styleInfo}>
                    <div><h4>Name</h4></div> <div><p style={{ color: "blue", marginLeft: "40px" }}>{user.name}</p></div>
                </div>
                <div style={styleInfo}>
                    <div><h4>Email</h4></div> <div><p style={{ color: "blue", marginLeft: "40px" }}>{user.email}</p></div>
                </div>
                <div style={styleInfo}>
                    <div><h4>Address</h4></div> <div><p style={{ color: "blue", marginLeft: "40px" }}>{user.address}</p></div>
                </div>
                <div style={styleInfo}>
                    <div><h4>Phone</h4></div> <div><p style={{ color: "blue", marginLeft: "40px" }}>{user.phone}</p></div>
                </div>
                <div style={style}> <h2>Recent Order</h2></div>

                {recentOrders.length === 0 && <div style={styleInfo}><p>No recent orders</p></div>}
                {(recentOrders.length !== 0) && recentOrders.map((recentOrder) => <div style={styleInfo} key={Index}>
                    <div><h4>S.No {Index++}</h4></div> <div><p style={{ color: "blue", marginLeft: "40px" }}>Total Sum {recentOrder.order.TotalPrice}</p></div>
                </div>)}
            </div>
        </Fragment>
    )
}

export default Profile

const style = {

    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid black',
    margin: '50px auto'
}
const styleInfo = {

    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px auto',
    padding: "10px 30px",
    backgroundColor: '#eeee'

}
