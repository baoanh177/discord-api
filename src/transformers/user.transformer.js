const Transformer = require("../../core/transformer")

module.exports = class extends Transformer {
    response(instance) {
        return {
            ...instance
        }
    }
}