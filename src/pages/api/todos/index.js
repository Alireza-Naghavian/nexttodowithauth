import userModel from "../../../../models/user";
import { verifyToken } from "../../../../utils/authUtils";
import user from "../../../../models/user";
const { default: connectedToDB } = require("../../../../config/db");
const { default: todoModel } = require("../../../../models/todo");

const todosHandler = async (req, res) => {
  connectedToDB();
  const { token } = req.cookies;
  const tokenPayload = verifyToken(token);

  if (!token || !tokenPayload)
    return res.status(401).json({ message: "شما لاگین نیستید" });

  const user = await userModel.findOne({
    email: tokenPayload.email,
  });
  switch (req.method) {
    case "GET": {
      try {
        const getAllToDos = await todoModel
          .find({ user: user._id })
          .populate("todos");
        if (!getAllToDos)
          return res.status(402).json({ message: "تسکی یافت نشد!" });
        return res.status(200).json({ data: getAllToDos });
        
      } catch (error) {
        return res
          .status(500)
          .json({ message: "خطا سمت سرور!", error: error.message });
      }
    }

    case "POST": {
      try {
        const { title, isComplete } = req.body;
        const newToDo = {
          title,
          isComplete,
          user: user._id,
        };
        await todoModel.create(newToDo);
        return res.status(201).json({ message: "تسک با موفقیت ایجاد شد." });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "خطا سمت سرور!", error: error.message });
      }
    }
    default: {
      connectedToDB();
    }
  }
};
export default todosHandler;
