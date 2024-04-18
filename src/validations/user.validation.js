const { object, string, boolean } = require("yup");
const validation = require("../../core/validation");

module.exports = {
  addUserValidate: async (body) => {
    const rules = {
      name: string().required("Name is required"),
      email: string().required("Email is required").email("Email invalid"),
      password: string().required("Password is required").min(6),
      gender: string()
        .required("Gender is required")
        .test("check-gender", "Gender invalid", (value) => {
          return value == "male" || value == "female" || value == "other";
        }),
      status: string()
        .required("Status is required")
        .test(
          "check-status",
          "Status invalid",
          (value) => value == "true" || value == "false"
        ),
      avatar: string(),
      verify_code: string(),
    };

    return await validation(body, rules);
  },
  updateUserValidate: async (body) => {
    const rules = {
      name: string().required("Name is required"),
      gender: string()
        .required("Gender is required")
        .test("check-gender", "Gender invalid", (value) => {
          return value == "male" || value == "female" || value == "other";
        }),
      status: boolean().required("Status is required"),
      avatar: string(),
    };

    return await validation(body, rules);
  },
};
