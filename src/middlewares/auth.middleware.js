const { User, Black_token } = require("../models/index")
const jwt = require("../utils/jwt")
const { errorResponse } = require("../utils/response")

module.exports = async (req, res, next) => {
    const accessToken = req.get("Authorization").split(" ").at(1)
    try {
        if (!accessToken) throw new Error()
        const blackToken = await Black_token.findOne({
            where: { access_token: accessToken },
        })
        if (blackToken) return errorResponse(res, 401, "Token has expired")
        
        const { userId } = await jwt.decodeToken(accessToken)
        if(!userId) throw new Error()
        
        const user = await User.findByPk(userId)
        if(!user) throw new Error()
        req.user = user
        return next()
    } catch (e) {
        return errorResponse(res, 401, "Unauthorized")
    }
}
