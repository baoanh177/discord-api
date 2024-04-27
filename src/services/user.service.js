const { Op } = require("sequelize");
const { Server, User, Users_server } = require("../models/index");
const bcrypt = require("bcrypt");

module.exports = {
  getUsers: async (query) => {
    const filter = {};
    const {
      sort = "id",
      order = "asc",
      status,
      q,
      page = 1,
      limit = 10,
    } = query;

    const options = {
      where: filter,
      attributes: {
        exclude: ["password", "verify_code"],
      },
      order: [[sort, order]],
      limit,
    };

    if (status) filter.status = status;
    if (q) {
      filter[Op.or] = {
        name: {
          [Op.iLike]: `%${q}%`,
        },
        email: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }
    if (Number.isInteger(+limit) && Number.isInteger(+page)) {
      const offset = (page - 1) * limit;
      options.offset = offset;
      options.limit = limit;
    }

    const { count, rows: users } = await User.findAndCountAll(options);
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
    await User.destroy({ where: { id } });
    return { ok: true };
  },
};
