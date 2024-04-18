const serverService = require("../../services/server.service");
const { successResponse, errorResponse } = require("../../utils/response");
const ServerTransformer = require("../../transformers/server.transformer");

module.exports = {
  getAllServers: async (req, res) => {
    const { id } = req.user.dataValues;
    const getAllServersResult = await serverService.getAllServers(id);
    if (!getAllServersResult.ok) return errorResponse(res, 500, "Server Error");
    successResponse(
      res,
      200,
      "Success",
      new ServerTransformer(getAllServersResult.data)
    );
  },
};
