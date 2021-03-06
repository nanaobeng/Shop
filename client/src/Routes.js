import React from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AddCategory from './admin/AddCategory'
import AddCollection from './admin/AddCollection'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart';
import Orders from'./admin/Orders'
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/updateCategory';
import Profile from './user/Profile';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
import NotFoundPage from './core/NotFoundPage';
import Footer from './core/Footer';
import AddAdmin from './admin/AddAdmin';
import SingleProduct from './core/SingleProduct'
import SearchResults from './core/SearchResults'
const Routes = () => { 
    return (
    <BrowserRouter>
        <Switch>
        <Route path ="/" exact component={Home}/>
        <Route path ="/signin" exact component={Signin}/>
        <Route path ="/forgot-password" exact component={ForgotPassword}/>
        <Route path ="/reset-password/" exact component={ResetPassword}/>
            <Route path ="/shop" exact component={Shop}/>
            <Route path ="/signup" exact component={Signup}/>
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/create/collection" exact component={AddCollection} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/product" exact component={AddProduct} />
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <AdminRoute path="/admin/add" exact component={AddAdmin} />
            <Route path ="/product/:productId" exact component={SingleProduct}/>
            <Route path="/cart" exact component={Cart} />
            <Route path="/search/:searchId" exact component={SearchResults} />
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />
                <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>)
};


export default Routes;

