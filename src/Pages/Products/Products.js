import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BookingModal from "./BookingModal";

const Products = () => {
  const location = useLocation();
  const id = location?.pathname.split("/category/")[1];
  const [product, setProduct] = useState(null);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/category/${id}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto mt-20">
      <h2 className="mb-10 text-4xl font-bold text-center text-secondary">
        Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products?.map((product) => (
          <div key={product?._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                className="w-full h-[280px]"
                src={product?.img}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-between items-center mb-3">
                <h2 className="card-title">{product?.productName}</h2>

                <label
                  onClick={() => setProduct(product)}
                  htmlFor="booking-modal"
                  className="badge py-3 badge-outline btn-primary text-white"
                >
                  Book Now
                </label>
              </div>
              <p>
                <span className="font-semibold">Location: </span>
                <span>{product?.location}</span>
              </p>
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
              <div className="card-actions justify-between mt-3">
                <div>
                  <h4 className="text-md font-semibold">
                    {product.sellerName}
                    {product?.isVerified && (
                      <FontAwesomeIcon
                        className="text-primary w-3 ml-1"
                        icon={faCircleCheck}
                      ></FontAwesomeIcon>
                    )}
                  </h4>
                  <p>
                    <small>{product?.mobile}</small>
                  </p>
                </div>
                <div>
                  <p>Date: {product?.postedDate}</p>
                  <p>Time: {product?.postedTime}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {product && (
        <BookingModal
          refetch={refetch}
          setProduct={setProduct}
          product={product}
        ></BookingModal>
      )}
    </div>
  );
};

export default Products;