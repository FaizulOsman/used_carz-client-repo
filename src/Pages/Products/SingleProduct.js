import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const SingleProduct = ({ product, isBuyer, setProduct }) => {
  const { sellerEmail } = product;
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    fetch(
      `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/checksellerverify?email=${sellerEmail}`
    )
      .then((res) => res.json())
      .then((data) => setIsVerified(data.isVerified));
  }, [sellerEmail]);
  const thisYear = new Date().getFullYear();
  const purchaseYear = product?.yearOfPurchase;
  const yearsOfUse = thisYear - purchaseYear;

  return (
    <div key={product?._id} className="card bg-base-100 shadow-xl">
      <figure>
        <img
          className="w-full h-[280px] duration-500 transform hover:scale-110"
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
              <div className="badge badge-accent text-white">Available</div>
            )}
            <h2 className="card-title">{product?.productName}</h2>
          </div>
          <div className="text-sm">
            <p>Date: {product?.postedDate}</p>
            <p>Time: {product?.postedTime}</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-gray-500 text-justify">{product?.description}</p>
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
              <span className="font-semibold">Year Of Purchase: </span>
              <span>{product?.yearOfPurchase}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Years Of Use: </span>
              <span>{yearsOfUse}y</span>
            </p>
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
              {isVerified && (
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
  );
};

export default SingleProduct;
