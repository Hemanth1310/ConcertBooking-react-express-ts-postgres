import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setIsVerifying(false);
        return;
      }
      try {
        await axios.get(`http://localhost:3008/api/auth/verify?token=${token}`);
        setIsVerifying(false);
        setIsVerified(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmail();
  }, [ navigate, searchParams]);

  if (isVerifying) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
        Verifying your email
      </h1>
      <div className="flex flex-col gap-5">
        {isVerified ? (
          <div>Your Email is verified</div>
        ) : (
          <div>
            Your email was not verified please contact us at
            service@concertzz.com
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
