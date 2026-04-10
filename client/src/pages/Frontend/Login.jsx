import { loginFormControls } from '@/FormControls'
import FormLayout from '@/Layouts/FormLayout'
import { loginUser } from '@/store/authSlice/authSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

   const [formData, setFormData] = useState({
      email: '',
      password: '',
      role: 'user'
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
          toast.error("User doesn't exists with this email")
        }
        if(!res.payload.status && res.payload.wrongPass)
        {
          toast.error("Incorrect email or password")
        }
        if(res.payload.status)
        {
          toast.success("User logged in successfully");
          navigate('/')
        }
      })  
    }

  return (
 <div className="p-[100px] pb-[60px] flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border-[var(--main)] border ">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
          <FormLayout 
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        handleOnSubmit={handleOnSubmit}
      />
      
      </div>
    </div>

   )
}

export default Login










