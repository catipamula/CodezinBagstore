import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // redirect after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Confetti
  useEffect(() => {
    const confettiContainer = document.getElementById("confetti");
    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confetti.style.backgroundColor =
        `hsl(${Math.random() * 360}, 70%, 60%)`;
      confettiContainer.appendChild(confetti);
    }
  }, []);

  return (
    <div className="order-success-fullscreen">
      <div id="confetti"></div>

      <div className="checkmark-wrapper">
        <div className="checkmark-circle">
          <svg
            className="checkmark-svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle-path"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-tick"
              fill="none"
              d="M14 27l7 7 17-17"
            />
          </svg>
        </div>
      </div>

      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with us. You will receive a confirmation email shortly.</p>
    </div>
  );
};

export default OrderSuccess;
