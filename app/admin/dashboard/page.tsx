"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/admin/sidebar";
interface User {
  firstName: string;
  // Other properties of the user object
}
export default function CategoriesAdminPage() {
const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
     const [isLoading, setIsLoading] = useState(true);
  function getUser(): User | null {
    // Replace this with your actual logic to retrieve the user object
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser;
    }
    return null;
  }

function checkAdminRole() {
  // Replace this with your own logic to check if the user is an admin

  const storedUser = localStorage.getItem('user'); // Retrieve the user object from local storage or wherever it is stored
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
setUser(parsedUser)
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
<div className="flex h-screen bg-purple-800">

  {/* Left Side */}
   <AdminSidebar />

  {/* Right Side */}
  <div className="w-5/6 h-full bg-white my-1">
    {/* Content for the right side goes here */}

            <h1>hello, {(user as User)?.firstName}</h1>


  </div>	
</div>

 



) : (
  <h1>Not authorized to access this page</h1>
)}


    </>
  );
}
