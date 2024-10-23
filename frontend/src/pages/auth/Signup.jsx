import CommonForm from '@/components/common/CommonForm'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {signupFormControl} from '@/config'
import { useDispatch } from 'react-redux'
import { registerUser } from '@/store/authSlice'
import { toast } from 'react-toastify'


const initialState = {
  userName:'',
  email:'',
  password:''
}

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event)=>{
    event.preventDefault();
    // console.log("onsubmit called")
    // console.log(formData);

    dispatch(registerUser(formData))
    .then((data) => {
      if(data?.payload?.success){
        toast.success(data?.payload?.message)
        navigate('/auth/login');
      }
      else{
        toast.error(data.payload.message);
      }
    })
    
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Create new Account
        </h1>
        <p className='mt-2'>
          Already have an Account
          <Link className='font-medium ml-2 text-primary hover:underline'
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={signupFormControl}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign Up"}
        onSubmit={onSubmit}

      />
    </div>
  )
}

export default Signup