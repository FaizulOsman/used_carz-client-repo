import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css";

import bodytype1 from "../../assets/images/bodytype1.png";
import bodytype2 from "../../assets/images/bodytype2.png";
import bodytype3 from "../../assets/images/bodytype3.png";
import bodytype4 from "../../assets/images/bodytype4.png";
import bodytype5 from "../../assets/images/bodytype5.png";
import bodytype6 from "../../assets/images/bodytype6.png";
import bodytype7 from "../../assets/images/bodytype7.png";
import bodytype8 from "../../assets/images/bodytype8.png";

const SearchByType = () => {
  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-28">
      <h2 className="text-4xl font-bold text-center text-secondary">
        Search By Type
      </h2>

      <div className="mt-20">
        <Swiper
          slidesPerView="auto"
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            560: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 6,
            },
            1140: {
              slidesPerView: 8,
            },
          }}
          // slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 3000,
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
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype1}
                alt=""
              />
              <p className="text-gray-500 font-bold">Coupes</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype2}
                alt=""
              />
              <p className="text-gray-500 font-bold">Convertibles</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype3}
                alt=""
              />
              <p className="text-gray-500 font-bold">Sedans</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype4}
                alt=""
              />
              <p className="text-gray-500 font-bold">Wagons</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype5}
                alt=""
              />
              <p className="text-gray-500 font-bold">Hatchbacks</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype6}
                alt=""
              />
              <p className="text-gray-500 font-bold">Minivans</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype7}
                alt=""
              />
              <p className="text-gray-500 font-bold">Trucks</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="text-center">
              <img
                className="w-full transform hover:scale-110 duration-300"
                src={bodytype8}
                alt=""
              />
              <p className="text-gray-500 font-bold">SUVs</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SearchByType;
