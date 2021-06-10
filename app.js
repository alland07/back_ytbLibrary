const express = require('express');
const app = express();
const cors = require('cors');
const John = require('./asset/database/John.json');
const Mark = require('./asset/database/Mark.json');

app.use(cors());

app.get('/', (req, res) => {
    res.send(John);
});

app.listen(8400);