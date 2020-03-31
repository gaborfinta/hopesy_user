const UserStoreLocal = require('./user.array_local');

function DataStoreFactory(env) {
    if (env === "local") {
        return {
            "userStore": new UserStoreLocal(),
            "pictureStore": undefined
        }
    }
}

module.exports = DataStoreFactory;