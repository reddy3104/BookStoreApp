import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import API_URL from "../../config"; // corrected import

const SeeUserData = ({ userId, userDiv, setuserDiv }) => {
  const [userDivData, setUserDivData] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/user/${userId}`, { headers });
        setUserDivData(res.data.data);
      } catch (error) {
        alert("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId && userDiv !== "hidden") {
      fetchUserData();
    }
  }, [userId, userDiv]);

  if (loading) return <div className="text-center text-white p-4">Loading user data...</div>;
  if (!userDivData) return null;

  return (
    <>
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 transition-opacity duration-300`}
        onClick={() => setuserDiv("hidden")}
      ></div>
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center transition-opacity duration-300`}
      >
        <div className="bg-white rounded-lg p-6 w-[80%] md:w-[50%] lg:w-[40%] shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-zinc-700">User Information</h1>
            <button
              onClick={() => setuserDiv("hidden")}
              className="text-xl text-red-500 hover:text-red-700 transition-colors"
            >
              <RxCross1 />
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-zinc-600">
              Username: <span className="font-semibold text-zinc-800">{userDivData.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-zinc-600">
              Email: <span className="font-semibold text-zinc-800">{userDivData.email}</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-zinc-600">
              Address: <span className="font-semibold text-zinc-800">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
