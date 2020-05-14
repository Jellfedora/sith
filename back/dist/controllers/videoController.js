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
const fs = require('fs');
var path = require('path');
dotenv_1.default.config();
const film_1 = require("../models/film");
class VideoController {
    // Vérifie si il a de nouveaux films sur le disque et les crée en bdd
    static checkFilms(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Récupére tout les films du dossier Film
            let pathVideoFolder = process.env.VIDEO_PATH;
            var videosOfRepository = fs.readdirSync(pathVideoFolder);
            let listOfVideos = [];
            videosOfRepository.forEach(file => {
                // Recherche si cest un mkv
                if (path.extname(file) === '.mkv') {
                    // Supprime .mp3 du titre
                    file = file.replace('.mkv', '');
                    listOfVideos.push(file);
                    // Todo ajouter un index aux fichiers
                }
                // Recherche si cest un mp4
                if (path.extname(file) === '.mp4') {
                    // Supprime .mp3 du titre
                    file = file.replace('.mp4', '');
                    listOfVideos.push(file);
                    // Todo ajouter un index aux fichiers
                }
                // Recherche si cest un avi
                if (path.extname(file) === '.avi') {
                    // Supprime .mp3 du titre
                    file = file.replace('.avi', '');
                    listOfVideos.push(file);
                }
            });
            // Récupére tout les titres de films en bdd
            const allFilms = yield film_1.Film.find();
            const allFilmsTitle = [];
            allFilms.forEach((film) => {
                allFilmsTitle.push(film.media_name);
            });
            // Pour chaque film du dossier on compare si il existe en bdd
            let filmNotInBdd = [];
            listOfVideos.forEach((media) => {
                let searchFilm = allFilmsTitle.includes(media);
                if (!searchFilm) {
                    filmNotInBdd.push(media);
                }
            });
            // On crée tout les films non présents en Bdd
            filmNotInBdd.forEach((film) => {
                let newFilm = new film_1.Film({
                    media_name: film,
                    verified_by_admin: false
                });
                newFilm.save((err, product) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(product.media_name + ' ajouté en bdd');
                    }
                });
            });
            // On vérifie si des films ont étés supprimés du disque
            allFilmsTitle.forEach((media_name) => {
                let searchMedia = listOfVideos.includes(media_name);
                if (!searchMedia) {
                    // Si oui on supprime le film de la bdd
                    console.log(media_name + ' supprimé de la bdd');
                    VideoController.deleteFilmBdd(media_name);
                }
            });
            response.json(filmNotInBdd.length + ' films ajoutés en bdd');
        });
    }
    // Supprime un film de la base de données
    static deleteFilmBdd(media_name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield film_1.Film.findOneAndDelete({ "media_name": media_name });
        });
    }
    // Ajoute les informations d'un film en bdd
    static addFilm(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const film = request.body.film;
            const filter = { media_name: request.body.media_name };
            const update = {
                title: film.title,
                overview: film.overview,
                poster_path: film.poster_path,
                vote_average: film.vote_average,
                release_date: film.release_date,
                verified_by_admin: true
            };
            // Récupérer le film de la bdd
            let filmUpdated = yield film_1.Film.findOneAndUpdate(filter, update);
            console.log(filmUpdated.title + " mis à jour");
        });
    }
    // Récupére tout les films de la base de données
    static adminGetAllFilms(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const allFilms = yield film_1.Film.find();
            response.json(allFilms);
        });
    }
    // Récupére tout les films de la base de données
    static getAllFilms(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const allFilms = yield film_1.Film.find({ verified_by_admin: true });
            response.json(allFilms);
        });
    }
    // Récupére un film de la base de données
    static getOneFilm(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var filmTitle = request.params.key;
            const getFilm = yield film_1.Film.findOne({ title: filmTitle });
            if (getFilm) {
                console.log("Page de " + getFilm.title + " affichée");
                return response.status(200).json(getFilm);
            }
            else {
                return response.status(403).json('Aucun film trouvé');
            }
        });
    }
}
exports.default = VideoController;
