import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import Menu from './Menu'
import Footer from './Footer'
import '../styles.css'

const LayoutHome = ({title = " Title" , className, description = "Description" , children}) => (

<div style={{ fontFamily: 'Montserrat, sans-serif'}}>


    
    <div className={className}>{children}</div>
    <br/>
    <Footer/>
</div>
)

export default withRouter(LayoutHome)