const UserStoreLocal = require('./user.array_local');
const UserStoreFirebase = require('./user.firestore');

function DataStoreFactory(env) {
    if (env === "local") {
        return {
            "userStore": new UserStoreLocal()
        }
    } else if (env === "firebase") {
        return {
            "userStore": new UserStoreFirebase()
        }
    }
}

module.exports = DataStoreFactory;