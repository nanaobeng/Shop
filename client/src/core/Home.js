import React , {useState, useEffect,Fragment} from 'react';
import Layout from './LayoutHome'

import { getProducts } from "./apiCore";
import Card from './Card'
import Search from './Search'
import background from './IMG_9427.JPG';
import kerou from './IMG_9421.JPG';
import nouna from './nouna.JPG';
import arua from './arua.jpg';
import logo from '../user/w_logo.png'
import test from '../user/test.png'
import skirts from '../user/skirts.jpg'
import Menu from './Menu'
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';
import { itemTotal } from "./cartHelpers";
import {ExternalLink} from "react-external-link"


const Home = () => {
    var divStyle = {
        backgroundImage: 'url(' + background + ')',
        
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover' 
  
      };
    const [productsBySell,setProductBySell] = useState([])
    const [productsByArrival,setProductByArrival] = useState([])
    const [error,setError] = useState(false)
    let [loading,setLoading] = useState(false)

    


    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            }
            else {
                setProductBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            }
            else {
                setProductByArrival(data)
                setLoading({loading : true})
            }
        })
    }

    useEffect(() => {
       loadProductsByArrival()
       loadProductsBySell()
    }, [])
return(
<Layout >

    <div className="row"  >
        <div className="col-12">
        <div className="row  text-right">
        <div className=" col-12 text-center p-1" style={{color:'#fff'}}>

        <div className="col-12 text-right">
        <ul className="nav nav-tabs  ">
        <li className="nav-item">
            <Link className="nav-link" to="/" style={{color:'black'}}>
            <span class="material-icons">
home
</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/shop" style={{color:'black'}}>
            <span class="material-icons">
store
</span>
            </Link>
        </li>
        <li className="nav-item">
                <Link
                    className="nav-link"
                   
                    to="/cart" style={{color:'black'}}
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
            <Link className="nav-link"  to="/user/dashboard" style={{color:'black'}}>
            <span class="material-icons">
admin_panel_settings
</span>
            </Link>
        </li>
       )}

{isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
            <Link className="nav-link"  to="/admin/dashboard" style={{color:'black'}}>
            <span class="material-icons">
admin_panel_settings
</span>
            </Link>
        </li>
       )}



        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
            <Link className="nav-link"  to="/signin" style={{color:'black'}}>
            Login
            </Link>
        </li>


        <li className="nav-item">
            <Link className="nav-link"  to="/signup" style={{color:'black'}}>
            Signup
            </Link>
        </li>
        </Fragment>
            
        )}
       {isAuthenticated() && (
            <li className="nav-item">
           <Link className="nav-link" style={{cursor: 'pointer', color:'black'}}  onClick={() => signout()}>
             <span style={{color:'black'}}>Signout</span>
           </Link>
       </li>
       
           
       )}
       
    </ul>

        </div>
        
            
        </div>
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-12 justify-content-center text-center">
        <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
            <ExternalLink className="nav-link"  href="/" target="_self">
            <b style={{color:'black'}}> Dresses</b>
            </ExternalLink>
        </li>
        <li className="nav-item">
            <Link className="nav-link"  to="/shop">
            <b style={{color:'black'}}> Jumpsuits</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link"  to="/shop">
            <b style={{color:'black'}}>Tops</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link"  to="/shop">
            <b style={{color:'black'}}>Shorts</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link"  to="/shop">
            <b style={{color:'black'}}>Skirts</b>
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link"  to="/shop">
            <b style={{color:'black'}}>Trousers</b>
            </Link>
        </li>
        </ul>
        </div>
    </div>



        {loading ? <div className="row">
        <div className="col-12">
    <div className="row">
        <div className="col-12  main_image text-center justify-content-center">

      
  <img className="img-fluid" src={background} alt="Snow" style={{width:'100%'}}/>



  <div class="row header_center  ">
  

    <div className=" col-12 text-center" >
    <img className=" img-fluid" src={logo} style={{height:'100px'}} />
    
    </div>
    

    
    <br/>
    <br/>
 
    
      
      </div>



        </div>
    </div>
    <div className="row p-4">
        <div className="col-12 P-4 text-center" style={{color:'grey'}}>
            MADE WITH LOVE, MADE FOR EVERYONE

        </div>
    </div>
    
    <div className="row pt-4 pb-4" >
        
        <div className="col-md-6 col-sm-12 pt-4 pb-4  text-center justify-content-center">
        <div className="row">
      <div className="col-12 main_image">
      <img className="img-fluid" src={nouna} alt="Snow" style={{width:'100%',height:'380px'}}/>



<div class=" centered">
    

        <ExternalLink className="btn  btn-outline-light" style={{borderWidth:'3px'}} href="/shop" target="_self"><span ><b className="productLink">Shop Jumpsuits</b></span></ExternalLink>
    </div>
      </div>
  </div>

      





        </div>


        <div className="col-md-6 col-sm-12 pt-4 pb-4  text-center justify-content-center">
        <div className="row">
      <div className="col-12 main_image">
      <img className="img-fluid" src={kerou} alt="Snow" style={{width:'100%',height:'380px'}}/>



<div class=" centered">
    
    
        <ExternalLink  className="btn  btn-outline-light" href="/shop" target="_self" style={{borderWidth:'3px'}}><span ><b className="productlink" >Shop Dresses</b></span></ExternalLink>
    </div>
      </div>
  </div>

      





        </div>
    </div>


   <div className="row p-4">
       <div className="col-12 p-4 text-center" style={{color:'grey'}}>

           FEATURED ARRIVALS

       </div>
   </div>



   <div className="row p-4">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-3 col-sm-6 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

  </div>
  </div>
     :
        
        
        
        
     
<div class="container justify-content-center text-center p-4">
<div className="row justify-content-center text-center p-4">
    <div className="col-12 justify-content-center text-center p-4" style={{height:'100vh'}}>

  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
                                        
<div class="spinner-grow text-muted"></div>
<div class="spinner-grow text-primary"></div>
<div class="spinner-grow text-success"></div>
<div class="spinner-grow text-info"></div>
<div class="spinner-grow text-warning"></div>
<div class="spinner-grow text-danger"></div>
<div class="spinner-grow text-secondary"></div>
<div class="spinner-grow text-dark"></div>
<div class="spinner-grow text-light"></div>
</div>
</div>
</div> }
    
    

</Layout>

)
}

export default Home