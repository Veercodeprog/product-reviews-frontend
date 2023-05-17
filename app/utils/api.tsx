import axios from "axios";
import { auth } from "./firebase";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import sessionManagerWithoutFirebase from "./sessionManager";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const storeAuthentication = (token: string, user: User) => {
  sessionManagerWithoutFirebase.setUser(user);
  localStorage.setItem("token", token);
};

export const handleLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const { id, role, firstName, mail } = response.data;
    const user = { id, role, firstName, username };

    if (response) {
      storeAuthentication(response.data.token, response.data.user);
    }

    return response.data;
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
) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, {
      fname,
      lname,
      email,
      password,
    });

    console.log("Login successful", response);
    console.error("Registered ");
    return response.data;
  } catch (error) {
    console.error("Signup failed");
    throw error;
  }
};


export const customSignOutUser = async () => {
  try {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
  } catch (error) {
    console.error("Sign out failed", error);
  }
};

const CustomSessionManager = ({ updateUser }: { updateUser: (user: User | null) => void }) => {
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
