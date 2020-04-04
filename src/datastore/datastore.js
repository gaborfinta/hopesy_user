function throwNotImplementedError() {
    throw new TypeError('Function not implemented');
}

class DataStore {
    constructor() {
        if (this.constructor === DataStore) {
            throw new TypeError('Abstract class "DataStore" cannot be instantiated directly.'); 
        }
    }

    async save(user) {
        throwNotImplementedError();
    }

    async getById(id) {
        throwNotImplementedError();
    }

    async getAll() {
        throwNotImplementedError();
    }

    async patch(user) {
        throwNotImplementedError();
    }
}

module.exports = DataStore;