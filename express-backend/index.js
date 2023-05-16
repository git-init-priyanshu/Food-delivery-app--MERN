//connect to db
const mongoDB = require("./db");
mongoDB();

//initializing express
const express = require("express");
const app = express();
const port = 5000;

//To fix CORS issue
const cors = require("cors");
app.use(cors());

app.use(express.json()); //so that we can use req.body

//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/displaydata"));
app.use("/api", require("./routes/orderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
