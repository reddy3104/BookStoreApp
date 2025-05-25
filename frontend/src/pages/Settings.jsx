import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({ address: "" });
  
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/getUserData",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const updateAddress = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/update-user-address",
      Value,
      { headers }
    );
    alert(res.data.message);
  };

  return (
    <>
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className="h-auto p-6 md:p-8 bg-zinc-900 text-zinc-100 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-500 mb-8">Settings</h1>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-zinc-400">Username</label>
              <p className="p-3 rounded bg-zinc-800 font-semibold">{ProfileData.username}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-zinc-400">Email</label>
              <p className="p-3 rounded bg-zinc-800 font-semibold">{ProfileData.email}</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="font-semibold text-zinc-400">Address</label>
            <textarea
              className="p-3 rounded bg-zinc-800 font-semibold resize-none"
              rows="5"
              placeholder="Enter your address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>

          {/* Update Button */}
          <div className="flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300"
              onClick={updateAddress}
            >
              Update Address
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
