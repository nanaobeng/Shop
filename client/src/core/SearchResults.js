import React , {useState, useEffect} from 'react';
import Menu from './Menu'
import Footer from './Footer'
import Card from './Card'
import {Link} from 'react-router-dom'

import { ExternalLink } from 'react-external-link';
import { isAuthenticated } from '../auth';
import { getCategories , list } from "./apiCore";
const SearchResults = (props) => {
    const [data, setData]= useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false

    })

    const {categories, category,search, results , searched} = data;

const loadCategories = () => {
    getCategories().then(data => {
        if(data.error){
            console.log(data.error)
        }
        else{
            setData({ ...data, categories : data})
        }
    })
}


useEffect(() => {

    loadCategories()

}, []);

const searchData = (search) => {

 

    
   if(search){
       list({search: search || undefined, category})
       .then(response => {
           if(response.error){
               console.log(response.error)
           }
           else{
               setData({
                   ...data,
                   results: response,
                   searched:true

               })
           }
       })
   }
}

const individualId = props.match.params.individualId


const [error , setError ] = useState (false)
const [limit , setLimit ] = useState (6)
const [skip , setSkip ] = useState (0)
const [size , setSize ] = useState (0)
const [filteredResults, setfilteredResults] = useState ([])













    const [individual , setIndividual] = useState("")
  
   


    


    useEffect(() => {
        console.log('d')
        console.log(props.match.params)
        const individualId = props.match.params.searchId
        searchData(individualId)
       
     
     
    }, [props])



const searchMessage = (searched , results) => {
    if(searched && results.length > 0) {
        return <div className="text-center">{`${results.length} products found.`}</div>
    }

    if(searched && results.length < 1) {
        return <div className="text-center">No products found</div>
    }
}

const searchedProducts = (results = []) => {
    return(
    <div>
        <h2 className="mt-4 mb-4">
            {searchMessage(searched, results )}
        </h2>
        <div className="row">
        {results.map((product,i) => (
            <div className="col-md-3 col-sm-6">

            <Card key={i} product={product} />
            </div>
        ))}
    </div>
    </div>
    )

}

    return(
        <div>
      
            

<Menu/>
       
         
 
      <div className="container-fluid mb-3">
          
                {searchedProducts(results)}
                
            </div>
     
     <Footer/>
       </div>

      



        
        )


}

export default SearchResults