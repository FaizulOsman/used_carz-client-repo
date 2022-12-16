import React from "react";
import AdvertisedItems from "./AdvertisedItems";
import ArticlesAndTips from "./ArticlesAndTips";
import Banner from "./Banner";
import Categories from "./Categories";
import SearchByType from "./SearchByType";

const Home = () => {
  return (
    <div className="mb-20">
      <Banner></Banner>
      <AdvertisedItems></AdvertisedItems>
      <Categories></Categories>
      <SearchByType></SearchByType>
      <ArticlesAndTips></ArticlesAndTips>
    </div>
  );
};

export default Home;
