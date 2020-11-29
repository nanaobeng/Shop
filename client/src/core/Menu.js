import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';
import { itemTotal } from "./cartHelpers";
import logo from '../user/logo_s.png';
import Search from './Search'
const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color:'black'}
    }
    else{
        return {color: 'black'}
    }
}


const Menu = ({history}) => (


<div >
<div className="row  text-right" >
        <div className=" col-12 text-center p-1" style={{color:'#fff'}}>

        <div className="col-12 text-right">
        <ul className="nav nav-tabs  ">
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/')} to="/">
            <span class="material-icons">
home
</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
            <span class="material-icons">
store
</span>
            </Link>
        </li>
        <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                   <span class="material-icons">
shopping_cart
</span>{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
            
       

       {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">
            <span class="material-icons">
admin_panel_settings
</span>
            </Link>
        </li>
       )}

{isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">
            <span class="material-icons">
admin_panel_settings
</span>
            </Link>
        </li>
       )}



        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/signin')}  to="/signin">
            Login
            </Link>
        </li>


        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/signup')}  to="/signup">
            Signup
            </Link>
        </li>
        </Fragment>
            
        )}
       {isAuthenticated() && (
            <li className="nav-item">
           <Link className="nav-link" style={{cursor: 'pointer', color:'#ffff'}}  onClick={() => signout(() => {
               history.push('/')
           })}>
             <span style={{color:'black'}}>Signout</span>
           </Link>
       </li>
       
           
       )}
 
                <li class="nav-item float-right text-right">
                <Search/>
                </li>
                
           
      
    </ul>
   
        </div>
        
            
        </div>
        </div>
    <div className="row text-center justify-content-center">
        
        <div className="col-4">
        <Link className="nav-link" style={isActive(history,'/')} to="/">
            <img className="img-fluid" src={logo} style={{height:'60px'}} />
            </Link>

        </div>
        
    </div>
   
    
    <div className="row">
        <div className="col-12 justify-content-center text-center">
        <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/')} to="/">
            <b>Dresses</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
            <b>Jumpsuits</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
            <b>Tops</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
            <b>Shorts</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
            <b>Skirts</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">
            <b>Trousers</b>
            </Link>
        </li>
        </ul>
        </div>
    </div>
    <div className="row">
        <div className="col-12 text-center p-2" style={{backgroundColor:'black',color:'#fff'
    }}>
       <b> CRAFTED TO ACCENTUATE ALL YOUR GOOD SIDES</b>

        </div>
        </div>
    
   
</div>


)
export default withRouter(Menu)