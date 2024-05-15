import { serialize } from "cookie";
import connectedToDB from "../../../../config/db";
import { verifyToken } from "../../../../utils/authUtils";

const logoutHanlder = async (req, res) => {
  if (req.method !== "GET") return false;
  try {
    connectedToDB();
    const { token } = req.cookies;
    const tokenPayload = verifyToken(token);

    if (!token || !tokenPayload)
      return res.status(401).json({ message: "شما لاگین نیستید" });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", "", {
          path: "/",
          maxAge: 0,
        })
      ).status(200)
      .json({ message: "خروج با موفقیت انجام شد !" });
  } catch (error) {}
};
export default logoutHanlder;
