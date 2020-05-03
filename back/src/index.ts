import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import router from "./router";
import bodyParser from 'body-parser';

// premiers tests mongodb
// import TestMongo from './testmongo';
// TestMongo.printAllPokemons();

import mongoose from 'mongoose';

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

app.use(bodyParser());
//routing
app.use(router);


//1. se connecter à la DB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     console.log('mongoose connected');
//     //2. lancer l'appli
//     app.listen(PORT, () => {
//         console.log(`App running on port ${PORT}`);
//     });
// });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});