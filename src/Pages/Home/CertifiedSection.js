import React from "react";
import Certified1 from "../../assets/icons/Certified1.png";
import Certified2 from "../../assets/icons/Certified2.png";
import Certified3 from "../../assets/icons/Certified3.png";
import Certified4 from "../../assets/icons/Certified4.png";
import Certified5 from "../../assets/icons/Certified5.png";
import Certified6 from "../../assets/icons/Certified6.png";
import Certified7 from "../../assets/icons/Certified7.png";
import Certified8 from "../../assets/icons/Certified8.png";
import Certified9 from "../../assets/icons/Certified9.png";
import Certified10 from "../../assets/icons/Certified10.png";
import Certified11 from "../../assets/icons/Certified11.png";
import Certified12 from "../../assets/icons/Certified12.png";
import Certified13 from "../../assets/icons/Certified13.png";
import Certified14 from "../../assets/icons/Certified14.png";
import Certified15 from "../../assets/icons/Certified15.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CertifiedSection = () => {
  const certifiedData = [
    { img: Certified1, name: "Acura Certified" },
    { img: Certified2, name: "Audi Certified" },
    { img: Certified3, name: "BMW Certified" },
    { img: Certified4, name: "Buick Certified" },
    { img: Certified5, name: "Cadillac Certified" },
    { img: Certified6, name: "Chevrolet Certified" },
    { img: Certified7, name: "Chrysler Certified" },
    { img: Certified8, name: "Dodge Certified" },
    { img: Certified9, name: "FIAT Certified" },
    { img: Certified10, name: "Ford Certified" },
    { img: Certified11, name: "Tesla Certified" },
    { img: Certified12, name: "Porsche Certified" },
    { img: Certified13, name: "Honda Certified" },
    { img: Certified14, name: "Toyota Certified" },
    { img: Certified15, name: "Ram Certified" },
  ];
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto my-28">
      <div data-aos="flip-right">
        <h2 className="text-4xl font-bold text-center text-secondary">
          Certified Pre-Owned Cars
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-14 border-b-2 pb-6">
        {certifiedData.map((data, i) => (
          <div data-aos="fade-up" key={i}>
            <div className="border rounded-lg hover:bg-gray-100 hover:scale-110 duration-300 p-5 flex flex-col justify-center items-center">
              <img className="w-24 h-16" src={data?.img} alt="" />
              <p className="text-primary font-bold">{data?.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <btn className="text-primary font-bold cursor-pointer">
          <span className="mr-2 hover:tracking-wider duration-300">
            Show All Certified Pre-Owned Programs
          </span>
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </btn>
      </div>
    </div>
  );
};

export default CertifiedSection;
