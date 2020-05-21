const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

module.exports = (request: Request, response: Response, next) => {
    console.log(request.headers)
    if (!request.headers['authorization'].split(' ')[1]) {
        response.status(401).json(('Pas de Token présent'));
    }


    try {
        const token = request.headers['authorization'].split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId; //userId de la bdd
        console.log(userId)

        console.log(request.body)
        if (request.body.userId && request.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        response.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};