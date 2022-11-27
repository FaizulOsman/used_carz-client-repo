import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ReportModal from "../../components/ReportModal";
import BookingModal from "../Products/BookingModal";

const AdvertisedItems = () => {
  const [product, setProduct] = useState(null);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/products`
      );
      const data = await res.json();
      return data;
    },
  });

  products.slice(0, 3);

  return (
    <>
      {products && (
        <div className="w-11/12 max-w-[1400px] mx-auto my-20">
          <h2 className="mb-10 text-4xl font-bold text-center text-secondary">
            Advertised Items
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
                    <div>
                      {product?.status === "sold" ? (
                        <div className="badge badge-error text-white">Sold</div>
                      ) : (
                        <div className="badge badge-accent text-white">
                          Available
                        </div>
                      )}
                      <h2 className="card-title">{product?.productName}</h2>
                    </div>
                    <div className="text-sm">
                      <p>Date: {product?.postedDate}</p>
                      <p>Time: {product?.postedTime}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-500 text-justify">
                      {product?.description}
                    </p>
                  </div>
                  <div className="card-actions justify-between mt-2">
                    <div>
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
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Original Price: </span>
                        <span>${product?.originalPrice}</span>
                      </p>
                      <p>
                        <span className="font-semibold">Resale Price: </span>
                        <span>${product?.resalePrice}</span>
                      </p>
                    </div>
                  </div>
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
                      <div>
                        <label
                          onClick={() => setProduct(product)}
                          htmlFor="report-modal"
                          className="badge badge-error hover:bg-red-600 text-white mb-1"
                        >
                          Report
                        </label>
                        <div>
                          {product?.status !== "sold" && (
                            <label
                              onClick={() => setProduct(product)}
                              htmlFor="booking-modal"
                              className="badge py-3 badge-outline btn-primary text-white"
                            >
                              Book Now
                            </label>
                          )}
                        </div>
                      </div>
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
          {product && (
            <ReportModal
              refetch={refetch}
              setProduct={setProduct}
              product={product}
            ></ReportModal>
          )}
        </div>
      )}
    </>
  );
};

export default AdvertisedItems;
