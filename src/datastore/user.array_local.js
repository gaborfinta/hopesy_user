const User = require('../models/user');
const DataStore = require('./datastore');

class UserStoreLocal extends DataStore {
    constructor() {
        super();
        this.userCount = 0;
        this.users = {};
    }

    save(user) {
        user.id = this.userCount++;
        this.users[user.id] = user;
        return user.id;
    }

    getById(id) {
        return this.users[id];
    }

    getAll() {
        return this.users;
    }
}

module.exports = UserStoreLocal;