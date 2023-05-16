const express = require("express");
const Orders = require("../models/Orders");
const router = express.Router();

// Adding orders
router.post("/orderdata", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  let order = await Orders.findOne({ email: req.body.email });
  console.log("order", order);
  if (!order) {
    //first order of the user
    try {
      await Orders.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.send("error");
      res.json({ success: false });
    }
  } else {
    //user wants to update the order
    try {
      await Orders.findByIdAndUpdate(order._id, {
        order_data: order.order_data.concat([data]),
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error.message);
      res.send("error");
      res.json({ success: false });
    }
  }
});

// Fetching orders
router.post("/myorders", async (req, res) => {
  const orders = await Orders.findOne({ email: req.body.email });

  try {
    res.json({ orders: orders.order_data });
  } catch (error) {
    console.error(error.message);
    res.send("error");
  }
});

module.exports = router;
