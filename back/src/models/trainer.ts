import { Schema, model, Document } from 'mongoose';

import { IPokemon } from './pokemon';

interface IPokemonBeing {
    surname: string;
    level: number;
    health_points: number;
    species: IPokemon | Schema.Types.ObjectId;
}

interface ITrainer extends Document {
    name: string;
    badges: Array<string>;
    team: Array<IPokemonBeing>;
}

const trainerSchema = new Schema({
    name: String,
    badges: {
        type: [String]
    },
    team: [{
        surname: String,
        level: Number,
        health_points: Number,
        species: {
            type: Schema.Types.ObjectId,
            ref: 'Pokemon'
        }
    }]
});

const Trainer = model<ITrainer>('Trainer', trainerSchema, 'trainers');

export { Trainer, ITrainer, IPokemonBeing };