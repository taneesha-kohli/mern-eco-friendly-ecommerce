import { contactFormControls } from '@/FormControls'
import FormLayout from '@/Layouts/FormLayout'
import React from 'react'

const Contact = () => {
  return (
    
 <div className="p-[100px] pb-[60px] flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border-[var(--main)] border ">
        <h1 className="text-2xl font-semibold text-center mb-6">Contact</h1>
          <FormLayout 
        formControls={contactFormControls}
        buttonText={'Send'}
      />
      
      </div>
    </div>

   )
}

export default Contact










