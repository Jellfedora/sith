import { Request, Response } from 'express';
import dotenv from 'dotenv';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

dotenv.config();

// import { Pokemon, IPokemon } from '../models/pokemon';
// import { Trainer, ITrainer, IPokemonBeing } from '../models/trainer';

import { User, IUser } from '../models/user';

export default class AuthController {

    static async getAllUsers(request: Request, response: Response) {

        const allUsers: Array<IUser> = await User.find();

        allUsers.forEach((user) => {
            console.log(user.name, user.password, typeof user.role);
        });

        response.json(allUsers);
    }

    // Vérifie les identifiants pour la connexion
    static async login(request: Request, response: Response) {
        var identifiant = request.body.identifiant;
        var password = request.body.password;
        console.log(identifiant + ' s\'est connecté!');

        const getUser = await User.findOne({ name: identifiant });
        // const allUsers: Array<IUser> = await User.find();
        if (getUser) {
            console.log(getUser)
            bcrypt.compare(password, getUser.password, function (err, result) {
                // result == true
                // console.log(result)
                return response.status(200).json(getUser);
            });

        } else {
            return response.status(403).json('Aucun utilisateur trouvé');
        }
    }

    static async register(request: Request, response: Response) {

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(request.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                const newUser: IUser = new User({
                    name: request.body.identifiant,
                    password: hash,
                    role: request.body.role
                });
                newUser.save((err, user) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log(newUser.name + ' enregistré');
                        response.json(newUser.name + ' enregistré!');
                    }
                });
            });
        });
    }
}