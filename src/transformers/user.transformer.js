const Transformer = require("../../core/transformer")

module.exports = class extends Transformer {
    response(instance) {
        return {
            id: instance.id,
            name: instance.name,
            email: instance.email,
            gender: instance.gender,
            status: instance.status,
            avatar: instance.avatar,
            createdAt: instance.created_at,
            updatedAt: instance.updated_at,
        }
    }
}