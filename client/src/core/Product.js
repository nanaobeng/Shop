import React , {useState, useEffect} from 'react';
import Layout from './Layout'
import { read ,listRelated } from "./apiCore";
import Card from './Card'
import ShowImage from './ShowProductImage'



const Product = (props) => {

    const [product , setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error , setError] = useState(false)



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
            
       
       <div className="row p-4 justify-content-center ">
           <div className="col-12">
               <div className="row">
               <div className="col-4" style={{height:'600px'}}>
               <ShowImage item={product} url="product" style={{width:'100%',height:'400px'}}/>
               

               </div>
               <div className="col-5">
        <h2><b>{product.name}</b></h2>
        <span style={{color:'grey'}}>{product.description}</span>
        <br/>
        <br/>
        <h4 style={{color:'red'}}>${product.price}</h4>
        <br/>
  
        <div className="row">
            
                <div className="col-2">
                    <b>Size</b>
                </div>
                <div className="col-2 ">
           
                </div>
           
        </div>

        <br/>
        <div className="row">
            <div className="col-12 pt-2 text-center" style={{height:'40px',backgroundColor:'green',color:'#fff'}}>
                    <b>ADD TO CART</b>
            </div>
        </div>
               </div>
               </div>
          
           </div>

           <div className="col-12">
           <br/>
<hr/> 
               <h4>Related Products</h4>
               <hr/> 
               {relatedProduct.map((p,i) => (
                   <div key={i} className="col-4 mb-3">
                       <Card key={i} product={p} />
                       </div>
    ))}
           
       </div>
       
       </div>

      

        </Layout>
        
        )


}

export default Product