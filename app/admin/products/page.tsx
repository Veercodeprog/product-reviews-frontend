"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/admin/sidebar";
export default function ProductsAdminPage() {
const [isAdmin, setIsAdmin] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
function checkAdminRole() {
  // Replace this with your own logic to check if the user is an admin

  const user = localStorage.getItem('user'); // Retrieve the user object from local storage or wherever it is stored
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.role === 'admin';
  }

  return false; // Default to false if user is not found or role is not 'admin'
}

 useEffect(() => {
    // Simulating an asynchronous check for admin role
    setTimeout(() => {
      const isAdminUser = checkAdminRole(); // Replace with your logic to check if the user is an admin

      setIsAdmin(isAdminUser);
      setIsLoading(false);
    }, ); // Adjust the delay as needed
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading indicator while checking the admin role
  }
  
  return (
    <>
  


{isAdmin ? (
<div className="flex h-screen ">
  {/* Left Side */}
      <AdminSidebar />


  {/* Right Side */}
  <div className="w-5/6 h-full ">
    {/* Content for the right side goes here */}
<form className="w-1/2 mx-auto">
  <div className="mb-4">
    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="productName"
      className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
      placeholder="Enter product name"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
      Description
    </label>
    <textarea
      id="productDescription"
      className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
      placeholder="Enter product description"
      defaultValue={""}
    />
  </div>
  <div className="mb-4">
    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
      Price
    </label>
    <input
      type="number"
      id="productPrice"
      className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
      placeholder="Enter product price"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
      Category
    </label>
    <select
      id="productCategory"
      className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full"
    >
      <option value="category1">Category 1</option>
      <option value="category2">Category 2</option>
      <option value="category3">Category 3</option>
      <option value="category4">Category 4</option>
    </select>
  </div>
  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Add Product
  </button>
</form>


  </div>	
</div>

 



) : (
  <h1>Not authorized to access this page</h1>
)}


    </>
  );
}
