"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// definir le schema de données de notre model
const filmSchema = new mongoose_1.Schema({
    title: String,
    overview: String,
    poster_path: String,
    vote_average: String,
    release_date: String,
    media_name: String,
    verified_by_admin: Boolean
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const Film = mongoose_1.model('Film', filmSchema, 'films');
exports.Film = Film;
