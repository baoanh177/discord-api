const { Server, User, Users_server } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUsers: async () => {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "verify_code"],
      },
    });
    return { ok: true, data: users };
  },
  getOneUser: async (id) => {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password", "verify_code"],
      },
    });
    if (!user) return { ok: false };
    return { ok: true, data: user };
  },
  addUser: async (body) => {
    const user = await User.findOne({ where: { email: body.email } });
    if (user) return { ok: false, errors: "Email already exists" };
    await User.create({
      ...body,
      password: bcrypt.hashSync(body.password, 10),
    });
    return { ok: true };
  },
  updateUser: async (id, body) => {
    const user = await User.findByPk(id);
    if (!user) return { ok: false, status: 404, message: "Not Found" };
    const { name, gender, status, avatar } = body;
    await user.update({
      name,
      gender,
      status,
      avatar,
    });
    await user.save();
    return { ok: true };
  },
  deleteUser: async (id) => {
    await User.destroy({ where: { id } })
    return { ok: true }
  }
};
