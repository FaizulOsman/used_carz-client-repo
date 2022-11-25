import React, { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import NotFound from "../../assets/not-found.json";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/mybuyers?email=${user?.email}`;
  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      {buyers.length > 0 ? (
        <div className="my-10 w-11/12 max-w-[1400px] mx-auto">
          <div className="p-10">
            <h2 className="text-3xl mb-10 font-semibold text-primary text-center">
              My buyers
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Seller Name</th>
                    <th>Seller Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {buyers?.map((product, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{product?.productName}</td>
                      <td>{product?.sellerName}</td>
                      <td>{product?.sellerEmail}</td>
                      <td>{product?.mobile}</td>
                      <td>
                        {product?.status === "sold" ? (
                          <label
                            // onClick={() => handleAvailableStatus(product)}
                            className="badge py-3 badge-outline bg-primary hover:bg-secondary text-white"
                          >
                            Available
                          </label>
                        ) : (
                          <label
                            // onClick={() => handleSoldStatus(product)}
                            className="badge py-3 badge-outline bg-primary hover:bg-secondary text-white"
                          >
                            Sold
                          </label>
                        )}
                      </td>
                      <td>
                        <label
                          // onClick={() => handleDelete(product)}
                          className="badge py-3 badge-outline bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <section className="flex items-center h-screen p-16 text-gray-900">
              <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="w-52">
                  <Lottie animationData={NotFound} loop={true} />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold text-gray-600 md:text-3xl mb-8">
                    No Buyers Found.
                  </h3>
                </div>
                <div>
                  <Link
                    to={`/dashboard/addproduct`}
                    className="badge badge-outline border badge-primary hover:bg-primary hover:text-white p-4"
                  >
                    <span className="mr-2">Add a product</span>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default MyBuyers;
