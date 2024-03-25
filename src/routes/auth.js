const express = require("express")
const authController = require("../controllers/v1/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()

router.post("/login", authController.login)
router.post("/register", authController.register)
router.post("/forgot-password", authController.resetPassword)
router.post("/active-account", authController.sendVerifyLink)
router.post("/verify", authController.verify)
router.post("/refresh-token", authController.refreshToken)

module.exports = router