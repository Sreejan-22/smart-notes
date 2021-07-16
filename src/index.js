import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// const publishableKey = await fetch("/config").then((r) => r.json());
// const stripePromise = loadStripe(publishableKey);
const stripePromise = loadStripe(
  "pk_test_51IyX4qSBIOHRJF6e3kT1aaFAfvHhbPXS4o4Ee2EfRTRxP8z3ZAvMQVz8AzxfejGl5hTMhO5sQgAFkrFA66ZMTk6t008VPsKSPy"
);

// for performance reasons we should avoid calling the "loadStripe" method
// inside the render method

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
