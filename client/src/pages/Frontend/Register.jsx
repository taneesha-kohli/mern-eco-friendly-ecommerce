import { registerFormControls } from '@/FormControls'
import FormLayout from '@/Layouts/FormLayout'
import { registerUser } from '@/store/authSlice/authSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {

  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: ''
  })  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (event)=>{
    console.log("form data", formData)
    event.preventDefault();
    dispatch(registerUser(formData)).then((res)=>{
      console.log("response of register", res);
      if(res.payload.status)
      {
        toast.success("User added successfully");
        navigate("/login")
      }
      if(res.payload.duplicate)
      {
        toast.error("Duplicate User");
      }
      if(res.payload.status == false && !res.payload.duplicate){
        toast.error("Some error occurred while saving the user")
      }
    })
  }

  return (
    <div className="p-[100px] pb-[60px] flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border-[var(--main)] border ">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
          <FormLayout 
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        handleOnSubmit={handleOnSubmit}
      />
     
      </div>
    </div>
  )
}

export default Register
