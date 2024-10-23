import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminOrders from './pages/admin-view/AdminOrders'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminFeatures from './pages/admin-view/AdminFeatures'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/not-Found/NotFound'
import ShopHome from './pages/shopping-view/ShopHome'
import ShopListing from './pages/shopping-view/ShopListing'
import ShopAccount from './pages/shopping-view/ShopAccount'
import ShopCheckout from './pages/shopping-view/ShopCheckout'
import UnauthPage from './pages/unauth-page/UnauthPage'
import CheckAuth from './components/common/CheckAuth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const isAuthenticated = false;
  const user = {
    name: "Shubham",
    role: "admin"
  }

  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" 
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>}/>
        
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>

          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='order' element={<AdminOrders/>}/>
          <Route path='product' element={<AdminProducts/>}/>
          <Route path='feature' element={<AdminFeatures/>}/>
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
          }>
          <Route path='home' element={<ShopHome/>}/>
          <Route path='listing' element={<ShopListing/>}/>
          <Route path='account' element={<ShopAccount/>}/>
          <Route path='checkout' element={<ShopCheckout/>}/>
        </Route>

        <Route path='/unauth-page' element={<UnauthPage/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>



    </>
  )
}

export default App