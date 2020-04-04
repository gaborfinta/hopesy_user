const User = require('../models/user');
const cors = require('cors');

const corsOptions = {
    origin: true,
}

const getAll = (datastore) => async (req, res) => {
    let users = await datastore.getAll();
    res.header("Access-Control-Allow-Origin", "*");
    res.json(users);
}

const getById = (datastore) => async (req, res) => {
    const { id } = req.params;
    let user = await datastore.getById(id);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(user);
}

const save = (datastore) => async (req, res) => {
    const userAttributes = User.getKeys();
    let newUser = {};
    userAttributes.forEach(attribute => newUser[attribute] = req.body[attribute]);
    let newId = await datastore.save(new User(newUser));
    res.header("Access-Control-Allow-Origin", "*");
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
    res.header("Access-Control-Allow-Origin", "*");
    res.json({userId});
}

const addRoutes = (router, datastore) => {
    router.get('/', cors(corsOptions), getAll(datastore));
    router.post('/', cors(corsOptions), save(datastore));
    router.get('/:id/', cors(corsOptions), getById(datastore));
    router.patch('/:id/', cors(corsOptions), patch(datastore));
    router.options('/', cors());
    router.options('/:id/', cors());
}

module.exports = addRoutes;