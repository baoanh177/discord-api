const { errorResponse, successResponse } = require("../../utils/response");
const userService = require("../../services/user.service");
const { addUserValidate, updateUserValidate } = require("../../validations/user.validation");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const getAllUsersResult = await userService.getAllUsers();
      if (!getAllUsersResult.ok) return errorResponse(res, 500, "Server Error");
      successResponse(res, 200, "Success", getAllUsersResult.data);
    } catch (e) {
      console.log(e)
      errorResponse(res, 500, "Server Error");
    }
  },
  getOneUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { ok, data } = await userService.getOneUser(id);
      if (!ok) return errorResponse(res, 404, "Not Found");
      successResponse(res, 200, "Success", data);
    } catch (e) {
      console.log(e);
      errorResponse(res, 500, "Server Error");
    }
  },
  addUser: async (req, res) => {
    try {
      const validateResult = await addUserValidate(req.body);
      console.log(validateResult)
      if (!validateResult.ok)
        return errorResponse(res, 400, "Bad Request", validateResult.errors);

      const { ok, errors } = await userService.addUser(req.body)
      if(!ok) return errorResponse(res, 400, "Bad Request", errors)
      successResponse(res, 201, "Success")
    } catch (e) {
      console.log(e)
      errorResponse(res, 500, "Server Error");
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      if(!req.body) return errorResponse(res, 400, "Bad Request")
      const validateResult = await updateUserValidate(req.body)
      if(!validateResult.ok) return errorResponse(res, 400, "Bad Request", validateResult.errors)

      const { ok } = await userService.updateUser(id, req.body)
      if(!ok) return errorResponse(res, 404, "Not Found")
      successResponse(res, 200, "Success")
    } catch (e) {
      console.log(e);
      errorResponse(res, 500, "Server Error");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const { ok } = await userService.deleteUser(id)
      if(!ok) throw new Error()
      successResponse(res, 200, "Success")
    } catch (e) {
      console.log(e);
      errorResponse(res, 500, "Server Error");
    }
  },
};
