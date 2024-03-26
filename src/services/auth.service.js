const bcrypt = require("bcrypt")
const { createAccess, createRefresh } = require("../utils/jwt")
const { User, Users_token, Reset_password_code } = require("../models/index")
const sendMail = require("../utils/mail")
const { activeAccountTemp, forgotPasswordTemp } = require("../../mails")

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
        if (!user) {
            return {
                ok: false,
                errors: "Email not found",
            }
        }

        if (!user.verify_code) {
            return {
                ok: false,
                errors: "Account has been activated",
            }
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
            console.log(res) // Exp ??? Mới chuyển expired type thành STRING
            const userToken = await Users_token.findOne({
                where: {
                    id: userId,
                    refresh_token: refreshToken,
                },
            })
            console.log(userToken)
            if (!userToken) return { ok: false }
            const newAccess = createAccess({ userId })
            const newRefresh = createRefresh()

            await Black_token.create({ access_token: accessToken })
            userToken.refresh_token = newRefresh
            userToken.save()

            return {
                ok: true,
                data: { newAccess, newRefresh },
            }
        } catch (e) {
            return { ok: false }
        }
    },
    forgotPassword: async (email) => {
        const resetCode = (Math.random() + new Date().getTime())
            .toString()
            .replace(".", "")

        const currentTime = new Date()
        const expired = currentTime.setMinutes(currentTime.getMinutes() + 15)

        // Kiểm tra đã tồn tại reset code nào chưa
        // Nếu đã tồn tại ? ghi đè : thêm bản mới
        const [result, created] = await Reset_password_code.findOrCreate({
            where: { email },
            defaults: {
                email,
                reset_code: resetCode,
                expired,
            },
        })
        if (!created) {
            result.reset_code = resetCode
            result.expired = expired
            result.save()
        }

        sendMail(
            email,
            "Reset your Discord password",
            forgotPasswordTemp(
                `${process.env.CLIENT_BASE_URL}/reset-password?code=${resetCode}`
            )
        )
        return { ok: true }
    },
    resetPassword: async (body) => {
        const { email, resetCode, newPassword } = body

        const user = await User.findOne({ where: { email } })
        if(!user) {
            return {
                ok: false,
                errors: "Email does not exist"
            }
        }
        
        const reset = await Reset_password_code.findOne({
            where: { email, reset_code: resetCode },
        })
        if (!reset || reset.expired < new Date()) {
            return {
                ok: false,
                errors: "Reset code has expired",
            }
        }
        await reset.destroy()
        user.password = bcrypt.hashSync(newPassword, 10)
        user.save()
        return { ok: true }
    },
}
