import React from 'react';
import Menu from './Menu'
import Footer from './Footer'
import '../styles.css'

const Layout = ({title = " Title" , className, description = "Description" , children}) => (

<div style={{ fontFamily: 'Montserrat, sans-serif'}}>
<Menu/>
    
    <div className={className}>{children}</div>
    <br/>
    <Footer/>
</div>
)

export default Layout