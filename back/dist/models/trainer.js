"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const trainerSchema = new mongoose_1.Schema({
    name: String,
    badges: {
        type: [String]
    },
    team: [{
            surname: String,
            level: Number,
            health_points: Number,
            species: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Pokemon'
            }
        }]
});
const Trainer = mongoose_1.model('Trainer', trainerSchema, 'trainers');
exports.Trainer = Trainer;
