import createHttpError from "http-errors";
import Joi from "joi";

const signUpUserShema = Joi.object().keys({
  firstName: Joi.string()
    .max(30)
    .required()
    .trim()
    .messages({
      'string.empty': `"نام "نمی تواند خالی باشد`,
    })
    .error(createHttpError.BadRequest("نام  وارد شده صحیح نمی باشد.")),
  lastName: Joi.string()
    .min(3)
    .max(12)
    .required().messages({
      'string.min': `نام خانوادگی باید حداقل سه کاراکتر باشد`,
    })
    .trim()
    ,
  userName: Joi.string()
    .min(4)
    .max(12)
    .required()
    .trim()
    .error(createHttpError.BadRequest("نام کاربری وارد شده صحیح نمی باشد.")),
  email: Joi.string()
    .max(30)
    .required()
    .email()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .trim()
    .error(createHttpError.BadRequest("ایمیل وارد شده معتبر نمی باشد.")),
  password: Joi.string()
    .required()
    .min(4)
    .max(12)
    .trim()
    .error(
      createHttpError.BadRequest(
        "کلمه عبور وارد شده معتبر نمی باشد حداقل ۴ و حداکثر ۱۲ کاراکتر !"
      )
    ),
});

export default signUpUserShema;
