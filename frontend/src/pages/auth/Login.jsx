import CommonForm from '@/components/common/CommonForm'
import { loginFormControls } from '@/config'
import { loginUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState = {
  email:'',
  password:''
}

const Login = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event)=>{
    event.preventDefault();
    dispatch(loginUser(formData))
    .then((data) =>{
      // console.log("message :" , data.payload.message);
      if(data?.payload?.success){
        navigate('/shop/home');
        toast.success(data.payload.message);
      }
      else{
        console.log(data);
        toast.error(data.payload.message)
      }
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Login Account
        </h1>
        <p className='mt-2'>
          Don't have an Account?
          <Link className='font-medium ml-2 text-primary hover:underline'
            to="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </div>
      <CommonForm 
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Login"}
      />
    </div>
  )
}

export default Login