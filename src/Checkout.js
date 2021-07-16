import React, { useState } from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Checkout.css";
import PanosliceLogo from "./PanosliceLogo";

// <PanosliceLogo />

const Checkout = () => {
  const elements = useElements();
  const stripe = useStripe();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");

  const handleSubmit = /* async */ () => {
    // e.preventDefault();
    // console.log(e.target.value);
    // do something with the elements
    if (!stripe || !elements) {
      return;
    }
    const cardNumberRef = elements.getElement(CardNumberElement);
    const expiryRef = elements.getElement(CardExpiryElement);
    const cvcRef = elements.getElement(CardCvcElement);
    // console.log(cardNumber, expiry, cvcNumber);
    console.log(cardNumberRef);
  };

  return (
    <div className="checkout-container">
      <div className="left-card">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px 10px",
          }}
        >
          <PanosliceLogo />
          <div style={{ color: "white", fontSize: "24px" }}>
            Blank Canvas Designs Pvt Ltd
          </div>
        </div>
        <div
          style={{
            color: "#707070",
            fontSize: "20px",
            textAlign: "center",
            margin: "0px 16px",
          }}
        >
          Subscribe to PanoSlice Premium Monthly Subscription
        </div>
        <div>
          <span style={{ color: "white", fontSize: "40px" }}>INR 450</span>
          <span
            style={{
              color: "#707070",
              fontSize: "14px",
              paddingLeft: "0.5rem",
            }}
          >
            per month
          </span>
        </div>
        <div
          style={{
            color: "#707070",
            fontSize: "20px",
            textAlign: "center",
            margin: "0px 16px",
          }}
        >
          Get unlimited access to all Premium assets and Premium Features
        </div>
        <img
          src="https://cdn4.vectorstock.com/i/1000x1000/44/78/subscription-payment-and-monthly-subscribe-vector-29184478.jpg"
          alt=""
          className="checkout-placeholder-img"
        />
      </div>
      <div className="right-card">
        <div style={{ width: "60%" }}>
          <div style={{ fontSize: "24px" }}>Pay with card</div>
        </div>
        <form>
          <label htmlFor="email" style={{ fontSize: "16px" }}>
            Email
          </label>
          <input
            type="text"
            name=""
            id="checkout-email"
            style={{ marginBottom: "16px" }}
          />
          {/* <br /> */}
          <label htmlFor="card-info" style={{ fontSize: "16px" }}>
            Card Information
          </label>
          {/* <input
            type="text"
            name=""
            id="atm-card-number"
            placeholder="1234 1234 1234"
            style={{
              borderRadius: "10px 10px 0px 0px",
              paddingLeft: "5px",
              fontSize: "16px",
            }}
          />
          <div style={{ display: "flex", width: "100%" }}>
            <input
              type="text"
              id="customer-dob"
              placeholder="MM/YY"
              style={{
                width: "50%",
                borderRadius: "0px 0px 0px 10px",
                paddingLeft: "5px",
                marginBottom: "16px",
                fontSize: "16px",
              }}
            />
            <input
              type="text"
              id="cvc-number"
              placeholder="CVC"
              style={{
                width: "50%",
                borderRadius: "0px 0px 10px 0px",
                paddingLeft: "5px",
                marginBottom: "16px",
                fontSize: "16px",
              }}
            />
          </div> */}
          <CardNumberElement className="card-number" />
          <div style={{ display: "flex", width: "100%" }}>
            <CardExpiryElement className="card-expiry" />
            <CardCvcElement className="card-cvc" />
          </div>
          {/* <br /> */}
          <label htmlFor="card-info" style={{ fontSize: "16px" }}>
            Name on card
          </label>
          <input
            type="text"
            name=""
            id="name-on-card"
            style={{ marginBottom: "16px" }}
          />
          {/* <br /> */}
          <label htmlFor="country-or-region">Country/Region</label>
          <select
            name=""
            id="country-or-region"
            style={{
              cursor: "pointer",
              outline: "none",
              width: "100%",
              height: "40px",
              borderRadius: "10px",
              backgroundColor: "white",
              // boxShadow: "0px 3px 6px #00000029",
              border: "1px solid #7070704D",
              fontSize: "16px",
              // paddingLeft: "5px",
              padding: "4px",
              marginBottom: "16px",
            }}
          >
            <option value="india">India</option>
            <option value="US">United States</option>
            <option value="russia">Russia</option>
          </select>
          <br />
        </form>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            height: "40px",
            borderRadius: "10px",
            width: "60%",
            border: "none",
          }}
        >
          Subscribe
        </button>
        <div
          style={{
            fontSize: "12px",
            textAlign: "center",
            color: "#707070",
            width: "60%",
          }}
        >
          By confirming your subscription, you allow Blank Canvas Designs Pvt
          Ltd to charge your card for this payment and future payments in
          accordance with their terms.
        </div>
      </div>
    </div>
  );
};

export default Checkout;
