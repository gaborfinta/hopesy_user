const DataStore = require('./datastore');

class UserStoreLocal extends DataStore {
    constructor() {
        super();
        this.userCount = 0;
        this.users = {};
    }

    async save(user) {
        user.id = this.userCount++;
        this.users[user.id] = user;
        return user.id;
    }

    async getById(id) {
        return this.users[id];
    }

    async getAll() {
        let userList = [];
        Object.keys(this.users).forEach(id => {
            userList.push(this.users[id])
        });;
        return userList;
    }

    async patch(user) {
        this.users[user.id] = user;
        return user.id;
    }
}

module.exports = UserStoreLocal;