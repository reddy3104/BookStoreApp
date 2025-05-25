import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      <div
        className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 transition-opacity duration-300`}
        onClick={() => setuserDiv("hidden")} // Close on backdrop click
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
              Username:{" "}
              <span className="font-semibold text-zinc-800">{userDivData.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-zinc-600">
              Email:{" "}
              <span className="font-semibold text-zinc-800">{userDivData.email}</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block text-sm text-zinc-600">
              Address:{" "}
              <span className="font-semibold text-zinc-800">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
