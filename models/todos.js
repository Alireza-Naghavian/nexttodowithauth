const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.models.todo || mongoose.model("todo", schema);

export default todoModel;
