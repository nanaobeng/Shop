import React , {useState, useEffect} from 'react';
import Layout from './Layout'
import { read ,listRelated } from "./apiCore";
import Card from './ProductCard'
import RelatedCard from './Card'
import ShowImage from './ShowImage'



const Product = (props) => {

    const [product , setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error , setError] = useState(false)
    let [loading,setLoading] = useState(false)



    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error)
            }
            else {
                setProduct(data)
                listRelated(data._id)
                .then(data => {
                    if(data.error){
                        setError(data.error)
                    }
                    else{
                        setRelatedProduct(data)
                        setLoading({loading : true})
                    }
                })
            }
        })

    }


    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return(

        <Layout 
        title={product && product.name} 
        description={product &&  
            product.description &&
            product.description.substring(0,100)} 
        className="container-fluid justify-content-center ">


        {loading ? <div className="row p-4 justify-content-center ">
           
           <div class="col-12">
           <div className="col-8"></div>
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
            
           </div>
{relatedProduct.length > 0 ?   <div className="col-12">
           <br/>

<hr/> 
               <h4 className="text-center" style={{color:'gray'}}>Related Products</h4>
               <hr/> 
               <div className="row">
                   
               {relatedProduct.map((p,i) => (
                   <div key={i} className="col-md-4 col-sm-12 ">
                       <RelatedCard key={i} product={p} />
                       </div>
    ))}
           </div>
       </div> : ''}
         
       
       </div>
  :      
  <div class="container justify-content-center text-center p-4">
  <div className="row justify-content-center text-center p-4">
      <div className="col-12 justify-content-center text-center p-4" style={{height:'100vh'}}>
  
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
                                          
  <div class="spinner-grow text-muted"></div>
  <div class="spinner-grow text-primary"></div>
  <div class="spinner-grow text-success"></div>
  <div class="spinner-grow text-info"></div>
  <div class="spinner-grow text-warning"></div>
  <div class="spinner-grow text-danger"></div>
  <div class="spinner-grow text-secondary"></div>
  <div class="spinner-grow text-dark"></div>
  <div class="spinner-grow text-light"></div>
  </div>
  </div>
  </div> } 
       
       
      

        </Layout>
        
        )


}

export default Product