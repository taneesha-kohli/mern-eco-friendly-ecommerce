import { addOrders } from "@/store/shop/CartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CheckoutPage() {

  const {user} = useSelector((state)=> state.auth);
  const dispatch = useDispatch()

  console.log("user in checkout page", user);

  const handleAddOrders = ()=>{
      dispatch(addOrders(user.userId))
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Details */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-2" placeholder="First Name" />
            <input className="border p-2" placeholder="Last Name" />
            <input className="border p-2 md:col-span-2" placeholder="Address" />
            <input className="border p-2" placeholder="City" />
            <input className="border p-2" placeholder="Postal Code" />
            <input className="border p-2" placeholder="Phone" />
            <input className="border p-2" placeholder="Email" />
          </div>

          {/* Payment Method */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="flex flex-col gap-3">
              <label>
                <input type="radio" name="payment" /> Cash on Delivery
              </label>
              <label>
                <input type="radio" name="payment" /> Credit / Debit Card
              </label>
              <label>
                <input type="radio" name="payment" /> UPI
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Your Order</h2>

          <div className="flex justify-between mb-2">
            <span>Organic Cotton T-Shirt</span>
            <span>₹1,499</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Eco Sneakers</span>
            <span>₹6,999</span>
          </div>

          <div className="flex justify-between mt-4 border-t pt-2">
            <span>Subtotal</span>
            <span>₹8,498</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹100</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>₹8,598</span>
          </div>

          <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-md" onClick={()=> handleAddOrders()}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
