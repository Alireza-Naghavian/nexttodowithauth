import { isValidObjectId } from "mongoose";
import connectedToDB from "../../../../config/db";
import todoModel from "../../../../models/todo";

const singleToDoHanlder = async (req, res) => {
  connectedToDB();
  const { id } = req.query;
  switch (req.method) {
    case "PUT": {
      try {
        const { isComplete } = req.body;
        if (isValidObjectId(id)) {
          await todoModel.findOneAndUpdate({ _id: id }, { isComplete });
          return res.status(201).json({ message: "تسک تکمیل شده است" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "خطا سمت سرور", error: error.message });
      }
    }
    case "DELETE": {
      try {
        const todo = await todoModel.findOne({
          _id: id,
        });
        console.log(todo);
        if (!todo)
          return res.status(404).json({ message: "تسک مورد نظر وجود ندارد" });
        await todoModel.findOneAndDelete({
          _id: id,
        });
        return res.status(200).json({ message: "تو دو با موفقیت حذف گردید" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "خطا سمت سرور", error: error.message });
      }
    }

    default: {
      connectedToDB();
      return false;
    }
  }
};
export default singleToDoHanlder;
