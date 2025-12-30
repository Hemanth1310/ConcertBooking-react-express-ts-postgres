import { useState, type ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import getImageUrl from "../utils/getImageUrl";
import {
  updateProfileSchema,
  type UpdatedProfileInput,
} from "../utils/TypeChecker";
import type { UserData } from "../types";
import api from "../utils/axiosConfig";
import { useRecentBookings } from "../utils/hooks/concertDataHook";
import Spinner from "../components/Spinner";
import Order from "../components/Order";
import { useNavigate } from "react-router";

const Profile = () => {
  const { userData, handleAuth } = useAuth();
  const navigation = useNavigate();
  const {
    data: recentBookings,
    isLoading,
    isError,
    refetch,
  } = useRecentBookings();
  const [formError, setFormError] = useState<string>("");
  const [modifiedUserData, setModifiedUserData] = useState<UpdatedProfileInput>(
    {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    }
  );
  if (!userData) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        Failed to fetch details
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }
  if (!recentBookings) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        Nothing to display.
      </div>
    );
  }
  const handleDetails = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifiedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const dataUpdateHandler = async () => {
    const rawPayload = {
      firstName: modifiedUserData.firstName,
      lastName: modifiedUserData.lastName,
      email: modifiedUserData.email,
    };

    const changerFields = Object.fromEntries(
      Object.entries(rawPayload).filter(
        ([key, value]) => userData[key as keyof UserData] !== value
      )
    );

    if (Object.values(changerFields).length < 1) {
      setFormError("No changes made.");
      return;
    }

    const result = updateProfileSchema.safeParse(changerFields);

    if (!result.success) {
      setFormError(result.error.issues[0].message);
      return;
    }

    try {
      const { data } = await api.patch("/api/updateProfile", result.data);
      alert("User Updated");
      setFormError("");
      handleAuth(data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingHistory = () => {
    navigation("/booking-history");
  };

  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
          Account Details
        </h1>
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 ">
            {userData.imagePath ? (
              <img src={getImageUrl(userData.imagePath)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-800 hover:cursor-pointer text-[clamp(80px,13vw,300px)]!">
                  account_circle
                </span>
              </div>
            )}
          </div>
          <div className="flex-3 flex flex-col gap-5">
            <div className="w-full flex flex-col md:flex-row  gap-5">
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-xl px-2">Firstname</span>
                <input
                  value={modifiedUserData.firstName}
                  onChange={handleDetails}
                  name="firstName"
                  className="border-2 rounded-2xl border-gray-400 text-xl p-4 w-full"
                  placeholder={userData.firstName}
                ></input>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-xl px-2">Lastname</span>
                <input
                  value={modifiedUserData.lastName}
                  onChange={handleDetails}
                  name="lastName"
                  className="border-2 rounded-2xl border-gray-400 text-xl p-4"
                  placeholder={userData.lastName}
                ></input>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl px-2">Email</span>
              <input
                value={modifiedUserData.email}
                onChange={handleDetails}
                name="email"
                className="border-2 rounded-2xl border-gray-400 text-xl p-4"
                placeholder={userData.email}
              ></input>
            </div>
            {formError && (
              <div className="mt-4 text-lg text-red-700 px-5">{formError}</div>
            )}
            <button
              onClick={dataUpdateHandler}
              className="bg-brand w-50 text-white text-xl p-3 rounded-2xl hover:opacity-75"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
          Recent Bookings
        </h1>
        <div className="flex flex-col gap-5">
          {recentBookings.map((bookingDetails) => (
            <Order bookingDetails={bookingDetails} key={bookingDetails?.id} />
          ))}
        </div>
        <button
          className="text-lg font-bold font-mono py-5 text-blue-700 cursor-pointer hover:font-stretch-105% hover:underline"
          onClick={handleBookingHistory}
        >
          View all bookings...
        </button>
      </div>
    </div>
  );
};

export default Profile;
