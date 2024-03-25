const { object } = require("yup")

module.exports = async (data, rules = {}) => {
    const response = { ok: true }
    const schema = object(rules)
    try {
        await schema.validate(data, { abortEarly: false })
    } catch (e) {
        const errors = Object.fromEntries(
            e.inner.map((item) => [item.path, item.message])
        )
        response.ok = false
        response.errors = errors
    }
    return response
}
