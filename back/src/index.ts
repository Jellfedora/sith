import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from "./router";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const fileUpload = require('express-fileupload');
const app: express.Express = express();

const PORT = process.env.PORT || 3001;
const PROD_ADRESS = process.env.PROD_ADRESS
var cors = require('cors')


// setup view engine
app.set('views', 'views');
app.set('view engine', 'pug');

// Autoriser cors
var allowedOrigins = ['http://localhost:3000', PROD_ADRESS];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            // return callback(new Error(msg), false); TODO
            return callback(null, true);
        }
        return callback(null, true);
    }
}));

app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//routing
app.use(router);

//1. se connecter à la DB
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'sith',
    useFindAndModify: false
},
    (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('mongoose connected');
        //2. lancer l'appli
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    });


// Test socket
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('message', 'Serveur connecté');
});


server.listen(3003);