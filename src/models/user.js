class User {
    constructor(userAttributes) {
        User.keys.forEach(key => {
            this[key] = null;
        });

        Object.keys(userAttributes).forEach(key => {
            if(userAttributes[key] !== undefined) {
                this[key] = userAttributes[key];
            }
        });
    }

    static getKeys () {
        return User.keys;
    }

    validate() {
        
    }
}

User.keys = ["id", "name", "location", "age", "verified", "anonymous", "bank_account", "profile_pic", "situation"]

module.exports = User;