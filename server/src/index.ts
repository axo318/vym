import {keys} from './keys';
import {Pool} from 'pg';

// Express app setup
import express, { Request, Response, Errback } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
app.get('/', (req: Request, res: Response) => {
    res.send('Hi');
});

app.get('/values/all', async(req: Request, res: Response) => {
    try{
        const values = await pgClient.query('SELECT * FROM values');
        res.send(values.rows);    
    } catch (err) {
        res.send(500);
    }
});

app.post('/values', async(req: Request, res: Response) => {
    if (!req.body.value) {
        res.send({working: false});
    }

    pgClient.query('INSERT INTO values(number) VALUES($1)', [req.body.value]);
    res.send({working: true});
});


// Listen
app.listen(5000, () => {
    console.log(`Listening`);
});