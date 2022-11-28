import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ReportModal from "../../components/ReportModal";
import useTitle from "../../hooks/useTitle";
import BookingModal from "./BookingModal";
import { HashLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthProvider";
import useBuyer from "../../hooks/useBuyer";
import SingleProduct from "./SingleProduct";

const Products = () => {
  useTitle("Products");
  const location = useLocation();
  const id = location?.pathname.split("/category/")[1];
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/category/${id}`);
      const data = await res.json();
      const unsoldProducts = data.filter((product) => product?.paid !== true);
      setLoading(false);
      return unsoldProducts;
    },
  });

  if (loading) {
    return (
      <div className="w-20 mx-auto h-20 my-52">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-[1400px] mx-auto my-20">
      <h2 className="mb-10 text-4xl font-bold text-center text-secondary">
        Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products?.map((product) => (
          <SingleProduct
            key={product?._id}
            product={product}
            isBuyer={isBuyer}
            setProduct={setProduct}
          ></SingleProduct>
        ))}
      </div>
      {product && (
        <BookingModal
          refetch={refetch}
          setProduct={setProduct}
          product={product}
        ></BookingModal>
      )}
      {product && (
        <ReportModal
          refetch={refetch}
          setProduct={setProduct}
          product={product}
        ></ReportModal>
      )}
    </div>
  );
};

export default Products;
