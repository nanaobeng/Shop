import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout'
import logo from './logo.png';
import background from './background.jpg';
import {signup}  from '../auth'
import Menu from '../core/Menu'

const Signup = () => {

    var divStyle = {
        backgroundImage: 'url(' + background + ')',
        width: '300px',
        backgroundRepeat: 'no-repeat',
  backgroundSize: '100%', 
  
      };
    const [values, setValues] = useState(
        {
            name: '',
            email: '',
            password: '',
            error: '',
            success:false
        }
    )

        
    const {name,email,password , success, error} = values
    const handleChange = name => event => {

        setValues({...values, error:false, [name]:event.target.value})

    }

   

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({ ...values,error:false})
        signup({name,email,password})
        .then(data => {
            if(data.error){
                setValues({ ...values, error: data.error,success:false})
            }else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success:true
                })
            }
        })

    }



    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>


            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
     
            <div className="row">
                <div className="col-12">
                <button onClick={clickSubmit} style={{width:'100%',backgroundColor: 'black'}} className="btn"><span style={{color:'white'}}>Sign Up</span></button>
                </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-12 justify-content-center text-center">
                    <p style={{color:'gray'}}> Already have an account ? <span style={{color:'black'}} ><Link to="/signin"><u>Sign in here.</u></Link></span></p>
                    </div>
                
            </div>
        </form>
    )

    const showError = () => (

        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display:success ? '' : 'none'}}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )
    return(
    <div>
        <div className="row">
            <div className="col-12">
                <Menu/>
            </div>
        </div>
        <div class="row" style={{height:'100vh'}}>
        <div className="col-6" style={divStyle} >
           
           </div>
       <div className="col-6" style={{padding:'50px',paddingTop:'10px'}}>
           <div className="row justify-content-center">
           <img className="img-fluid" src={logo} alt="Logo" />
        
           </div>
           <div className="row text-center">
               <div className="col-12 justify-content-center">
               <b style={{color:'gray'}}> Sign Up</b>
               </div>
              
           </div>
           {showSuccess()}
            {showError()}
{signUpForm()}
           </div>
          

       

</div>
            
</div>

    )
}

export default Signup