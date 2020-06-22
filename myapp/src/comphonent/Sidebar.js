import React, { useContext, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './../context/AuthContext'
import HomeIcon from '@material-ui/icons/Home';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
const Sidebar = (props) => {
    const path = String(window.location.pathname).split("/");
    const length = path.length
    const target = path[length - 1] === 'signin' || path[length - 1] === 'register' || path[length - 1] === 'thanks'


    const toggleClass = () => {

        if (document.getElementById("side-menu").classList.contains("bringSideBar")) {
            document.getElementById("side-menu").classList.remove("bringSideBar");
        } else {
            document.getElementById("side-menu").classList.add("bringSideBar");
            console.log(document.getElementById("side-menu").classList);
            console.log(document.getElementById("side-menu").classList.contains("bringSideBar"));
        }
    }
    const { isUserAuthenticated, loadUser, loading } = useContext(AuthContext);

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, [isUserAuthenticated])

    if (target) {
        return null
    }

    return (
        <Fragment>

            <div className="sidearrow" onClick={toggleClass}><ArrowForwardRoundedIcon /></div>
            <div id="side-menu" className="sidebar" style={style}>
                <div className="side" onClick={toggleClass}><ArrowForwardRoundedIcon style={{ transform: 'rotate(180deg)' }} /></div>
                <div style={{ width: '100px', margin: "20px auto" }}>
                    <Link to="/"> <HomeIcon style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: '50%',
                        display: "block",
                        margin: "1px auto",
                        border: '1px solid black'
                    }} />
                    </Link>
                </div>
                <ul style={styleul}>
                    {(!isUserAuthenticated && !loading) && <a href="/register"> <li style={styleli}>Register</li></a>}
                    {(!isUserAuthenticated && !loading) && <a href="/signin">  <li style={styleli}>Sign In</li></a>}
                    {isUserAuthenticated && <Link to="/cart">  <li style={styleli}>Cart</li> </Link>}
                    {isUserAuthenticated && <Link to="/profile"> <li style={styleli}>Profile</li></Link>}
                    <Link to="/about"><li style={styleli}>About</li></Link>
                    <li style={styleli}>Sort By Category</li>
                    <li style={styleli}>Sort By Relevence</li>
                    <li style={styleli}>Sort By Price</li>

                </ul>
            </div>

        </Fragment>
    )
}

export default Sidebar


const style = {
    border: '1px solid black',
    backgroundColor: '#eeee',
    padding: '5px',
    float: 'left',
    minHeight: 'calc(100vh - 64px)',
    position: 'sticky',
    width: '250px',
    top: '64px',


}
const styleul = {

    margin: "40px auto",

}
const styleli = {

    padding: '10px 20px',
    margin: '30px 5px',
    backgroundColor: "pink",
    fontFamily: "Robot",
    borderRadius: '10px',
    cursor: "pointer",
    textDecoration: "none"

}
