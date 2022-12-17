import React from "react";
import ProsAndCons from "../../assets/images/pros-and-cons.png";
import Batteries from "../../assets/images/batteries.png";
import Distance from "../../assets/images/distance.png";
import AWDvs4WD from "../../assets/images/awd-vs-4wd.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ArticlesAndTips = () => {
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-28">
      <div data-aos="flip-left">
        <h2 className="text-4xl font-bold text-center text-secondary">
          Articles & Tips
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-20">
        <div className="border rounded-md" data-aos="fade-right">
          <img className="w-full h-52" src={ProsAndCons} alt="" />
          <div className="pl-3 mt-3">
            <h5 className="text-gray-600 text-xs font-semibold">
              CAR BUYING TIPS
            </h5>
            <h4 className="text-xl font-semibold my-4">
              Pros and Cons of Buying a Used Hybrid
            </h4>
            <button className="btn btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
        <div className="border rounded-md" data-aos="fade-up">
          <img className="w-full h-52" src={Batteries} alt="" />
          <div className="pl-3 mt-3">
            <h5 className="text-gray-600 text-xs font-semibold">
              CAR BUYING TIPS
            </h5>
            <h4 className="text-xl font-semibold my-4">
              How Much Do EV Batteries Cost?
            </h4>
            <button className="btn btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
        <div className="border rounded-md" data-aos="fade-up">
          <img className="w-full h-52" src={Distance} alt="" />
          <div className="pl-3 mt-3">
            <h5 className="text-gray-600 text-xs font-semibold">CAR TIPS</h5>
            <h4 className="text-xl font-semibold my-4">
              How Many Miles Is Too High for a Used Car?
            </h4>
            <button className="btn btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
        <div className="border rounded-md" data-aos="fade-left">
          <img className="w-full h-52" src={AWDvs4WD} alt="" />
          <div className="pl-3 mt-3">
            <h5 className="text-gray-600 text-sm font-semibold">
              CAR SHOPPING
            </h5>
            <h4 className="text-xl font-semibold my-4">
              AWD vs. 4WD: What's the Difference Between Them
            </h4>
            <button className="btn btn-primary btn-outline mb-4">
              Read Article
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h5 className="text-gray-400 text-sm font-semibold">Recent Articles</h5>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 border-b-2 pb-6">
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            Finding the Best Value for Your Used Truck
          </h4>
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            How to Assess the Value of your Used Car
          </h4>
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            Why EVs Could Cost Less in the Long Run
          </h4>
          <h4 className="text-xl cursor-pointer hover:text-primary font-semibold text-gray-600">
            What Not to Say When Buying a Car
          </h4>
        </div>
        <div className="text-center mt-4">
          <button className="text-primary hover:text-secondary text-xl font-semibold">
            Read More Articles{" "}
            <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesAndTips;
