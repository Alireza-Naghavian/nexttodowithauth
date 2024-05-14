import mongoose from "mongoose";

const connectedToDB = () => {
  try {
    if (mongoose.connections[0].readyState) return false;
    mongoose.connect("mongodb://localhost:27017/ToDo_next");
    console.log("mongo db connected !");
  } catch (error) {
    console.log("db connection has error", error);
  }
};
export default connectedToDB;
