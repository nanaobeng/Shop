import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    
    let revenue = 0
    let stockValue = 0

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row justify-content-center">
                <br/>
            <div class="col-10 justify-content-center">
            <br/>
            <br/>
                            <div class="row ">
                                <div class="col-md-4 col-sm-12  " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded  justify-content-center" >
                                        <div class="card-body justify-content-center ">
                                            <div class="row justify-content-center ">
                                                <div class="col-3 text-center justify-content-center" >
                                                <img class="img-fluid text-center" src="https://www.pngitem.com/pimgs/m/325-3256236_products-icon-vector-product-icon-png-transparent-png.png" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-5 p-1 ">
                                            <b> Products <br/>{products.length}</b>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>




                                <div class="col-md-4 col-sm-12 " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded  justify-content-center" >
                                        <div class="card-body justify-content-center ">
                                            <div class="row justify-content-center ">
                                                <div class="col-3 text-center justify-content-center" >
                                                <img class="img-fluid text-center" src="https://png.pngtree.com/element_our/png_detail/20181227/growth-vector-icon-png_286772.jpg" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-5 p-1 ">
                                            {products.map((prod,i) => {
                                           
                                           revenue = revenue + (parseFloat(prod.price) * parseFloat(prod.sold))
                                          
                                           
                                       })}
                                      <b>Total Revenue <br/> {revenue} GH¢</b> 
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-4 col-sm-12 " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded  justify-content-center" >
                                        <div class="card-body justify-content-center ">
                                            <div class="row justify-content-center ">
                                                <div class="col-3 text-center justify-content-center" >
                                                <img class="img-fluid text-center" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSS3djDy4_5u2-zbvqszDnzHkyBXdHxVhBexw&usqp=CAU" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-5 p-1 ">
                                            {products.map((prod,i) => {
                                           
                                                stockValue = stockValue + (parseFloat(prod.price) )
                                               
                                                
                                            })}
                                           <b> Stock Value <br/> {stockValue} GH¢</b> 
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                             

                          





                              
        
                              
                            </div>
                </div>
            </div>
            <div className="row  justify-content-center " >
                <div className="col-10 shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="row p-4">
                        <div className="col-12">
                        <div className="row ">
                                   <div className="col-4">
                                        <b>Product</b>
                                   </div>
                                   <div className="col-2">
                                   <b>Price</b>
                                   </div>
                                   <div className="col-2">
                                   <b>Quantity</b>
                                   </div>
                                   <div className="col-1">
                                   <b>Sold</b>
                                   </div>
                                   <div className="col-1">
                                       
                                   </div>
                                   <div className="col-1">
                                       
                                   </div>
                               </div>
                               <hr/>
                               
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-12">
                        {products.map((p, i) => (
                                    
                                    
                               <div className="row p-4" key={i}>
                                   <div className="col-4">
                                <strong>{p.name}</strong>

                                   </div>
                                   <div className="col-2">
                                   GH¢ {p.price}
                                   </div>
                                   <div className="col-2">
                                       {p.quantity}
                                   </div>
                                   <div className="col-1">
                                       {p.sold}
                                   </div>
                                   <div className="col-1">
                                   <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                       
                                   </div>
                                   <div className="col-1">
                                  
                                <span   onClick={() => {if(window.confirm('Are you sure you want to delete the product?')){destroy(p._id)};}} style={{color:'red'}} class="material-icons">
delete_forever
</span>
                                       
                                   </div>
                               </div>
                               
                               
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </Layout>
    );
};

export default ManageProducts;
