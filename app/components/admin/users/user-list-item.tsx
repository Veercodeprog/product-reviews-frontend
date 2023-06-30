"use client";
import React, { useState } from "react";
import { setUserRoles } from "@/app/utils/postDataApi";
const UsersListItem = ({ user }: any) => {
  const [selectedRole, setSelectedRole] = useState(user.customClaims.role);

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
    // Perform any additional logic or API calls to update the user's role
    const setRole = await setUserRoles(user.uid, e.target.value);
  };

  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src={user.photoURL ? user.photoURL : "/images.png"}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.displayName}
            </p>
            <p className="text-sm text-gray-500 truncate">
              <a
                href="/cdn-cgi/l/email-protection"
                className="__cf_email__"
                data-cfemail="17727a767e7b57607e7973646372653974787a"
              >
                {user.email}
              </a>
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900">
            <select
              onChange={handleRoleChange}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {user.customClaims.role === "admin" ? (
                <>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </>
              ) : (
                <>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                </>
              )}
            </select>
          </div>
        </div>
      </li>
    </>
  );
};

export default UsersListItem;
