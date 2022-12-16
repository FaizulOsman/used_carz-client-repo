import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useBuyer from "../hooks/useBuyer";

const ReportModal = ({ product, setProduct }) => {
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);

  const handleReport = (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const productName = product?.productName;
    const productId = product?._id;
    const reporterName = user?.displayName;
    const reporterEmail = user?.email;

    const report = {
      reporterName,
      reporterEmail,
      productName,
      productId,
      description,
    };

    fetch(
      "https://b612-used-products-resale-server-side-faizul-osman.vercel.app/reports",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(report),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setProduct(null);
          toast.success("Reported Successfully");
        } else {
          toast.error(data.message);
        }
      });
    console.log(product);
  };

  return (
    <>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="report-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-semibold">
            Report to {product?.productName}
          </h3>
          <div className="card flex-shrink-0 w-full">
            <form onSubmit={handleReport} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered"
                  placeholder="Bio"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-6">
                {isBuyer ? (
                  <button type="submit" className="btn btn-primary btn-outline">
                    Submit
                  </button>
                ) : (
                  <div className="text-center mt-2">
                    <p>Only buyers can report</p>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
