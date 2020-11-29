import React, { useState , useEffect} from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth';
import {Link} from 'react-router-dom';
import {createProduct , getCategories, getCollections} from './apiAdmin';
//import { set } from 'mongoose';

const AddProduct = () => {

    const {user,token} = isAuthenticated()
    const [values,setValues] = useState({
        name:'',
        description: '',
        price: '',
        collection: [],
        collections : '',
        categories: [],
        category: '',
        shipping:'',
        quantity: '',
        photo:'',
        isSmall:'',
        isLarge:'',
        isMedium:'',
        
    loading : false ,
error : '',
createdProduct : '',
redirectToProfile: false,
formData: ''
    })
    const {

        name,
        description,
        price,
        categories,
        category,
        collections,
       collection,
        shipping,
        quantity,
        isLarge,
        isMedium,
        isSmall,
     
    loading ,
error ,
createdProduct ,
redirectToProfile,
formData

    } = values;


const init = () => {
    getCategories()
    .then(data => {
        if(data.error){
        setValues({ ...values, error: data.error})
        }else{

            getCollections()
            .then(collection_list => {
                if(collection_list.error){
                setValues({ ...values, error: collection_list.error})
                }else{
                    setValues({...values, categories: data,collection: collection_list, formData: new FormData()})
                }
            })

            
        }
    })
   
 
   

   
}





useEffect (() => {
  
   
    
    init()
    
}, [])

const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name,value)
    setValues({ ...values, [name]: value})
}

const clickSubmit = (event) => {
    event.preventDefault();
    setValues({
        ...values, error:'',loading:true
    });

    createProduct(user._id,token,formData)
    .then(data => {
        if(data.error){
            setValues({...values,error:data.error})
        }
        else {
            setValues({
                ...values, name:'', description, 
                price: '',
             
                //categories: [],
                //category: '',
               // shipping:'',
                quantity: '',
                photo:'',
            loading : false ,
        //error : '',
        createdProduct : data.name,
        //redirectToProfile: false,
            })
        }
    })
}
 

const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
        <br/>
        <br/>
        <h4>Post Photo</h4>
        <div className="form-group">
            <label className="btn btn-outline-secondary"> 
            <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
            </label>
        </div>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')}  type="text" className="form-control" value={name} />
            
        </div>

        <div className="form-group">
            <label className="text-muted">Description</label>
            <textarea onChange={handleChange('description')}  className="form-control" value={description} />
            
        </div>

        <div className="form-group">
            <label className="text-muted">Price</label>
            <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            
        </div>
        <div className="form-group">
            <label className="text-muted">Collection</label>
            <select onChange={handleChange('collections')} className="form-control" value={collections} >
            <option >Please select</option>
            {collection && collection.map((co,i) => (
                <option key={i} value={co._id}>
                    {co.name}
                </option>
            ))}
            
            </select>
            
        </div>

        <div className="form-group">
            <label className="text-muted">Category</label>
            <select onChange={handleChange('category')} className="form-control" value={category} >
            <option >Please select</option>
            {categories && categories.map((c,i) => (
                <option key={i} value={c._id}>
                    {c.name}
                </option>
            ))}
            
            </select>
            
        </div>


        <div className="form-group">
            <label className="text-muted">Quantity</label>
            <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            
        </div>

        <div className="form-group">
            <label className="text-muted">Shipping</label>
            <select onChange={handleChange('shipping')} className="form-control" value={shipping} >
            <option>Please select</option>
            <option value ="1">Yes</option>
            <option value ="0">No</option>

            </select>
            
        </div>

        <div className="form-group">
            <label className="text-muted">Small Size Available?</label>
            <select onChange={handleChange('isSmall')} className="form-control" value={isSmall} >
            <option>Please select</option>
            <option value ="1">Yes</option>
            <option value ="0">No</option>

            </select>
            
        </div>

        <div className="form-group">
            <label className="text-muted">Medium Size Available?</label>
            <select onChange={handleChange('isMedium')} className="form-control" value={isMedium} >
            <option>Please select</option>
            <option value ="1">Yes</option>
            <option value ="0">No</option>

            </select>
            
        </div>

        <div className="form-group">
            <label className="text-muted">Large Size Available</label>
            <select onChange={handleChange('isLarge')} className="form-control" value={isLarge} >
            <option>Please select</option>
            <option value ="1">Yes</option>
            <option value ="0">No</option>

            </select>
            
        </div>

        <button className="btn btn-outline-primary"> Create Product</button>


    </form>
)
const showError = () => {
    if(error){
        return <div className="alert alert-danger">
        {error}
    </div>
    }
    
    
}


const showSuccess = () => {
    if(createdProduct){
        return <div className="alert alert-info">
        <h2>{`${createdProduct} is created` }</h2>
    </div>
    }
}


const showLoading = () => (

    loading && (<div className="alert alert-info">

        <h2>Loading...</h2>

    </div>)
)
    return (

        <Layout title="Add Product" description={ `Hello ${user.name}`} className="container-fluid">
            <br/>
              <div >
            <Link to ="/admin/dashboard" className="text-warning">
                Back to dashboard
                </Link>
        </div>
        <div className="row">
            <div className="col-md-8 offset-md-3">
               
                {showLoading()}
              {newPostForm()}
              <br/>
              {showError()}
              <br/>
                {showSuccess()}
                <br/>
            
        <br/>
        <br/>

                </div>
             
            
        </div>
            
            
        </Layout>

    )

    
}
 export default AddProduct;
