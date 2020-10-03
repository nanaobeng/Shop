import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';


import {forgotPassword}  from '../auth'
import Menu from '../core/Menu'


const ForgotPassword = () => {

    
    const [values, setValues] = useState(
        {
           
            email: '',
            error: '',
            loading:false,
            isSent:false
            
        }
    )

        
    const {email,loading,isSent, error } = values
   
    const handleChange = name => event => {

        setValues({...values, error:false, [name]:event.target.value})

    }

   

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({ ...values,error:false,loading: true})
        forgotPassword({email})
        .then(data => {
            if(data.error){
                setValues({ ...values, error: data.error,loading:false})
            }else{
                setValues({ ...values, isSent:true, loading:false})
            }
        })

    }



    const ResetForm = () => (
        <form>
          

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>


           
            <div className="row">
                <div className="col-12">
                <button onClick={clickSubmit} style={{width:'100%',backgroundColor: 'black'}} className="btn"><span style={{color:'white'}}>Confirm</span></button>
                </div>
            </div>
           
           
        </form>
    )

    const showError = () => (

        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => {
        if(isSent){
            return <div className="alert alert-success">
            <h2>{`Email is sent. Kindy check your email and follow the instructions` }</h2>
        </div>
        }
    }

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


    
    
    return(
        <div>
        <div className="row">
            <div className="col-12">
                <Menu/>
            </div>
        </div>
        <div class="row" style={{height:'100vh'}}>
             
            <div className="col-12" style={{padding:'50px'}}>
                <div className="row justify-content-center">
      
                <br/>
                </div>
                <div className="row text-center">
                    <div className="col-12 justify-content-center">
                    <b style={{color:'gray'}}> Reset Password</b>
                    </div>
                   
                </div>
            {showLoading()}
            {showError()}
            {showSuccess()}
{ResetForm()}

                </div>
               

            

</div>
</div>
    )
}

export default ForgotPassword