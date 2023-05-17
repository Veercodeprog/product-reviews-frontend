"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/admin/sidebar";
import { fetchCategories } from "@/app/utils/admin/adminApi";
interface Category {
  id: number;
  name: string;
  category_description: string;
  emoji: string;
  category_featured: string;
}

export default function CategoriesAdminPage() {
const [isAdmin, setIsAdmin] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

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
  async function fetchCategoriesData() {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  fetchCategoriesData();
}, []);
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
  <div className=" ml-3 w-5/6 h-full ">
    {/* Content for the right side goes here */}
<h1 className="">Categories</h1>


  <form className="w-1/2 mx-auto">
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="categoryName" className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="Enter category name" />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="categoryDescription" className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="Enter category description" defaultValue={""} />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryEmoji" className="block text-sm font-medium text-gray-700">Emoji</label>
          <input type="text" id="categoryEmoji" className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="Enter category emoji" />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryFeatured" className="block text-sm font-medium text-gray-700">Featured Products</label>
          <select multiple id="categoryFeatured" className="border border-gray-300 px-3 py-2 mt-1 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full">
            <option value="product1">Product 1</option>
            <option value="product2">Product 2</option>
            <option value="product3">Product 3</option>
            <option value="product4">Product 4</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Category</button>
      </form>
<div className="category_data mt-4">
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Category ID
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Name
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Category Description
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Emoji
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Category Featured
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {/* Replace the example data with your actual product data */}

 
{categories.length > 0 ? (
  categories.map((category) => (
    <tr key={category.id}>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.category_description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.emoji}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.category_featured}</td>
    </tr>
  ))
) : (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={5}>No categories found.</td>
  </tr>
)}

 
    {/* Add more rows for each product */}
  </tbody>
</table>

</div>


  </div>	
</div>

 



) : (
  <h1>Not authorized to access this page</h1>
)}


    </>
  );
}
