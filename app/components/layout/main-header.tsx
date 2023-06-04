"use client"
import { Fragment } from "react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signOutUser } from "@/app/utils/auth";
import SessionManager from "@/app/utils/session";
import { SessionManagerCookie } from "@/app/utils/session";
// import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalLogin from "../auth/Login";
import ModalSignup from "../auth/Signup";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/utils/firebase";


import {
  faMagnifyingGlass,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

type UserType = {
  claims: {
    id: number;
    name: string;
    role: string;
    email: string;
  };
  uid: string;
  // Add other properties as needed
};
function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(false);
  // function setToken(userToken) {
  //   sessionStorage.setItem('token', JSON.stringify(userToken));
  // }

  // function getToken() {
  // const tokenString = sessionStorage.getItem('token');
  //   const userToken = JSON.parse(tokenString);
  //   return userToken?.token
  // }

  // const updateUser = (userInfo:any ) => {
  //   // Update the user state
  //   setUser(userInfo);

  // };
  console.log("userInfo:", user);
  // useEffect(() => {
  //   // ...other code

  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // ...update user information using the updateUser function
  //       updateUser({ displayName, email, role: claims.role });
  //     } else {
  //       // ...clear the user information
  //       updateUser(null);
  //     }
  //   });

  //   // ...return cleanup function

  // }, [updateUser]);

  const handleLogout = async () => {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // await customSignOutUser();
    await signOutUser();
    setUser(null);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // component
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };
  const handleLoginSubmit = (user: UserType) => {
    // Update the user state
    setUser(user);
  };
  console.log("user:", user);

  //  const handleLogout = () => {
  //     try {
  //       handleLogout();
  //     } catch (error) {
  //       console.error("Logout failed", error);
  //     }
  //   };

  //responisice menu for mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      <SessionManager updateUser={setUser} setLoading={setLoading} />

      {/*  Listen for authentication state changes
       */}
      {isLoading ? (
        <div> </div>
      ) : (
        // <header className=" sticky top-0 bg-white  md:flex md:items-center md:justify-between p-4 pb-0  md:pb-4">
        <header className="sticky top-0 bg-white  p-4 pb-0 md:flex md:items-center md:justify-between z-10">
          {/* Logo text or image */}
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <h1 className="leading-none text-2xl text-grey-darkest">
              {user ? (
                <>
                  <p className="no-underline text-grey-darkest hover:text-black">
                    Welcome, {user.claims.name}
                  </p>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="no-underline text-grey-darkest hover:text-black"
                  >
                    Preview
                  </Link>
                </>
              )}
            </h1>
            <button
              className="text-black hover:text-orange md:hidden"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
          </div>
          {/* END Logo text or image */}
          {/* nav*/}
          <nav className={`md:block ${isOpen ? "block" : "hidden"}`}>
            <ul className="list-reset md:flex md:items-center">
              <li className="md:ml-4">
                <Link
                  className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="md:ml-4">
                <Link
                  className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                  href="/category"
                >
                  Category
                </Link>
              </li>
              {/* <li className="md:ml-4">
                <Link
                  className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                  href="/products"
                >
                  Products
                </Link>
              </li> */}
              <li className="md:ml-4">
                <Link
                  className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                  href="/blog"
                >
                  Blog
                </Link>
              </li>
              {/* <li className="md:ml-4">
            <Link
              className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
              href="/blog"
            >
              Blog
            </Link>
          </li> */}
              <li className="md:ml-4">
                <Link
                  className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <>
                {user ? (
                  <>
                    <li className="md:ml-4">
                      <div className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0">
                        <button onClick={handleLogout}>Logout</button>
                        {showLogin && (
                          <ModalLogin
                            onSubmit={handleLoginSubmit}
                            onClose={handleCloseLogin}
                          />
                        )}
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="md:ml-4">
                      <div className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0">
                        <button onClick={handleShowLogin}>Login</button>
                        {showLogin && (
                          <ModalLogin
                            onSubmit={handleLoginSubmit}
                            onClose={handleCloseLogin}
                          />
                        )}
                      </div>
                    </li>
                    <li className="md:ml-4">
                      <div className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0">
                        <button onClick={handleShowSignup}>Signup</button>
                        {showSignup && (
                          <ModalSignup
                            onSubmit={handleLoginSubmit}
                            onClose={handleCloseSignup}
                          />
                        )}
                      </div>
                    </li>{" "}
                  </>
                )}
              </>
            </ul>
          </nav>

          {/* END Search field */}
          {/* search */}
          <Link href="/add-product" prefetch={false}>
            <button
              type="button"
              className=" bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium  text-white text-sm px-4 py-2 text-center  dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
            >
              {" "}
              Add a Product{" "}
            </button>
          </Link>
          {/* <form className="mb-4 md:mb-0 md:w-1/4">
          <label className="hidden" htmlFor="search-form">Search</label>
          <input className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full" placeholder="Search" type="text" />
          <button className="hidden">Submit</button>
        </form> */}
          {/* END Global navigation */}
        </header>
      )}
    </Fragment>
  );
}

export default MainHeader;
