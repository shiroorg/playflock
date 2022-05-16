const Express = require('express');
const MongoClient = require("mongodb").MongoClient;
const React = require('react');
const ReactDOM = require('react-dom');

const port = 3000;
const url = "mongodb://localhost:27017/";
const app = Express();
const mongoClient = new MongoClient(url);
const mongoDbName = 'unit';
const mongoDbCollection = 'users';

app.use(Express.json())

app.post('/api/unit/create', (req, res) => {

    const {hp, maxHp, mana, maxMana, armor, magResist, x, y, unitClass} = req.body;

    let unitData = {
        hp, maxHp, mana, maxMana, armor, magResist, x, y, unitClass
    };

    mongoClient.connect(function (err, client) {
        const db = client.db(mongoDbName);
        const collection = db.collection(mongoDbCollection);
        collection.insertOne(unitData);
        client.close();
        res.setHeader('Content-Type', 'application/json');
        res.send(unitData);
    });
})

app.get('/api/unit/list', (req, res) => {

    mongoClient.connect(function (err, client) {
        const db = client.db(mongoDbName);
        const options = {
            sort: {_id: -1},
            projection: {_id: 1, hp: 1, maxHp: 1, mana: 1, maxMana: 1, armor: 1, magResist: 1, x: 1, y: 1, unitClass: 1
            },
        };

        res.setHeader('Content-Type', 'application/json');

        db.collection(mongoDbCollection).find({}, options).toArray(function(err, result) {
            if (err) throw err;
            console.log(`GET: ${result.length} `);
            res.send(result);
        });

    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
