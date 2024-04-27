const bcrypt = require("bcrypt");
const { createAccess, createRefresh } = require("../utils/jwt");
const {
  User,
  Users_token,
  Reset_password_code,
  Black_token,
} = require("../models/index");
const sendMail = require("../utils/mail");
const { activeAccountTemp, forgotPasswordTemp } = require("../../mails");

const jwt = require("../utils/jwt");

module.exports = {
  login: async (body) => {
    const { email, password } = body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return {
        ok: false,
        errors: "Email or password is incorrect",
      };
    }
    if (user.status == 2) {
      return {
        ok: false,
        status: 403,
        message: "Forbidden",
        errors: "Blocked",
      };
    }else if(user.status != 1) {
      return {
        ok: false,
        status: 403,
        message: "Forbidden",
        errors: "Account has not been activated",
      };
    }
    const passwordHash = user.password;
    if (!bcrypt.compareSync(password, passwordHash)) {
      return {
        ok: false,
        errors: "Email or password is incorrect",
      };
    }

    const refresh = createRefresh();
    const userToken = await Users_token.create({
      user_id: user.id,
      refresh_token: refresh,
      expired: new Date(),
    });
    const access = createAccess({
      userId: user.id,
      refreshId: userToken.id,
    });
    return {
      ok: true,
      data: {
        user,
        tokens: { accessToken: access, refreshToken: refresh },
      },
    };
  },
  register: async (body) => {
    const verifyCode = (Math.random() + new Date().getTime())
      .toString()
      .replace(".", "");
    const [user, created] = await User.findOrCreate({
      where: { email: body.email },
      defaults: {
        ...body,
        verify_code: verifyCode,
        password: bcrypt.hashSync(body.password, 10),
      },
    });
    if (!created) {
      return {
        ok: false,
        errors: { email: "Email already exists" },
      };
    }
    sendMail(
      body.email,
      "Activate your Discord account",
      activeAccountTemp(
        `${process.env.CLIENT_BASE_URL}/verify?code=${verifyCode}`
      )
    );
    return { ok: true };
  },
  logout: async (accessToken) => {
    try {
      const { userId, refreshId, exp } = jwt.decodeToken(accessToken);
      const expired = new Date(exp * 1000);
      await Black_token.create({
        access_token: accessToken,
        expired,
      });
      await Users_token.destroy({ where: { id: refreshId } });
      return { ok: true };
    } catch (e) {
      return { ok: false };
    }
  },
  forgotPassword: async (email) => {
    const user = await User.findOne({ where: { email, status: 1 }})
    if(!user) return { ok: false }

    const resetCode = (Math.random() + new Date().getTime())
      .toString()
      .replace(".", "");

    const currentTime = new Date();
    const expired = currentTime.setMinutes(currentTime.getMinutes() + 15);

    // Kiểm tra đã tồn tại reset code nào chưa
    // Nếu đã tồn tại ? ghi đè : thêm bản mới
    const [result, created] = await Reset_password_code.findOrCreate({
      where: { email },
      defaults: {
        email,
        reset_code: resetCode,
        expired,
      },
    });
    if (!created) {
      result.reset_code = resetCode;
      result.expired = expired;
      result.save();
    }

    sendMail(
      email,
      "Reset your Discord password",
      forgotPasswordTemp(
        `${process.env.CLIENT_BASE_URL}/reset-password?email=${email}&code=${resetCode}`
      )
    );
    return { ok: true };
  },
  resetPassword: async (body) => {
    const { email, resetCode, newPassword } = body;

    const user = await User.findOne({ where: { email, status: 1 } });
    if (!user) {
      return {
        ok: false,
        errors: "Email does not exist",
      };
    }

    const reset = await Reset_password_code.findOne({
      where: { email, reset_code: resetCode },
    });
    if (!reset || reset.expired < new Date()) {
      return {
        ok: false,
        errors: "Reset code has expired",
      };
    }
    await reset.destroy();
    user.password = bcrypt.hashSync(newPassword, 10);
    user.save();
    return { ok: true };
  },
  verify: async (verifyCode) => {
    const user = await User.findOne({
      where: { verify_code: verifyCode, status: 0 },
    });

    if (!user) {
      return {
        ok: false,
        status: 400,
        errors: "Invalid verification code",
      };
    }

    user.status = true;
    user.verify_code = null;
    await user.save();
    return { ok: true };
  },
  sendVerifyLink: async (email) => {
    const user = await User.findOne({ where: { email, status: 0 } });
    if (!user) {
      return {
        ok: false,
        errors: "Email not found",
      };
    }

    if (!user.verify_code) {
      return {
        ok: false,
        errors: "Account has been activated",
      };
    }
    sendMail(
      email,
      "Activate your Discord account",
      activeAccountTemp(
        `${process.env.CLIENT_BASE_URL}/verify?email=${email}&code=${user.verify_code}`
      )
    );
    return { ok: true };
  },
  refreshToken: async (refreshToken) => {
    try {
      const userToken = await Users_token.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });
      if (!userToken) return { ok: false };
      const newAccess = jwt.createAccess({
        userId: userToken.user_id,
        refreshId: userToken.id,
      });
      const newRefresh = jwt.createRefresh();

      userToken.refresh_token = newRefresh;
      userToken.save();
      return {
        ok: true,
        data: {
          accessToken: newAccess,
          refreshToken: newRefresh,
        },
      };
    } catch (e) {
      return { ok: false };
    }
  },
  checkResetCode: async (body) => {
    const { email, resetCode } = body;
    const reset = await Reset_password_code.findOne({
      where: { email, reset_code: resetCode },
    });
    if (!reset || new Date() > reset.expired) return { ok: false };
    return { ok: true };
  },
};
