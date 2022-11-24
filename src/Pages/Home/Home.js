import React from "react";
import AdvertisedItems from "./AdvertisedItems";
import ArticlesAndTips from "./ArticlesAndTips";
import Banner from "./Banner";
import Categories from "./Categories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AdvertisedItems></AdvertisedItems>
      <Categories></Categories>
      <ArticlesAndTips></ArticlesAndTips>
    </div>
  );
};

export default Home;
