import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../context/CartContext";
import { BASE_URL } from "../constants";

function Payment() {
    const { cartTotal } = useContext(CartContext);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const fetchConfig = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/payments/config`)
        setStripePromise(loadStripe(response.data.publishableKey));
    } catch (error) {
        console.log(error)
    }
  }

  useEffect( () => {
    fetchConfig()
  }, []);

  const paymentIntent = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/payments/create-payment-intent`, {currency: 'usd', amount: cartTotal})
        setClientSecret(response.data.clientSecret);
    } catch (error) {
        console.log(error)
    }
  }
  useEffect( () => {
    paymentIntent()
  }, []);

  return (
    <>
      <h1>Your Total is: ${cartTotal}</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;