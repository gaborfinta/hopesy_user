const express = require('express');
const routes = require('./src/router');

app = express();
app.use('/', routes);

app.listen(3000, () => console.log('App listening on port 3000'));