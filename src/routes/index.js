var express = require("express")
require("dotenv").config()
var router = express.Router()
const authRouter = require("./auth")

/* GET home page. */
router.get("/v1/", function (req, res, next) {
    res.json({
        status: 200,
        message: "Welcome to Discord API - Version 1"
    })
})

router.use("/v1/auth", authRouter)

module.exports = router
