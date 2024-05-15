import { toast } from "react-toastify";

const { default: axios } = require("axios");

const useCreateToDo = async (newToDo) => {
  try {
    const res = await axios.post("/api/todos", { ...newToDo });
    if (res.status !== 201) throw new Error(res);
    return toast.success(res?.data?.message);
  } catch (error) {
    toast.error(error?.resonse?.data?.message);
  }
};
export default useCreateToDo;
