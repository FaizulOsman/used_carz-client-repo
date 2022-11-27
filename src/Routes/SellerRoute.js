import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useSeller from "../hooks/useSeller";
import { HashLoader } from "react-spinners";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (loading || isSellerLoading) {
    return (
      <div className="w-20 mx-auto h-20 my-52">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
