import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { getCategories , list } from "./apiCore";
import Card from './Card'




const Search = () => {

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

const searchData = () => {

 
   console.log(search,category)
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

const searchSubmit = (e) => {
e.preventDefault()

window.location.replace(`/search/${search}`);



}

const handleChange = (name) =>(event) => {

    setData({
        ...data,
        [name]:event.target.value,
        searched: false
    });

}

const searchMessage = (searched , results) => {
    if(searched && results.length > 0) {
        return `Found ${results.length} products`
    }

    if(searched && results.length < 1) {
        return `No products found`
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
            <Card key={i} product={product} />
        ))}
    </div>
    </div>
    )

}

const searchForm = () => (
    <form onSubmit={searchSubmit}>
       
        
  
        

  <div class="input-group">
  <input type="search" className="form-control" 
        onChange={handleChange("search")}
        placeholder= "Search..." />
   
  </div>
    </form>
    )


    return (
        <div>
 
                {searchForm()}
                
        
         
        </div>
    )
}


export default Search