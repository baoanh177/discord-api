var express = require("express")
require("dotenv").config()
var router = express.Router()
const authRouter = require("./auth")
const serverRouter = require("../routes/server")
const userRouter = require("../routes/user")

/* GET home page. */
router.get("/v1/", function (req, res, next) {
    res.json({
        status: 200,
        message: "Welcome to Discord API - Version 1"
    })
})

router.use("/v1/auth", authRouter)
router.use("/v1/servers", serverRouter)
router.use("/v1/users", userRouter)

module.exports = router
