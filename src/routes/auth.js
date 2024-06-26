const express = require("express")
const authController = require("../controllers/v1/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()

router.post("/login", authController.login)
router.post("/register", authController.register)
router.post("/logout", authMiddleware, authController.logout)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password", authController.resetPassword)
router.post("/active-account", authController.sendVerifyLink)
router.post("/verify", authController.verify)
router.post("/check-reset-code", authController.checkResetCode)
router.post("/refresh-token", authController.refreshToken)
router.post("/check-access", authMiddleware, authController.checkAccess)

module.exports = router