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
        let userList = [];
        Object.keys(this.users).forEach(id => {
            userList.push(this.users[id])
        });;
        return userList;
    }

    patch(user) {
        this.users[user.id] = user;
        return user.id;
    }
}

module.exports = UserStoreLocal;