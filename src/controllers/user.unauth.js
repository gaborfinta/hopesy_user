const User = require('../models/user');
const cors = require('cors');

const corsOptions = {
    origin: true,
}

const getAll = (datastore) => async (req, res) => {
    try {
        let users = await datastore.getAll();
        res.header("Access-Control-Allow-Origin", "*");
        res.json(users);
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
}

const getById = (datastore) => async (req, res) => {
    const { id } = req.params;
    try {
        let user = await datastore.getById(id);
        if (!user) {
            return res.status(404).send();
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.json(user);
    } catch(err) {
        res.status(500).send({ error: err.message });
    }
}

const save = (datastore) => async (req, res) => {
    const userAttributes = User.getKeys();
    let newUser = {};
    userAttributes.forEach(attribute => newUser[attribute] = req.body[attribute]);
    try {
        let newId = await datastore.save(new User(newUser));
        res.header("Access-Control-Allow-Origin", "*");
        res.json({newId});
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const patch = (datastore) => async (req, res) => {
    const { id } = req.params;
    let user = await datastore.getById(id);
    if (user === undefined) {
        return res.status(404).send();
    }
    let userAttributes = User.getKeys();
    userAttributes.forEach(attribute => {
        if (req.body[attribute] !== undefined) {
            user[attribute] = req.body[attribute];
        }
    });
    try {
        let userId = await datastore.patch(user);
        res.header("Access-Control-Allow-Origin", "*");
        res.json({userId});
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const addRoutes = (router, datastore) => {
    router.get('/', cors(corsOptions), getAll(datastore));
    router.post('/', cors(corsOptions), save(datastore));
    router.get('/:id/', cors(corsOptions), getById(datastore));
    router.patch('/:id/', cors(corsOptions), patch(datastore));
    router.options('/', cors(corsOptions));
    router.options('/:id/', cors(corsOptions));
}

module.exports = addRoutes;