import { useState, useEffect } from "react";
import { getAuth, getIdToken } from "firebase/auth";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  getIdTokenResult,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import axios from "axios";
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// import "firebase/firestore";
import { auth } from "./firebase";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// setPersistence(auth, browserLocalPersistence)
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
// /api/auth/local/register
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

  export const signInWithGoogle = async (
    event: React.MouseEvent,
    handleShowPasswordForm: (fname: string, lname: string, email: string) => void
  ) => {
    event.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const { email, displayName, uid } = user;
      const userToken = await result.user.getIdToken();
      const tokenResult = await getIdTokenResult(result.user);
      const customClaims = tokenResult.claims;
      if (!customClaims.role) {
        const response = await axios.post(`${baseUrl}/setCustomClaims`, { uid });
        console.log("role not present:");
      } else {
        console.log("Custom claims role:", customClaims.role);
      }
      const userTokenResult = await result.user.getIdTokenResult();

      console.log("Custom claims:", customClaims);

      // const csrfToken = getCookie("csrfToken");
      // console.log("csrfToken:", csrfToken);
      const responseCookie = await axios.post(
        `${baseUrl}/sessionLogin`,
        { idToken: userToken },

        {
          withCredentials: true,
        }
      );
// const { data } = responseCookie;  // se the cookie in auth headers for the backend requests and then backend to verify if user authenticated or not
// const { sessionCookie } = data;
 // already set though
      if (customClaims && customClaims.role === "admin") {
        // Redirect to admin page if the 'admin' custom claim is true
        // window.location.assign("/admin");
      } else {
        // Redirect to regular user profile page\
        console.log("Custom claims:", customClaims.auth_time);

        // window.location.assign('/');
      }

      return customClaims;
    } catch (error) {
      console.error("Login failed", error);
    }
  };







// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     getIdTokenResult(user)
//       .then((tokenResult) => {
//         // handleAuthentication( tokenResult.claims);
//       })
//       .catch((error) => {
//         console.error('Error getting token result', error);
//       });
//   } else {
//     // handleAuthentication(null);
// signOut(auth);
//   }
// });
export const handleLogin = async (email: string, password: string) => {
  try {
    setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get the user from the user credential
    const { uid, email: userEmail, displayName } = userCredential.user;

    const user = {
      id: uid,
      email: userEmail,
      firstName: displayName,
      username: userEmail, // Assuming email is used as the username
    };

    const userToken = await userCredential.user.getIdToken();
    // storeAuthentication(userToken, user);

    // Get the token result to access custom claims
    const tokenResult = await getIdTokenResult(userCredential.user);

    // Access the custom claims from the token result
    const customClaims = tokenResult.claims;
    console.log("Custom claims:", customClaims);

    // Send the ID token to the session login endpoint for session creation with CSRF protection
    // const csrfToken = getCookie("csrfToken");
    // console.log("csrfToken:", csrfToken);
    const response = await axios.post(
      `${baseUrl}/sessionLogin`,
      { idToken: userToken },

      {
        withCredentials: true,
      }
    );
    // handleAuthentication(customClaims);

    // Perform the necessary redirection based on custom claims
    if (customClaims && customClaims.admin === true) {
      // Redirect to admin page if the 'admin' custom claim is true
      // window.location.assign("/admin");
    } else {
      // Redirect to regular user profile page\
      console.log("Custom claims:", customClaims.auth_time);

      // window.location.assign('/');
    }

    return user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};
export const handleSignup = async (
  fname: string,
  lname: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    setPersistence(auth, browserLocalPersistence);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update the user's display name (optional)
    const displayName = `${fname} ${lname}`;
    await updateProfile(userCredential.user, { displayName });
    const { uid } = userCredential.user;
    try {
      const response = await axios.post(`${baseUrl}/setCustomClaims`, { uid });

      // const { token, user } = response.data;

      //every time someone authenticates we get this
      const userTokenResult = await userCredential.user.getIdTokenResult();

      // / Get the token result to access custom claims
      const tokenResult = await getIdTokenResult(userCredential.user);

      // Access the custom claims from the token result
      const customClaims = tokenResult.claims;

      // Check if custom claims exist and access the role field
      // const role = customClaims?.user || null;

      // Log the custom claims and role
      console.log("Custom claims:", customClaims);

      const role = customClaims.role;
      console.log("Role:", role);
      console.log("Custom claims:", customClaims);

      console.log("signup successful", userCredential);
    } catch (error) {
      // Handle error if user already exists and custom claims couldn't be set
      console.error("Failed to set custom claims:", error);
    }

    // const { displayName, email, role } = user;
    // console.log("User:", displayName, email, role);

    // Set the custom claim "user" with a value of true

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// export const signInWithGoogle = async (
//   event: React.MouseEvent,
//   handleShowPasswordForm: (fname: string, lname: string, email: string) => void
// ) => {
//   event.preventDefault();
//   try {
//     await setPersistence(auth, browserSessionPersistence); // Set session persistence

//     const result = await signInWithPopup(auth, provider);
//     const { user } = result; //select
//     // Check if the user is already registered in your backend
//     console.log("USER", user);

//     const response = await axios.post(`${baseUrl}/checkUser`, {
//       email: user.email,
//     });
//     const { id, role, firstName, mail } = response.data;
//     console.log("complete Response:", response); //checked from mysql db and mysql table object
//     console.log("complete Response1:", response.data);
//     console.log("complete user object google:", user);

//     if (response.data.exists) {
//       console.log("User already registered");

//       return response.data;

//     } else {
//       console.log("User not registered");
//       // Extract the user's name from the email
//       const [fname, lname] = user.displayName?.split(" ") ?? ["", ""];
//       // Perform signup with the user's details
//       // const password = prompt("Please enter a password:");
//       // console.log(fname,lname ,user.email,user.password)
//       const email = user.email ?? "";

//       handleShowPasswordForm(fname, lname, email);
//       // handleSignup(fname, lname, user.email, password);
//     }
//     // storeAuthentication(response.data.token, response.data.user);
//   } catch (error) {
//     console.error("Sign in with Google failed", error);
//     throw error;
//   }
// };


export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
    document.cookie = 'apiauth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    await axios.post(`${baseUrl}/logout`);
    // handleAuthentication(null); // Pass null to indicate user signed out
  } catch (error) {
    console.error('Sign out failed', error);
  }
};

const handleAuthentication = (customClaims: any) => {
  if (customClaims) {
    // User is signed in
    const { name, role, email } = customClaims;

    // Perform actions for a logged-in user
    console.log("Name:", name);
    console.log("Role:", role);
    console.log("Email:", email);

    // Update the user information or perform any other necessary actions
    // updateUser({ displayName, email, role });
    // Redirect to the appropriate page based on the user's role
    if (role === "admin") {
      // Redirect to the admin page
      // window.location.assign("/admin");
    } else {
      // Redirect to the regular user profile page
      // window.location.assign('/');
    }
  } else {
    // User is signed out
    console.log("User signed out");

    // Clear the user information or perform any other necessary actions
    // updateUser(null);

    // Redirect to the login page or desired destination
    // window.location.assign('/login');
  }
};
export { handleAuthentication };

export const preload = () => {
  void getCurrentUserClaims();
 
};

export const getCurrentUserClaims = async () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      const idTokenResult = await currentUser.getIdTokenResult();
      console.log("idTokenResult", idTokenResult);
      return idTokenResult.claims;
    } catch (error) {
      console.error('Error retrieving current user claims:', error);
    }
  }

  return null;
};

export const fetchUserClaims = async (userId: string) => {
  try {


    // Fetch the user object
  const response = await axios.post(
      `${baseUrl}/fetchUserClaimsByUid`,
      { userId },

   
    );

    // Fetch the ID token result to access custom claims
   const customClaims = response.data;

  return { ...customClaims, name: customClaims.name };
  } catch (error) {
    console.error("Failed to fetch user claims", error);
    throw error;
  }
};




// export const customSignOutUser = async () => {
//   try {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
    
//   } catch (error) {
//     console.error("Sign out failed", error);
//   }
// };