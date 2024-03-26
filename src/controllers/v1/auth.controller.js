const {
    loginValidate,
    registerValidate,
    sendVerifyLinkValidate,
    forgotPasswordValidate,
    resetPasswordValidate,
} = require("../../validations/auth.validation")
const { successResponse, errorResponse } = require("../../utils/response")
const authServices = require("../../services/auth.service")

module.exports = {
    login: async (req, res) => {
        try {
            // Validate
            const validateResult = await loginValidate(req.body)
            if (!validateResult.ok) {
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    validateResult.errors
                )
            }

            // Service
            const loginResult = await authServices.login(req.body)
            if (!loginResult.ok) {
                return errorResponse(
                    res,
                    loginResult.status || 401,
                    loginResult.message || "Bad Request",
                    loginResult.errors
                )
            }
            req.user = loginResult.data.user
            successResponse(res, 200, "Success", loginResult.data.tokens)
        } catch (e) {
            errorResponse(res, 500, "Server Error")
        }
    },
    register: async (req, res) => {
        try {
            // Validate
            const validateResult = await registerValidate(req.body)
            if (!validateResult.ok) {
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    validateResult.errors
                )
            }

            // Service
            const registerResult = await authServices.register(req.body)
            if (!registerResult.ok) {
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    registerResult.errors
                )
            }
            successResponse(res, 201, "Success", registerResult.data)
        } catch (e) {
            errorResponse(res, 500, "Server Error")
        }
    },
    logout: async (req, res) => {
        try {
            const logoutResult = await authServices.logout(req.user.accessToken)
            if(!logoutResult.ok) return errorResponse(res, 401, "Unauthorized")
            successResponse(res, 200, "Success")
        }catch(e) {
            errorResponse(res, 500, "Server Error")
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const validateResult = await forgotPasswordValidate(req.body.email)
            if (!validateResult.ok)
                return errorResponse(res, 400, "Bad Request")

            const forgotPasswordResult = await authServices.forgotPassword(
                req.body.email
            )
            if (!forgotPasswordResult.ok) throw new Error()
            successResponse(res, 200, "Success")
        } catch (e) {
            errorResponse(res, 500, "Server Error")
        }
    },
    resetPassword: async (req, res) => {
        try {
            // Validate
            const validateResult = await resetPasswordValidate(req.body)
            if (!validateResult.ok) {
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    validateResult.errors
                )
            }

            // Service
            const resetPasswordResult = await authServices.resetPassword(req.body)
            if(!resetPasswordResult.ok) {
                return errorResponse(res, 400, "Bad Request", resetPasswordResult.errors)
            }
            successResponse(res, 200, "Success")
        } catch (e) {
            console.log(e)
            errorResponse(res, 500, "Server Error")
        }
    },
    sendVerifyLink: async (req, res) => {
        try {
            // Validate
            const validateResult = await sendVerifyLinkValidate(req.body)
            if (!validateResult.ok) {
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    validateResult.errors
                )
            }

            // Service
            const sendVerifyLinkResult = await authServices.sendVerifyLink(
                req.body.email
            )
            if (!sendVerifyLinkResult.ok)
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    sendVerifyLinkResult.errors
                )
            successResponse(res, 200, "Success")
        } catch (e) {
            console.log(e)
            errorResponse(res, 500, "Server Error")
        }
    },
    verify: async (req, res) => {
        try {
            const { verifyCode } = req.body
            if (!verifyCode) return errorResponse(res, 400, "Bad Request")

            const verifyResult = await authServices.verify(verifyCode)
            if (!verifyResult.ok)
                return errorResponse(
                    res,
                    400,
                    "Bad Request",
                    verifyResult.errors
                )
            successResponse(res, 200, "Success")
        } catch (e) {
            errorResponse(res, 500, "Server Error")
        }
    },
    refreshToken: async (req, res) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken.trim()) return errorResponse(res, 400, "Bad Request")

            const refreshTokenResult = await authServices.refreshToken(refreshToken)
            if (!refreshTokenResult.ok) return errorResponse(res, 401, "Unauthorized")
            successResponse(res, 200, "Success", refreshTokenResult.data)
        } catch (e) {
            console.log(e)
            errorResponse(res, 500, "Server Error")
        }
    },
}
