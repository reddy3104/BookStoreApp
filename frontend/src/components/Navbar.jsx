import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [Nav, setNav] = useState("hidden");

  let links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
  ];

  if (isLoggedIn) {
    if (role !== "admin") {
      links.push({ title: "Cart", link: "/cart" });
    }
    links.push({
      title: role === "admin" ? "Admin Profile" : "Profile",
      link: "/profile",
      bordered: true,
    });
  }

  const handleToggle = () => {
    setNav(Nav === "hidden" ? "block" : "hidden");
  };

  const baseLinkStyle =
    "mx-3 my-1 text-white hover:text-blue-400 transition duration-300";
  const borderedLinkStyle =
    "mx-3 my-1 text-white border border-blue-500 px-4 py-1 rounded-xl shadow-md hover:bg-white hover:text-zinc-900 hover:scale-105 transform transition-all duration-300";
  const buttonStyle =
    "rounded-xl border border-blue-500 px-4 py-1 mx-2 shadow hover:bg-white hover:text-zinc-900 transition-all duration-300";

  return (
    <>
      <nav className="bg-zinc-800 text-white shadow-md w-full">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
              alt="logo"
              className="h-10"
            />
            <Link to="/" className="text-3xl font-bold text-white">
              Booksy
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden focus:outline-none" onClick={handleToggle}>
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center">
            {links.map(({ title, link, bordered }, i) => (
              <Link
                key={i}
                to={link}
                className={bordered ? borderedLinkStyle : baseLinkStyle}
              >
                {title}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link to="/login" className={buttonStyle}>
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl bg-blue-500 px-4 py-1 mx-2 shadow hover:bg-white hover:text-zinc-900 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Links */}
        <div className={`lg:hidden ${Nav} bg-zinc-800 px-6 py-4`}>
          <div className="flex flex-col items-center">
            {links.map(({ title, link, bordered }, i) => (
              <Link
                key={i}
                to={link}
                onClick={() => setNav("hidden")}
                className={
                  bordered
                    ? "text-white border border-blue-500 px-4 py-2 rounded-xl shadow-md my-2 w-full text-center hover:bg-white hover:text-zinc-900 hover:scale-105 transform transition-all duration-300"
                    : "text-white py-2 w-full text-center border-b border-gray-600 hover:text-blue-400"
                }
              >
                {title}
              </Link>
            ))}
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className={`${buttonStyle} my-2 w-full text-center`}
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl bg-blue-500 px-4 py-2 my-2 w-full text-center shadow hover:bg-white hover:text-zinc-900 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
