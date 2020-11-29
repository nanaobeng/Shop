import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
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
   
    <br/>
        {shouldRedirect(redirect)}
        <div className="row">
        <div className="col-12">
        <ShowImage item={product} url="product" style={{width:'100%'}}/>
        </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
          <span style={{color:'grey',fontSize:'12px'}}>{product.category.name}</span><br/>
          <span>
          <Link to={`/product/${product._id}`} style={{fontSize:'23px',color:'black'}} className="mr-2 text-center">
          <b>{product.name}</b>
        </Link></span>

          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center " style={{color:'grey'}}>
          GH¢ {product.price}

          </div>
        </div>
        
        
        

   
       
        
        <br />
<div className="row justify-content-center">
       

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
        </div>
      
      </div>
 
  );
};

export default Card;
