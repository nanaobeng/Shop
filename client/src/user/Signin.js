import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../core/Layout'
import logo from './logo.png';
import background from './background.jpg';
import {signin, authenticate , isAuthenticated}  from '../auth'
import Menu from '../core/Menu'


const Signin = () => {

    var divStyle = {
        backgroundImage: 'url(' + background + ')',
        width: '300px',
        backgroundRepeat: 'no-repeat',
  backgroundSize: '100%', 
  
      };
    const [values, setValues] = useState(
        {
           
            email: '',
            password: '',
            error: '',
            loading:false,
            redirectToReferrer: false,
        }
    )

        
    const {email,password , loading, error , redirectToReferrer} = values
    const {user} = isAuthenticated()
    const handleChange = name => event => {

        setValues({...values, error:false, [name]:event.target.value})

    }

   

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({ ...values,error:false,loading: true})
        signin({email,password})
        .then(data => {
            if(data.error){
                setValues({ ...values, error: data.error,loading:false})
            }else{
               authenticate(data,
                () => {
                    setValues({
                        ...values,
                        
                        
                        redirectToReferrer:true
                    })
                })
            }
        })

    }



    const signUpForm = () => (
        <form>
          

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
                <button onClick={clickSubmit} style={{width:'100%',backgroundColor: 'black'}} className="btn"><span style={{color:'white'}}>Sign In</span></button>
                </div>
            </div>
            <br/>
            <div className="row">
            <div className="col-6 justify-content-center text-left">

                    <p style={{color:'gray'}}> Don't have an account ? <span style={{color:'black'}} ><Link to="/signup"><u>Sign up here.</u></Link></span></p>
                    </div>

                    <div className="col-6  justify-content-center text-right">
                    <p style={{color:'gray'}}> <span style={{color:'black'}} ><Link to="/forgot-password"><u>Forgot Password?</u></Link></span></p>
                    </div>
                
            </div>
           
        </form>
    )

    const showError = () => (

        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => 
        loading && (
            <div className="row">
                <br/>
                <div className="col-12 justify-content-center text-center">
                <br/>
                <div class="spinner-border justify-content-center"></div>
                </div>
               
            </div>
        );


    const redirectUser = () => {
        if(redirectToReferrer) {
            if( user && user.role === 1 ){
                return <Redirect to="/admin/dashboard" />

            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){

            return <Redirect to="/" />

        }
    };
    
    return(
        <div>
        <div className="row">
            <div className="col-12">
                <Menu/>
            </div>
        </div>
        <div class="row justify-content-center" style={{height:'100vh'}}>
             
            <div className="col-md-10 col-sm-12" style={{padding:'50px'}}>
                <div className="row justify-content-center">
                <img className="img-fluid" src={logo} alt="Logo" />
                <br/>
                </div>
                <div className="row text-center">
                    <div className="col-12 justify-content-center">
                    <b style={{color:'gray'}}> Sign In</b>
                    </div>
                   
                </div>
            {showLoading()}
            {showError()}
{signUpForm()}
{redirectUser()}
                </div>
               

            

</div>
</div>
    )
}

export default Signin