import createHttpError from "http-errors";

const { serialize } = require("cookie");
const { default: connectedToDB } = require("../../../../config/db");
const { default: userModel } = require("../../../../models/user");
const {
  hashedPassword,
  generateToken,
} = require("../../../../utils/authUtils");
const {
  default: userValidator,
  default: signUpUserShema,
} = require("../../../../validators/user");

const signUpHandler = async (req, res) => {
  if (req.method !== "POST") return false;

  try {
    connectedToDB();
    const { error, value } = await signUpUserShema.validateAsync(req.body);

    console.log(value);
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessage });
    }
    const { firstName, lastName, email, userName, password } = req.body;

    const isUserExist = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserExist)
      throw createHttpError.BadRequest("ایمیل یا نام کاربری قبلا ثبت شده است");

    const passwordCryptor = await hashedPassword(password);
    const token = generateToken({ email });
    const users = await userModel.find({});
    await userModel.create({
      userName,
      firstName,
      lastName,
      email,
      password: passwordCryptor,
      role: users?.length > 0 ? "USER" : "ADMIN",
    });

    return res
      .setHeader(
        "Set-Cookie",
        serialize("token", token, {
          path: "/",
          httpOnly: true,
          maxAge: 60 * 60 * 24,
        })
      )
      .status(201)
      .json({ message: "ثبت نام با موفقیت انجام شد." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default signUpHandler;
