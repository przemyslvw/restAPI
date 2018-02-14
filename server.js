const express = require('express');

const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
//const http = require('http');


const app = express();
app.use(cors());

// const server = http.createServer(app);

const port = process.env.PORT || '8000';

app.use(bodyParser.urlencoded({ extended: true }));


// app.use((req, res) => {
//     res.header('Access-Control-Allow-Orgin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
// });

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);

    app.listen(port, () => {
        console.log("We are live on " + port);
    })

});

// function normalizePort(val) {
//     var port = parseInt(val, 10);
//     if (isNaN(port)) {
//         return val;
//     }
//     if (port >= 0) {
//         return port;
//     }
//     return false;
// }
//const port = normalizePort(process.env.PORT || '8000');