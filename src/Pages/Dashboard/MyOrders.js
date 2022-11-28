import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import NotFound from "../../assets/not-found.json";
import { AuthContext } from "../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const url = `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/bookings?email=${user?.email}`;
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

  // Delete Operation for My Orders
  const handleDelete = (booking) => {
    const isConfirm = window.confirm(
      `Do you want to delete "${booking?.productName}"?`
    );
    if (isConfirm) {
      fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/bookings/${booking?._id}`,
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
            toast.success(`Product ${booking?.name} deleted successfully`);
            refetch();
          }
        });
    }
  };

  return (
    <>
      {bookings.length > 0 ? (
        <div className="w-11/12 mx-auto p-10">
          <h2 className="text-3xl mb-5 font-semibold text-primary">
            My Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Buyer Name</th>
                  <th>location</th>
                  <th>Delete</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>
                      <img
                        className="h-10 w-20 rounded-lg"
                        src={booking?.img}
                        alt=""
                      />
                    </td>
                    <td>{booking?.productName}</td>
                    <td>{booking?.buyerName}</td>
                    <td>{booking?.meetingLocation}</td>
                    <td>
                      {booking?.price && !booking?.paid && (
                        <label
                          onClick={() => handleDelete(booking)}
                          className="badge py-3 badge-outline bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </label>
                      )}
                      {booking?.price && booking?.paid && (
                        <span className="text-primary">Can't Delete</span>
                      )}
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
                    No Orders Found
                  </h3>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
