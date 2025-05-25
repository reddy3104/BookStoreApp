import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ ProfileData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    navigate("/");
  };

  return (
    <div className="h-auto max-h-[85vh] overflow-y-auto flex flex-col p-4 bg-zinc-800 text-white rounded shadow-md justify-between items-center">
      {/* Profile Info */}
      <div className="flex flex-col items-center w-full">
        <img
          src={ProfileData.avatar}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover border-2 border-zinc-600"
        />
        <p className="mt-3 text-lg font-semibold text-center">{ProfileData.username}</p>
        <p className="text-sm text-zinc-400 text-center">{ProfileData.email}</p>
        <div className="w-full h-px bg-zinc-600 my-4 hidden lg:block"></div>
      </div>

      {/* Navigation Links */}
      <div className="w-full hidden lg:flex flex-col items-center space-y-3">
        {role !== "admin" ? (
          <>
            <SidebarLink to="/profile" text="Favourites" />
            <SidebarLink to="/profile/orderHistory" text="Order History" />
            <SidebarLink to="/profile/settings" text="Settings" />
          </>
        ) : (
          <>
            <SidebarLink to="/profile" text="All Orders" />
            <SidebarLink to="/profile/add-book" text="Add Book" />
          </>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-5 w-full flex items-center justify-center gap-3 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition-all duration-300"
      >
        Log Out <FaArrowRightFromBracket />
      </button>
    </div>
  );
};

const SidebarLink = ({ to, text }) => (
  <Link
    to={to}
    className="w-full text-center py-2 px-3 rounded hover:bg-zinc-700 transition-all duration-200 font-medium"
  >
    {text}
  </Link>
);

export default Sidebar;
