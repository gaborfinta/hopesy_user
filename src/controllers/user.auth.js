const User = require('../models/user');

const getAll = (datastore) => async (req, res) => {
    let users = await datastore.getAll();
    res.json(users);
}

const getById = (datastore) => async (req, res) => {
    const { id } = req.params;
    let user = await datastore.getById(id);
    res.json(user);
}

const save = (datastore) => async (req, res) => {
    const userAttributes = User.getKeys();
    let newUser = {};
    userAttributes.forEach(attribute => newUser[attribute] = req.body[attribute]);
    let newId = await datastore.save(new User(newUser));
    res.json({newId});
}

const patch = (datastore) => async (req, res) => {
    const { id } = req.params;
    let user = await datastore.getById(id);
    if (user === undefined) {
        // throw error
    }
    let userAttributes = User.getKeys();
    userAttributes.forEach(attribute => {
        if (req.body[attribute] !== undefined) {
            user[attribute] = req.body[attribute];
        }
    });

    let userId = await datastore.patch(user);
    res.json({userId});
}

const addRoutes = (router, datastore) => {
    router.get('/', getAll(datastore));
    router.post('/', save(datastore));
    router.get('/:id/', getById(datastore));
    router.patch('/:id/', patch(datastore));
}

module.exports = addRoutes;