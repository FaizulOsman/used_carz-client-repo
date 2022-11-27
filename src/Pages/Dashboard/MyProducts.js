import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import NotFound from "../../assets/not-found.json";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const url = `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/myproducts?email=${user?.email}`;
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", user?.email],
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

  // Delete Operation for My Orders
  const handleDelete = (product) => {
    const isConfirm = window.confirm(
      `Do you want to delete "${product?.productName}"?`
    );
    if (isConfirm) {
      fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/products/${product?._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success(`Product ${product?.name} deleted successfully`);
            refetch();
          }
        });
    }
  };

  // Update Operation for My Orders
  const handleSoldStatus = (product) => {
    fetch(
      `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/products/sold/${product?._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Status Updated successfully");
          refetch();
        }
      });
  };

  // Update Operation for My Orders
  const handleAvailableStatus = (product) => {
    fetch(
      `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/products/available/${product?._id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          toast.success("Status Updated successfully");
          refetch();
        }
      });
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="w-11/12 mx-auto p-10">
          <div className="">
            <h2 className="text-3xl mb-5 font-semibold text-primary">
              My Products
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
                  {products?.map((product, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{product?.productName}</td>
                      <td>{product?.sellerName}</td>
                      <td>{product?.sellerEmail}</td>
                      <td>{product?.mobile}</td>
                      <td>
                        {product?.status === "sold" ? (
                          <label
                            onClick={() => handleAvailableStatus(product)}
                            className="badge py-3 badge-outline bg-primary hover:bg-secondary text-white"
                          >
                            Available
                          </label>
                        ) : (
                          <label
                            onClick={() => handleSoldStatus(product)}
                            className="badge py-3 badge-outline bg-red-600 hover:bg-red-700 text-white"
                          >
                            Sold
                          </label>
                        )}
                      </td>
                      <td>
                        <label
                          onClick={() => handleDelete(product)}
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
                    No products added yet.
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

export default MyProducts;
