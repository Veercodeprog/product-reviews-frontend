import React, { useState } from "react";
import { handleSignup } from "@/app/utils/auth";
interface ModalLoginProps {
  onClose: () => void;
  onSubmit: (user: any) => void;
}
const ModalSignup = ({ onClose, onSubmit }: ModalLoginProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  setError(""); // Clear error when input changes

  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


const buttonSignup = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Add your signup logic here
  try {
    const result = await handleSignup(firstName, lastName, email, password);
    console.log("sign up user test", result);

    if (result) {
      // User signup was successful
      // if (result.user) {
      //   onSubmit(result.user);
      // }
      // const { role } = result.data;

      // if (role=== "admin") {
      //   console.log("ADMIN USER");
      // }
      onClose();
    } else {
      // User already exists or custom claims couldn't be set
      setError("User already exists");
    }
  } catch (error) {
    console.error("Signup failed", error);
    setError("Error occurred during signup");
  }
};

//   const buttonSignup = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     // Add your signup logic here
//     try {
//       const result=  await handleSignup(firstName, lastName , email, password );
// console.log("sign up user test",result)
// if (result.user) {
//         onSubmit(result.user);
//       }
//       if (result.user.role == "admin") {
//         console.log("ADMIN USER");
//       }
//       onClose();
//     } catch (error) {
//       console.error("Signup failed", error);
//       setError("Error occurred during signup");
//     }
//   };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-96">


        <span
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          &times;

        </span>
 {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={buttonSignup}>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
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
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Signup
          </button>
        </form>

        <form></form>
      </div>
    </div>
  );
};
export default ModalSignup;
