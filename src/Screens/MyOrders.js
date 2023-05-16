import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const response = await fetch("http://localhost:5000/api/myorders", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    let json = await response.json();
    setOrderData(json.orders);
    console.log(orderData);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData.reverse().map((item) => {
            return item.map((arrData) => {
              return (
                <div className="col">
                  {arrData.Order_date ? (
                    <div>
                      <hr />
                      {arrData.Order_date}
                    </div>
                  ) : (
                    <div>
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{arrData.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">{arrData.quantity}</span>
                            <span className="m-1">{arrData.size}</span> |
                            <div className=" d-inline ms-2 h-100 w-20 fs-5">
                              ₹{arrData.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}
