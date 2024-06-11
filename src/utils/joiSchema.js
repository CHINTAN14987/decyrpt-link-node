import Joi from "joi";

const messagesObjectCreater = (keyValue, arg) => {
    return {
        "any.required": `${keyValue} is required`,
        "string.empty": `${keyValue} cannot be empty`,
        ...arg
    }
}

export const adminRegisterUser = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .max(50)
        .messages(messagesObjectCreater("Email", { 'string.email': "Please Provide email validation", 'string.max': "Email should be maximum 20 characters." })),
    password: Joi.string()
        .required()
        .min(8)
        .max(16)
        .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$"))
        .messages(messagesObjectCreater("Password", { 'string.min': "Password should be 8 characters long", 'string.max': "Password should not be greater than 16 letters", 'string.pattern.base': "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one special character" }))
});