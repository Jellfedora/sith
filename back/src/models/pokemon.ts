import { Schema, model, Document } from 'mongoose';

// on crée une interface pour que Typescript sache ce qu'il y a dans nos documents!
interface IPokemon extends Document {
    name: string;
    id: number;
    type: Array<string>;
    img: string;
    weight: string;
    spanish_name: string;

    trueWeight: number;
}

// definir le schema de données de notre model
const pokemonSchema = new Schema({
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
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

// on définit une propriété virtuelle
pokemonSchema.virtual('trueWeight')
    .get(function () {
        return parseFloat(this.weight);
    });

// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const Pokemon = model<IPokemon>('Pokemon', pokemonSchema, 'samples_pokemon');

// on exporte  !
export { Pokemon, IPokemon };