import React from "react";
import bannerImg from "../../assets/images/banner.jpg";
import PrimaryButton from "../../components/PrimaryButton";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div
        className="h-[460px]"
        style={{
          background: `url(${bannerImg})`,
          backgroundPosition: "center",
        }}
      >
        <h3
          style={{
            textShadow: "0 8px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.6)",
          }}
          className="text-5xl text-center text-white pt-20 font-bold"
        >
          Let's Find <br />
          Your Next Used Car
        </h3>
      </div>

      <div className="border-4 bg-base-100 mt-10 lg:-mt-24 lg:w-8/12 mx-auto rounded-lg p-10">
        <h3 className="text-3xl font-semibold text-center text-secondary">
          Tell us what you're looking for
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-5">
          <select className="select select-bordered w-full">
            <option>Select a Make</option>
            <option>Lamborghini</option>
            <option>Porsche</option>
            <option>BMW</option>
            <option>Tesla</option>
          </select>
          <select disabled className="select select-bordered w-full">
            <option>Select a Model</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <input
            type="text"
            placeholder="Zip Code"
            className="input input-bordered w-full"
          />
          <PrimaryButton classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100">
            Let's Go
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;
