import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import FlutterWave from './FlutterWave';
import { isAuthenticated } from '../auth';
import { useFlutterwave } from 'flutterwave-react-v3';
import { Link } from 'react-router-dom';



const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    let [deliveryFee, setDF] = useState(0)
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });
    const userMail= isAuthenticated() && isAuthenticated().user.email;
    const userName = isAuthenticated() && isAuthenticated().user.name;

    const [deliveryFields, setDev] = useState(
        {
            fullname: '',
            address: '',
            email:'',
            phonenumber: '',
            deliverycountry: '',
            error: '',
            success:false
        }
    )

    const {fullname,address,deliverycountry,phonenumber , success, error,email} = deliveryFields
    const handleDev = name => event => {

        setDev({...deliveryFields, error:false, [name]:event.target.value})

    }

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price ;
        }, 0);
    };

  const [values, setValues] = useState({
    public_key: 'FLWPUBK-0dfd41acb05e3084ad11927bed58af25-X',
    tx_ref: Date.now(),
    amount: 1,
    currency: 'GHS',
    
    payment_options: 'card,mobilemoney',
    customer: {
      email: userMail,
      phonenumber: phonenumber,
      name: fullname,
    },
    customizations: {
      title: 'Ewemocha',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const handleFlutterPayment = useFlutterwave(values);





    useEffect(() => {
     
        setValues({...values, amount : (getTotal()+ deliveryFee)  })
    }, [deliveryFee]);

    useEffect(() => {
        
        if(deliverycountry == 'uk'){
            setDF(deliveryFee = 230)
        }
        else if(deliverycountry == 'us'){
            setDF(deliveryFee = 270)
        }
        else if(deliverycountry == 'canada'){
            setDF(deliveryFee = 280)
        }
        else if(deliverycountry == 'france'){
            setDF(deliveryFee = 230)
        }
        else if(deliverycountry == 'ghana'){
            setDF(deliveryFee = 25)
        }
        else{
            setDF(deliveryFee = 0)
        }
     
        
    }, [deliverycountry]);



    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const OrderForm = () => {
        return getTotal() > 0 ? (
            <div>

        <form>
          <div className="row">

          <div className="col-12">
              <div className="form-group">
                <label className="text-muted">Full Name :</label>
                
                <input onChange={handleDev('fullname')} type="text" className="form-control" value={fullname}/>
            </div>

              </div>
              <div className="col-12">
              <div className="form-group">
            <label className="text-muted">Delivery Country</label>
            <select onChange={handleDev('deliverycountry')} className="form-control" value={deliverycountry} >
            <option>Please select</option>
            <option value ="uk">United Kingdom</option>
            <option value ="us">United States</option>
            <option value ="canada">Canada</option>
            <option value ="france">France</option>
            <option value ="ghana">Ghana</option>
            <option value ="other">Other</option>

            </select>
            
        </div>
              </div>
              <div className="col-12">
              <div className="form-group">
                <label className="text-muted">Delivery Address :</label>
               <textarea row="5"  onChange={handleDev('address')} className="form-control" value={address} ></textarea>
            </div>

              </div>

<div className="col-12">
<div className="form-group">
                <label className="text-muted">Phone Number :</label>
                <input onChange={handleDev('phonenumber')} type="text" className="form-control" value={phonenumber}/>
            </div>

</div>


              
          </div>

            


           
           
          
           
        </form>
        { address != "" && phonenumber != "" && fullname != "" ? 
<button className="btn btn-warning"
onClick={() => {


  handleFlutterPayment({
     
    callback: (response) => {
      console.log(response);
   
      if(response.status === 'successful'){
        const createOrderData = {
            products: products,
            transaction_id: response.transaction_id,
            amount: response.amount,
            address: address,
            name: fullname,
            email: userMail,
            delivery_fee : deliveryFee,
            delivery_country : deliverycountry


        };

        createOrder(userId, token, createOrderData)
            .then(response => {
                emptyCart(() => {
                    setRun(!run); // run useEffect in parent Cart
                    console.log('Payment was successful ');
                    setData({
                        loading: false,
                        success: true
                    });
                });
            })
            .catch(error => {
                console.log(error);
                setData({ loading: false });
            });

    }


    },
    onClose: () => {},
  });
}}
>
   
    
Proceed to Payment
</button> : '' }
</div>
    ) : ''
}

    const showCheckout = () => {
        return isAuthenticated()  ? (
            <div className="row text-center justify-content-center">
            
            </div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

  

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div className="p-4" style={{borderColor:"black",borderStyle:'solid',borderWidth:'3px'}}>
             <b> Delivery Fee: ${deliveryFee}</b>
             <br/>
             <b> Total: ${getTotal()+ deliveryFee}</b>
             <br/>
             {isAuthenticated() && OrderForm()}
 
         
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}

        </div>
    );
};

export default Checkout;

