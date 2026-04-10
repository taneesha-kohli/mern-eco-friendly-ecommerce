import { ProductFormControls } from "@/FormControls";
import FormLayout from "@/Layouts/FormLayout";
import { addProduct, fetchProducts } from "@/store/shop/ProductSlice";
import { ArrowLeft, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProductPage() {

  const [formData, setFormData] = useState(
    {
  title: '',
  description: '',
  image: '',
  category: '',
  brand: '',
  price: '',
  stock: '',
  status: 'Active'
})

const dispatch = useDispatch();
const navigate = useNavigate();

const handleOnSubmit = (event)=>{
 event.preventDefault();
 console.log("product form data", formData)
 dispatch(addProduct(formData)).then((res)=>{
   if(res.payload.status)
   {
    toast.success("Product added successfully");
    navigate("/admin/products")
    dispatch(fetchProducts());
   }
   else if(res.payload.duplicate){
    toast.error("Duplicate product");
   }
   else{
    toast.error("Error occurred while saving the product")
   }
 })
}



console.log("form data in product add", formData)

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center w-full">
      
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-full">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 border rounded-lg hover:bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-xl font-semibold">Add Product</h2>
        </div>


           <FormLayout 
        formControls={ProductFormControls}
        buttonText={'Add Product'}
        formData={formData}
        setFormData={setFormData}
        handleOnSubmit={handleOnSubmit}
      />
        

        {/* Buttons */}
        {/* <div className="flex justify-end gap-3 mt-8">
          <button className="px-5 py-2 border rounded-lg hover:bg-gray-100">
            Cancel
          </button>

          <button className="px-5 py-2 bg-[#00965f] text-white rounded-lg hover:opacity-90">
            Add Product
          </button>
        </div> */}

      </div>
    </div>
  );
}