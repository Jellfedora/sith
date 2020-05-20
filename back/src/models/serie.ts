import { Schema, model, Document } from 'mongoose';


interface ISerie extends Document {
    title: string,
    overview: string,
    poster_path: string,
    vote_average: string,
    release_date: string,
    media_name: string,
    verified_by_admin: boolean,
    seasons: [
        "season_name",
        "ep"
    ]
}

// definir le schema de données de notre model
const serieSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    vote_average: String,
    release_date: String,
    media_name: String,
    verified_by_admin: Boolean,
    seasons: [
        "season_name",
        "ep"
    ]
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });



// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const Serie = model<ISerie>('Serie', serieSchema, 'series');

// on exporte  !
export { Serie, ISerie };