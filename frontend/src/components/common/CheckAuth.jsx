import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({isAuthenticated, user, children}) => {
    console.log("isAuthenticated : ", isAuthenticated, user);
    const location = useLocation();

    console.log("user is : " , user?.role);
    console.log("user.user : ", user);
    if(location.pathname === '/'){
        if(!isAuthenticated){
            return <Navigate to='/auth/login' />
        }
        else if(user?.role === 'admin'){
            return <Navigate to='/admin/dashboard' />
        }
        else{
            return <Navigate to='/shop/home'/>
        }
    }

    if(!isAuthenticated && 
    !(location.pathname.includes('/login') || (location.pathname.includes('/signup')))){
        return <Navigate to='/auth/login' />
    }

    if(isAuthenticated && 
    (location.pathname.includes('/login') || (location.pathname.includes('/signup')))){
        if(user?.user?.role === "admin"){
            return <Navigate to="/admin/dashboard" />
        }
        return <Navigate to="/shop/home" />
    }

    if(isAuthenticated && user?.role !== "admin" 
    && location.pathname.includes('admin')){
        return <Navigate to="/unauth-page" />
    }

    if(isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")){
        return <Navigate to="/admin/dashboard" />
    }

  return <>{children}</>
}

export default CheckAuth