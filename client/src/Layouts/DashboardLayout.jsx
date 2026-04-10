import { isAction } from "@reduxjs/toolkit";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


export default function DashboardLayout() {

  const sideMenus = [
   {
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
    name: "Dashboard",
   },
   {
    path: "/admin/banner",
    icon: <LayoutDashboard size={18} />,
    name: "Banner",
   },
   {
    path: "/admin/orders",
    icon: <ShoppingBag size={18} />,
    name: "Orders",
   },
   {
    path: "/admin/products",
    icon: <Package size={18} />,
    name: "Products",
   },
   {
    path: "/admin/featured",
    icon:<Package size={18} />,
    name: "Featured Products",
   },
   {
    path: "/admin/users",
    icon:<Users size={18} />,
    name: "Users",
   },
  ]


  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-[260px] bg-white shadow p-4">
        <h2 className="text-xl font-bold text-[#00965f] mb-6">
          Admin Panel
        </h2>

        <ul className="space-y-3">
        {sideMenus.map((item,index)=>{
          return(
          <Link to={item.path}>
          <li className={`${index == activeIndex ? 'bg-[#00965f]/10 text-[#00965f] flex items-center gap-3 p-3 rounded-lg' : 'flex items-center gap-3 p-3 rounded-lg'}`} onClick={()=> setActiveIndex(index)}>
            {/* <LayoutDashboard size={18} /> Dashboard */}
            {item.icon} {item.name}
          </li>
        </Link>
          )
        })}
        {/* <Link to="/admin/dashboard">
          <li className="flex items-center gap-3 p-3 bg-[#00965f]/10 text-[#00965f] rounded-lg" >
            <LayoutDashboard size={18} /> Dashboard
          </li>
        </Link> */}
        {/* <Link to="/admin/banner">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <LayoutDashboard size={18} /> Banner
          </li>
        </Link>
         <Link to="/admin/orders">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <ShoppingBag size={18} /> Orders
          </li>
        </Link>
         <Link to="/admin/products">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Package size={18} /> Products
          </li>
        </Link>
         <Link to="/admin/featured">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Package size={18} /> Featured Product
          </li>
        </Link>
         <Link to="/admin/users">
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Users size={18} /> Users
          </li>
          </Link>
          <li className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Settings size={18} /> Settings
          </li> */}
        </ul>
      </div>

    <Outlet/>
    </div>
  );
}