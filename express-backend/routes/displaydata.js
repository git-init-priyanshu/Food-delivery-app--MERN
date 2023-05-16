const express = require("express");
const router = express.Router();

router.post("/fooddata", (req, res) => {
  try {
    res.json([global.foodData, global.foodCategory]);
  } catch (err) {
    console.error(error.message);
    res.send("error");
  }
});

module.exports = router;
