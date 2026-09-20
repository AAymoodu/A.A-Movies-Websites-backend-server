import Joi from "joi";

export const userValidation = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  username: Joi.string()
    .min(4)
    .required()
    .pattern(/^[^@]+$/),
  password: Joi.string().min(4).required(),
});

