import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import products from "./products"
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCart, getCartTotal, updateCart } from "@/store/shop/CartSlice";
import { toast } from "react-toastify";

export default function CartPage() {

  const dispatch = useDispatch();

  const {cartData} = useSelector((state)=> state.cart);
  const { user } = useSelector((state)=> state.auth);

  console.log("cart items", cartData, " products ", products, " user ", user);
  let subtotal = 0

  useEffect(()=>{
    if(user)
    {
      console.log("fetch cart ran");
      dispatch(fetchCart(user.userId))
      dispatch(getCartTotal())
    }
  },[user])


     const handleDeleteCart = (productId)=>{
        const cartData = {
          userId: user.userId,
          productId: productId,
        }
  
        dispatch(deleteCart(cartData)).then((res)=>{
          if(res.payload.status)
          {
            toast.success("Product deleted to cart");
            dispatch(fetchCart(user.userId));
            dispatch(getCartTotal());
          }
         
        })
      }

     const handleUpdateCart = (productId, action, quantity)=>{

        if(action == 'inc' && quantity == 5)
        {
          toast.error("You can't add quantity more than 5")
        }
        const cartData = {
          userId: user.userId,
          productId: productId,
          action: action
        }
  
        dispatch(updateCart(cartData)).then((res)=>{
          if(res.payload.status)
          {
            dispatch(fetchCart(user.userId))
      
              dispatch(getCartTotal());
          }
         
        })
      }

  return (
    <div className="min-h-screen bg-white p-8 px-20">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Table */}
        <div className="lg:col-span-2 mr-11 ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="pb-3">Product</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Subtotal</th>
                <th className="pb-3 text-right">Remove</th>
              </tr>
            </thead>

            <tbody>

               {
                cartData ?
                cartData.map((item)=>{
                  const {quantity} = item
                  const {image, price, _id} = item.productId

                    subtotal  = subtotal + (price * quantity)

                    return(
                                               <tr className="border-b">
                <td className="py-4 flex items-center gap-4">
                  <img
                    src={image}
                    className="w-20 h-20 object-cover"
                  />
                  <span></span>
                </td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <div className="flex items-center border w-fit">
                    <button className="px-2 py-1 border-r" onClick={()=> handleUpdateCart(_id, 'dec', quantity)}>-</button>
                    <input className="pl-4 w-[40px]"  type="number" value={quantity}/>
                    <button className="px-2 py-1 border-l" onClick={()=> handleUpdateCart(_id, 'inc', quantity)}>+</button>
                  </div>
                </td>
                <td>${(price * quantity).toFixed(2)}</td>
                <td className="text-right text-gray-500 cursor-pointer text-[25px]" onClick={()=> handleDeleteCart(_id)}>×</td>
              </tr>
                    )
                   })  :
               
                <h1 className="text-xl font-bold">No Product Found</h1>
               }
               
                    
        
      

          

         
            </tbody>
          </table>


        </div>

        {/* Cart Totals */}
        <div className="border p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Cart totals</h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="mb-4">
            <p className="mb-2">Shipping</p>
            <div className="flex flex-col gap-2 text-sm">
              <label>
                <input type="radio" name="shipping" /> Free shipping
              </label>
              <label>
                <input type="radio" name="shipping" /> Flat rate: $10.00
              </label>
              <label>
                <input type="radio" name="shipping" /> Pickup: $15.00
              </label>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button className="w-full mt-6 bg-[var(--main)] text-white py-3">
           <Link to="/cart/checkout"> Proceed to checkout </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
