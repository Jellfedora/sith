"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// definir le schema de données de notre model
const pokemonSchema = new mongoose_1.Schema({
    name: String,
    id: {
        type: Number,
        required: true
    },
    type: {
        type: Array
    },
    img: String,
    weight: String,
    spanish_name: {
        type: String,
        default: 'N/A'
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
// on définit une propriété virtuelle
pokemonSchema.virtual('trueWeight')
    .get(function () {
    return parseFloat(this.weight);
});
// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const Pokemon = mongoose_1.model('Pokemon', pokemonSchema, 'samples_pokemon');
exports.Pokemon = Pokemon;
