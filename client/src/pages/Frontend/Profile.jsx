import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const {user} = useSelector((state)=> state.auth);

  return (
   <>
      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile Info</h2>

          <button className="border p-2 rounded-lg hover:bg-gray-100">
            ⋮
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6 relative">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
              alt="profile"
              className="w-28 h-28 rounded-full object-cover"
            />

            <button className="absolute bottom-0 right-0 bg-[#00965f] text-white p-2 rounded-full">
              📷
            </button>
          </div>

          <h3 className="mt-3 font-semibold text-lg">{user?.username}</h3>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-6">
          
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              type="text"
              defaultValue={user?.username.split(" ")[0]}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              type="text"
              defaultValue={user?.username.split(" ")[1]}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              defaultValue="+91 8956778888"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters long"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters long"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00965f]"
            />
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end mt-8">
          <button className="bg-[#00965f] text-white px-6 py-2 rounded-lg hover:opacity-90">
            Update
          </button>
        </div>

      </div>
   </>
  )
}

export default Profile
