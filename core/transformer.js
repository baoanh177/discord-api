module.exports = class {
    #data = null
    constructor(resource) {
        if(Array.isArray(resource)) {
            this.#data = resource.map(instance => this.response(instance))
        }else {
            this.#data = this.response(resource)
        }
        return this.#data
    }
}