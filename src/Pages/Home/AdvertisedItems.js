import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import ReportModal from "../../components/ReportModal";
import { AuthContext } from "../../contexts/AuthProvider";
import BookingModal from "../Products/BookingModal";
import useBuyer from "../../hooks/useBuyer";
import SingleProduct from "../Products/SingleProduct";

const AdvertisedItems = () => {
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const [isBuyer] = useBuyer(user?.email);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://b612-used-products-resale-server-side-faizul-osman.vercel.app/products`
      );
      const data = await res.json();
      const unsoldProducts = data.filter((product) => product?.paid !== true);

      return unsoldProducts;
    },
  });

  return (
    <>
      {products.length > 0 && (
        <div className="w-11/12 max-w-[1400px] mx-auto my-28">
          <h2 className="mb-10 text-4xl font-bold text-center text-secondary">
            Advertised Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
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
      )}
    </>
  );
};

export default AdvertisedItems;
