import React from "react";
import AdvertisedItems from "./AdvertisedItems";
import Banner from "./Banner";
import Categories from "./Categories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AdvertisedItems></AdvertisedItems>
      <Categories></Categories>
    </div>
  );
};

export default Home;
