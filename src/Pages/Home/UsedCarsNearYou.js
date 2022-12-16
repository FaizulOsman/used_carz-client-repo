import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css";

import usedCarsNearYou1 from "../../assets/images/usedCarsNearYou1.jpg";
import usedCarsNearYou2 from "../../assets/images/usedCarsNearYou2.jpg";
import usedCarsNearYou3 from "../../assets/images/usedCarsNearYou3.jpg";
import usedCarsNearYou4 from "../../assets/images/usedCarsNearYou4.jpg";

const UsedCarsNearYou = () => {
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-20">
      <h2 className="text-4xl font-bold text-center text-secondary">
        Used Cars Near You
      </h2>

      <div className="mt-10">
        <Swiper
          slidesPerView="auto"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            560: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1140: {
              slidesPerView: 4,
            },
          }}
          // slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 1500,
          }}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper mb-20"
        >
          <SwiperSlide>
            <div className="border rounded-md">
              <div className="max-w-full">
                <img
                  className="w-full transform hover:scale-110 duration-300"
                  src={usedCarsNearYou1}
                  alt=""
                />
              </div>
              <div className="pl-3 mt-3">
                <h5 className="text-primary text-xl font-semibold">$9,990</h5>
                <h5 className="text-gray-400 text-md font-semibold">$179/Mo</h5>
                <h5 className="text-secondary text-xl font-semibold my-3">
                  2015 Hyundai Veloster
                </h5>
                <h4 className="text-sm">3477 miles</h4>
                <h4 className="text-sm mb-4">Miami, FL - 14 mi. from 33101</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-md">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={usedCarsNearYou2}
                alt=""
              />
              <div className="pl-3 mt-3">
                <h5 className="text-primary text-xl font-semibold">$9,990</h5>
                <h5 className="text-gray-400 text-md font-semibold">$179/Mo</h5>
                <h5 className="text-secondary text-xl font-semibold my-3">
                  2015 Hyundai Veloster
                </h5>
                <h4 className="text-sm">3477 miles</h4>
                <h4 className="text-sm mb-4">Miami, FL - 14 mi. from 33101</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-md">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={usedCarsNearYou3}
                alt=""
              />
              <div className="pl-3 mt-3">
                <h5 className="text-primary text-xl font-semibold">$9,990</h5>
                <h5 className="text-gray-400 text-md font-semibold">$179/Mo</h5>
                <h5 className="text-secondary text-xl font-semibold my-3">
                  2015 Hyundai Veloster
                </h5>
                <h4 className="text-sm">3477 miles</h4>
                <h4 className="text-sm mb-4">Miami, FL - 14 mi. from 33101</h4>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-md">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={usedCarsNearYou4}
                alt=""
              />
              <div className="pl-3 mt-3">
                <h5 className="text-primary text-xl font-semibold">$9,990</h5>
                <h5 className="text-gray-400 text-md font-semibold">$179/Mo</h5>
                <h5 className="text-secondary text-xl font-semibold my-3">
                  2015 Hyundai Veloster
                </h5>
                <h4 className="text-sm">3477 miles</h4>
                <h4 className="text-sm mb-4">Miami, FL - 14 mi. from 33101</h4>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default UsedCarsNearYou;
