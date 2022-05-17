const Express = require('express');
const MongoClient = require("mongodb").MongoClient;
const React = require('react');
const ReactDOM = require('react-dom');
const BodyParser = require('body-parser');

const port = 3000;
const url = "mongodb://localhost:27017/";
const app = Express();
const mongoClient = new MongoClient(url);
const mongoDbName = 'game';
const mongoDbCollection = 'unit';

app.use(Express.urlencoded());
app.use(Express.json())

const cors = require('cors');
app.use(cors({
    origin: 'http://dev.testing.ru/'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

async function unitUpdate(unitData) {
    try {
        await mongoClient.connect();
        const db = mongoClient.db(mongoDbName);
        const collection = db.collection(mongoDbCollection);
        let result = await collection.insertOne(unitData);
        return result;
    } finally {
        await mongoClient.close();
    }
}

app.post('/api/unit/edit', (req, res) => {

    const {hp, maxHp, mana, maxMana, armor, magResist, x, y, unitClass} = req.body;

    let unitData = {
        hp, maxHp, mana, maxMana, armor, magResist, x, y, unitClass
    };

    if(!unitData.hp || unitData.hp === 'NaN') {
        res.send({error: "Empty: HP"});
        return false;
    }
    if(!unitData.maxHp || unitData.maxHp === 'NaN') {
        res.send({error: "Empty: maxHp"});
        return false;
    }
    if(!unitData.mana || unitData.mana === 'NaN') {
        res.send({error: "Empty: mana"});
        return false;
    }
    if(!unitData.maxMana || unitData.maxMana === 'NaN') {
        res.send({error: "Empty: maxMana"});
        return false;
    }
    if(!unitData.x || unitData.x === 'NaN') {
        res.send({error: "Empty: X"});
        return false;
    }
    if(!unitData.y || unitData.y === 'NaN') {
        res.send({error: "Empty: Y"});
        return false;
    }

    let result = unitUpdate(unitData);

    res.setHeader('Content-Type', 'application/json');
    res.send(unitData);

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
