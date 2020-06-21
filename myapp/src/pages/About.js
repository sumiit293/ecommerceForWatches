import React, { Fragment } from 'react'
import GroupIcon from '@material-ui/icons/Group';

const About = () => {


    return (
        <Fragment>
            <div style={style}><GroupIcon style={{ width: '100px', height: '100px', margin: '1px auto', display: 'block' }} /></div>
            <div style={styleInfo}><h2>About Us</h2></div>
            <div style={styleInfo}><p style={{ lineHeight: '50px', wordSpacing: '2px' }}><span style={{ fontSize: "20px" }}>TNT ( Time - N - Tune )</span> a name which was previously known for its Quality products and Best after sales services in Marathwada and its circles
            The owner of the firm : Mr Zulfequar Hussain Taksali
            Had proved himself as the pioneer in the field of watches
            Now has bought an new Showroom at Nirala Bazaar TNT Watches</p></div>
        </Fragment>
    )
}


export default About
const style = {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid black',
    margin: '50px auto',

}

const styleInfo = {

    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px auto',
    padding: "10px 30px",
    backgroundColor: '#eeee',


}