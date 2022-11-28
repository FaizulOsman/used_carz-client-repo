import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import NotFound from "../../assets/not-found.json";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);

  const url = `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/myproductsfrombooking?email=${user?.email}`;
  const { data: myproducts = [], refetch } = useQuery({
    queryKey: ["myproducts", user?.email],
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

  const soldProduct = myproducts.filter((product) => product?.paid === true);

  return (
    <>
      {soldProduct.length > 0 ? (
        <div className="w-11/12 mx-auto p-10">
          <div className="">
            <h2 className="text-3xl mb-5 font-semibold text-primary">
              My buyers
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Buyer Name</th>
                    <th>Buyer Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {soldProduct?.map((product, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{product?.productName}</td>
                      <td>{product?.buyerName}</td>
                      <td>{product?.buyerEmail}</td>
                      <td>{product?.phone}</td>
                      <td>
                        {product?.paid && (
                          <p className="text-primary font-semibold">paid</p>
                        )}
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
