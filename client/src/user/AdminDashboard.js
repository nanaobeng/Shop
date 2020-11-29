import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";


import Collapsible from 'react-collapsible';

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

  

  

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
           
            </div>
            <div>
            <div class="row">
    <div class="col-12 text-center p-3" style={{height:'5vh',backgroundColor: 'cornflowerblue'}}>

       
       


       

    </div>
</div>
<div class="container " >
    <div class="row p-4">
        <div class="col-12 p-4">
            <div class="row">
                <div class="col-12 text-center p-4">
                   <b> <span style={{color:'black'}}>Hi {name}, please select section you are interested in</span></b>

                </div>

            </div>

            <div class="row">
                <div class="col-12 text-center p-4">
                    <div class="row">
                        <div class="col-12">
                            <div class="row ">
                                <div class="col-md-4  col-sm-12  " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded" >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-12" >
                                                <img class="img-fluid" src="https://icon-library.com/images/add-image-icon/add-image-icon-1.jpg" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-12 p-2 text-center">
                                            <Link className="nav-link" to="/create/collection">
                            Create Collection
                        </Link>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>




                                <div class="col-md-4  col-sm-12 " >
                                    <div class=" quick_nav card shadow-lg p-3 mb-5 bg-white rounded" >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-12" >
                                                <img class="img-fluid" src="https://icon-library.com/images/add-image-icon/add-image-icon-1.jpg" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-12 p-2 text-center">
                                            <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-4  col-sm-12 " >
                                    <div class=" quick_nav card shadow-lg p-3 mb-5 bg-white rounded" >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-12" >
                                                <img class="img-fluid" src="https://www.pngitem.com/pimgs/m/325-3256236_products-icon-vector-product-icon-png-transparent-png.png" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-12 p-2 text-center">
                                            <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-4  col-sm-12  " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded" >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-12" >
                                                <img class="img-fluid" src="https://conceptdraw.com/a3180c3/p36/preview/640/pict--sales-orders-sales-workflow-vector-stencils-library" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-12 p-2 text-center">
                                            <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>



                                <div class="col-md-4  col-sm-12  " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded" >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-12" >
                                                <img class="img-fluid" src="https://www.kindpng.com/picc/m/264-2640143_clipart-books-inventory-inventory-clipart-hd-png-download.png" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-12 p-2 text-center">
                                            <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-4  col-sm-12  " >
                                    <div class="quick_nav card shadow-lg p-3 mb-5 bg-white rounded" >
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-12" >
                                                <img class="img-fluid" src="https://png.pngtree.com/element_our/png_detail/20181227/administration-vector-icon-png_286819.jpg" style={{height:'50px'}}  />
                                            </div>
                                            <div class="col-12 p-2 text-center">
                                            <Link className="nav-link" to="/admin/add">
                            Add Administrator
                        </Link>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>

                               






                                
        
                              
                            </div>
                </div>
                    </div>

                </div>

            </div>
   
        </div>
    </div>
 
</div>

                
            </div>
        </Layout>
    );
};

export default AdminDashboard;
