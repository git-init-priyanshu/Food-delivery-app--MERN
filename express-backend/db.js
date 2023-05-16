const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/GoFood";

const connectToMongoDB = async () => {
  mongoose.connect(mongoURI, async () => {
    console.log("Connected to MongoDB");

    //fetching data from db
    const foodItemsCollection = await mongoose.connection.db.collection(
      "FoodItem"
    );
    const foodData = await foodItemsCollection.find({}).toArray();
    const foodCategoryCollection = await mongoose.connection.db.collection(
      "FoodCategory"
    );
    const categoryData = await foodCategoryCollection.find({}).toArray();
    // making global variables
    global.foodData = foodData;
    global.foodCategory = categoryData;
  });
};

module.exports = connectToMongoDB;
