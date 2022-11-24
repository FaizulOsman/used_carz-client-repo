import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const BookingModal = ({ setProduct, product, refetch }) => {
  const { productName, resalePrice } = product;
  const { user } = useContext(AuthContext);

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const buyerName = form?.name.value;
    const buyerEmail = form?.email.value;
    const price = resalePrice;
    const phone = form?.phone.value;
    const meetingLocation = form?.location.value;
    const booking = {
      buyerName,
      buyerEmail,
      productName,
      price,
      phone,
      meetingLocation,
    };
    setProduct(null);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
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
            ✕
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
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary btn-outline">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
