const admin = require('firebase-admin');
const DataStore = require('./datastore');
const User = require('../models/user');

class UserStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(user) {
        const { id } = user;
        if (id === undefined) {
            throw Error("User id not defined");
        }

        let userReference = await admin.firestore().collection('users').doc(id);
        let userRecord = await userReference.get();
        if (userRecord.exists) {
            throw Error("User already exists in firestore");
        }

        await admin.firestore().collection('users').doc(id).set(user);

        return id;
    }

    async getById(id) {
        let userRef = await admin.firestore().collection('users').doc(id);
        let userRecord = await userRef.get();
        let user = { id };
        User.keys.forEach(key => { user[key] = userRecord.get(key); });
        return new User(user);
    }

    async getAll() {
        let userList = [];
        const users = await admin.firestore().collection('users').get();
        users.forEach(userSnapshot => {
            let user = { "id": userSnapshot.id };
            User.keys.forEach(key => { user[key] = userSnapshot.get(key); });
            userList.push(new User(user));
        });

        return userList;

    }

    async patch(user) {
        const { id } = user;
        await admin.firestore().collection('users').doc(id).set(user);
        return id;
    }
}

module.exports = UserStoreFirebase;