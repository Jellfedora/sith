import { Request, Response } from 'express';
const fs = require('fs');
var path = require('path');
const player = require('chromecast-player')();
import dotenv from 'dotenv';

dotenv.config();

import { Pokemon, IPokemon } from '../models/pokemon';
import { Trainer, ITrainer, IPokemonBeing } from '../models/trainer';

export default class MainController {

    static async home(request: Request, response: Response) {
        const allPokemons: Array<IPokemon> = await Pokemon.find();

        allPokemons.forEach((pokemon) => {
            console.log(pokemon.name, pokemon.trueWeight, typeof pokemon.trueWeight);
        });

        response.render('index', { allPokemons });
    }

    static async makeTrainer(request: Request, response: Response) {
        const mewTwo = await Pokemon.findOne({ name: "Mewtwo" });

        // on crée un trainer
        const newTrainer: ITrainer = new Trainer();
        newTrainer.name = 'Red';
        newTrainer.team = [];
        // on crée un objet qui respcte l'interface "individu pokemon"
        const roxxor: IPokemonBeing = {
            surname: "Roxxor",
            level: 90,
            health_points: 100,
            species: mewTwo._id
        };
        // on peut ajouter l'individu à la team du trainer
        newTrainer.team.push(roxxor);

        await newTrainer.save();

        response.send('ok');
    }

    static async listTrainers(request: Request, response: Response) {
        // on veux lister les trainers, mais en plus, on veut les détails de l'espèce de chaque pkmn de la team de chaque trainer

        // Solution 1 : à la main
        //  a - lister les trainers
        // const trainers = await Trainer.find();
        //  b - il faut aller chercher les infos POUR CHQ individu de la team de CHQ trainer => c'est la catastrphoe !!! on abandonne...

        // trainers.forEach( (trainer) => {
        //   trainer.team.forEach( (pkmnBeing) => {
        //     pkmnBeing.species = Pokemon.findById(pkmnBeing.species);
        //   })
        // });

        // Solution 2 : laisser mongoose faire le travail
        const trainers = await Trainer.find().populate('team.species');
        //console.log(trainers);

        // "typeguard" : obligation de typescript pour "réduire" le type compbiné (ObjectId | IPokemon) à un seul parmi la liste
        if (trainers[0].team[0].species instanceof Pokemon) {
            console.log(trainers[0].team[0].species.name);
        }

        response.render('trainers', { trainers });
    }

    // Vérifie les identifiants pour la connexion
    static async postLogin(request: Request, response: Response) {
        var identifiant = request.body.identifiant;
        var password = request.body.password;
        console.log('Demande de connexion de :' + identifiant);
        console.log('Password :' + password);
        // TODO!!!

        let data = {
            'identifiant': identifiant,
            'role': 0
        };

        if (identifiant === process.env.IDENTIFIANT3 && password === process.env.PASSWORD3 || identifiant === process.env.IDENTIFIANT4 && password === process.env.PASSWORD4) {
            data = {
                'identifiant': identifiant,
                'role': 1
            };
            return response.status(200).json(data);
        } else if (identifiant === process.env.IDENTIFIANT2 && password === process.env.PASSWORD2) {
            data = {
                'identifiant': identifiant,
                'role': 2
            };
            return response.status(200).json(data);
        } else if (identifiant === process.env.IDENTIFIANT1 && password === process.env.PASSWORD1) {
            data = {
                'identifiant': identifiant,
                'role': 3
            };
            return response.status(200).json(data);
        } else {
            return response.status(403).json('nope');
        }
    }

    // Vérifie que le disque externe est accessible
    static async apiIsStart(request: Request, response: Response) {
        let videoFolder = process.env.VIDEO_PATH;
        try {
            if (fs.readdirSync(videoFolder)) {
                return response.status(200).json('ok');
            }
        } catch (err) {
            return response.status(500).json('nope');
        }
    }

    // Retourne l'image d'un albulm
    static async getImgFolder(request: Request, response: Response) {
        // var img = fs.readFileSync('/home/jellfedora/Musique/Nightwish-Human/1585625756_cover.jpg');

        // return res.status(200, { 'Content-Type': 'image/jpg' }).end(img, 'binary');
        return response.status(200).json('todo');
    }

    // Liste tout les dossiers de Musique
    static async getAllMusicFolder(request: Request, response: Response) {
        const musicPath = process.env.MUSIC_PATH;

        var listOfMusicFolders = fs.readdirSync(musicPath).sort();
        listOfMusicFolders.forEach(folder => {
            listOfMusicFolders.push(folder);
        });

        return response.status(200).json(listOfMusicFolders);
    }

    // Renvoie les chansons et la photo d'un Repertoire
    static async getFolderSongs(request: Request, response: Response) {
        var key = request.params.key;
        console.log('Demande dossier Musique : ' + key)
        // Chemin du dossier Musique + key
        let pathMusicFolder = process.env.MUSIC_PATH + key;
        var songsOfRepository = fs.readdirSync(pathMusicFolder).sort();

        let listOfMusic = [];
        let listOfMusicImg = [];
        songsOfRepository.forEach(file => {
            // Recherche si il y a une image dans le répertoire
            if (path.extname(file) === '.jpg' || path.extname(file) === '.png') {
                listOfMusicImg.push(file);
            }
            // Recherche si cest un mp3 //Todo voir autre format
            if (path.extname(file) === '.mp3') {
                // Supprime .mp3 du titre
                file = file.replace('.mp3', '')
                listOfMusic.push(file);
                // Todo ajouter un index aux fichiers
            }
        })

        var data = {
            "repertorySongs": listOfMusic,
            "repertoryImg": listOfMusicImg,
        };

        response.json(data)
    }

