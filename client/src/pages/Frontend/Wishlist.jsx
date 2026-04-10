import { addToCart, fetchCart, getCartTotal } from "@/store/shop/CartSlice";
import { addToWishlist } from "@/store/shop/ProductSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function WishlistPage() {

   const {products, wishlist} = useSelector((state)=> state.product);
   const {user} = useSelector((state)=> state.auth);

   console.log("products in wishlist", products, "wishlist item ",wishlist);

   const dispatch = useDispatch();


     const handleAddToCart = (productId)=>{
         const cartData = {
           userId: user.userId,
           productId: productId,
         }
   
         dispatch(addToCart(cartData)).then((res)=>{
           if(res.payload.status)
           {
             toast.success("Product added to cart");
             dispatch(fetchCart(user.userId))
             dispatch(getCartTotal())
           }
           if(res.payload.limit){
             toast.error("You can't increase quantity more than 5")
           }
         })
       }

          const handleAddToWishlist = (productId)=>{
             dispatch(addToWishlist(productId))
          }
   

  return (
    <div className="min-h-screen bg-white p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
         {
          wishlist.length > 0 && products ? 
          wishlist.map((wishlistId)=>{
           const product = products.find((item)=> item._id == wishlistId.productId);

           console.log("matched product", product)
                
            return(
                   <div className="border rounded-xl overflow-hidden shadow-sm w-full">
          <img
            src={product?.image}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold">{product?.title}</h3>
            <p className="text-sm text-gray-500">{product?.brand}</p>
            <p className="text-green-600 font-bold">${product?.price}</p>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-md" onClick={()=> handleAddToCart(product._id)}>
                Add to Cart
              </button>
              <button className="flex-1 border py-2 rounded-md bg-red-600 text-white" onClick={()=> handleAddToWishlist(product._id)}>
                Remove
              </button>
            </div>
          </div>
        </div>
            )
          }) :
          <h1 className="text-2xl font-bold">No wishlist products</h1>
         }

    

      </div>
    </div>
  );
}
