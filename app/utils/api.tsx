import axios from "axios";
import { auth } from "./firebase";
import { setPersistence,browserSessionPersistence } from "firebase/auth";
import sessionManagerWithoutFirebase from "./sessionManager";
import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const storeAuthentication = (token, user) => {
    sessionManagerWithoutFirebase.setUser(user);
  localStorage.setItem("token", token);
};

    export const handleLogin = async (username, password) => {

      try {
    // await setPersistence(auth, browserSessionPersistence); // Set session persistence


const response = await axios.post(`${baseUrl}/login`, {
  username,
  password,
}, {
  withCredentials: true,
});


console.log("NEW LOGIN REQUEST")
        const token = response.data.token;
        console.log("Token:", token);
        console.log(response.data);
        const { id, role,firstName, mail } = response.data;
    const user = { id, role, firstName, username };
  console.log("response::" , response)
  console.log("user::" , response.data.user)
  if (response) { 
console.log("handle")
        storeAuthentication(response.data.token, response.data.user);
      }


  // const cookieOptions = {
  //       httpOnly: true, // Only accessible by the server
  //       secure: true, // Only sent over HTTPS
  //       maxAge: 30 * 1000, // Expiration time in milliseconds (30 seconds)
  //       sameSite: 'none', // Allow cross-site requests
  //     };

  //     document.cookie = `token=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;


    console.log("id:", response.data.id);
    // if (response.data.role === "admin") {
    //   window.location.href = '/admin'; // Redirect to admin page for admin users
    // } else {
    //   console.log("normal user");
    // }

    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};




export const handleSignup = async (fname, lname, email, password) => {
  try {
    // await setPersistence(auth, browserSessionPersistence);



    const response = await axios.post(`${baseUrl}/signup`, {
      fname,
      lname,
      email,
      password,
    });
    console.log("Login successful", response);



    // window.location.href = `${baseUrl}/`;
    console.error("Registered ");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Signup failed", error.response);
    throw error; // Throw the error to be handled by the caller
  }
};

// You can define other functions for different API requests, such as POST, PUT, DELETE, etc.


const handlecustomLoginAuthentication = async (user) => {
  if (user) {
    // User is signed in
  //  const token = 
  // const { id, role, firstName, username } = user;
    console.log("User signed in now handle custom authentication:", user.role);
    // Perform actions for logged in user, e.g., show user-specific content
    // Set state or update UI to reflect logged in state
    // Example: setLoggedIn(true);
  } else {
    // User is signed out
    console.log("User signed out");

    // Perform actions for logged out user, e.g., show login form
    // Set state or update UI to reflect logged out state
    // Example: setLoggedIn(false);
  }
};
export const customSignOutUser = async () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    handlecustomLoginAuthentication(null);
  } catch (error) {
    console.error("Sign out failed", error);
  }
};

const CustomSessionManager = ({ updateUser }) => {
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    updateUser(user);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.displayName);
        updateUser(user);
      } else {
        console.log("User is signed out");
        updateUser(null);
      }
    });

    return () => unsubscribe();
  }, [updateUser]);

  return null;
};

export default CustomSessionManager;
// export const auth = getAuth();
// signOut(auth).then(() => {
//  console.log("Logout successful");
// }).catch((error) => {
//   console.error("Logout failed", error);
//     throw error;
// });
