import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { AuthContext } from "../contexts/AuthProvider";
import useBuyer from "../hooks/useBuyer";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return (
      <div className="w-10 mx-auto mt-32">
        <PulseLoader color="#36d7b7" />
      </div>
    );
  }

  if (user && isBuyer) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;
