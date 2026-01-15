import React, { useState } from "react";
import type { UserRegistrationData } from "../types";
import api from "../utils/axiosConfig";
import { registerSchema } from "../utils/TypeChecker";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";


/**
 * Registration component
 * * Responsibilities:
 * - Provides form for user to enter details for registration
 * - On submission validates the form against defined zod schema
 * - If Validated makes a post req for the data
 * - If failed to validate then pops error message
 */


const Register = () => {
  const [formError, setFormError] = useState<string>("");
  const [isProgress, setIsProgress] = useState(false)
  const [isComplete,setIsComplete] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  /**
   * Handle Form Input:
   * Read from input for userregistraation details
   * Parse the details with Zod: user details schema
   */

  const handleFormInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("")
    setIsProgress(true)
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);

    const result = registerSchema.safeParse(payload);

    if (!result.success) {
      setFormError(result.error.issues[0].message);
      return;
    }

    const rest = Object.fromEntries(
      Object.entries(payload).filter(([key]) => key !== "repassword")
    ) as UserRegistrationData;

    Registration(rest);
  };

  /**
   * Registration function:
   * Make a post request for new user details 
   */
  const Registration = async (userRegData: UserRegistrationData) => {
    try {
      const response = await api.post("/auth/register", userRegData);
      console.log(response.data.messsage);
      setIsProgress(false)
      setIsComplete(true)
      setMessage(response.data.messsage)
      setTimeout(()=>{ navigate('/')})
    } catch (error) {
      console.error("Connection Failed" + error);
      setFormError("Registration failed. Please try again later!!");
    }
  };

  if(isComplete){
    return(
    <div className="w-full flex flex-col justify-center gap-5">
      <h1 className="text-xl font-bold">Your registeration is completed. {message}</h1>
      <p>You'll automatically be redirected to homepage</p>
    </div>
    )
  }

  return (
    <form
      className="w-full flex flex-col justify-center gap-5"
      onSubmit={handleFormInput}
    >
      <input
        type="text"
        name="firstName"
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter First Name here..."
      ></input>
      <input
        type="text"
        name="lastName"
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter Lastname here..."
      ></input>
      <input
        type="email"
        name="email"
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter Email here..."
      ></input>
      <input
        type="password"
        name="password"
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter Password here..."
      ></input>
      <input
        type="password"
        name="repassword"
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter Password here..."
      ></input>
      {formError && (
        <div className="mt-4 text-lg text-red-700 text-center">{formError}</div>
      )}
      <div className="w-full flex gap-5">
        
        <button
          type="submit"
          disabled={isProgress}
          className="mt-4 bg-brand text-white px-3 py-3 rounded flex-1 hover:bg-red-400 disabled:bg-gray-500"
        >
          {isProgress? <div>In progress...</div>:<div>Register</div>}
          
        </button>
      </div>
    </form>
  );
};

export default Register;
