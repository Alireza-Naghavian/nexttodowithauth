const { default: mongoose } = require("mongoose");
import user from "./user";
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required:true,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
schema.virtual("todos",{
  ref:"user",
  localField:"_id",
  foreignField:"user"
})
const todoModel = mongoose.models.todo || mongoose.model("todo", schema);

export default todoModel;
