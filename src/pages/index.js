import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { verifyToken } from "../../utils/authUtils";

function Todos() {
  return (
    <>
      <h1>Next-Todos</h1>

      <div className="alert">
        <p>⚠ Please add a task first!</p>
      </div>

      <div className="container">
        <div
          className="form-container"
          //   style={{ display: `${isShowInput ? "block" : "none"}` }}
        >
          <div className="add-form">
            <input
              id="input"
              type="text"
              //   value={title}
              //   onChange={(event) => setTitle(event.target.value)}
              placeholder="Type your To-Do works..."
            />
            <button type="submit" id="submit">
              ADD
            </button>
          </div>
        </div>
        <div className="head">
          <div className="date">
            <p>{/* {user.firstname} {user.lastname} */}</p>
          </div>
          <div className="add">
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
              <li>
                <span className="mark">
                  <input type="checkbox" className="checkbox" />
                </span>
                <div className="list">
                  <p>test todo</p>
                </div>
                <span className="delete">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
try {
  const { token } = context.req.cookies;
  const tokenVerification = verifyToken(token);
  if (!token || !tokenVerification) {
    return { redirect: { destination: "/signup" } };
  }
} catch (error) {
  console.log(error);
}
  return {
    props: {},
  };
}
export default Todos;
