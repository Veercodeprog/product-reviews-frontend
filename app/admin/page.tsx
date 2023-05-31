'use client';
import {  useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import AdminSidebar from "../components/admin/sidebar";
import SessionManager from "../utils/session";

interface UserType {
  // Define your user properties here
}



export default  function AdminPage() {
 const [user, setUser] = useState<UserType | null>(null);
const [isLoading, setLoading] = useState(true);

 
  return (
    <>
<SessionManager updateUser={setUser} setLoading={setLoading} />
      {isLoading ? (
        <div> </div>
      ) : (
        <>
          {user && user.role === 'admin' ? (
            <div className="flex h-screen">
              {/* Left Side */}
              <AdminSidebar />

              {/* Right Side */}
              <div className="w-5/6 h-full">
                {/* Content for the right side goes here */}
                <h1>Welcome, {user.role}</h1>
              </div>
            </div>
          ) : (
            <div>
              <h1>Not authorized to access this page</h1>
            </div>
          )}
        </>
      )}
    </>
  );
}
