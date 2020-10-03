import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowProductImage from './ShowProductImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const ProductCard = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
         <span class="btn btn-outline-primary mt-2 mb-2 card-btn-1 material-icons">
visibility
</span>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
       
          <span onClick={addToCart} class="btn btn-outline-warning mt-2 mb-2 card-btn-1 material-icons">
add_shopping_cart
</span>
       
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
 <div>

<div className="row p-4">
           <div className="col-12">
               <div className="row">
               <div className="col-4" style={{height:'600px'}}>
               {shouldRedirect(redirect)}
             <ShowProductImage item={product} url="product" style={{width:'100%'}}/>
               

               </div>
               <div className="col-8">
        <h2><b>{product.name}</b></h2>
        <span style={{color:'grey'}}>{product.description}</span>
        <br/>
        <br/>
        <h4 style={{color:'red'}}>${product.price}</h4>
        <br/>
  
        <div className="row">
            
                <div className="col-2">
                    <b>Size</b>
                </div>
                <div className="col-2 ">
           
                </div>
           
        </div>

        <br/>
        <div className="row">
            <div className="col-7 pt-2 text-center" style={{height:'40px',backgroundColor:'green',color:'#fff'}}>
                    <b>ADD TO CART</b>
            </div>
        </div>
        <div className="row justify-content-center">
        

        {showAddToCartBtn(showAddToCartButton)}

    
        </div>
               </div>
               </div>
          
           </div>

          
       
       </div>

   
  
      </div>
 
  );
};

export default ProductCard;
