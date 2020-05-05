import { Schema, model, Document } from 'mongoose';


// on crée une interface pour que Typescript sache ce qu'il y a dans nos documents!
interface IUser extends Document {
    // id: number;
    name: string;
    password: {
        type: String,
        default: ''
    },
    password_hashed: number
    role: number;

    // type: Array<string>;
    // img: string;
    // weight: string;
    // spanish_name: string;

    // trueWeight: number;
}

// definir le schema de données de notre model
const userSchema = new Schema({
    name: String,
    password: String,
    role: Number,
    // id: {
    //     type: Number,
    //     required: true
    // },
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });

// on définit une propriété virtuelle
userSchema.virtual('password_hashed')
    .get(function () {
        return (this.password)
        // return parseFloat(this.weight);
    });

// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const User = model<IUser>('User', userSchema, 'users');

// on exporte  !
export { User, IUser };