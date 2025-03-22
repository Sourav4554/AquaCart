import React, { useContext } from "react";
import "./Order.css";
import { ProductContext } from "../../Context/ProductContext";

const Order = () => {
  const { orders,token,fetchMyOrders } = useContext(ProductContext);

 const fetchOrderStatus=async()=>{
 await fetchMyOrders(token);
 }
  return (
    <div className="orders-container">
      <h2 className="orders-title">MY ORDERS</h2>

      {/* Map through all orders */}
      {
      orders.length===0?(
        <h1 className='empty-cart'>No Order Placed</h1>
        ):(
      orders.map((order) => {

        return (
          <div className="order-card" key={order._id}>
            {/* --- Order Header (shared details) --- */}
            <div className="order-header">
              <div>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Payment:</strong>{" "}
                  {order.payment ? "Paid" : "Not Paid"}
                  {`(${order.paymentMethod})`}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>

              <div>
                <p>
                  <strong>Total Amount:</strong> ₹{order.amount}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item-row" key={item._id}>
                  <div className="order-item-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-item-image"
                    />
                  </div>
                  <div className="order-item-middle">
                    <h3>{item.name}</h3>
                    <p>Category: {item.category}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                  </div>
                  <div className="order-item-right">
                    <button className="track-order-btn" onClick={()=>fetchOrderStatus()}>Track Order</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }))}
    </div>
  );
};

export default Order;
