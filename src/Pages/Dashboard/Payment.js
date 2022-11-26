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
    <div className="p-10">
      <h3 className="text-3xl font-semibold">
        Payment for Car{" "}
        <span className="text-primary">{booking?.productName}</span>
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
  );
};

export default Payment;
