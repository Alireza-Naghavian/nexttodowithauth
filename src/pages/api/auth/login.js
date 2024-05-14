import { serialize } from "cookie";
import connectedToDB from "../../../../config/db";
import userModel from "../../../../models/user";
import { generateToken, verifyPassword } from "../../../../utils/authUtils";
import createHttpError from "http-errors";

const loginHandler = async (req, res) => {
  if (req.method !== "POST") return;

  try {
    connectedToDB();
    const { identifier, password } = req.body;
    const user = await userModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "کاربری با این اطلاعات وجود ندارد " });

    const passValidator = await verifyPassword(password, user.password);

    if (!passValidator)
      return res
        .status(422)
        .json({ message: "نام کاربری یا کلمه عبور نادرست می باشد." });

    const token = generateToken({ email: user.email });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24,
        })
      )
      .status(200)
      .json({ message: "ورود با موفقیت انجام شد ." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا سمت سرور!", error: error.message });
  }
};
export default loginHandler;
