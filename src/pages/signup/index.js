import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { verifyToken } from "../../../utils/authUtils";
function index() {
  const [singUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });
  const { replace } = useRouter();
  const changeDataHandler = ({ target }) => {
    const { value, name } = target;
    setSignUpData({ ...singUpData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", singUpData);
      if (res.status !== 201) throw new Error(res);
      toast.success(res.data.message);

      return replace("/");
    } catch (err) {
      if (err.response.data.details) {
        err.response.data.details.map((detail) => toast.error(detail.message));
      }
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post" onSubmit={submitHandler}>
        <div className="inputBox">
          <input
            type="text"
            name="firstName"
            value={singUpData.firstName}
            onChange={changeDataHandler}
            autoComplete="off"
            required
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="lastName"
            value={singUpData.lastName}
            onChange={changeDataHandler}
            autoComplete="off"
            required
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="userName"
            value={singUpData.userName}
            onChange={changeDataHandler}
            autoComplete="off"
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            name="email"
            value={singUpData.email}
            onChange={changeDataHandler}
            autoComplete="off"
            required
          />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            name="password"
            value={singUpData.password}
            onChange={changeDataHandler}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign Up" />
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { token } = context.req.cookies;
    const tokenVerification = verifyToken(token);
    if (token || tokenVerification) {
      return { redirect: { destination: "/" } };
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {},
  };
}
export default index;
