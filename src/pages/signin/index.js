import React, { useState } from "react";
import { verifyToken } from "../../../utils/authUtils";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function index() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { replace } = useRouter();
  const sumbitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      identifier,
      password,
    };
    console.log(loginData);
    try {
      const res = await axios.post("/api/auth/login", loginData);
      if (res.status !== 200) throw new Error(res);
      toast.success(res?.data?.response?.message);
      return replace("/");
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post" onSubmit={sumbitHandler}>
        <div className="inputBox">
          <input
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Username | Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign In" />
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
