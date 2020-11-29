import React , {useState, useEffect} from 'react';

import RelatedCard from './Card'
import {getFilteredSingleProducts } from './apiCore'
import {Link} from 'react-router-dom'
import Card from './ProductCard'

import { isAuthenticated } from '../auth';
import Menu from './Menu'
import Footer from './Footer'
const SingleProduct = (props) => {

  const[myFilters, setMyFilters] = useState({
    filters: { name: [] }
})

const individualId = props.match.params.individualId

const [relatedProduct, setRelatedProduct] = useState([])
const [error , setError ] = useState (false)
const [limit , setLimit ] = useState (6)
const [skip , setSkip ] = useState (0)
const [size , setSize ] = useState (0)
const [filteredResults, setfilteredResults] = useState ([])
const [individual , setIndividual] = useState("")
let [loading,setLoading] = useState(false)

const loadFilteredResults = (newFilters) => {
    //console.log(newFilters)
    getFilteredSingleProducts(skip,limit,newFilters)
    .then(data => {
        if(data.error){
            setError(data.error)
        }
        else{
            setfilteredResults(data.data)
            setLoading({loading : true})
            setSize(data.size)
            setSkip(0)
         
        }
    })
}


const loadMore = () => {
   let toSkip = skip + limit
   getFilteredSingleProducts(toSkip,limit,myFilters.filters)
    .then(data => {
        if(data.error){
            setError(data.error)
        }
        else{
            setfilteredResults([...filteredResults ,...data.data])
            setSize(data.size)
            setSkip(toSkip)
        }
    })
}

const loadMoreButton = () => {
    return (
        size > 0 && size >= limit && (
  
                <span onClick={loadMore} className=" btn btn-outline-dark text-center justify-content-center  ">Load more</span>
            

            
        )
    )
}

useEffect(() => {

   
    loadFilteredResults(skip,limit,myFilters.filters)
    
}, [])


const handleFilters = (filters,filterBy) => {
    
    const newFilters = {...myFilters}
    newFilters.filters[filterBy] = filters
   
   loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
}




  
  
   


    


    useEffect(() => {
      console.log('ere')
      console.log(props.match.params)
        const individualId = props.match.params.productId
        setIndividual(individualId)
       
     
     
    }, [props])

    return(
        <div>
          <Menu/>
      
            
          {loading ?  

<div>
          


         
         {filteredResults.map((insight,i)=> (

           
    
         insight._id === individual && 
         
   <div className="row"> 
      
<div className="col-12">
         
         
            {<Card product={insight} showViewProductButton={false} />} </div>
               

  

       </div>
     
     
       
       
         ))}

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
     </div>
     }
     <Footer/>

     
       </div>

      



        
        )


}

export default SingleProduct