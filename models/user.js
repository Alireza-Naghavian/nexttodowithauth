import { required } from "joi";

const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", schema);

export default userModel;
