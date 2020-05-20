import { Request, Response } from 'express';
import dotenv from 'dotenv';
const fs = require('fs');
var path = require('path');
dotenv.config();

export default class MusicController {

    // Enregistre une chanson venant du client
    static async uploadSong(request: Request, response: Response) {
        if (!request.files || Object.keys(request.files).length === 0) {
            return request.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = request.files.myFile;
        console.log(sampleFile)

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(process.env.MUSIC_PATH + '/Autres/' + sampleFile.name + '', function (err) {
            if (err)
                return response.status(500).send(err);

            response.json(sampleFile.name + ' enregistré');
        });
    }
}
