import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFavoriteBorder, MdHistory, MdSettings, MdLibraryBooks, MdAddBox } from "react-icons/md";

const MobileBar = () => {
  const role = useSelector((state) => state.auth.role);

  const commonClasses =
    "flex items-center gap-3 justify-center text-zinc-100 font-medium w-full py-3 text-center rounded-md transition duration-300 hover:bg-zinc-800 active:bg-zinc-700";

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2 px-4 lg:hidden">
      {role !== "admin" ? (
        <>
          <Link to="/profile" className={commonClasses}>
            <MdFavoriteBorder size={20} /> Favourites
          </Link>
          <Link to="/profile/orderHistory" className={commonClasses}>
            <MdHistory size={20} /> Order History
          </Link>
          <Link to="/profile/settings" className={commonClasses}>
            <MdSettings size={20} /> Settings
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile" className={commonClasses}>
            <MdLibraryBooks size={20} /> All Orders
          </Link>
          <Link to="/profile/add-book" className={commonClasses}>
            <MdAddBox size={20} /> Add Book
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileBar;
