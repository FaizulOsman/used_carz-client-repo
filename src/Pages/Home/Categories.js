import React from "react";
import lamborghiniLogo from "../../assets/images/lamborghiniLogo.png";
import porscheLogo from "../../assets/images/porscheLogo.png";
import teslaLogo from "../../assets/images/teslaLogo.png";

const Categories = () => {
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-20">
      <h2 className="text-center text-4xl font-bold mb-10 text-secondary">
        Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-8 border rounded-lg shadow-xl hover:bg-base-200 duration-300">
          <img className="w-full h-56" src={lamborghiniLogo} alt="" />
          <h4 className="text-xl font-semibold text-primary text-center">
            Lamborghini Certified
          </h4>
        </div>
        <div className="p-8 border rounded-lg shadow-xl hover:bg-base-200 duration-300">
          <img className="w-full h-56" src={porscheLogo} alt="" />
          <h4 className="text-xl font-semibold text-primary text-center">
            Porsche Certified
          </h4>
        </div>
        <div className="p-8 border rounded-lg shadow-xl hover:bg-base-200 duration-300">
          <img className="w-full h-56" src={teslaLogo} alt="" />
          <h4 className="text-xl font-semibold text-primary text-center">
            Tesla Certified
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Categories;
