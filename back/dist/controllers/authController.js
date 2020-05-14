"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
dotenv_1.default.config();
// import { Pokemon, IPokemon } from '../models/pokemon';
// import { Trainer, ITrainer, IPokemonBeing } from '../models/trainer';
const user_1 = require("../models/user");
class AuthController {
    static getAllUsers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield user_1.User.find();
            allUsers.forEach((user) => {
                console.log(user.name, user.password, typeof user.role);
            });
            response.json(allUsers);
        });
    }
    // Vérifie les identifiants pour la connexion
    static login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var identifiant = request.body.identifiant;
            var password = request.body.password;
            console.log(identifiant + ' s\'est connecté!');
            const getUser = yield user_1.User.findOne({ name: identifiant });
            // const allUsers: Array<IUser> = await User.find();
            if (getUser) {
                bcrypt.compare(password, getUser.password, function (err, result) {
                    // result == true
                    // console.log(result)
                    return response.status(200).json(getUser);
                });
            }
            else {
                return response.status(403).json('Aucun utilisateur trouvé');
            }
        });
    }
    static register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(request.body.password, salt, function (err, hash) {
                    // Store hash in your password DB.
                    const newUser = new user_1.User({
                        name: request.body.identifiant,
                        password: hash,
                        role: request.body.role
                    });
                    newUser.save((err, user) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log(newUser.name + ' enregistré');
                            response.json(newUser.name + ' enregistré!');
                        }
                    });
                });
            });
        });
    }
    static delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var identifiant = request.params.key;
            console.log(identifiant);
            const getUser = yield user_1.User.findOne({ name: identifiant });
            if (getUser) {
                getUser.remove((err, user) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(getUser.name + ' supprimé');
                        return response.status(200).json(getUser.name + ' supprimé');
                    }
                });
            }
            else {
                return response.status(403).json('Aucun utilisateur trouvé');
            }
        });
    }
}
exports.default = AuthController;
