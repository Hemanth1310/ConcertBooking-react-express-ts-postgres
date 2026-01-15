import { useEffect, useState } from "react";
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
        await axios.get(
          `http://localhost:3008/auth/verify-email?token=${token}`
        );
          setIsVerifying(false);
          setIsVerified(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);
      } catch (error) {
        setIsVerifying(false);
        console.log(error);
      }
    };
    verifyEmail();
  }, [navigate, searchParams]);

  if (isVerifying) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center px-5 md:px-0 flex-col mt-5">
      <div className="flex flex-col gap-5">
        {isVerified ? (
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
              ✅ Your email verification completed 
            </h1>
            Your view will be automatically redirected to home page.
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
               ❌ Your email verification failed
            </h1>
            Please contact us at service@concertzz.com
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
