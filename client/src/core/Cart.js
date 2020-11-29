import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './CartItem';
import FlutterWave from './FlutterWave';
import { useFlutterwave } from 'flutterwave-react-v3';
import Checkout from './Checkout';
import { isAuthenticated } from '../auth';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    const userId = isAuthenticated() && isAuthenticated().user.name;

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                
               
            <div>
               
                {items.map((product, i) => (
                    
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                    
                ))}
            </div>
            <div>
   
            </div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br />  
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
             <div className="row">
                    <div className="col-12" style={{height:'50px',backgroundColor:'#EAECEE '}}>
                       
                        
                        </div>

                </div>
                    <br/>
                    <br/>
                <div className="row">
                    <div className="col-12 p-4" >
                    <div className="row p-4">
                    <div className="col-12 p-4" >
                        <div className="row">
                            <div className="col-md-7 col-sm-12">
                                <div className="row">
                                    <div className="col-2">
                                    <b>Product</b>
                                    </div>
                                    <div className="col-3">
                                   
                                    </div>
                                    <div className="col-4">
                                    <b>Quantity</b>

                                    </div>
                                    <div className="col-2">
                                    
                                    </div>
                                    
                                </div>
                                <br/> 
                                <div className="row">
                <div className="col-12">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                <br/>
            <br/>
            
                <div className="col-4">
                    <span className="btn btn-outline-dark"> <Link style={{color:'black',borderWidth:'3px'}}to="/shop">Continue Shopping</Link></span>
                </div>
           
                
            </div>
            

                            </div>
                            <div className="col-md-5 col-sm-12 justify-content-center" >
                            <div className="row p-4 justify-content-center">
                                    
                                    <div className="row">
                                    <div className="col-12" >
                                    <b>Cart Summary</b>
                                    <hr/>
                   <Checkout products={items} setRun={setRun} run={run} />  
                </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        </div>

                </div>
                       

                        </div>

                </div>
                
          
            
        </Layout>
    );
};

export default Cart;
