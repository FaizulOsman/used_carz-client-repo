import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const image = form.image.files[0];
    const categoryId = form?.category.value;
    const sellerName = user?.displayName;
    const sellerEmail = user?.email;
    const location = form?.location.value;
    const resalePrice = form?.resalePrice.value;
    const originalPrice = form?.originalPrice.value;
    const yearsOfUse = form?.yearsOfUse.value;
    const description = form?.description.value;

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const postedDate = `${day}-${month}-${year}`;

    const postedTime = new Date().toLocaleTimeString();
    const isVerified = false;
    const condition = form?.condition.value;
    const mobile = form?.mobile.value;

    // SetUp for image upload
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=75b7caa2bd73ebacc1c662eef1509f83`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const img = data.data.display_url;
        const product = {
          img,
          productName,
          categoryId,
          sellerName,
          sellerEmail,
          location,
          resalePrice,
          originalPrice,
          yearsOfUse,
          postedDate,
          postedTime,
          isVerified,
          condition,
          mobile,
          description,
        };

        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              toast.success("Product Added Successfully");
              form.reset();
            } else {
              toast.error(data.message);
            }
          });
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="my-20">
      <div className="card flex-shrink-0 w-full max-w-xl mx-auto shadow-2xl bg-base-100">
        <h3 className="text-4xl font-semibold text-center text-primary mt-3">
          Add a product
        </h3>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <select
                name="condition"
                className="select select-bordered bg-gray-300"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Product Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                ccept="image/*"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Years of Use</span>
              </label>
              <input
                type="number"
                name="yearsOfUse"
                placeholder="Years of Use"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Original Price</span>
              </label>
              <input
                type="number"
                name="originalPrice"
                placeholder="Original Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Resale Price</span>
              </label>
              <input
                type="number"
                name="resalePrice"
                placeholder="Resale Price"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select a category</span>
              </label>
              <select
                name="category"
                className="select select-bordered bg-gray-300"
              >
                <option value="637f4514e056124f16c4f51f">Lamborghini</option>
                <option value="637f4514e056124f16c4f520">Porsche</option>
                <option value="637f4514e056124f16c4f521">Tesla</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <select
                name="location"
                className="select select-bordered bg-gray-300"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mobile Number</span>
            </label>
            <input
              type="number"
              name="mobile"
              placeholder="Mobile Number"
              className="input input-bordered"
              required
            />
          </div>
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
            <button type="submit" className="btn btn-primary text-white">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
