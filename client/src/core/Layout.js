import React from 'react';
import Menu from './Menu'
import '../styles.css'

const Layout = ({title = " Title" , className, description = "Description" , children}) => (

<div>
<Menu/>
    
    <div className={className}>{children}</div>
</div>
)

export default Layout