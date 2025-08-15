import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./OrdersPlaced.css";
import logo from "../assets/shopping-bag.png";

const OrdersPlaced = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/orders/", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          setError(data.error || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("❌ An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const downloadPDF = (order) => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      doc.addImage(img, "PNG", 10, 10, 20, 15);
      doc.setFontSize(18);
      doc.text("Bag Store", 70, 15);
      doc.setFontSize(14);
      doc.text(`Invoice - Order #${order.id}`, 70, 25);

      doc.setFontSize(12);
      doc.text(`Name: ${order.customer_name}`, 10, 35);
      doc.text(`Email: ${order.customer_email}`, 10, 42);
      doc.text(`Address: ${order.customer_address}`, 10, 49);
      doc.text(`Payment Method: ${order.payment_method}`, 10, 56);
      doc.text(`Total: ₹${order.total}`, 10, 63);

      const tableData = order.order_items.map((item) => [
        item.product_name,
        item.quantity,
      ]);

      autoTable(doc, {
        startY: 70,
        head: [["Product Name", "Quantity"]],
        body: tableData,
        styles: { halign: "center" },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });

      const finalY = doc.lastAutoTable?.finalY || 70;
      doc.setFontSize(12);
      doc.text("Thank you for shopping with Bag Store!", 10, finalY + 20);

      doc.save(`Invoice_Order_${order.id}.pdf`);
    };
  };

  if (loading) return <p>⏳ Loading your orders...</p>;
  if (error) return <p className="error-message">{error}</p>;

  if (orders.length === 0)
    return (
      <div className="orders-container">
        <h2>No Orders Placed Yet</h2>
        <button onClick={() => navigate("/home")}>Start Shopping</button>
      </div>
    );

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card-horizontal">
          <div className="order-info">
            <h3>Order #{order.id}</h3>
            <p>{order.customer_name}</p>
            <p>{order.payment_method}</p>
            <p>Total: ₹{order.total}</p>
          </div>

          <div className="order-items">
            {order.order_items.map((item) => (
              <span key={item.id}>
                {item.quantity} x {item.product_name}
              </span>
            ))}
          </div>

          <div className="order-actions">
            <button
              className="download-btn"
              onClick={() => downloadPDF(order)}
            >
              Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPlaced;
