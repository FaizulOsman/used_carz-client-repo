import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
  const booking = useLoaderData();

  return (
    <div className="w-11/12 mx-auto mt-20">
      <div className="border rounded-lg p-10 max-w-xl mx-auto shadow-lg hover:shadow-xl">
        <h3 className="text-3xl font-semibold text-primary">
          Payment for Car{" "}
          <span className="text-secondary">{booking?.productName}</span>
        </h3>
        <p>
          Please pay <span className="font-bold">${booking?.price}</span> to buy{" "}
          <span className="font-bold">{booking?.productName}</span>
        </p>
        <div className="w-96 mt-12">
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
