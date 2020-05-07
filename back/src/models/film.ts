import { Schema, model, Document } from 'mongoose';


// on crée une interface pour que Typescript sache ce qu'il y a dans nos documents!
interface IFilm extends Document {
    title: string,
    overview: string,
    poster_path: string,
    vote_average: string,
    release_date: string,
    media_name: string,
    verified_by_admin: boolean
}

// definir le schema de données de notre model
const filmSchema = new Schema({
    title: String,
    overview: String,
    poster_path: String,
    vote_average: String,
    release_date: String,
    media_name: String,
    verified_by_admin: Boolean
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });



// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const Film = model<IFilm>('Film', filmSchema, 'films');

// on exporte  !
export { Film, IFilm };