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
    const { name, location } = req.body;
    const newUser = new User(null, name, location);
    const newId = datastore.save(newUser);
    res.json({newId});
}

const addRoutes = (router, datastore) => {
    router.get('/', getAll(datastore));
    router.post('/', save(datastore));
    router.get('/:id/', getById(datastore));
}

module.exports = addRoutes;