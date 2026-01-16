import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router";
import axios from "axios";

type Props = {
  closeModal: () => void;
  toggleHandler: () => void;
};

/**
 * Login component
 * * Responsibilities:
 * - Provide users options to login with email and password
 * - Validate user details
 * - If user is valid then update context with user datails
 */

const Login = ({ closeModal, toggleHandler }: Props) => {
  const loginInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [messsage, setMessage] = useState("");
  const { handleAuth } = useAuth();
  const navigation = useNavigate();

  const login = () => {
    if (loginInputRef.current && passwordInputRef.current) {
      if (!loginInputRef.current.value || !passwordInputRef.current.value) {
        setMessage("Please enter valid emailId and password to proceed");
      } else {
        validate(loginInputRef.current.value, passwordInputRef.current.value);
      }
    } else {
      console.error("Failed to read inputs");
    }
  };

  /**
   * Validate function:
   * Validate user Details with backend.
   * If valid update context with user details
   */
  const validate = async (email: string, password: string) => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await api.post("/auth/login", data);
      localStorage.setItem("token", response.data.token);
      handleAuth(response.data.payload);
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "Login failed";
        console.error(errorMessage);
        setMessage(errorMessage);
      } else {
        console.error(error);
        setMessage("An unexpected error occurred");
      }
    }
  };

  const handleForgetPassword = () => {
    closeModal();
    navigation("/forgot-password");
  };

  return (
    <div className="w-full flex flex-col justify-center gap-5">
      <input
        type="email"
        ref={loginInputRef}
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter Email here..."
      ></input>
      <input
        type="password"
        ref={passwordInputRef}
        className="border border-gray-400 text-xl p-4"
        placeholder="Enter Password here..."
      ></input>
      <div className="w-full flex justify-end" onClick={handleForgetPassword}>
        <span className="text-blue-700">Forgot password?</span>
      </div>
      <button
        onClick={login}
        className="mt-4 bg-brand text-white px-3 py-3 rounded flex-1 hover:bg-red-400"
      >
        Login
      </button>
      {messsage && (
        <div className="mt-4 text-md text-red-700">
         {messsage}
        </div>
      )}
      <div className="w-full flex justify-center items-center">
        Not Registered?
        <span className="text-blue-700 ml-1" onClick={toggleHandler}>
          SignUp here
        </span>
      </div>
    </div>
  );
};

export default Login;
