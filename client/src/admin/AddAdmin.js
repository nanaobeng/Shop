


import React, { useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin'
import {signup}  from '../auth'
import Menu from '../core/Menu'
import logo from '../user/logo.png'

const AddAdmin = () => {


    const [values, setValues] = useState(
        {
            name: '',
            email: '',
            password: '',
            role:1,
            error: '',
            success:false
        }
    )

        
    const {name,email,password , role, success, error} = values
    const handleChange = name => event => {

        setValues({...values, error:false, [name]:event.target.value})

    }

   

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({ ...values,error:false})
        signup({name,email,password,role})
        .then(data => {
            if(data.error){
                setValues({ ...values, error: data.error,success:false})
            }else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    role:1,
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
                <button onClick={clickSubmit} style={{width:'100%',backgroundColor: 'black'}} className="btn"><span style={{color:'white'}}>Create Admin</span></button>
                </div>
            </div>
            <br/>
            
        </form>
    )

    const showError = () => (

        <div className="alert alert-danger" style={{display:error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display:success ? '' : 'none'}}>
            New administrator has been created
        </div>
    )
    return(
    <div >
        <div className="row ">
            <div className="col-12">
                <Menu/>
            </div>
        </div>
        <div class="row p-4"  style={{height:'100vh'}}>
      
       <div className="col-12 p-4" style={{padding:'50px',paddingTop:'10px'}}>
           
           <div className="row text-center">
               <div className="col-12 justify-content-center">
               <b style={{color:'gray'}}> Create Admin</b>
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

export default AddAdmin