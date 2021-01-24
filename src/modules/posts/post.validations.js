import Joi from "Joi";

export default {
  createPost: {
    body: Joi.object({
      title: Joi.string().min(3).required(),
      text: Joi.string().min(3).required(),
    }),
  },
};
