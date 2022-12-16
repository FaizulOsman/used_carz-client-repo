import React from "react";
import AdvertisedItems from "./AdvertisedItems";
import ArticlesAndTips from "./ArticlesAndTips";
import Banner from "./Banner";
import Categories from "./Categories";
import UsedCarsNearYou from "./UsedCarsNearYou";

const Home = () => {
  return (
    <div className="mb-20">
      <Banner></Banner>
      <AdvertisedItems></AdvertisedItems>
      <Categories></Categories>
      <UsedCarsNearYou></UsedCarsNearYou>
      <ArticlesAndTips></ArticlesAndTips>
    </div>
  );
};

export default Home;
