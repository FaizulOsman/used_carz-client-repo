import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useBuyer from "../../hooks/useBuyer";

const BookingModal = ({ setProduct, product, refetch }) => {
  const { productName, resalePrice, sellerEmail, img, _id } = product;
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/allbookings`
      );
      const data = await res.json();
      return data;
    },
  });
  const booked = bookings.filter(
    (booking) =>
      booking?.productId === _id && booking?.buyerEmail === user?.email
  );

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const buyerName = form?.name.value;
    const buyerEmail = form?.email.value;
    const productId = _id;
    const price = resalePrice;
    const phone = form?.phone.value;
    const meetingLocation = form?.location.value;
    const booking = {
      buyerName,
      buyerEmail,
      productName,
      productId,
      img,
      price,
      phone,
      meetingLocation,
      sellerEmail,
    };

    setProduct(null);

    fetch(
      "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/bookings",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(booking),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setProduct(null);
          toast.success("Booking confirmed");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ???
          </label>
          <h3 className="text-2xl font-semibold">
            {productName}{" "}
            <span className="text-primary font-bold">${resalePrice}</span>
          </h3>
          <div className="card flex-shrink-0 w-full">
            <form onSubmit={handleBooking} className="card-body">
              <div className="form-control">
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  placeholder="Full Name"
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control">
                <input
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Email"
                  className="input input-bordered"
                  disabled
                />
              </div>
              <select
                name="location"
                className="select select-bordered bg-gray-300"
              >
                <option disabled>Select meeting location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
              <div className="form-control">
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
              </div>

              {isBuyer ? (
                <div className="form-control mt-6">
                  {!booked.length > 0 ? (
                    <button
                      type="submit"
                      className="btn btn-primary btn-outline"
                    >
                      Submit
                    </button>
                  ) : (
                    <p className="btn btn-error" disabled>
                      Already Booked
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center mt-2">
                  <p>Only buyers can book any product</p>
                  <p>
                    {" "}
                    Please{" "}
                    <Link
                      to="/register"
                      className="badge badge-primary text-white"
                    >
                      Register
                    </Link>{" "}
                    as buyer
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
