import { useState, useEffect } from "react";
import { getAuth, getIdToken } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";

import axios from "axios";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import sessionManagerWithoutFirebase from "./sessionManager";
import "firebase/firestore";
import { auth } from "./firebase";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     // Session persistence successfully set
//     console.log("Session persistence set");
//   })
//   .catch((error) => {
//     // Failed to set session persistence
//     console.error("Failed to set session persistence", error);
//   });
type User = {
  id: string;
  name: string;
  firstName: string;
  role: string;
  // other properties...
};
const storeAuthentication = (token: string  , user: User) => {
    sessionManagerWithoutFirebase.setUser(user);
  localStorage.setItem("token", token);
};
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

 export const signInWithGoogle = async (event: React.MouseEvent, handleShowPasswordForm: (fname: string, lname: string, email: string) => void) => {

    event.preventDefault();
    try {
      await setPersistence(auth, browserSessionPersistence); // Set session persistence

      const result = await signInWithPopup(auth, provider);
      const { user } = result; //select
      // Check if the user is already registered in your backend
console.log("USER", user)

      const response = await axios.post(`${baseUrl}/checkUser`, {
        email: user.email,
      });
 const { id, role, firstName, mail } = response.data;
      console.log("complete Response:", response);  //checked from mysql db and mysql table object
console.log("complete Response1:", response.data); 
      console.log("complete user object google:", user);

      if (response.data.exists) {
        console.log("User already registered");
        // Perform login with the existing user
    
        //  currentUser = { id, role, firstName ,username};
        //   const token = response.headers.authorization;
        //   console.log("Token:", token);
    return response.data;
        if (response.data.role === "admin") {
          window.location.href = `${baseUrl}/`; // Redirect to admin page for admin users
        } else {
          console.log("normal user");
        }
      } else {
        console.log("User not registered");
        // Extract the user's name from the email
      const [fname, lname] = user.displayName?.split(" ") ?? ["", ""];
      // Perform signup with the user's details
      // const password = prompt("Please enter a password:");
      // console.log(fname,lname ,user.email,user.password)
const email = user.email ?? "";

      handleShowPasswordForm(fname, lname, email);
      // handleSignup(fname, lname, user.email, password);
    }
// storeAuthentication(response.data.token, response.data.user);

  } catch (error) {
    console.error("Sign in with Google failed", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    // handleAuthentication(null); // Pass null to indicate user signed out
  } catch (error) {
    console.error("Sign out failed", error);
  }
};
// onAuthStateChanged(auth, handleAuthentication);
// const handleAuthentication = async (user) => {
//   if (user) {
//     // User is signed in
//     // console.log('User signed in:', user);
//     const token = await getIdToken(user);
//     const tokenResult = await getIdTokenResult(user);
//     const { claims } = tokenResult;
//     console.log("Claims:", claims);
//     console.log("Token:", token);
//     const displayName = user.displayName;
//     console.log("DisplayName:", displayName);

//     // Perform actions for logged in user, e.g., show user-specific content
//     // Set state or update UI to reflect logged in state
//     // Example: setLoggedIn(true);


// }else {
//     // User is signed out
//     console.log("User signed out hi");

//     // Perform actions for logged out user, e.g., show login form
//     // Set state or update UI to reflect logged out state
//     // Example: setLoggedIn(false);
//   }
// };

// const SessionManager = ({ updateUser }) => {
//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       Promise.resolve().then(() => handleAuthentication(user));
//       updateUser(user); // Update the user state
//     });

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, );

//   return null;
// };

// export default SessionManager;
// export { handleAuthentication };
