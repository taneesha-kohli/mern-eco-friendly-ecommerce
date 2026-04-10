import { ProductFormControls } from "@/FormControls";
import FormLayout from "@/Layouts/FormLayout";
import { fetchProducts, getProduct, updateProduct } from "@/store/shop/ProductSlice";
import { ArrowLeft, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProductPage() {
  
  const {singleProduct} = useSelector((state)=> state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("single product", singleProduct);

    const [formData, setFormData] = useState({});

  // console.log("form data in product edit", formData);
  const handleOnSubmit = (event)=>{
    console.log("form data", formData)
    event.preventDefault();
   dispatch(updateProduct(formData)).then((res)=>{
    if(res.payload.status)
    {
      toast.success("Product updated successfully");
      navigate("/admin/products");
      dispatch(fetchProducts());
    }
   })
  }

  useEffect(()=>{
    setFormData(singleProduct)
  },[singleProduct])

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center w-full">
      
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-full">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/products">
          <button className="p-2 border rounded-lg hover:bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          </Link>
          <h2 className="text-xl font-semibold">Edit Product</h2>
        </div>

        {/* Form */}
        {/* <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Product Name</label>
            <input
              type="text"
              defaultValue={singleProduct.title}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price ($)</label>
            <input
              type="number"
              defaultValue={singleProduct.price}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Stock Quantity</label>
            <input
              type="number"
              defaultValue={singleProduct.quantity}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={singleProduct.category}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            >
              <option>Clothing</option>
              <option>Footwear</option>
              <option>Bags</option>
              <option>Accessories</option>
              <option>Beauty & Personal Care</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Brand</label>
            <input
              type="text"
              defaultValue={singleProduct.brand}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows="4"
              defaultValue={singleProduct.description}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">singleProduct Image</label>

            <div className="mt-2 flex items-center gap-4">
              <img
                src={singleProduct.image}
                alt="singleProduct"
                className="w-20 h-20 rounded-lg object-cover border"
              />

              <div className="border-2 border-dashed rounded-lg p-4 flex items-center gap-2 text-gray-500 cursor-pointer hover:border-[#00965f]">
                <Upload size={20} />
                <span className="text-sm">Change Image</span>
                <input type="file" className="hidden" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              defaultValue={singleProduct.status}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

        </form> */}

        <FormLayout 
        formControls={ProductFormControls}
        buttonText={'Update Product'}
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
            Update Product
          </button>
        </div> */}

      </div>
    </div>
  );
}