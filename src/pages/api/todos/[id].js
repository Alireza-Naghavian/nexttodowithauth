import connectedToDB from "../../../../config/db";
import todoModel from "../../../../models/todo";

const singleToDoHanlder = async (req, res) => {
  connectedToDB();
  switch (req.method) {
    case "PUT": {
      try {
      } catch (error) {}
    }
    case "DELETE": {
      try {
        const {id} = req.query;
        const todo = await todoModel.findOne({
            _id:id
        })
        console.log(todo);
        if(!todo)return res.status(404).json({message:"تسک مورد نظر وجود ندارد"})
            await todoModel.findOneAndDelete({
            _id:id
            })
            return res.status(200).json({message:"تو دو با موفقیت حذف گردید"})

      } catch (error) {
        return res.status(500).json({message:"خطا سمت سرور",error:error.message})
      }
    }

    default: {
      connectedToDB();
      return false;
    }
  }
};
export default singleToDoHanlder;
