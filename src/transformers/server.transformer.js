const Transformer = require("../../core/transformer")

module.exports = class extends Transformer {
    response(instance) {
        return {
            id: instance.id,
            name: instance.name,
            image: instance.image,
            ownerId: instance.owner_id,
            isPublic: instance.is_public,
            status: instance.status
        }
    }
}