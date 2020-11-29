import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import logo from './logo.png'

import Collapsible from 'react-collapsible';
import moment from "moment";



const Dashboard = () => {
    const [history, setHistory] = useState([]);
    
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div className="card pt-4">
               
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">
                            My Cart
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>
                            Update Profile
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <div className="card p-1">
                <h3 className="card-header">Purchase History</h3>
              {history.length < 1 ? <div className="row p-4 justify-content-center text-center"><div className="col-12 p-4"> You currently have no purchase record</div></div> : ''}
                        {history.map((h, i) => {
                            return (
                                
                                <div className="row" key={i}> 
                                 <div className="col-12 p-4">
                                 <Collapsible trigger={h.transaction_id + " - " +moment(
                                                                h.createdAt
                                                            ).fromNow() } >

<div className="card p-1">
                <h3 className="card-header">INVOICE</h3>
              
                       
                                <div 
 className="row p-4 overflow-auto " >
    
                                        <div className="col-12 p-4">

                                            <div className="row p-2">
                                                <div className="col-8">
                                                <b>INVOICE</b>
                                                    <div className="row">

                                                       
                                                        
                                                        <div className="col-6" >
                                                            <span style={{color:'grey',fontSize:'9px'}}>ORDER ID</span>
                                                            <br/>
                                                            {h._id}
                                                        </div>

                                                        <div className="col-6" >
                                                            <span style={{color:'grey',fontSize:'9px'}}>DATE ISSUED</span>
                                                            <br/>
                                                            {moment(h.createdAt).format("LL")}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-4 justify-content-center text-right">
                                                <img className="img-fluid" src={logo} alt="Logo" />
                                                </div>
                                            </div>

                                            <div className="row p-2">
                                            <div className="col-12">
                                            <span style={{color:'grey',fontSize:'9px'}}>AMOUNT BILLED</span>
                                            
                                            </div>
                                            <div className="col-12">
                                           <h4>GH¢ {h.amount} </h4>
                                            
                                            </div>

                                            
                                            </div>

                                            <div className="row p-2">
                                            <div className="col-12" >
                                                            <span style={{color:'grey',fontSize:'9px'}}>BILLED TO</span>
                                                            <br/>
                                                            {h.name}
                                                            <br/>
                                                            {h.address}
                                                        </div>

                                            </div>
                                            <br/>
                                            <div className="row">
                                                <div className="col-12">
                                                    {h.status}
                                                </div>
                                            </div>
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
    {h.products.map((p, pIndex) => (
                           
                              
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
                                           

                                        </div>
                                    </div>


                                
                                    
    </div>
                                             
                                  </Collapsible>
                                            </div>
                                </div>
                            );
                        })}
                  
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row p-4">
               
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    <div className="row">
                   
                    </div>
                    
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
