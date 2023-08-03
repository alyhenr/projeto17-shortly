import Joi from "joi";

export default (action, data) => {
    switch (action) {
        case 'signIn': {
            return Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(3),
            }).validate(data, { abortEarly: false });
        }
        case 'signUp': {
            return Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(3),
                confirmPassword: Joi.string().min(3),
            }).validate(data, { abortEarly: false });
        }
        default:
            break;
    }
}