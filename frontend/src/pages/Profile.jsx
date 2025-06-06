import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";
import API_URL from "../config";  // Import the centralized API URL

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const [loading, setLoading] = useState(true); 
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
            `${API_URL}/getUserData`,   // Use the config API URL here
            { headers }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isLoggedIn, history]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-auto bg-zinc-900 px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
      {ProfileData && (
        <>
          <div className="h-auto lg:h-[80vh] w-full lg:w-1/6 bg-zinc-800 rounded-lg">
            <Sidebar ProfileData={ProfileData} />
          </div>

          <MobileBar />

          <div className="h-[100%] w-full lg:w-5/6 rounded-lg">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
