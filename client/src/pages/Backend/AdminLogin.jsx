import { AdminLoginFormControls } from '@/FormControls'
import FormLayout from '@/Layouts/FormLayout'
import { loginUser } from '@/store/authSlice/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminLogin = () => {

     const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'admin'
      })  

      const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleOnSubmit = (event)=>{
      console.log("form data", formData)
      event.preventDefault();
      dispatch(loginUser(formData)).then((res)=>{
        console.log("response of login", res)
        if(!res.payload.status && !res.payload.wrongPass)
        {
          toast.error("admin doesn't exists with this email")
        }
        if(!res.payload.status && res.payload.wrongPass)
        {
          toast.error("Incorrect email or password")
        }
        if(res.payload.status)
        {
          toast.success("Admin logged in successfully");
          navigate('/admin/dashboard')
        }
      })  
    }

  return (

    
 <div className="p-[100px] pb-[60px] flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border-[var(--main)] border ">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>
          <FormLayout 
        formControls={AdminLoginFormControls}
        buttonText={'Log In'}
          formData={formData}
        setFormData={setFormData}
        handleOnSubmit={handleOnSubmit}
      />
      
      </div>
    </div>

   )
}

export default AdminLogin










