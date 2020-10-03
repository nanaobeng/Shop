import React , {useState, useEffect} from 'react';
import Layout from './Layout'
import Card from './Card'
import { getCategories , getCollections ,getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import CollectionsBox from './CollectionsBox'
import { prices} from './fixedPrices'
import Radiobox from './RadioBox'






const Shop = () => {

    const[myFilters, setMyFilters] = useState({
        filters: { category: [],price: [], collections: []}
    })


    const [categories , setCategories ] = useState ([])
    const [collection , setCollection ] = useState ([])
    const [error , setError ] = useState (false)
    const [limit , setLimit ] = useState (6)
    const [skip , setSkip ] = useState (0)
    const [size , setSize ] = useState (0)
    const [filteredResults, setfilteredResults] = useState ([])

    const init = () => {
        getCategories()
        .then(data => {
            if(data.error){
            setError(data.error)
            }else{
               setCategories(data)
            }
        })
        getCollections()
        .then(collection_data => {
            if(collection_data.error){
            setError(collection_data.error)
            }else{
               setCollection(collection_data)
            }
        })
    }

    const loadFilteredResults = (newFilters) => {
        //console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters)
        .then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setfilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }


    const loadMore = () => {
       let toSkip = skip + limit
        getFilteredProducts(toSkip,limit,myFilters.filters)
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
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
    }

    useEffect(() => {
        init()
       
        loadFilteredResults(skip,limit,myFilters.filters)
        
    }, [])


    const handleFilters = (filters,filterBy) => {
        //console.log('Shop' ,filters,filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters
        if(filterBy === "price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
       loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }

        return array;
    }

   
    return (

        <Layout 
        title="Shop Page" description=" find products" className="container-fluid">
            <div class="site-wrap">
            <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0"><a href="index.html">Home</a> <span class="mx-2 mb-0">/</span> <strong class="text-black">Shop</strong></div>
        </div>
      </div>
    </div>
    <div className="site-section">
    <div class="container">
    <div class="row mb-5">
    <div class="col-md-12 order-2">


<div class="row ">

  <div class="col-3">

      <div className="row">
          <div className="col-12">
              <div className="card">

                  <div className="card-body p-4">
                  <b>Collections</b>
                      <hr style={{borderColor:'black'}}/>
                  <CollectionsBox collection={collection}  handleFilters={ filters =>
                         handleFilters(filters, 'collections')}/>

                         <br/>
                         <br/>
                      <b>Categories</b>
                      <hr style={{borderColor:'black'}}/>
                  <Checkbox categories={categories}  handleFilters={ filters =>
                         handleFilters(filters, 'category')}/>

                         <br/>
                         <br/>
                         <b>Price Range</b>
                      <hr style={{borderColor:'black'}}/>
                      <Radiobox prices={prices}  handleFilters={ filters =>
                         handleFilters(filters, 'price')}/>


                  </div>
              </div>
          </div>

      </div>


                   
              
          
  </div>




  <div class="col-9">
  <div className="row">
  {filteredResults.map((product,i)=> (
                    
                    <div key={i} className="col-4 mb-3">
                    <Card  product={product} />
                    </div>
                        
    
))}        
        <hr/>
                  {loadMoreButton()}             
      </div>
  </div>
 

 
 
  


  
 
 

  


</div>

</div>
        </div>
        
        

    </div>

    </div>
                
            </div>



        
</Layout>

    )
};


export default Shop