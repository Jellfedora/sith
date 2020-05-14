"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// definir le schema de données de notre model
const userSchema = new mongoose_1.Schema({
    name: String,
    password: String,
    role: Number,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});
// on définit une propriété virtuelle
userSchema.virtual('password_hashed')
    .get(function () {
    return (this.password);
    // return parseFloat(this.weight);
});
// on laisse mongoose créer tout seul le model à parti du chema (+qqs options)
const User = mongoose_1.model('User', userSchema, 'users');
exports.User = User;
