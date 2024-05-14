const { default: Validator } = require("fastest-validator");

const todoValidation = new Validator();

const schema = {
  title: {
    type: "string",
    required: true,
    max: 30,
    trim: true,
    messages: {
      string: "عنوان وارد شده صحیح نمی باشد",
      stringMax: "حداکثر ۳۰ کاراکتر قابل قبول است",
    },
  },
};

const todoValidator = todoValidation.compile(schema);
export default todoValidator;
