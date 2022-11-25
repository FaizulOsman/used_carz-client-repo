import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/myproducts?email=${user?.email}`;
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
  console.log(products);

  // Delete Operation for My Orders
  const handleDelete = (product) => {
    const isConfirm = window.confirm(
      `Do you want to delete "${product?.productName}"?`
    );
    if (isConfirm) {
      fetch(`http://localhost:5000/products/${product?._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
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
    fetch(`http://localhost:5000/products/sold/${product?._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
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
    fetch(`http://localhost:5000/products/available/${product?._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
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
    <div className="my-10 w-11/12 max-w-[1400px] mx-auto">
      <div className="p-10">
        <h2 className="text-3xl mb-10 font-semibold text-primary text-center">
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
                        className="badge py-3 badge-outline bg-primary hover:bg-secondary text-white"
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
  );
};

export default MyProducts;
