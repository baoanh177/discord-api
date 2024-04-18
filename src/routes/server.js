const router = require("express").Router()

const serverController = require("../controllers/v1/server.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", authMiddleware, serverController.getAllServers)

module.exports = router