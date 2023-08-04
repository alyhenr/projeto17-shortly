import Joi from "joi";

export default link => Joi.object({
    url: Joi.string().uri().required()
}).validate(link, { abortEarly: false })