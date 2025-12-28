import React, { useRef, useState, type ChangeEvent } from "react";
import api from "../utils/axiosConfig";
import z from "zod";
import axios from "axios";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "../utils/TypeChecker";
import { useNavigate } from "react-router";

const PasswordReset = () => {
  const navigation = useNavigate();
  const [isValidated, setValidated] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string>("");
  const [formData, setFormData] = useState<ResetPasswordInput>({
    password: "",
    repassword: "",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "An error occurred";

      if (status === 404) {
        setFormError("No account found with this email.");
      } else {
        setFormError(message);
      }
    } else if (error instanceof Error) {
      setFormError(error.message);
    } else {
      setFormError("An unexpected error occurred.");
    }
  };

  const handleValidation = async () => {
    const email = emailRef.current?.value || "";
    if (!z.string().email().safeParse(email).success) {
      setFormError("Invalid email format");
      return;
    }
    setIsLoading(true);
    setFormError('');

    try {
      const { data } = await api.post(`/auth/validate-email`, { email: email });
      if (data.isValid) {
        setValidated(true);
        setVerifiedEmail(email);
        setFormError("");
      }
    } catch (error) {
      handleError(error);
    }finally {
            setIsLoading(false);
    }
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordUpdate = async () => {
    const result = resetPasswordSchema.safeParse(formData);

    if (!result.success) {
      setFormError(result.error.issues[0].message);
      return;
    }
    setIsLoading(true);
    setFormError('');

    try {
      const { data } = await api.patch("/auth/password-update", {
        email: verifiedEmail,
        newPassword: formData.password,
      });

      if (data.isPasswordUpdated) {
        alert("Password Updated");
        navigation("/");
      }
    } catch (error) {
      handleError(error);
    }finally {
            setIsLoading(false);
    }
  };

  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5 items-center justify-center">
      <div className="w-full md:w-1/2 py-10 border-2 px-5 flex flex-col items-center gap-5">
        <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
          Password Reset
        </h1>
        {!isValidated ? (
          <div className="w-full flex flex-col md:flex-row  gap-5">
            <div className="flex flex-col gap-5 flex-1">
              <span className="text-xl px-2 font-bold">Email:</span>
              <input
                ref={emailRef}
                name="email"
                defaultValue=""
                className="border-2 rounded-2xl border-gray-400 text-xl p-4 w-full"
                placeholder="Enter your email"
              ></input>
              <button
                disabled={isLoading}
                onClick={handleValidation}
                className="bg-brand w-50 text-white text-xl p-3 rounded-2xl hover:opacity-75"
              >
                {isLoading?'Checking':'Validate'}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row  gap-5">
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-xl px-2">New Password</span>
              <input
                name="password"
                value={formData.password}
                onChange={handlePasswordInput}
                className="border-2 rounded-2xl border-gray-400 text-xl p-4 w-full"
              ></input>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-xl px-2">Re enter new password</span>
              <input
                name="repassword"
                value={formData.repassword}
                onChange={handlePasswordInput}
                className="border-2 rounded-2xl border-gray-400 text-xl p-4"
              ></input>
            </div>
            <button
            disabled={isLoading}
              onClick={handlePasswordUpdate}
              className="bg-brand w-50 text-white text-xl p-3 rounded-2xl hover:opacity-75"
            >
              {isLoading?'Checking':'Update'}
            </button>
          </div>
        )}

        <div className="mt-4 text-lg text-red-700 text-center">{formError}</div>
      </div>
    </div>
  );
};

export default PasswordReset;
