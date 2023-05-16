import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let data = useCart();

  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  // let footItem = props.foodItems;
  const priceRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  let finalPrice = quantity * parseInt(options[size]);

  const handleAddToCart = async () => {
    // Logic to update/add orders
    // depends upon if size is kept same or not
    let food = [];
    for (const item of data) {
      if (props.foodItems._id === item.id) {
        food = item;
        break;
      }
    }
    // update/add
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          quantity,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
        });
        return;
      }
      return;
    }
    // If the order is new
    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "420px" }}>
      <img
        src={props.foodItems.img}
        className="card-img-top"
        alt="..."
        style={{ height: "200px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setSize(e.target.value)}
            ref={priceRef}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="fs-5 h-100 ">₹{finalPrice}/-</div>
          <hr />
          <button
            className="btn bg-success text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
