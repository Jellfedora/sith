"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = __importDefault(require("body-parser"));
// premiers tests mongodb
// import TestMongo from './testmongo';
// TestMongo.printAllPokemons();
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
const PORT = process.env.PORT || 3001;
const PROD_ADRESS = process.env.PROD_ADRESS;
var cors = require('cors');
// setup view engine
app.set('views', 'views');
app.set('view engine', 'pug');
// Autoriser cors
var allowedOrigins = ['http://localhost:3000', PROD_ADRESS];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            // return callback(new Error(msg), false); TODO
            return callback(null, true);
        }
        return callback(null, true);
    }
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
//routing
app.use(router_1.default);
//1. se connecter à la DB
mongoose_1.default.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'sith',
    useFindAndModify: false
}, (err) => {
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
// app.listen(PORT, () => {
//     console.log(`App running on port ${PORT}`);
// });
