import React, { useState , useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useFlutterwave } from 'flutterwave-react-v3';
import { isAuthenticated } from '../auth';


const FlutterWave = ({
  val}) => {
  const [redirect, setRedirect] = useState(false);
  const userId = isAuthenticated() && isAuthenticated().user.email;
  const userName = isAuthenticated() && isAuthenticated().user.name;


  const [values, setValues] = useState({
    public_key: 'FLWPUBK-0dfd41acb05e3084ad11927bed58af25-X',
    tx_ref: Date.now(),
    amount: '',
    currency: 'GHS',
    payment_options: 'card,mobilemoney',
    customer: {
      email: userId,
      phonenumber: '0264341678',
      name: userName,
    },
    customizations: {
      title: 'Ewemocha',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  })

  
  useEffect(() => {

        setValues({...values, amount:val})
    
},[val]);

  const handleFlutterPayment = useFlutterwave(values);


  
  

 

 

  return (
 
    <div>
   <div className="App">
  <h1>{val}</h1>
 
      <button
        onClick={() => {
        
           
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
            },
            onClose: () => {},
          });
        }}
      >
        Payment
      </button>
    </div>

      </div>
 
  );
};

export default FlutterWave;
