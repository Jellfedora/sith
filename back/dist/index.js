"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
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
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
//routing
app.use(router_1.default);
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
