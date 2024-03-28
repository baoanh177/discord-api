const { string, object } = require("yup")
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
    },
    forgotPasswordValidate: async (email) => {
        const rules = {
            email: string()
                .required("Email is required")
                .email("Email is invalid")
        }
        return await validation({ email }, rules)
    },
    checkResetCodeValidate: async (body) => {
        const rules = {
            email: string()
                .required("Email is required")
                .email("Email is invalid"),
            resetCode: string()
                .required("Reset code is required")
        }
        return await validation(body, rules)
    },
    resetPasswordValidate: async (body) => {
        const rules = {
            email: string()
                .required("Email is required")
                .email("Email is invalid"),
            resetCode: string()
                .required("Reset code is required"),
            newPassword: string()
                .min(6, "Password needs a minimum of 6 characters")
                .required("Password is required")
        }
        return await validation(body, rules)
    }
}
