const admin = require('firebase-admin');
const DataStore = require('./datastore');
const User = require('../models/user');

class UserStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(user) {
        throwNotImplementedError();
    }

    async getById(id) {
        let userRef = await admin.firestore().collection('users').doc(id);
        let userRecord = await userRef.get();
        let user = {};
        User.keys.forEach(key => { user[key] = userRecord.get(key); });
        return new User(user);
    }

    async getAll() {
        let userList = [];
        const users = await admin.firestore().collection('users').get();
        users.forEach(userSnapshot => {
            let user = {};
            User.keys.forEach(key => { user[key] = userSnapshot.get(key); });
    
            userList.push(new User(user));
        });

        return userList;

    }

    async patch(user) {
        throwNotImplementedError();
    }
}

module.exports = UserStoreFirebase;