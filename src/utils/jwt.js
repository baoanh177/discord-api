const jwt = require("jsonwebtoken")

module.exports = {
    createAccess: data => {
        const { JWT_SECRET, JWT_ACCESS_EXPIRE } = process.env
        const token = jwt.sign(data, JWT_SECRET, {
            expiresIn: JWT_ACCESS_EXPIRE
        })
        return token
    },
    createRefresh: () => {
        const { JWT_SECRET, JWT_REFRESH_EXPIRE } = process.env
        const data = Math.random() + new Date().getTime()
        const token = jwt.sign({ data }, JWT_SECRET, {
            expiresIn: JWT_REFRESH_EXPIRE
        })
        return token
    },
    decodeToken: token => {
        const { JWT_SECRET } = process.env
        const decode = jwt.verify(token, JWT_SECRET)
        return decode
    },
    createActiveAccountId: data => {
        const { JWT_SECRET, ACTIVE_ACCOUNT_EXPIRE } = process.env
        const activeId = jwt.sign(data, JWT_SECRET, {
            expiresIn: ACTIVE_ACCOUNT_EXPIRE
        })
        return activeId
    }
}