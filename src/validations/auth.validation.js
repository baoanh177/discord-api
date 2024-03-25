const { string } = require("yup")
const validation = require("../../core/validation")

module.exports = {
    loginValidate: async (body) => {
        const rules = {
            email: string()
                .required("Email is required")
                .email("Email is invalid"),
            password: string().required("Password is required"),
        }
        return await validation(body, rules)
    },
    registerValidate: async (body) => {
        const rules = {
            email: string()
                .required("Email is required")
                .email("Email is invalid"),
            name: string().required("Name is required"),
            password: string()
                .min(6, "Password needs a minimum of 6 characters")
                .required("Password is required"),
            gender: string().test("check-gender", "Gender is invalid", value => {
                return value == "male" || value == "female" || value == "other"
            })
        }
        return await validation(body, rules)
    },
    sendVerifyLinkValidate: async body => {
        const rules = {
            email: string()
                .required("Email is required")
                .email("Email is invalid")
        }
        return await validation(body, rules)
    }
}