    // Streaming audio
    static async getMusicStreaming(request: Request, response: Response) {
        var repertory = request.params.repertory;
        var song = request.params.song;
        console.log('Demande streaming musique : ' + song)
        const musicFolder = process.env.MUSIC_PATH + repertory;
        var music = musicFolder + '/' + song + '.mp3';

        var stat = fs.statSync(music);
        var range = request.headers.range;
        var readStream;

        if (range !== undefined) {
            var parts = range.replace(/bytes=/, "").split("-");

            var partial_start = parts[0];
            var partial_end = parts[1];

            // if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
            //     return response.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
            // }

            var start = parseInt(partial_start, 10);
            var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
            var content_length = (end - start) + 1;

            response.status(206).header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': content_length,
                'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
            });

            readStream = fs.createReadStream(music, { start: start, end: end });
        } else {
            response.header({
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            readStream = fs.createReadStream(music);
        }
        readStream.pipe(response);
    }

    // Streaming vidéo
    static async getVideoStreaming(request: Request, response: Response) {
        var key = request.params.key;
        console.log('Demande streaming Films : ' + key)
        if (key === 'null') {
            response.json('coucou')
        } else {
            const videoFolder = process.env.VIDEO_PATH;
            // const videoFolder = '/media/jellfedora/Jellfedora\ Externe/Films/videos'
            // let videoFolder = '/media/fedora-pi/Jellfedora\ Externe/Films/videos'

            // Recherche si fichier est en mp4 ou mkv
            try {
                if (fs.existsSync(videoFolder + '/' + key + '.mp4')) {
                    //file exists
                    var video = videoFolder + '/' + key + '.mp4';
                    console.log('file exist')
                } else {
                    var video = videoFolder + '/' + key + '.mkv';
                }
            } catch (err) {
                console.error(err)
            }

            var stat = fs.statSync(video);
            // if (!stat) {
            //     stat = fs.statSync(videomkv);
            // }
            var range = request.headers.range;
            var readStream;

            if (range !== undefined) {
                var parts = range.replace(/bytes=/, "").split("-");

                var partial_start = parts[0];
                var partial_end = parts[1];

                // if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
                //     return response.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
                // }

                var start = parseInt(partial_start, 10);
                var end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
                var content_length = (end - start) + 1;

                response.status(206).header({
                    // 'Content-Type': 'audio/mpeg',
                    'Content-Type': 'video/mp4',
                    'Content-Length': content_length,
                    'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
                });

                readStream = fs.createReadStream(video, { start: start, end: end });
            } else {
                response.header({
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': stat.size
                });
                readStream = fs.createReadStream(video);
            }
            readStream.pipe(response);
        }
    }

    // Cast (in progress)
    static async getCast(request: Request, response: Response) {
        var otherMovie = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
        var movie = 'https://sith-api.hopto.org/api/video/Tomb-Raider';
        var img = 'https://sith-api.hopto.org/api/img';

        var googleHomeAdress = '192.168.1.10';
        var chromecastAdress = '192.168.1.11'

        // player.attach({ displayName: 'Google Home' }, function (err, p) {
        //     console.log(p)


        //     // p.play(); 

        //     p.launch(movie, { type: 'video/mkv' }, function (err, p) {
        //         if (err) {
        //             console.log(err)
        //         }
        //         console.log('Le film est casté!');
        //     });
        // });


        // player.launch(musicUrl, (err, p) => {
        //     p.once('playing', () => {
        //         console.log('playback has started.');
        //     });
        // });

        // change type of media
        player.launch(movie, { type: 'video/mkv' }, function (err, p) {
            console.log(p)
            if (err) {
                console.log(err)
            }
            p.once('playing', () => {
                console.log('Le film est casté!');
            });
        })

        return response.status(200).json('Cast');
    }

    // Renvoie les films présent d'un Repertoire
    static async getFolderVideos(request: Request, response: Response) {
        // Chemin du dossier Videos
        let pathVideoFolder = process.env.VIDEO_PATH;
        var videosOfRepository = fs.readdirSync(pathVideoFolder).sort();

        let listOfVideos = [];
        videosOfRepository.forEach(file => {
            // Recherche si cest un mkv
            if (path.extname(file) === '.mkv') {
                // Supprime .mp3 du titre
                file = file.replace('.mkv', '')
                listOfVideos.push(file);
                // Todo ajouter un index aux fichiers
            }
            // Recherche si cest un mp4
            if (path.extname(file) === '.mp4') {
                // Supprime .mp3 du titre
                file = file.replace('.mp4', '')
                listOfVideos.push(file);
                // Todo ajouter un index aux fichiers
            }
            // Recherche si cest un avi
            if (path.extname(file) === '.avi') {
                // Supprime .mp3 du titre
                file = file.replace('.avi', '')
                listOfVideos.push(file);
                // Todo ajouter un index aux fichiers
            }

            // SI cest un dossier
            // if (path.extname(file) === '') {
            //     // Supprime .mp3 du titre
            //     // file = file.replace('.mp4', '')
            //     listOfVideos.push(file);
            //     // Todo ajouter un index aux fichiers
            // }
        })

        var data = {
            "repertoryVideo": listOfVideos
        };

        response.json(data)
    }
}