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
 type UserType = {
  id: number;
  username: string;
  role: string;
  firstName: string;
  // Add other properties as needed
};
const storeAuthentication = (token: string, user: UserType) => {
  sessionManagerWithoutFirebase.setUser(user);
  localStorage.setItem("token", token);
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async (
  event: React.MouseEvent<HTMLButtonElement>,
  handleShowPasswordForm: (
    firstName: string,
    lastName: string,
    email: string
  ) => void
) => {
  event.preventDefault();
  try {
    await setPersistence(auth, browserSessionPersistence); // Set session persistence

    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    const response = await axios.post(`${baseUrl}/checkUser`, {
      email: user.email,
    });

    if (response.data.exists) {
      const { id, role, firstName, username } = response.data;

      if (response.data.role === "admin") {
        window.location.href = `${baseUrl}/`; // Redirect to admin page for admin users
      } else {
        console.log("normal user");
      }
    } else {
      const [fname, lname] = user.displayName.split(" ");
      handleShowPasswordForm(fname, lname, user.email);
    }

    storeAuthentication(response.data.token, response.data.user);
    return response.data;
  } catch (error) {
    console.error("Sign in with Google failed", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    handleAuthentication(null); // Pass null to indicate user signed out
  } catch (error) {
    console.error("Sign out failed", error);
  }
};

const handleAuthentication = async (user: UserType | null) => {
  if (user) {
    const token = await getIdToken(user);
    const tokenResult = await getIdTokenResult(user);
    const { claims } = tokenResult;
    console.log("Claims:", claims);
    console.log("Token:", token);
    const displayName = user.displayName;
    console.log("DisplayName:", displayName);
  } else {
    console.log("User signed out hi");
  }
};

const SessionManager = ({ updateUser }: { updateUser: (user: UserType | null) => void }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      Promise.resolve().then(() => handleAuthentication(user));
      updateUser(user);
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default SessionManager;
export { handleAuthentication };
