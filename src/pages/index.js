import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { verifyToken } from "../../utils/authUtils";
import axios from "axios";
import useCreateToDo from "@/hooks/useCreateToDo";
import connectedToDB from "../../config/db";
import userModel from "../../models/user";
import todoModel from "../../models/todo";
import { toast } from "react-toastify";
function Todos({ user, todos }) {
  const [isShowInput, setIsShowInput] = useState(false);
  const [allTodos, SetAllToDos] = useState([...todos]);
  const [title, setTitle] = useState("");
  const getToDos = async () => {
    const res = await axios.get("api/todos");
    SetAllToDos(res.data.data);
  };

  const submitToDoHandler = async (e) => {
    e.preventDefault();
    const newToDo = {
      title,
      isComplete: false,
    };
    await useCreateToDo(newToDo);
    await getToDos();
  };
  const deleteToDoHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/todos/${id}`);
      if (res.status !== 200) throw new Error(res);
      await getToDos();
      return toast.success(res.data?.message);
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <h1>Next-Todos</h1>

      <div className="alert">
        <p>⚠ Please add a task first!</p>
      </div>

      <div className="container">
        <div
          className="form-container"
          style={{ display: `${isShowInput ? "block" : "none"}` }}
        >
          <div className="">
            <form className="add-form" onSubmit={submitToDoHandler}>
              <input
                id="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Type your To-Do works..."
              />
              <button type="submit" id="submit">
                ADD
              </button>
            </form>
          </div>
        </div>
        <div className="head">
          <div className="date">
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="add" onClick={() => setIsShowInput((is) => !is)}>
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </div>
          <div className="time">
            <a href="#">Logout</a>
          </div>
        </div>
        <div className="pad">
          <div id="todo">
            <ul id="tasksContainer">
              {allTodos?.map((todo) => {
                return (
                  <li key={todo?._id}>
                    <span className="mark">
                      <input type="checkbox" className="checkbox" />
                    </span>
                    <div className="list">
                      <p>{todo?.title}</p>
                    </div>
                    <span
                      className="delete"
                      onClick={() => deleteToDoHandler(todo?._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  connectedToDB();
  const { token } = context.req.cookies;
  const tokenVerification = verifyToken(token);
  if (!token || !tokenVerification) {
    return { redirect: { destination: "/signup" } };
  }
  const user = await userModel.findOne(
    {
      email: tokenVerification.email,
    },
    "firstName lastName"
  );

  const todos = await todoModel.find({
    user: user._id,
  });
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}
export default Todos;
