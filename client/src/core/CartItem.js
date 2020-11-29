import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CartImage from './CartImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const CartItem = ({
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
  let cartt = []
  cartt = JSON.parse(localStorage.getItem('cart'));

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
           
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        
        
          <span   onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}class="material-icons">
highlight_off
</span>
        
      )
    );
  };
  return (
    <div>
    
 

      <div className="row">
                                    <div className="col-2">
                                    <CartImage item={product} url="product" style={{width:'100%'}}/>
                                    </div>
                                    <div className="col-3">
                                   {product.name}<br/>
                                   <b> GH₵ {product.price}</b><br/>
                                   <b>  {product.size}</b>
                                   <br/>
                                
                                    </div>
  
                                   
                                    <div className="col-4">
                                    {showCartUpdateOptions(cartUpdate)}

                                    </div>
                                    <div className="col-2">
                                    {showRemoveButton(showRemoveProductButton)}
                                    </div>
                                    
                                </div>
      
     
      </div>
 
  );
};

export default CartItem;
