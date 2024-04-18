const userController = require("../controllers/v1/user.controller")

const router = require("express").Router()

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getOneUser)
router.post("/", userController.addUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router