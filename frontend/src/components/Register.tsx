import React, { useState } from "react";
import type { UserRegistrationData } from "../types";
import api from "../utils/axiosConfig";
import { registerSchema } from "../utils/TypeChecker";

const Register = () => {
  const [flag, setflag] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const handleFormInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setflag(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);

    const result = registerSchema.safeParse(payload);

    if (!result.success) {
      setflag(true);
      setFormError(result.error.issues[0].message);
      return;
    }

    const rest = Object.fromEntries(
      Object.entries(payload).filter(([key]) => key !== "repassword")
    ) as UserRegistrationData;

    Registration(rest);
  };

  const Registration = async (userRegData: UserRegistrationData) => {
    try {
      const response = await api.post("/auth/register", userRegData);
      console.log(response.data.messsage);
    } catch (error) {
      console.error("Failed to Fetch api" + error);
      setFormError("REgistration failed. Please try again later!!");
    }
  };

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
      {flag && (
        <div className="mt-4 text-lg text-red-700 text-center">{formError}</div>
      )}
      <div className="w-full flex gap-5">
        <button
          type="submit"
          className="mt-4 bg-brand text-white px-3 py-3 rounded flex-1 hover:bg-red-400"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
