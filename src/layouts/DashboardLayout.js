import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-secondary text-white">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to="/dashboard" className="hover:bg-primary">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/dashboard/myproducts" className="hover:bg-primary">
                My Products
              </Link>
            </li>
            <li>
              <Link to="/dashboard/addproduct" className="hover:bg-primary">
                Add A Product
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allusers" className="hover:bg-primary">
                    All users
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/reporteditems"
                    className="hover:bg-primary"
                  >
                    Reported Items
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
