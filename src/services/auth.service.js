const bcrypt = require("bcrypt")
const { createAccess, createRefresh } = require("../utils/jwt")
const { User, Users_token } = require("../models/index")
const sendMail = require("../utils/mail")
const activeAccountTemp = require("../../mails/activeAccount")
const jwt = require("../utils/jwt")

module.exports = {
    login: async (body) => {
        const { email, password } = body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return {
                ok: false,
                message: "Email or password is incorrect",
            }
        }
        const passwordHash = user.password
        if (!bcrypt.compareSync(password, passwordHash)) {
            return {
                ok: false,
                message: "Email or password is incorrect",
            }
        }
        if (!user.status) {
            return {
                ok: false,
                status: 403,
                message: "Forbidden",
                errors: "Account has not been activated",
            }
        }
        const access = createAccess({ userId: user.id })
        const refresh = createRefresh()
        await Users_token.create()
        return {
            ok: true,
            data: {
                user,
                tokens: { access, refresh },
            },
        }
    },
    register: async (body) => {
        const verifyCode = (Math.random() + new Date().getTime())
            .toString()
            .replace(".", "")
        const [user, created] = await User.findOrCreate({
            where: { email: body.email },
            defaults: {
                ...body,
                verify_code: verifyCode,
                password: bcrypt.hashSync(body.password, 10),
            },
        })
        if (!created) {
            return {
                ok: false,
                errors: { email: "Email already exists" },
            }
        }
        sendMail(
            body.email,
            "Activate your Discord account",
            activeAccountTemp(
                `${process.env.CLIENT_BASE_URL}/verify?code=${verifyCode}`
            )
        )
        return {
            ok: true,
            data: { verifyCode },
        }
    },
    verify: async (verifyCode) => {
        const user = await User.findOne({
            where: { verify_code: verifyCode },
        })

        if (!user) {
            return {
                ok: false,
                status: 400,
                errors: "Invalid verification code",
            }
        }

        user.status = true
        user.verify_code = null
        await user.save()
        return { ok: true }
    },
    sendVerifyLink: async (email) => {
        const user = await User.findOne({ where: { email } })
        if (!user)
            return {
                ok: false,
                errors: "Email not found",
            }
        sendMail(
            email,
            "Activate your Discord account",
            activeAccountTemp(
                `${process.env.CLIENT_BASE_URL}/verify?code=${user.verify_code}`
            )
        )
        return { ok: true }
    },
    refreshToken: async (accessToken, refreshToken) => {
        try {
            const { userId } = jwt.decodeToken(accessToken)
            const res = jwt.decodeToken(refreshToken)
            console.log(res) // Exp ???
            const userToken = await Users_token.findOne({
                where: {
                    id: userId,
                    refresh_token: refreshToken 
                },
            })
            console.log(userToken)
            if(!userToken) return { ok: false }
            const newAccess = createAccess({ userId })
            const newRefresh = createRefresh()

            await Black_token.create({ access_token: accessToken })
            userToken.refresh_token = newRefresh
            userToken.save()

            return {
                ok: true,
                data: { newAccess, newRefresh }
            }
        }catch(e) {
            return { ok: false }
        }
    },
}
