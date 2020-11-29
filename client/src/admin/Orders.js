import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin"
import logo from '../user/logo.png';
import moment from "moment";

import Collapsible from 'react-collapsible';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    let unprocessed = 0
    let delivered = 0

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
      
            loadOrders();

        
        
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="row  row justify-content-center pt-4">
                        <div class="col-4  " >
                                    <div class=" quick_nav " >
                                        <div >
                                            <div className="row">
                                                <div className="col-12">
                                                    <img className="img-fluid" src="https://png.pngitem.com/pimgs/s/207-2071176_customer-vector-online-shopping-online-order-icon-png.png" style={{width:'100%',height:'100%'}} />
                                                </div>
                                            </div>
                                            <div class="row">
                                                
                                            <div class="col-12 p-2 text-center">

                                            <b>{orders.length} </b>
                                            <br/>
                                            <b>Total Orders</b>
                                            </div>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>



                                
                               


                                
                        </div>
                    </div>
                </div>
                
            );
        } else {
            return <h1 className="text-danger">You currently have no orders</h1>;
        }
    };



    const handleStatusChange = (e, orderId,uName,transaction) => {
        updateOrderStatus(user._id, token, orderId, e.target.value,uName,transaction).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>

       
       
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id,o.name,o.transaction_id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`G'day ${
                user.name
            }, you can manage all the orders here`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                   

                    {orders.map((o, oIndex) => {
                        return (

                            





<Collapsible trigger={o.transaction_id + " - " + o.status }>

<div 
 className="row p-4 overflow-auto " key={oIndex}>
     <div className="col-12">
     {showStatus(o)}
     </div>
                                        <div className="col-12 p-4">

                                            <div className="row p-2">
                                                <div className="col-8">
                                                <b>INVOICE</b>
                                                    <div className="row">

                                                       
                                                        
                                                        <div className="col-6" >
                                                            <span style={{color:'grey',fontSize:'9px'}}>ORDER ID</span>
                                                            <br/>
                                                            {o._id}
                                                        </div>

                                                        <div className="col-6" >
                                                            <span style={{color:'grey',fontSize:'9px'}}>DATE ISSUED</span>
                                                            <br/>
                                                            {moment(o.createdAt).format("LL")}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-4 justify-content-center text-right">
                                                <img className="img-fluid" src={logo} alt="Logo" />
                                                </div>
                                            </div>

                                            <div className="row p-2">
                                            <div className="col-12" >
                                                            <span style={{color:'grey',fontSize:'9px'}}>BILLED TO</span>
                                                            <br/>
                                                            {o.name}
                                                            <br/>
                                                            {o.address}
                                                        </div>

                                            </div>
                                            <br/>
                                            <div className="row">
                                                <div className="col-12">
                                                <table class="table table-bordered">
    <thead>
      <tr style={{color:'grey',fontSize:'9px'}}>
        <th>PRODUCT</th>
        <th>SIZE</th>
        <th>UNIT COST</th>
        <th>QUANTITY</th>
        <th>AMOUNT</th>
      </tr>
    </thead>
    <tbody>
    {o.products.map((p, pIndex) => (
                           
                              
      <tr  key={pIndex}>
        <td> { p.name}</td>
        <td> { p.size}</td>
        <td>{ p.price}</td>
        <td>{ p.count}</td>
        <td>{parseFloat( p.count) * parseFloat(p.price)}</td>
      </tr>
        ))}
      
    </tbody>
  </table>
                                                
                                                </div>

                                            </div>

                                            <br/>
                                            <div className="row">
                                            <div className="col-12">
                                            <span style={{color:'grey',fontSize:'9px'}}>AMOUNT BILLED</span>
                                            
                                            </div>
                                            <div className="col-12">
                                           <h4>GH¢ {o.amount}</h4>
                                            
                                            </div>

                                            
                                            </div>

                                        </div>
                                    </div>



                        </Collapsible>
                           
                        );
                    })}
                </div>
                <br/>
            </div>
        </Layout>
    );
};

export default Orders;
