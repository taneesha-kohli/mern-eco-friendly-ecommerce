import { Heart, User, ShoppingCart, Search, LogIn, Menu } from "lucide-react";


import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logoutUser } from "@/store/authSlice/authSlice";
import { fetchCart, getCartTotal } from "@/store/shop/CartSlice";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const {cartData, cartTotal} = useSelector((state)=> state.cart);

  const {wishlist} = useSelector((state)=> state.product);

  
  console.log("in header isAuthenticated and user", isAuthenticated, user, cartTotal)

  const wishlistTotal = wishlist.length;

  const categories  = [
    {
      category: 'All Products',
      value: '',
      path: '/shop'
    },
    {
      category: 'Clothing',
      value: 'clothing'
    },
    {
      category: 'Footwear',
      value: 'footwear'
    },
    {
      category: 'Bags',
      value: 'bags'
    },
    {
      category: 'Accessories',
      value: 'accessories'
    },
    {
      category: 'Beauty & Personal Care',
      value: 'beauty & personal care'
    },
    {
      category: 'Home & Living',
      value: 'home & living'
    },
    {
      category: 'Reusable Products',
      value: 'reusable products'
    },
    {
      category: 'Kitchen & Dining',
      value: 'kitchen & dining'
    },
    {
      category: 'Fitness & Outdoor',
      value: 'fitness & outdoor'
    },
  
  ]

  const navigate = useNavigate();

  const handleActiveCategory = (item)=>{
    console.log("active category", activeCategory)
  navigate(item.path ? item.path : `/shop?category=${encodeURIComponent(item.category)}`)
  

  }

  

  return (
    <div className="w-full">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-[5vw] py-4 border-b">
        {/* Logo */}
        <Link to="/">
          <img src="logo.png" className="h-10 logo" />
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center w-[40%] border rounded-md overflow-hidden h-[48px]">
          <input
            type="text"
            placeholder="Search for items..."
            className="flex-1 px-4 outline-none"
          />
          <button className="bg-[#00965f] px-6 text-white h-full flex items-center">
            <Search size={20} />
          </button>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Wishlist */}
          <Link to="/profile/wishlist">
            <div className="relative cursor-pointer">
              <Heart />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                {wishlistTotal}
              </span>
            </div>
          </Link>

          {/* User */}

          {isAuthenticated ? (
            <Popover open={isOpen} onOpenChange={()=> setIsOpen((open)=> setIsOpen(open) )}>
              <PopoverTrigger asChild>
              <div className="flex flex-col justify-center items-center cursor-pointer " onClick={()=> setIsOpen(true)}>
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" alt="" className="w-7 h-7 rounded-full"/>
                <p>{user.username}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent className=" bg-white w-auto px-5">
                <PopoverDescription className="flex gap-2 pb-2 border-b-2" onClick={()=> setIsOpen(false)} >
                  <Link to="/profile/orders"> My Order </Link>
                </PopoverDescription>
                <PopoverDescription className="flex gap-2 pb-2 border-b-2" onClick={()=> setIsOpen(false)}>
                  <Link to="/profile"> My Profile </Link>
                </PopoverDescription>
                <PopoverDescription className="flex gap-2 cursor-pointer" onClick={()=>{ dispatch(logoutUser()); setIsOpen(false)}}>
                  Logout
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          ) : (
            <Popover open={isOpen} onOpenChange={()=> setIsOpen((open)=> setIsOpen(open) )}>
              <PopoverTrigger asChild>
                <User className="cursor-pointer" onClick={()=> setIsOpen(true)}/>
              </PopoverTrigger>
              <PopoverContent className=" bg-white w-auto px-5">
                <PopoverDescription className="flex gap-2 pb-2 border-b-2" onClick={()=> setIsOpen(false)}>
                  <LogIn size={16} />
                  <Link to="/login"> Sign In </Link>
                </PopoverDescription>
                <PopoverDescription className="flex gap-2" onClick={()=> setIsOpen(false)}>
                  <User size={16} />
                  <Link to="/register"> Sign Up </Link>
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          )}

          {/* Cart */}
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <ShoppingCart />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                 {
                   cartTotal
                 }
                </span>
              </div>
            </Link>

            <div className="text-sm ml-3">
              <p className="text-gray-500">My cart</p>
              <p className="font-semibold">$0.00</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="lg:hidden">
            <Menu size={28} />
          </SheetTrigger>

          <SheetContent side="left" className="w-[280px] bg-white p-4">
            {/* Mobile Icons */}
            <div className="flex gap-6 border-b pb-4">
              <div className="relative cursor-pointer">
                <Heart />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                  0
                </span>
              </div>

              <User className="cursor-pointer" />

              <div className="relative cursor-pointer">
                <ShoppingCart />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
                  0
                </span>
              </div>
            </div>

            {/* Categories */}
            <nav className="flex flex-col gap-5 mt-6 font-medium">
            {
              categories.map((item)=>{
                return(
                    <Link  onClick={()=> handleActiveCategory(item)}>{item.category}</Link>
                )
              })
            }
          

            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Category Navbar */}
      <div className="hidden lg:flex items-center px-[5vw] py-3 bg-[#00965f] text-white justify-center">
        <nav className="flex gap-8 font-medium text-sm">
            {
              categories.map((item)=>{
                return(
                    <Link to={item.path ? item.path : `/shop?category=${encodeURIComponent(item.category)}`} className="hover:text-black">{item.category}</Link>
                )
              })
            }
    
      
        </nav>
      </div>
    </div>
  );
}
