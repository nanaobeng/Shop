import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowProductImage';
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
  const [values,setValues] = useState({
    size:''})
    const {

     
      size

  } = values;

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
    addItem(product,values.size, setRedirect(true));
  };

  const handleSize = name => event => {
    const value =  event.target.value

    setValues({ ...values, [name]: value})
}

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        values.size != "" ? <span onClick={addToCart} className="btn btn-dark" style={{width:'100%'}}> Add to Cart </span>
        : <span onClick={addToCart} className="btn btn-dark" style={{width:'100%',pointerEvents:'none'}} disabled> Add to Cart </span>
      
        
       
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
   <div className="row p-4 justify-content-center">
   <div className="col-10 p-2 justify-content-center">
               <div className="row">
               <div className="col-md-6 col-sm-12" style={{height:'600px'}}>
               <ShowImage item={product} url="product" style={{width:'100%',height:'400px'}}/>
               

               </div>
               <div className="col-md-6 col-sm-12 pt-4">
         <div class="product__details__text">
                        <h3>{product.name} </h3>
                        Category: {product.category.name}
                    
                        <div class="product__details__price">GH¢  {product.price}</div>
                      
                        <p>{product.description}</p>
                        <div class="product__details__button">
                        <div className="row">
                             <div className="col-12">
                           <div className="form-group">
            <label className="text-muted">Size</label>
            <select onChange={handleSize('size')} name='size' className="form-control" value={size} >
            <option>Please select</option>
            {product.isSmall ?  <option value ="S">S</option> : ''}
            {product.isMedium ?  <option value ="M">M</option> : ''}
            {product.isLarge ?  <option value ="L">L</option> : ''}
           

            </select>
            
        </div>
        </div>
                           </div>
                        {showAddToCartBtn(showAddToCartButton)}
                        {shouldRedirect(redirect)}
                           
                        </div>
                        <div class="product__details__widget">
                            <ul>
                                <li>
                                    <span>Availability:</span>
                                    <div class="stock__checkbox">
                                        <label for="stockin">
                                           {product.quantity > 0 ? ' In Stock' : 'Out of Stock'}
                                            <input type="checkbox" id="stockin"/>
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </li>
                            
                                <li>
                                    <span>Available sizes:</span>
                                    <div class="size__btn">
                       
                                        <label for="s-btn">
                                        {product.isSmall &&  <input type="radio" id="s-btn" value="S"/>}
                                            S
                                        </label>
                                        <label for="m-btn">
                                        {product.isMedium &&  <input type="radio" id="m-btn" value="M"/>}
                                            M
                                        </label>
                                        <label for="l-btn">
                                           
                                            {product.isLarge &&  <input type="radio" id="l-btn" value="L"/>}
                                            L
                                        </label>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
         </div>
              
               </div>
          
           </div>
   </div>

<div className="row p-4">
          

          
       
       </div>

   
  
      </div>
 
  );
};

export default ProductCard;
