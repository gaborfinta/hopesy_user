const UserStoreLocal = require('./user.array_local');
const UserStoreFirebase = require('./user.firestore');

function DataStoreFactory(env) {
    if (env === "local") {
        return {
            "userStore": new UserStoreLocal(),
            "pictureStore": undefined
        }
    } else if (env == "firebase") {
        return {
            "userStore": new UserStoreFirebase(),
            "pictureStore": undefined
        }
    }
}

module.exports = DataStoreFactory;