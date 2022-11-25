import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
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
  console.log(bookings);

  const handleDelete = (booking) => {
    const isConfirm = window.confirm(
      `Do you want to delete "${booking?.productName}"?`
    );
    if (isConfirm) {
      fetch(`http://localhost:5000/bookings/${booking?._id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success(`Product ${booking?.name} deleted successfully`);
            refetch();
          }
        });
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-5 font-semibold text-primary">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Buyer Name</th>
              <th>location</th>
              <th>phone</th>
              <th>Delete</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{booking?.productName}</td>
                <td>{booking?.buyerName}</td>
                <td>{booking?.meetingLocation}</td>
                <td>{booking?.phone}</td>
                <td>
                  <label
                    onClick={() => handleDelete(booking)}
                    className="badge py-3 badge-outline bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </label>
                </td>
                <td>
                  {booking?.price && !booking?.paid && (
                    <Link to={`/dashboard/payment/${booking?._id}`}>
                      <button className="btn btn-primary btn-sm text-white">
                        Pay ${booking?.price}
                      </button>
                    </Link>
                  )}
                  {booking?.price && booking?.paid && (
                    <span className="text-primary">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
