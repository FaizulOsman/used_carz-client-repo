import React from "react";
import dashboard from "../../assets/dashboard.png";

const Dashboard = () => {
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto p-10 text-center">
      <h3 className="text-3xl mb-12 font-semibold text-primary">
        Welcome to Dashboard
      </h3>
      <div className="w-10/12 lg:w-1/2 mx-auto">
        <img className="w-full" src={dashboard} alt="" />
      </div>
    </div>
  );
};

export default Dashboard;
