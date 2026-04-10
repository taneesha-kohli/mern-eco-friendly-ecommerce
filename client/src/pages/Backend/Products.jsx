import { deleteProduct, fetchProducts, getProduct } from "@/store/shop/ProductSlice";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminProductsPage() {

  const dispatch = useDispatch();
  const {products} = useSelector((state)=> state.product);
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchProducts());
  },[])


  const handleDelete = (id)=>{
    dispatch(deleteProduct(id)).then((res)=>{
      if(res.payload.status)
      {
        toast.success("Product deleted successfully");
        dispatch(fetchProducts());
      }
      else{
        toast.error("Some error occurred while deleting the product");
      }
    })
  }

  const handleFetch = (id)=>{
    dispatch(getProduct(id))
   navigate("/admin/product-edit")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      
      <div className="bg-white rounded-xl shadow p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Products</h2>
          <Link to="/admin/product-add">
          <button className="flex items-center gap-2 bg-[#00965f] text-white px-4 py-2 rounded-lg hover:opacity-90">
            <Plus size={16} /> Add Product
          </button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
          />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 bg-gray-100 p-3 rounded-lg text-sm font-medium text-gray-600">
          <div>Product</div>
          {/* <div>ID</div> */}
          <div>Price</div>
          <div>Stock</div>
          <div>Status</div>
          <div className="text-center">Action</div>
        </div>

        {/* Product Rows */}
        <div className="mt-4 space-y-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center p-3 border rounded-lg"
            >
              
              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <p className="font-medium">{product.title}</p>
              </div>

              {/* <div>{product._id}</div> */}

              <div className="font-medium text-[#00965f]">
                ${(product.price).toFixed(2)}
              </div>

              <div>{product.stock}</div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status == 'Active'
                      ? "bg-green-100 text-[#00965f]"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-2">
                <Link to="/admin/product-edit">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:scale-105" onClick={()=> handleFetch(product._id)}>
                  <Pencil size={16} />
                </button>
                </Link>
                <button className="p-2 bg-red-100 text-red-500 rounded-full hover:scale-105" onClick={()=> handleDelete(product._id)}>
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}