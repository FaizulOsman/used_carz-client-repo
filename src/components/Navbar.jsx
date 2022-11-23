import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Log Out Function
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((e) => console.error(e));
  };

  // Menu List
  const menuItems = (
    <>
      <li>
        <Link
          to="/"
          className="hover:text-primary text-md p-3 font-semibold group transition-all duration-300 ease-in-out"
        >
          <span className="bg-left-bottom bg-gradient-to-r from-primary to-cyan-300 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
            Home
          </span>
        </Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link
              onClick={handleLogOut}
              className="hover:text-primary text-md p-3 font-semibold group transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-primary to-cyan-300 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                Log Out
              </span>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/login"
              className="hover:text-primary text-md p-3 font-semibold group transition-all duration-300 ease-in-out"
            >
              <span className="bg-left-bottom bg-gradient-to-r from-primary to-cyan-300 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                Login
              </span>
            </Link>
          </li>
        </>
      )}
      <li>
        <Link
          to="/blog"
          className="hover:text-primary text-md p-3 font-semibold group transition-all duration-300 ease-in-out"
        >
          <span className="bg-left-bottom bg-gradient-to-r from-primary to-cyan-300 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
            Blog
          </span>
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-secondary">
      <div className="max-w-[1400px] mx-auto">
        <div className="navbar p-0">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost lg:hidden text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {menuItems}
              </ul>
            </div>
            <Link className="btn btn-ghost normal-case text-xl">
              <img className="h-full" src={logo} alt="" />
              <span className="ml-2 fontNothingYouCouldDo text-primary font-semibold">
                Used-carz
              </span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal p-0 text-white">{menuItems}</ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 border border-primary rounded-full">
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      title={
                        user?.uid ? `${user?.email}` : `User name not found`
                      }
                      alt="img"
                    />
                  ) : (
                    <div className="mt-2 flex justify-center text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users "
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-64"
              >
                {!user?.uid ? (
                  <>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">Sign In</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="ml-4">
                      <p>{user?.displayName || "Name not found"}</p>
                      <p className="">{user?.email}</p>
                    </div>
                    <hr />
                    <li>
                      <Link>Settings</Link>
                    </li>

                    <li>
                      <Link>Edit Profile</Link>
                    </li>
                    <hr />
                    <li>
                      <Link onClick={handleLogOut}>Log out</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
