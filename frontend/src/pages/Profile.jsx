import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true); // State to manage the loading state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history("/");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:1000/api/v1/getUserData",
            { headers }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data", error);
          // Optionally, handle the error or show a message to the user
        } finally {
          setLoading(false); // Stop the loader once data is fetched or error occurs
        }
      };

      fetchData();
    }
  }, [isLoggedIn, history, headers]);

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  return (
    <div className="h-auto bg-zinc-900 px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
      {ProfileData && (
        <>
          {/* Sidebar for larger screens */}
          <div className="h-auto lg:h-[80vh] w-full lg:w-1/6 bg-zinc-800 rounded-lg">
            <Sidebar ProfileData={ProfileData} />
          </div>

          {/* Mobile Bar */}
          <MobileBar />

          {/* Main Profile Content */}
          <div className="h-[100%] w-full lg:w-5/6 rounded-lg">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
