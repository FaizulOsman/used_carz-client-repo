import { useQuery } from "@tanstack/react-query";
import React from "react";

const Categories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`http://localhost:5000/categories`).then((res) => res.json()),
  });
  console.log(categories);

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-20">
      <h2 className="text-center text-4xl font-bold mb-10 text-secondary">
        Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="p-8 border rounded-lg shadow-xl hover:bg-base-200 duration-300"
          >
            <img className="w-full h-56" src={category?.img} alt="" />
            <h4 className="text-xl font-semibold text-primary text-center">
              {category?.categoryName}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
