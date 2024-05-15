import axios from "axios"
import { useState } from "react";
import { toast } from "react-toastify";

const usetGetAllToDos = async ()=>{
    const [todos,setTodos] =useState([]);
try {
    const res = await axios.get("/api/todos");
    if(res.status !==200) throw new Error(res)
        setTodos(res.data?.data)
} catch (error) {
    toast.error(error?.response?.data?.message)
}
return {todos,setTodos}
}
export default  usetGetAllToDos