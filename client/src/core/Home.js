import React , {useState, useEffect} from 'react';
import Layout from './Layout'
import { getProducts } from "./apiCore";
import Card from './Card'
import Search from './Search'
import background from './DSC09719.JPG';


const Home = () => {
    var divStyle = {
        backgroundImage: 'url(' + background + ')',
        
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover' 
  
      };
    const [productsBySell,setProductBySell] = useState([])
    const [productsByArrival,setProductByArrival] = useState([])
    const [error,setError] = useState(false)


    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            }
            else {
                setProductBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            }
            else {
                setProductByArrival(data)
            }
        })
    }

    useEffect(() => {
       loadProductsByArrival()
       loadProductsBySell()
    }, [])
return(
<Layout className="container-fluid">
    <div className="row" style={{height:'400px'}}>
        <div className="col-12 text-center justify-content-center" style={divStyle}>

            <div class="row h-100" >
                <div className="col-12 my-auto">
                    <button className="btn btn-outline-black " style={{backgroundColor:'#fff',borderColor:'black',borderStyle:'solid',borderWidth:'3px'}}>Shop Now</button>
                </div>

            </div>
            

        </div>
    </div>
    <br/>
    <div className="row p-2 ">
        <div className="col-3 " >
            <div className="col-12 " style={{height:'350px',backgroundColor:'green'}}>

            </div>
            <div className="col-12 text-center " style={{backgroundColor:'red'}}>
                <b>Paid</b>


            </div>
            

        </div>
        <div className="col-3 " >
        <div className="col-12 " style={{height:'350px',backgroundColor:'green'}}>

</div>
<div className="col-12 text-center " style={{backgroundColor:'red'}}>
                <b>Paid</b>


            </div>

        </div>
        <div className="col-3" >
        <div className="col-12 " style={{height:'350px',backgroundColor:'green'}}>

</div>
<div className="col-12 text-center " style={{backgroundColor:'red'}}>
                <b>Paid</b>


            </div>

        </div>
        <div className="col-3" >
        <div className="col-12 " style={{height:'350px',backgroundColor:'green'}}>

</div>
<div className="col-12 text-center " style={{backgroundColor:'red'}}>
                <b>Paid</b>


            </div>

        </div>
    </div>
    <Search/>
    
<h2 className="mb-4">Best Sellers</h2>
<div className="row">
{productsBySell.map((product,i)=> (
    <div key={i} className="col-4 mb-3">
    <Card  product={product} />
    </div>
))}
</div>

<hr/>

<h2 className="mb-4">New Arrivals</h2>
<div className="row">
{productsByArrival.map((product,i)=> (
    <div key={i} className="col-4 mb-3">
        <Card  product={product} />
        </div>
    
))}
</div>
</Layout>

)
}

export default Home