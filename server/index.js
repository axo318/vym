const keys = require('./keys');

// Express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('connect', (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch(err => console.log('PG ERROR', err));
});

// Express routes
app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/all', async(req, res) => {
    try{
        const values = await pgClient.query('SELECT * FROM values');
        res.send(values);    
    } catch (err) {
        res.send(500);
    }
});

app.post('/values', async(req, res) => {
    if (!req.body.value) res.send({working: false});

    pgClient.query('INSERT INTO values(number) VALUES($1)', [req.body.value]);
    res.send({working: true});
});


// Listen
app.listen(5000, err => {
    console.log('Listening');
});