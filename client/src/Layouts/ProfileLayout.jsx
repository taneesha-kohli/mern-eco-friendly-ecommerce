import { User, ShoppingBag, Heart, Mail, MapPin, Headphones, Ticket, Truck } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function ProfileLayout() {

  const [activeIndex, setActiveIndex] = useState(0);

  const profileMenu = [
    {
      path: '/profile',
      icon: <User size={18} />,
      name: 'Profile Info'
    },
    {
      path: '/profile/orders',
      icon: <ShoppingBag size={18} />,
      name: 'My Order'
    },
    {
      path: '/profile/wishlist',
      icon: <Heart size={18} />,
      name: 'Wish List'
    },
    {
      path: '/profile/inbox',
      icon: <Mail size={18} />,
      name: 'Inbox'
    },
    {
      path: '/profile/address',
      icon: <MapPin size={18} />,
      name: 'My Address'
    },
    {
      path: '/profile/track-order',
      icon: <Truck size={18} />,
      name: 'Track Order'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex p-6 gap-6">
      
      {/* Sidebar */}
      <div className="w-[260px] bg-white rounded-xl shadow p-4">
        <ul className="space-y-3">
        {
          profileMenu.map((item, index)=>{
            return(
                 <Link to={item.path}> 
         <li className={index == activeIndex ? "flex items-center gap-3 p-3 bg-[#00965f]/10 text-[#00965f] rounded-lg font-medium" : "flex items-center gap-3 p-3 rounded-lg "} onClick={()=> setActiveIndex(index)}>
            {item.icon} {item.name}
          </li> 
          </Link>
            )
          })
        }
       
     
        </ul>
      </div>

    <Outlet/>
    </div>
  );
}