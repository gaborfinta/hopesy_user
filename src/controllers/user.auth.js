const User = require('../models/user');

const getAll = (datastore) => async (req, res) => {
    const users = datastore.getAll();
    res.json(users);
}

const getById = (datastore) => async (req, res) => {
    const { id } = req.params;
    const user = datastore.getById(id);
    res.json(user);
}

const save = (datastore) => async (req, res) => {
    const userAttributes = User.getKeys();
    let newUser = {};
    userAttributes.forEach(attribute => newUser[attribute] = req.body[attribute]);
    const newId = datastore.save(new User(newUser));
    res.json({newId});
}

const patch = (datastore) => async (req, res) => {
    const { id } = req.params;
    let user = datastore.getById(id);
    if (user === undefined) {
        // throw error
    }
    const userAttributes = User.getKeys();
    userAttributes.forEach(attribute => {
        if (req.body[attribute] !== undefined) {
            user[attribute] = req.body[attribute];
        }
    });

    const userId = datastore.patch(user);
    res.json({userId});
}

const addRoutes = (router, datastore) => {
    router.get('/', getAll(datastore));
    router.post('/', save(datastore));
    router.get('/:id/', getById(datastore));
    router.patch('/:id/', patch(datastore));
}

module.exports = addRoutes;