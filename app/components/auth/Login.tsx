import React, { useState, useEffect } from "react";
import { handleLogin } from "@/app/utils/api";
import { handleSignup } from "@/app/utils/api";
import { signInWithGoogle } from "@/app/utils/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

// import { useRouter } from 'next/router';
// import { signInWithGoogle } from "@/app/utils/firebase";
// const API_BASE_URL = process.env.API_BASE_URL;
import SessionManager from "@/app/utils/auth";
import sessionManagerWithoutFirebase from "@/app/utils/sessionManager";
import { Imperial_Script } from "next/font/google";
import { useRouter } from "next/navigation";

interface ModalLoginProps {
  onClose: () => void;
  onSubmit: (user: any) => void;
}

const ModalLogin = ({ onClose, onSubmit }: ModalLoginProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUsername] = useState("");
  const [pwd, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordForm = (fname: string, lname: string, email: string) => {
    setShowPasswordForm(true);
    setFirstName(fname);
    setLastName(lname);
    setUsername(email);
  };

  const handlePasswordFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup(firstName, lastName, user, pwd);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await handleLogin(user, pwd);

      if (result.user) {
        onSubmit(result.user);
      }
      if (result.user.role == "admin") {
        router.push("/admin");
        console.log("ADMIN USER");
      }
      onClose();
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid username or password");
    }
  };

  const handleGoogleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const result = await signInWithGoogle(event, handleShowPasswordForm);
      console.log("user by sign in with google:", result);
      if (result) {
        console.log("user by sign in with google:", result.user);
        onSubmit(result.user);
      }

      if (result.user.role === "admin") {
        console.log("ADMIN USER");
      }

      onClose();
    } catch (error) {
      console.error("Google Sign-In failed", error);
      // Handle the error as needed
    }
  };


  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-96">
        <span
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>

        {!showPasswordForm && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                id="user"
                type="text"
                value={user}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                id="pwd"
                type="password"
                value={pwd}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="submit"
             
             
            >
              Login
            </button>
            <div className="mt-5 flex items-center    space-x-2">
              <div className="w-5 h-5">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Icon" 
                />
              </div>
              <button
                className="flex items-center justify-center px-4 py-2 space-x-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:ring focus:ring-blue-300"
 type ="submit"
                onClick={handleGoogleSignIn}
              >
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>
        )}

        {showPasswordForm && (
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Set Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                id="password"
                type="password"
                // value={pwd}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handlePasswordFormSubmit}
              type="submit"
            >
              Submit Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
