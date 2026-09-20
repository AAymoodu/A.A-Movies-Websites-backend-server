import Joi from "joi";

export const mediaValidator = Joi.object({
  poster: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  type: Joi.string().valid("Movie", "Series").required(),
  episodes: Joi.array().items(Joi.string().trim()).min(1).required(),
});
