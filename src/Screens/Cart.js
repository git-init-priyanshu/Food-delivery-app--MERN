import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (data.length === 0) {
    return <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>;
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:5000/api/orderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        order_data: data,
        order_date: new Date().toDateString(),
      }),
    });

    console.log(response.json());
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    } else {
      alert("error");
    }
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr>
                  <th scope="col">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button className="btn p-0" type="button">
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-3 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
