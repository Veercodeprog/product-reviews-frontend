"use client";
import React from "react";
import { useState,useEffect } from "react";
import { deleteProductById } from "@/app/utils/postDataApi";
export const ProductsList = ({ app }: any) => {
  const [isOnHomepage, setIsOnHomepage] = useState(app.isOnHomepage);
    useEffect(() => {
    setIsOnHomepage(app.isOnHomepage);
    app = app;
  }, [isOnHomepage]);
  const handleDelete = async (id: any) => {
    try {
      const response = await deleteProductById(id);
      console.log(response);
      setIsOnHomepage(response);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
          
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {app.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              <a
                href="/cdn-cgi/l/email-protection"
                className="__cf_email__"
                data-cfemail="17727a767e7b57607e7973646372653974787a"
              >
             
             </a>
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
          
           <button
              className="sm:inline-flex ml-5 bg-purple-800 text-white hover:bg-purple-900 focus:ring-4 focus:ring-purple-200
               font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
            
              onClick={()=>handleDelete(app.product_id)}
            >
            Delete 
            </button>
                      </div>
        </div>
      </li>
    </>
  );
};
