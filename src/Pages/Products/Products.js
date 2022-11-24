import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProsAndCons from "../../assets/images/pros-and-cons.png";

const Products = () => {
  const location = useLocation();
  const id = location?.pathname.split("/category/")[1];

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/category/${id}`);
      const data = await res.json();
      return data;
    },
  });

  console.log(products);

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-20">
      <h2 className="mb-10 text-4xl font-bold text-center text-secondary">
        Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {products?.map((product) => (
          <div key={product?._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={product?.img} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {product?.productName}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>
                <span className="font-semibold">Condition: </span>
                <span>{product?.condition}</span>
              </p>
              <p>
                <span className="font-semibold">Years of use: </span>
                <span>{product?.yearsOfUse}y</span>
              </p>
              <p>
                <span className="font-semibold">Original Price: </span>
                <span>${product?.originalPrice}</span>
              </p>
              <p>
                <span className="font-semibold">Resale Price: </span>
                <span>${product?.resalePrice}</span>
              </p>
              <p>
                <span className="font-semibold">Years of use: </span>
                <span>{product?.yearsOfUse}y</span>
              </p>
              <div className="card-actions justify-between">
                <div>
                  <h4 className="text-md font-semibold">
                    {product.sellerName}
                    <FontAwesomeIcon
                      className="text-primary w-3 ml-1"
                      icon={faCircleCheck}
                    ></FontAwesomeIcon>
                  </h4>
                  <p>
                    <small>{product?.mobile}</small>
                  </p>
                </div>
                <Link className="badge badge-outline btn-primary text-white">
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
