const { default: connectedToDB } = require("../../../../config/db");
const { default: userModel } = require("../../../../models/user");
const { verifyToken } = require("../../../../utils/authUtils");

const getMeHandler = async (req, res) => {
  if (req.method !== "GET") return;

  try {
    connectedToDB();
    const { token } = req.cookies;

    if (!token) return res.status(422).json({ message: "شما لاگین نیستید!" });

    const tokenPayload = verifyToken(token);

    if (!tokenPayload)
      return res.status(422).json({ message: "توکن نامعتبر است." });

    const user = await userModel.findOne(
      { email: tokenPayload.email },
      "firstName lastName role"
    );

    return res.status(200).json({ data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "خطا سمت سرور", error: error.message });
  }
};
export default getMeHandler;
