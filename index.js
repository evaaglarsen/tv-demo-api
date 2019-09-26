const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://evagil:PasswordOne@cluster0-ux6xr.mongodb.net/test?retryWrites=true&w=majority";
const instance = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//const cors = require('cors')
// app.use(cors())
// let tvdemo = []

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Alllow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'application/json, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.post('/tvDemo', (req, res) => {
    instance.connect((err, client) => {
        if (err) res.send(err)
        const collection = client.db("tvdemo").collection("tvdemo")
        collection.insertOne(req.body).then(r => res.send(r.ops))
    })
})

app.get('/getAllTvShows', (req, res) => {
    instance.connect((err, client) => {
        if (err) res.send(err)
        const collection = client.db("tvdemo").collection("tvdemo")
        collection.find().toArray().then(r => res.send(r))
    })
})

app.get('/findShowWithId/:id', (req, res) => {
    collection.findOne({ _id: req.params.id }).then((data) => {
        res.send(data)
        db.close()
    })
})

app.put('/', (req, res) => {
    tvdemo = [...tvdemo.req.body]
    res.send(tvdemo)
})

app.delete('/', (req, res) => {
    res.send('Delete show')
})

app.listen(port, () => console.log('Example app listening on port ${port}!'))

